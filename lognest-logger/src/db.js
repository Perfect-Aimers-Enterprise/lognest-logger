const { MongoClient } = require("mongodb");
const { getConfig } = require("./config");

let client;

async function connectDB() {
  const { dbUrl } = getConfig();
  if (!dbUrl) return;

  client = new MongoClient(dbUrl);
  await client.connect();
}

async function saveLog(log) {
  try {
    const { dbUrl } = getConfig();
    if (!dbUrl || !client) return;

    const db = client.db();
    const collection = db.collection("logs");

    await collection.insertOne(log);
  } catch (err) {
    console.log("DB logging failed:", err.message);
  }
}

module.exports = { connectDB, saveLog };
