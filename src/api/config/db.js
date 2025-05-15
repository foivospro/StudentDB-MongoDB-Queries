const { MongoClient } = require("mongodb");

const uri = process.env.connectionUri || "";
const dbName = process.env.dbName || "";
const collectionName = process.env.collectionName || "";

let client;
let collection;

async function getCollection() {
  if (collection) {
    // return cached value
    return collection;
  }

  if (!client) {
    client = new MongoClient(uri);
  }

  try {
    // cache miss, create new connection
    await client.connect();
    const db = client.db(dbName);
    collection = db.collection(collectionName);
    return collection;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};

module.exports = getCollection;
