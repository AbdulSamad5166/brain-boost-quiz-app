function QuizHeader({ currentQuestion, totalQuestions, score }) {
  return (
    <header className="quiz-header">
      <span className="quiz-header-title">🧠 Brain Boost Quiz</span>

      <div className="quiz-header-stats">
        <span className="question-counter">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="score-badge">⭐ Score: {score}</span>
      </div>
    </header>
  );
}

export default QuizHeader;