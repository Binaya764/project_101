const json = async (url, opts) => {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...opts });
  if (!res.ok && res.status !== 400) throw new Error('Request failed');
  return res.json();
};

export const getSteps = () => json('/api/tutorial/steps');
export const validate = (stepId, action) =>
  json('/api/tutorial/validate', { method: 'POST', body: JSON.stringify({ stepId, action }) });
export const getLamps = () => json('/api/lamps');
export const addLamp = (name, reflection) =>
  json('/api/lamps', { method: 'POST', body: JSON.stringify({ name, reflection }) });
