import Button from "./Button";

function StartScreen({ onStart }) {
  return (
    <section className="card start-screen">
      <div className="start-illustration">
        <svg viewBox="0 0 200 200" role="img" aria-label="Question mark illustration">
          <defs>
            <linearGradient id="bubbleGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill="url(#bubbleGradient)" />
          <text
            x="100"
            y="138"
            textAnchor="middle"
            fontSize="110"
            fontWeight="700"
            fill="white"
          >
            ?
          </text>
          <circle cx="30" cy="40" r="8" fill="#fbbf24" />
          <circle cx="175" cy="55" r="6" fill="#34d399" />
          <circle cx="165" cy="160" r="10" fill="#60a5fa" />
        </svg>
      </div>

      <h1>Brain Boost Quiz</h1>
      <p className="start-description">
        Test your general knowledge against the clock. Answer each question
        before time runs out and see how high you can score!
      </p>

      <ul className="quiz-info">
        <li>📝 10 Questions</li>
        <li>⏱️ 15 sec each</li>
        <li>⚡ Instant feedback</li>
      </ul>

      <Button onClick={onStart}>Start Quiz</Button>
    </section>
  );
}

export default StartScreen;