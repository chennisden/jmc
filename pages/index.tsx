import { useState } from "react";
import router from "next/router";

export default function Index() {
  const answerKey = "AAAAAAAAAAAAAAAAAAAAAAAAA";
  const [answers, rawSetAnswers] = useState([]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  function setAnswers(questionNumber, value) {
    const updatedAnswers = answers;
    updatedAnswers[questionNumber] = value;
    rawSetAnswers(updatedAnswers);
  }
  function Input({ questionNumber }) {
    return (
      <div>
        <p>Question {questionNumber + 1}</p>
        <input
          className="px-4 h-8 rounded-md ring-1 ring-gray-200 dark:ring-gray-800 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-900 autofill:bg-blue-100 dark:autofill:bg-gray-700"
          value={answers[questionNumber]}
          onChange={(event) => {
            setAnswers(questionNumber, event.target.value);
          }}
        />
      </div>
    );
  }
  function computeScore() {
    let score = 0;
    for (let i = 0; i < 25; i++) {
      if (answers[i] === answerKey.charAt(i)) {
        score += 6;
      } else if (answers[i] === "X") {
        score += 1.5;
      }
    }
    return score;
  }
  function Submit() {
    if (!username) {
      setError("You must input your username.");
      return;
    }
    setError("");
    setSubmitted(true);

    for (let i = 0; i < 25; i++) {
      if (!answers[i]) {
        answers[i] = "X";
      }
    }

    const score = computeScore();

    fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify({ username, answers, score }),
    });
    return;
  }
  function ShowUsername(show) {
    fetch("/api/showUsername", {
      method: "POST",
      body: JSON.stringify({ show, username }),
    });
  }
  function ScoreComponent() {
    if (!submitted) {
      return null;
    }
    return (
      <div>
        <p>The answers you submitted were (X indicates blank):</p>
        <div className="w-20 grid grid-cols-5">
          {Array.from(Array(25), (e, index) => {
            const answer = answers[index];
            if (answer && answer === answerKey.charAt(index)) {
              return (
                <div className="text-green-600" key={index}>
                  {answer}
                </div>
              );
            }
            if (answer != "X") {
              return (
                <div className="text-red-600" key={index}>
                  {answer}
                </div>
              );
            }
            return (
              <div className="text-yellow-600" key={index}>
                X
              </div>
            );
          })}
        </div>
        <p>Your score is {computeScore()}.</p>
        <p>
          Would you like your username shown on the leaderboards? (If you click
          "No," you will be anonymous, but your score will still be on the
          leaderboards.)
        </p>
        <div className="space-x-4">
          <button
            className="bg-blue-700 hover:bg-blue-600 active:bg-blue-800 rounded-md bg-opacity-90 text-gray-100 text-lg px-6 py-1.5"
            onClick={() => {
              ShowUsername(true);
              router.push("/leaderboard");
            }}
          >
            Yes
          </button>
          <button
            className="bg-blue-700 hover:bg-blue-600 active:bg-blue-800 rounded-md bg-opacity-90 text-gray-100 text-lg px-6 py-1.5"
            onClick={() => {
              ShowUsername(false);
              router.push("/leaderboard");
            }}
          >
            No
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-8 my-8 space-y-2">
      <h1>JMC Submission Portal</h1>
      <h2>Instructions</h2>
      <p>
        For each field, input a letter A-E or leave it blank. If you input
        anything else it will be marked wrong.
      </p>
      <p>Make sure all inputted answers are capitalized.</p>
      <p>
        Input your AoPS username in the field below. If you don't have an AoPS
        account, then please make up some username and indicate that it is not
        an AoPS username. For instance, "dennisc (no AoPS account)" would work.
      </p>
      <input
        className="px-4 h-8 rounded-md ring-1 ring-gray-200 dark:ring-gray-800 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-900 autofill:bg-blue-100 dark:autofill:bg-gray-700"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <h2>Input Answers</h2>
      {Array.from(Array(25), (e, i) => {
        return <Input key={i + 1} questionNumber={i} />;
      })}
      {!submitted && (
        <button
          className="bg-blue-700 hover:bg-blue-600 active:bg-blue-800 rounded-md bg-opacity-90 text-gray-100 text-lg px-6 py-1.5"
          onClick={() => {
            Submit();
          }}
        >
          Submit
        </button>
      )}
      <ScoreComponent />
      <div className="text-red-500">{error}</div>
    </div>
  );
}
