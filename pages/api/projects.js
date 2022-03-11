import clientPromise from "../../lib/mongodb";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
var ObjectId = require('mongodb').ObjectId;

export default withApiAuthRequired(async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("issue_tracker_db");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let newPost = await db.collection("projects").insertOne(bodyObject);
      res.json(newPost);
      break;
    case "GET":
      const projects = await db.collection("projects").find({}).toArray();
      res.json({ status: 200, data: projects });
      break;
    case "PUT":
      let bodyObj = JSON.parse(req.body);
      const filter = { _id: ObjectId(bodyObj.id) };
      const update = {
        $set: {
          title: bodyObj.title,
          content: bodyObj.content,
          priority: bodyObj.priority,
          resolved: bodyObj.resolved,
        },
      };
      const result = await db.collection("projects").updateOne(filter, update);
      res.json(result)
      break;
    case "DELETE":
      let body = JSON.parse(req.body);
      const query = { _id: ObjectId(body.id) };
      const deletion = await db.collection("projects").deleteOne(query)
      if (deletion.deletedCount === 1) {
        res.json({ status: 200, data: deletion })
      } else {
        res.json({ status: 404 })
      }
      break;
  }
})
