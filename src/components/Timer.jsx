const RING_RADIUS = 20;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function Timer({ timeLeft, totalTime }) {
  const fractionLeft = timeLeft / totalTime; // 1 → 0 as time runs out
  const dashOffset = RING_CIRCUMFERENCE * (1 - fractionLeft);
  const isRunningOut = timeLeft <= 5;

  return (
    <div className={`timer ${isRunningOut ? "timer-danger" : ""}`}>
      <div className="timer-circle">
        <svg viewBox="0 0 48 48" className="timer-svg">
          <circle className="timer-track" cx="24" cy="24" r={RING_RADIUS} />
          <circle
            className="timer-ring"
            cx="24"
            cy="24"
            r={RING_RADIUS}
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <span className="timer-number">{timeLeft}</span>
      </div>

      <span className="timer-label">
        {timeLeft === 0 ? "Time's up!" : "seconds left"}
      </span>
    </div>
  );
}

export default Timer;