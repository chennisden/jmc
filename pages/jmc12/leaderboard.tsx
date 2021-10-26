import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [submissions, setSubmissions] = useState(undefined);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/getSubmissions", {
        method: "POST",
        body: JSON.stringify({
          version: 12,
        }),
      });
      setSubmissions(JSON.parse(await res.text()));
    })();
  }, []);
  return (
    <div className="mx-8 my-8 space-y-2">
      <h1>JMC 12 Leaderboard</h1>
      <div className="grid grid-cols-2">
        <div>Username</div>
        <div>Score</div>
        {submissions &&
          submissions.map((submission) => {
            return (
              <>
                <div>{submission.show ? submission.username : "Anonymous"}</div>
                <div>{submission.score}</div>
              </>
            );
          })}
      </div>
    </div>
  );
}
