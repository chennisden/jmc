import { jmcDB } from "@/utils/mongo";

export default async (req, res) => {
  const request = JSON.parse(req.body);
  await jmcDB.collection("submissions" + request.version).updateOne(
    {
      username: request.username,
    },
    {
      $set: {
        show: request.show,
      },
    }
  );
  res.status(200).send("Success");
};
