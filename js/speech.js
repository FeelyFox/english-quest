// Synthèse vocale (écoute) et reconnaissance vocale (prononciation). Fonctionne dans Chrome Android/desktop et Safari.
const Speech = (() => {
  const synth = window.speechSynthesis;
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let voices = [];

  function loadVoices() { voices = synth ? synth.getVoices() : []; }
  if (synth) {
    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }

  function pickVoice(lang) {
    return voices.find((v) => v.lang.replace("_", "-") === lang && /natural|premium|enhanced|google/i.test(v.name))
      || voices.find((v) => v.lang.replace("_", "-") === lang)
      || voices.find((v) => v.lang.startsWith("en"));
  }

  function say(text, rateOverride) {
    if (!synth || !text) return;
    synth.cancel();
    const { accent, rate } = Store.state.settings;
    const u = new SpeechSynthesisUtterance(text.replace(/…/g, "..."));
    u.lang = accent;
    u.rate = rateOverride || rate;
    const v = pickVoice(accent);
    if (v) u.voice = v;
    synth.speak(u);
  }

  const canListen = !!Recognition;

  function listen(onResult, onEnd) {
    if (!Recognition) return null;
    const r = new Recognition();
    r.lang = Store.state.settings.accent;
    r.interimResults = false;
    r.maxAlternatives = 3;
    r.onresult = (e) => onResult([...e.results[0]].map((alt) => alt.transcript));
    r.onerror = () => onEnd && onEnd();
    r.onend = () => onEnd && onEnd();
    r.start();
    return r;
  }

  return { say, listen, canListen, available: !!synth };
})();
