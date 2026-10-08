function MessageScreen({ icon, title, message, children }) {
  return (
    <section className="card status-screen">
      <div className="status-icon">{icon}</div>
      <h1>{title}</h1>
      <p className="status-message">{message}</p>
      <div className="message-actions">{children}</div>
    </section>
  );
}

export default MessageScreen;