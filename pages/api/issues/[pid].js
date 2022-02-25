import clientPromise from "../../../lib/mongodb";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("issue_tracker_db");
  const { pid } = req.query;
  const issues = await db.collection("issues").find({user: pid}).toArray();
  res.status(200).json({ data: issues })
}
