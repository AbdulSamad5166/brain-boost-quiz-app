function ProgressBar({ percentage }) {
  return (
    <div className="progress-wrapper">
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
      <span className="progress-label">{percentage}%</span>
    </div>
  );
}

export default ProgressBar;