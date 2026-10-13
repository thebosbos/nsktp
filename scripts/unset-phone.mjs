import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();
const result = await client.db().collection("settings").updateOne({ key: "site" }, { $unset: { phone: "" } });
console.log(result);
const doc = await client.db().collection("settings").findOne({ key: "site" });
console.log(JSON.stringify(doc, null, 2));
await client.close();
