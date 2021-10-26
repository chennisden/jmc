import { jmcDB } from "@/utils/mongo";

export default async (req, res) => {
  const request = JSON.parse(req.body);
  const submissions = await jmcDB
    .collection("submissions" + request.version)
    .find({}, { sort: { score: -1 } })
    .toArray();
  res.status(200).send(JSON.stringify(submissions));
};
