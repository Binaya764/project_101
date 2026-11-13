import { useEffect, useState } from 'react';
import { getSteps, validate, getLamps, addLamp } from './api';
import PlayingCard from '../src/components/PlayingCard';
import MemoryWall from '../src/components/MemoryWall';
import CompletionModal from '../src/components/CompletionModal';

export default function App() {
  const [steps, setSteps] = useState([]);
  const [i, setI] = useState(0);
  const [solved, setSolved] = useState(false);
  const [played, setPlayed] = useState(null);
  const [msg, setMsg] = useState({ text: '', ok: null });
  const [shake, setShake] = useState(null);
  const [lamps, setLamps] = useState([]);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getSteps(), getLamps()])
      .then(([s, l]) => { setSteps(s); setLamps(l); })
      .catch(() => setError('Could not reach the server. Is the API running?'));
  }, []);

  const step = steps[i];
  const last = i === steps.length - 1;

  const attempt = async (action, key) => {
    if (solved) return;
    const r = await validate(step.id, action);
    setMsg({ text: r.message, ok: r.valid });
    if (r.valid) {
      setSolved(true);
      if (step.type === 'play') setPlayed(key);
      if (last) setTimeout(() => setModal(true), 900);
    } else {
      setShake(key);
      setTimeout(() => setShake(null), 400);
    }
  };

  const next = () => {
    if (last) return setModal(true);
    setI(i + 1); setSolved(false); setPlayed(null); setMsg({ text: '', ok: null });
  };
  const restart = () => { setI(0); setSolved(false); setPlayed(null); setMsg({ text: '', ok: null }); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const light = async (name, reflection) => {
    const lamp = await addLamp(name, reflection);
    setLamps((l) => [lamp, ...l]);
    setModal(false);
    document.querySelector('.wall')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (error) return <div className="wrap"><p className="msg bad">{error}</p></div>;
  if (!step) return <div className="wrap"><p className="sub">Lighting the lamps…</p></div>;

  const lit = i + (solved ? 1 : 0);
  return (
    <div className="wrap">
      <div className="garland" aria-hidden="true">🌼🏵️🌼🏵️🌼🏵️🌼🏵️🌼🏵️🌼🏵️🌼🏵️🌼🏵️🌼🏵️🌼🏵️🌼🏵️</div>
      <header>
        <h1>Taas Tihar</h1>
        <p>Learn Call Break in four quick hands. Finish, and light your diyo on the memory wall.</p>
        <div className="lamps" aria-label="Progress">
          {steps.map((s, k) => <span key={s.id} className={`lamp ${k < lit ? 'on' : ''}`}>🪔</span>)}
        </div>
      </header>

      <div className="tip"><b>Dai’s Rulebook Tip:</b> {step.tip}</div>

      <div className="table">
        <div style={{ textAlign: 'center' }}><span className="hukum">Hukum (trump): ♠ Spades</span></div>
        <div className="trick">
          {step.table.map((t) => (
            <div className="slot" key={t.card}><PlayingCard card={t.card} pop />{t.label}</div>
          ))}
          {played && <div className="slot"><PlayingCard card={played} pop />You</div>}
        </div>

        <div className="hand">
          {step.hand.filter((c) => c !== played).map((c) => (
            <PlayingCard key={c} card={c} shake={shake === c}
              onClick={step.type === 'play' && !solved ? (card) => attempt(card, card) : undefined} />
          ))}
        </div>

        {step.type === 'bid' && (
          <div className="bids">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} className={`bid ${shake === n ? 'shake' : ''}`} disabled={solved} onClick={() => attempt(`BID_${n}`, n)}>Call {n}</button>
            ))}
          </div>
        )}

        <div className={`msg ${msg.ok === null ? '' : msg.ok ? 'good' : 'bad'}`} role="status" aria-live="polite">
          {msg.text || (step.type === 'bid' ? 'Pick your call.' : 'Your turn. Choose a card.')}
        </div>
      </div>

      <div className="actions">
        {solved && <button className="cta" onClick={next}>{last ? 'Light my diyo 🪔' : 'Next hand'}</button>}
        {solved && last && <button className="link" onClick={restart}>Play again</button>}
      </div>
      <div className="dots">Hand {i + 1} of {steps.length}: {step.title}</div>

      <MemoryWall lamps={lamps} />
      <footer>Happy Tihar. Jai Chhathi Maiya. 🪔</footer>

      {modal && <CompletionModal onClose={() => setModal(false)} onSubmit={light} />}
    </div>
  );
}
