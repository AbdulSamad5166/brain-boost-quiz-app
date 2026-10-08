function AnswerOption({ letter, text, status, onClick }) {
  const isDisabled = status !== "default"; // locked once the question is answered

  return (
    <button
      className={`answer-option ${status}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      <span className="answer-letter">{letter}</span>
      <span className="answer-text">{text}</span>

      {status === "correct" && <span className="answer-icon">✓</span>}
      {status === "incorrect" && <span className="answer-icon">✗</span>}
    </button>
  );
}

export default AnswerOption;