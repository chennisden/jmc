import Cookies from "cookies";

export default async (req, res) => {
  const request = JSON.parse(req.body);
  const cookies = new Cookies(req, res);
  if (request.action === "cookie") {
    const password = cookies.get("password");
    if (password && password === process.env.ADMIN_PWD) {
      res.status(200).send("Successfully authenticated.");
      return;
    }
    res.status(400).send("No cookie or wrong cookie");
    return;
  }
  if (request.action === "set") {
    if (process.env.ADMIN_PWD === request.password) {
      cookies.set("password", request.password, { path: "/" });
      res.status(200).send("Successfully authenticated.");
      return;
    }
    res.status(400).send("Wrong password.");
    return;
  }
  res.status(500).send("Invalid operation.");
  return;
};
