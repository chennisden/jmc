const path = require("path")
require("dotenv").config({
    path: path.resolve(".env.local"),
})
const MongoClient = require("mongodb").MongoClient

async function mongo() {
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const jmcDB = client.db(process.env.MONGODB_DB)
    var version = process.argv[2];
    if (!version) {
        console.log("Pass in the test version as an argument")
        return;
    }
    const submissions = await jmcDB
        .collection("submissions" + version)
        .find({ verified: true })
        .toArray();
    const stats = [];

    for (let i = 0; i < 25; i++) {
        stats[i] = 0;
    }

    submissions.forEach((submission) => {
        for (let i = 0; i < 25; i++) {
            if (submission.answers[i] === process.env[`NEXT_PUBLIC_JMC${version}_KEY`].charAt(i)) {
                stats[i]++;
            }
        }
    })

    let result = "";

    for (let i = 0; i < 25; i++) {
        result += `${i + 1} ${stats[i]}\n`
    }

    console.log(result)
}

async function script() {
    await mongo();
    process.exit();
}

script();