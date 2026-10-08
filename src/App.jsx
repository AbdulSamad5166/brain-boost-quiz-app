import StartScreen from "./components/StartScreen";
import QuizHeader from "./components/QuizHeader";
import ProgressBar from "./components/ProgressBar";
import Timer from "./components/Timer";
import QuestionCard from "./components/QuestionCard";
import Button from "./components/Button";
import LoadingScreen from "./components/LoadingScreen";
import MessageScreen from "./components/MessageScreen";
import QuizResult from "./components/QuizResult";
import useQuiz from "./hooks/useQuiz";
import { TIME_PER_QUESTION } from "./utils/quizUtils";
import "./App.css";

function App() {
  // Saari quiz logic ab hook me hai. App ko sirf wo cheezein milti hain jo dikhani hain.
  const {
    screen,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    score,
    timeLeft,
    isTimeUp,
    isQuestionLocked,
    isLastQuestion,
    progressPercentage,
    handleStart,
    handleUseOfflineQuestions,
    handleSelectAnswer,
    handleNext,
    handleGoHome,
  } = useQuiz();

  // ----- Conditional rendering: kaun si screen dikhani hai -----
  if (screen === "start") {
    return <StartScreen onStart={handleStart} />;
  }

  if (screen === "loading") {
    return <LoadingScreen />;
  }

  if (screen === "error") {
    return (
      <MessageScreen
        icon="⚠️"
        title="Unable to load quiz questions."
        message="Check your internet connection and try again, or play with the built-in offline questions."
      >
        <Button onClick={handleStart}>Try Again</Button>
        <Button variant="secondary" onClick={handleUseOfflineQuestions}>
          Play Offline Questions
        </Button>
      </MessageScreen>
    );
  }

  if (screen === "empty") {
    return (
      <MessageScreen
        icon="📭"
        title="No quiz questions available."
        message="We couldn't find any questions right now. Please restart and try again."
      >
        <Button onClick={handleGoHome}>Restart</Button>
      </MessageScreen>
    );
  }

  if (screen === "result") {
    return (
      <QuizResult
        score={score}
        totalQuestions={totalQuestions}
        onRestart={handleStart}
        onGoHome={handleGoHome}
      />
    );
  }

  // Warna: quiz screen
  return (
    <section className="card quiz-screen">
      <QuizHeader
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        score={score}
      />

      <ProgressBar percentage={progressPercentage} />

      <Timer timeLeft={timeLeft} totalTime={TIME_PER_QUESTION} />

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        isTimeUp={isTimeUp}
        onSelectAnswer={handleSelectAnswer}
      />

      {isQuestionLocked && (
        <div className="quiz-actions">
          <Button onClick={handleNext}>
            {isLastQuestion ? "Finish Quiz" : "Next Question →"}
          </Button>
        </div>
      )}
    </section>
  );
}

export default App;