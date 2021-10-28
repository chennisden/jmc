import { jmcDB } from "@/utils/mongo";
import { ObjectId } from "bson";

export default async (req, res) => {
  const request = JSON.parse(req.body);
  jmcDB
    .collection("submissions" + request.version)
    .updateOne(
      {
        _id: new ObjectId(request.uuid),
      },
      {
        $set: {
          verified: true,
        },
      }
    )
    .then(res.status(200).send("Success"))
    .catch(res.status(400).send("Please input a valid UUID."));
};
