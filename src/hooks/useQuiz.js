import { useState, useEffect } from "react";
import fallbackQuestions from "../data/questions.json";
import {
  fetchQuestions,
  shuffleArray,
  TIME_PER_QUESTION,
} from "../utils/quizUtils";

function useQuiz() {
  // ----- State -----
  // screen: "start" | "loading" | "error" | "empty" | "quiz" | "result"
  const [screen, setScreen] = useState("start");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  // ----- Values calculated from state -----
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const hasAnswered = selectedAnswer !== null;
  const isTimeUp = timeLeft === 0;
  const isQuestionLocked = hasAnswered || isTimeUp;

  const answeredCount = currentQuestionIndex + (isQuestionLocked ? 1 : 0);
  const progressPercentage =
    totalQuestions === 0 ? 0 : Math.round((answeredCount / totalQuestions) * 100);

  // ----- Effect 1: API se questions fetch karo -----
  useEffect(() => {
    if (screen !== "loading") return;

    const controller = new AbortController();

    async function loadQuestions() {
      try {
        const loadedQuestions = await fetchQuestions(controller.signal);

        if (loadedQuestions.length === 0) {
          setScreen("empty");
          return;
        }

        setQuestions(loadedQuestions);
        setScreen("quiz");
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Failed to load questions:", error);
        setScreen("error");
      }
    }

    loadQuestions();

    return () => controller.abort();
  }, [screen]);

  // ----- Effect 2: har question ka countdown timer -----
  useEffect(() => {
    if (screen !== "quiz" || isQuestionLocked) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [screen, currentQuestionIndex, isQuestionLocked]);

  // ----- Event handlers -----
  // Naya game shuru karta hai (Start, Try Again aur Restart Quiz teeno yahi use karte hain)
  function handleStart() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(TIME_PER_QUESTION);
    setScreen("loading");
  }

  // API fail ho to local JSON se khelo
  function handleUseOfflineQuestions() {
    setQuestions(shuffleArray(fallbackQuestions));
    setScreen("quiz");
  }

  function handleSelectAnswer(answer) {
    if (isQuestionLocked) return;

    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  function handleNext() {
    if (isLastQuestion) {
      setScreen("result");
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setTimeLeft(TIME_PER_QUESTION);
  }

  // Start Screen par wapas (pehle iska naam handleRestart tha)
  function handleGoHome() {
    setScreen("start");
  }

  // ----- Bahar wale (App) ko jo chahiye wo return karo -----
  return {
    // state aur calculated values
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
    // handlers
    handleStart,
    handleUseOfflineQuestions,
    handleSelectAnswer,
    handleNext,
    handleGoHome,
  };
}

export default useQuiz;