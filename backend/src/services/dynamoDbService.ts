import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { MappedEntry } from "../types/GuestListEntry";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMO_DB_TABLE || "GuestList";

// Utility function to split an array into chunks
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Batch writes items to DynamoDB.
 * DynamoDB batchWrite cannot handle more than 25 items at once,
 * so we split items into chunks.
 *
 * IMPORTANT: To avoid duplicate key errors, each item must have a unique key.
 * Here we assume your table uses a composite key with:
 *   - Partition key: listId
 *   - Sort key: guestId
 * We generate a unique guestId for each item if one is not already provided.
 */
export async function batchWriteEntries(items: MappedEntry[]): Promise<void> {
  // Ensure each item gets a unique guestId.
  // This requires that your table's key schema is (listId, guestId).
  const itemsWithUniqueId = items.map((item) => ({
    ...item,
    guestId: uuidv4(),
  }));

  const maxBatchSize = 25;
  const batches = chunkArray(itemsWithUniqueId, maxBatchSize);

  for (const batch of batches) {
    const putRequests = batch.map((item) => ({
      PutRequest: {
        Item: item,
      },
    }));

    const result = await dynamoDb
      .batchWrite({
        RequestItems: {
          [tableName]: putRequests,
        },
      })
      .promise();

    if (
      result.UnprocessedItems &&
      Object.keys(result.UnprocessedItems).length > 0
    ) {
      console.warn("Some items were not processed:", result.UnprocessedItems);
    }
  }
}

/**
 * Queries DynamoDB by listId (partition key) and returns all matching items.
 */
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
