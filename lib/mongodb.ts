import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Cache the client on `global` so both dev HMR reloads and reused serverless
// containers (Vercel) share one connection instead of exhausting Atlas's pool.
if (!global._mongoClientPromise) {
  global._mongoClientPromise = new MongoClient(uri).connect();
}
const clientPromise: Promise<MongoClient> = global._mongoClientPromise;

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db();
}

export default clientPromise;
