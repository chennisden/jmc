import Cookies from "cookies";

export default async (req, res) => {
  const cookies = new Cookies(req, res, { secure: true });
  const password = cookies.get("password");
  if (password && password === process.env.ADMIN_PWD) {
    res.status(200).send("Successfully authenticated.");
    return;
  }
  if (process.env.ADMIN_PWD === req.body) {
    res.status(200).send("Successfully authenticated.");
    cookies.set("password", req.body);
    return;
  }
  res.status(400).send("Wrong password.");
  return;
};
