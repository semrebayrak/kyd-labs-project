import AWS from "aws-sdk";

const s3 = new AWS.S3();

export async function uploadToS3(
  fileBuffer: Buffer,
  fileName: string
): Promise<void> {
  const bucketName = process.env.S3_BUCKET_NAME || "my-guest-list-uploads";

  const params: AWS.S3.PutObjectRequest = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
  };

  await s3.upload(params).promise();
}
