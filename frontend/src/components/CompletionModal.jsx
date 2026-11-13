import { useState } from 'react';

export default function CompletionModal({ onSubmit, onClose }) {
  const [name, setName] = useState('');
  const [reflection, setReflection] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    await onSubmit(name, reflection);
    setBusy(false);
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>You know the game now!</h2>
        <p>Add your name and a memory of playing cards with family. We’ll light a diyo for you.</p>
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={30} placeholder="Your name" />
        <textarea value={reflection} onChange={(e) => setReflection(e.target.value)} rows={3} maxLength={140} placeholder="A card night I remember…" />
        <button className="cta" style={{ width: '100%' }} disabled={busy} onClick={submit}>
          {busy ? 'Lighting…' : 'Light my diyo'}
        </button>
        <button className="link" onClick={onClose}>Not now</button>
      </div>
    </div>
  );
}
