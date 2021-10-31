import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [submissions, setSubmissions] = useState(undefined);
  let index = 0;
  const getSubmissions = async () => {
    const res = await fetch("/api/getSubmissions", {
      method: "POST",
      body: JSON.stringify({
        version: 12,
      }),
    });
    setSubmissions(JSON.parse(await res.text()));
  };
  useEffect(() => {
    getSubmissions();
  }, []);
  return (
    <div className="mx-8 my-8 space-y-2">
      <h1>JMC 12 Leaderboard</h1>
      <h2>If you don't see your score...</h2>
      <p>
        Scores need to be manually approved by the JMC team. This is in order to
        prevent harrassment of other users, JMC staff, etc.
      </p>
      <p>
        Please PM dchenmathcounts, skyscraper, vvluo, insertionsort on the AoPS
        website indicating that you have submitted the JMC.
      </p>
      <p>
        Alternatively, email{" "}
        <a
          href="mailto:dchen@dennisc.net"
          className="text-blue-500 hover:text-blue-400"
        >
          dchen@dennisc.net{" "}
        </a>
        to indicate that you have submitted the JMC, along with the username you
        used.
      </p>
      <h2>Leaderboard</h2>
      <div className="grid grid-cols-3">
        <div>Ranking</div>
        <div>Username</div>
        <div>Score</div>
        {submissions &&
          submissions.map((submission) => {
            if (submission.verified) {
              index++;
              return (
                <>
                  <div>{index}</div>
                  <div>
                    {submission.show ? submission.username : "Anonymous"}
                  </div>
                  <div>{submission.score}</div>
                </>
              );
            }
          })}
      </div>
    </div>
  );
}
