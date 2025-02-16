import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Busboy from "busboy";
import { uploadToS3 } from "../utils/s3Service";
import { parseCSVAndMap } from "../services/csvService";
import { batchWriteEntries } from "../services/dynamoDbService";
import { v4 as uuidv4 } from "uuid";

export async function main(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    // 1. Check Content-Type
    const contentType =
      event.headers["content-type"] || event.headers["Content-Type"] || "";
    if (!contentType.includes("multipart/form-data")) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Content-Type must be multipart/form-data",
        }),
      };
    }

    // 2. Check if body exists
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "No file or data provided" }),
      };
    }

    // 3. Convert body to Buffer
    const bodyBuffer = event.isBase64Encoded
      ? Buffer.from(event.body, "base64")
      : Buffer.from(event.body, "utf8");

    // 4. Parse multipart form-data with Busboy
    let fileContentBuffer: Buffer | null = null;
    let columnMapping: any = null;
    let hasHeader: boolean = false; // default

    await new Promise<void>((resolve, reject) => {
      const busboy = Busboy({ headers: { "content-type": contentType } });
      const chunks: Buffer[] = [];

      // Capture the file
      busboy.on("file", (_fieldname, fileStream) => {
        fileStream.on("data", (data) => {
          chunks.push(data);
        });

        fileStream.on("end", () => {
          fileContentBuffer = Buffer.concat(chunks);
        });
      });

      // Capture fields (e.g. columnMapping, hasHeader)
      busboy.on("field", (fieldname, val) => {
        if (fieldname === "columnMapping") {
          columnMapping = JSON.parse(val);
        } else if (fieldname === "hasHeader") {
          hasHeader = JSON.parse(val);
        }
      });

      busboy.on("error", (err) => reject(err));
      busboy.on("finish", () => resolve());

      busboy.end(bodyBuffer);
    });

    if (!fileContentBuffer) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "No file found in form data" }),
      };
    }

    // 5. (Optional) Upload raw file to S3 for archival
    const fileName = `uploads/${Date.now()}.csv`;
    await uploadToS3(fileContentBuffer, fileName);

    // 6. Parse CSV + apply mapping
    //    We'll pass 'hasHeader' into parseCSVAndMap so it can skip the first row if needed.
    const parsedData = await parseCSVAndMap(
      fileContentBuffer,
      columnMapping,
      hasHeader
    );

    // 7. Assign a short listId to each item
    const listId = uuidv4().split("-")[0];
    const itemsForDB = parsedData.map((item) => ({
      ...item,
      listId,
    }));

    // 8. Save to DynamoDB
    await batchWriteEntries(itemsForDB);

    // 9. Generate a shareable link
    const shareableLink = `${
      process.env.FRONTEND_URL ?? "https://kyd-labs-project.vercel.app"
    }/guestlist/${listId}`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        listId,
        shareableLink,
      }),
    };
  } catch (error: any) {
    console.error("uploadHandler error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
    };
  }
}
