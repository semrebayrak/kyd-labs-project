import AWS from "aws-sdk";
import { MappedEntry } from "../types/GuestListEntry";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMO_DB_TABLE || "GuestListTable";

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Batch write for DynamoDB
 * DynamoDB doesn't support batch write for more than 25 items
 * This function splits the items into chunks of 25 and writes them to DynamoDB
 */

export async function batchWriteEntries(items: MappedEntry[]): Promise<void> {
  const maxBatchSize = 25;
  const batches = chunkArray(items, maxBatchSize);

  for (const batch of batches) {
    const putRequests = batch.map((item) => ({
      PutRequest: {
        Item: item,
      },
    }));

    await dynamoDb
      .batchWrite({
        RequestItems: {
          [tableName]: putRequests,
        },
      })
      .promise();
  }
}

export async function getEntriesByListId(
  listId: string
): Promise<MappedEntry[]> {
  const result = await dynamoDb
    .query({
      TableName: tableName,
      KeyConditionExpression: "listId = :id",
      ExpressionAttributeValues: { ":id": listId },
    })
    .promise();

  return (result.Items as MappedEntry[]) || [];
}
