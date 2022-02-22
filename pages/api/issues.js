import clientPromise from "../../lib/mongodb";
var ObjectId = require('mongodb').ObjectId;

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
    case "PUT":
      let bodyObj = JSON.parse(req.body);
      const filter = { _id: ObjectId(bodyObj.id) };
      const update = {
        $set: {
          title: bodyObj.title,
          content: bodyObj.content,
          priority: bodyObj.priority,
        },
      };
      const result = await db.collection("issues").updateOne(filter, update);
      res.json(result)
      break;
  }
}
