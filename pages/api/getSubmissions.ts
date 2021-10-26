import { jmcDB } from "@/utils/mongo";

export default async (req, res) => {
  const submissions = await jmcDB
    .collection("submissions")
    .find({}, { sort: { score: -1 } })
    .toArray();
  res.status(200).send(JSON.stringify(submissions));
};
