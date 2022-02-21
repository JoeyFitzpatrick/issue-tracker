import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("issue_tracker_db");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let newPost = await db.collection("issues").insertOne(bodyObject);
      res.json(newPost);
      break;
    case "GET":
      const issues = await db.collection("issues").find({}).toArray();
      res.json({ status: 200, data: issues });
      break;
  }
}