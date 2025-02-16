import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getEntriesByListId } from "../services/dynamoDbService";

export async function main(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const listId = event.pathParameters?.id;
    if (!listId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing listId parameter" }),
      };
    }

    const items = await getEntriesByListId(listId);

    const sortedItems = items.sort((a, b) => a.order - b.order);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: sortedItems,
      }),
    };
  } catch (error: any) {
    console.error("getGuestListHandler error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
    };
  }
}
