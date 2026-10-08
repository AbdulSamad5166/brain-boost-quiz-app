import AnswerOption from "./AnswerOption";
import { getAnswerStatus } from "../utils/quizUtils"; // CHANGED: ab yahan define nahi, import hota hai

const answerLetters = ["A", "B", "C", "D"];

function QuestionCard({ question, selectedAnswer, isTimeUp, onSelectAnswer }) {
  const hasAnswered = selectedAnswer !== null;
  const isLocked = hasAnswered || isTimeUp;
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="question-card">
      <span className="category-badge">
        {question.icon} {question.category}
      </span>

      <h2 className="question-text">{question.question}</h2>

      <div className="answer-list">
        {question.options.map((option, index) => (
          <AnswerOption
            key={option}
            letter={answerLetters[index]}
            text={option}
            status={getAnswerStatus(
              option,
              question.correctAnswer,
              selectedAnswer,
              isLocked
            )}
            onClick={() => onSelectAnswer(option)}
          />
        ))}
      </div>

      {hasAnswered && (
        <p className={`feedback ${isCorrect ? "feedback-correct" : "feedback-incorrect"}`}>
          {isCorrect
            ? "🎉 Correct! Well done."
            : `❌ Not quite. The correct answer is ${question.correctAnswer}.`}
        </p>
      )}

      {isTimeUp && !hasAnswered && (
        <p className="feedback feedback-timeup">
          ⏰ Time's up! The correct answer is {question.correctAnswer}.
        </p>
      )}
    </div>
  );
}

export default QuestionCard;