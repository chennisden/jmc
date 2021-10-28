import { jmcDB } from "@/utils/mongo";

export default async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const request = JSON.parse(req.body);
  await jmcDB.collection("submissions" + request.version).insertOne({
    username: request.username,
    answers: request.answers,
    score: request.score,
    show: true,
    verified: false,
    ip,
  });
  res.status(200).send("Success");
};
