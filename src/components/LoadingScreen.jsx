function LoadingScreen() {
  return (
    <section className="card status-screen" role="status" aria-live="polite">
      <div className="spinner" />
      <h1>Loading Quiz...</h1>
      <p className="status-message">Fetching fresh questions for you.</p>
    </section>
  );
}

export default LoadingScreen;