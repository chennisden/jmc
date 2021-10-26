import { jmcDB } from "@/utils/mongo";

export default async (req, res) => {
  const request = JSON.parse(req.body);
  await jmcDB.collection("submissions").insertOne({
    username: request.username,
    answers: request.answers,
    score: request.score,
    show: true,
  });
  res.status(200).send("Success");
};
