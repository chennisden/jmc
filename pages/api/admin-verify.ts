export default async (req, res) => {
    if (process.env.ADMIN_PWD === req.body) {
        res.status(200).send("Successfully authenticated.")
    } else {
        res.status(400).send("Wrong password.")
    }
};
