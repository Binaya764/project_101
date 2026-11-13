export default function MemoryWall({ lamps }) {
  return (
    <section className="wall">
      <h2>Diyo Memory Wall</h2>
      <p className="sub">Every lamp is a card night remembered.</p>
      {lamps.length === 0 && <p className="sub">No lamps yet. Finish the tutorial to light the first one.</p>}
      <div className="grid">
        {lamps.map((l) => (
          <div className="diyo" key={l._id}>
            <div className="f">🪔</div>
            <b>{l.name}</b>
            <span>{l.reflection}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
