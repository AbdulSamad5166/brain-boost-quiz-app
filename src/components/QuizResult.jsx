import Button from "./Button";
import { getPerformance } from "../utils/quizUtils";

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function QuizResult({ score, totalQuestions, onRestart, onGoHome }) {
  // ----- Derived values (state ki zarurat nahi) -----
  const incorrectCount = totalQuestions - score;
  const accuracy =
    totalQuestions === 0 ? 0 : Math.round((score / totalQuestions) * 100);
  const performance = getPerformance(accuracy);
  const ringOffset = RING_CIRCUMFERENCE * (1 - accuracy / 100);

  return (
    <section className={`card result-screen result-${performance.level}`}>
      <h1>Quiz Completed!</h1>

      {/* Visual: animated score ring */}
      <div className="result-ring-wrapper">
        <svg
          viewBox="0 0 120 120"
          className="result-ring-svg"
          role="img"
          aria-label={`Accuracy ${accuracy} percent`}
        >
          <circle className="result-ring-track" cx="60" cy="60" r={RING_RADIUS} />
          <circle
            className="result-ring-fill"
            cx="60"
            cy="60"
            r={RING_RADIUS}
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={ringOffset}
            style={{ "--ring-length": RING_CIRCUMFERENCE }}
          />
        </svg>

        <div className="result-ring-text">
          <span className="result-score">
            {score} / {totalQuestions}
          </span>
          <span className="result-score-label">Score</span>
        </div>
      </div>

      <h2 className="result-title">
        {performance.emoji} {performance.title}
      </h2>
      <p className="result-message">{performance.message}</p>

      {/* Stats */}
      <div className="result-stats">
        <div className="stat-box stat-correct">
          <span className="stat-value">{score}</span>
          <span className="stat-label">Correct</span>
        </div>
        <div className="stat-box stat-incorrect">
          <span className="stat-value">{incorrectCount}</span>
          <span className="stat-label">Incorrect</span>
        </div>
        <div className="stat-box stat-accuracy">
          <span className="stat-value">{accuracy}%</span>
          <span className="stat-label">Accuracy</span>
        </div>
      </div>

      <div className="message-actions">
        <Button onClick={onRestart}>🔄 Restart Quiz</Button>
        <Button variant="secondary" onClick={onGoHome}>
          Back to Home
        </Button>
      </div>
    </section>
  );
}

export default QuizResult;