import { useEffect, useState } from "react";

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [submissions, setSubmissions] = useState(undefined);
  const [password, setPassword] = useState("");
  const [uuid, setUUID] = useState("");

  useEffect(() => {
    submitPassword("cookie");
  }, []);

  async function verify() {
    await fetch("/api/verify-submission", {
      method: "POST",
      body: JSON.stringify({
        version: 12,
        uuid,
      }),
    });
    viewSubmissions();
  }
  async function submitPassword(action) {
    const res = await fetch("/api/admin-verify", {
      method: "POST",
      body: JSON.stringify({ action, password }),
    });
    if (res.status === 200) {
      viewSubmissions();
      setAuth(true);
    }
  }

  const viewSubmissions = async () => {
    const res = await fetch("/api/getSubmissions", {
      method: "POST",
      body: JSON.stringify({
        version: 12,
      }),
    });
    if (res.text) {
      setSubmissions(JSON.parse(await res.text()));
    }
  };
  return (
    <div className="mx-8 my-8 space-y-2">
      <h1>JMC 12 Admin Leaderboard</h1>
      {!auth ? (
        <>
          <h2>Enter Password</h2>
          <p>
            Enter the password provided to you by Dennis in order to access the
            admin leaderboard.
          </p>
          <div className="space-x-8">
            <input
              className="px-4 h-8 rounded-md ring-1 ring-gray-200 dark:ring-gray-800 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-900 autofill:bg-blue-100 dark:autofill:bg-gray-700"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button
              className="bg-blue-700 hover:bg-blue-600 active:bg-blue-800 rounded-md bg-opacity-90 text-gray-100 text-lg px-6 py-1.5"
              onClick={() => {
                submitPassword("set");
              }}
            >
              Authenticate
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>Verify Submission</h2>
          <input
            className="px-4 h-8 rounded-md ring-1 ring-gray-200 dark:ring-gray-800 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-900 autofill:bg-blue-100 dark:autofill:bg-gray-700"
            placeholder="UUID"
            onChange={(event) => {
              setUUID(event.target.value);
            }}
          />
          <button
            className="bg-blue-700 hover:bg-blue-600 active:bg-blue-800 rounded-md bg-opacity-90 text-gray-100 text-lg px-6 py-1.5"
            onClick={() => {
              verify();
            }}
          >
            Verify
          </button>
          <h2>Stats</h2>
          <div className="grid grid-cols-6">
            <div>UUID</div>
            <div>Username</div>
            <div>Verified</div>
            <div>Score</div>
            <div>Anonymous</div>
            <div>Answers Submitted</div>
            {submissions &&
              submissions.map((submission) => {
                return (
                  <>
                    <div>{submission._id}</div>
                    <div>{submission.username}</div>
                    <div>{submission.verified ? "Yes" : "No"}</div>
                    <div>{submission.score}</div>
                    <div>{!submission.show ? "Yes" : "No"}</div>
                    <div>{submission.answers}</div>
                  </>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
