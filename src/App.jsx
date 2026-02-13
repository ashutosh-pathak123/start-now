import { useState } from "react";
import "./App.css";

function App() {
  const [questionId, setQuestionId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    if (!questionId) return alert("Question ID daalo");

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${questionId}`
    );
    const data = await res.json();
    setQuestion(data.title || "No question found");
  };

  const handleAnswer = async () => {
    if (!answer) return alert("Answer likho");

    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, answer }),
    });

    alert("Answer submitted ✅");
    setAnswer("");
  };

  return (
    <div className="app-wrapper">
      <div className="top-bar">
        <input
          type="text"
          placeholder="Enter QuestionId here..."
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {question && <div className="question-text">{question}</div>}

      <textarea
        className="answer-box"
        placeholder="Write your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <br />

      <button className="answer-btn" onClick={handleAnswer}>
        Answer
      </button>
    </div>
  );
}

export default App;