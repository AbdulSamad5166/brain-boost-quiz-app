const API_URL = "https://opentdb.com/api.php?amount=10";
export const TIME_PER_QUESTION = 15;
// Category ke naam se icon chunne ke liye (pehla match jeetta hai)
const CATEGORY_ICONS = [
  { keyword: "computers", icon: "💻" },
  { keyword: "science", icon: "🔬" },
  { keyword: "geography", icon: "🌍" },
  { keyword: "history", icon: "🏛️" },
  { keyword: "animals", icon: "🐾" },
  { keyword: "sports", icon: "⚽" },
  { keyword: "music", icon: "🎵" },
  { keyword: "film", icon: "🎬" },
  { keyword: "television", icon: "📺" },
  { keyword: "video games", icon: "🎮" },
  { keyword: "mythology", icon: "⚡" },
  { keyword: "vehicles", icon: "🚗" },
  { keyword: "art", icon: "🎨" },
];

// Array ko randomly mix karta hai (Fisher-Yates). Original array ko nahi badalta.
export function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }
  return copy;
}

// "&quot;Hello&quot;" jaise HTML codes ko normal text me badalta hai
function decodeHtml(text) {
  const parsed = new DOMParser().parseFromString(text, "text/html");
  return parsed.documentElement.textContent;
}

function getCategoryIcon(category) {
  const name = category.toLowerCase();
  const match = CATEGORY_ICONS.find((item) => name.includes(item.keyword));
  return match ? match.icon : "🧠"; // koi match na mile to default icon
}

// API ka ek question lo, hamare app ke format me badal do
function formatQuestion(apiQuestion, index) {
  const category = decodeHtml(apiQuestion.category);
  const correctAnswer = decodeHtml(apiQuestion.correct_answer);
  const incorrectAnswers = apiQuestion.incorrect_answers.map(decodeHtml);

  return {
    id: index + 1,
    category,
    icon: getCategoryIcon(category),
    question: decodeHtml(apiQuestion.question),
    options: shuffleArray([...incorrectAnswers, correctAnswer]),
    correctAnswer,
  };
}

// Main function: API se questions laata hai.
// Kamyab hone par questions ka array deta hai, warna error throw karta hai.
export async function fetchQuestions(signal) {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (data.response_code === 1) {
    return []; // API ke paas questions hi nahi: empty state
  }

  if (data.response_code !== 0) {
    throw new Error(`API error, response code: ${data.response_code}`);
  }

  return data.results.map(formatQuestion);
}

// Percentage dekh kar message, emoji aur level decide karta hai
export function getPerformance(percentage) {
  if (percentage >= 90) {
    return {
      level: "excellent",
      emoji: "🏆",
      title: "Outstanding!",
      message: "You're a true quiz master. Amazing work!",
    };
  }

  if (percentage >= 70) {
    return {
      level: "great",
      emoji: "🎉",
      title: "Great job!",
      message: "You really know your stuff. Just a little more for perfection!",
    };
  }

  if (percentage >= 50) {
    return {
      level: "good",
      emoji: "👍",
      title: "Good effort!",
      message: "Solid attempt. Play again to improve your score.",
    };
  }

  return {
    level: "low",
    emoji: "📚",
    title: "Keep practicing!",
    message: "Every expert started somewhere. Try again and beat your score!",
  };
}


// Ek answer button ka status batata hai: "default" | "correct" | "incorrect" | "dimmed"
export function getAnswerStatus(option, correctAnswer, selectedAnswer, isLocked) {
  if (!isLocked) return "default";
  if (option === correctAnswer) return "correct";
  if (option === selectedAnswer) return "incorrect";
  return "dimmed";
}