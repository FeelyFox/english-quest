// Leçons supplémentaires A2 → C1. Même format que grammar.js.
window.DATA = window.DATA || {};

DATA.grammar.push(
  // ============================== A2 ==============================
  {
    id: "a2-be-there", level: "A2", kind: "grammar", title: "be, have got, there is / there are",
    lesson: `
      <table>
        <tr><th>be</th><td>I <b>am</b> · you/we/they <b>are</b> · he/she/it <b>is</b></td></tr>
        <tr><th>have got</th><td>I <b>have got</b> a laptop · she <b>has got</b> a cat (= posséder, très britannique)</td></tr>
        <tr><th>there is / are</th><td>= il y a. <b>There is</b> a bug. <b>There are</b> two bugs.</td></tr>
      </table>
      <h3>⚠️ Pièges francophones</h3>
      <div class="ex"><span class="bad">I have 30 years</span> → <span class="good">I <b>am</b> 30 (years old)</span></div>
      <div class="ex"><span class="bad">I have cold / hungry</span> → <span class="good">I <b>am</b> cold / hungry</span></div>
      <div class="ex"><span class="bad">It has a problem</span> (il y a) → <span class="good"><b>There is</b> a problem</span></div>`,
    ex: [
      { q: "I ___ 32 years old.", a: "am|'m", e: "L'âge se dit avec be : I am 32." },
      { q: "___ a problem with the server. (il y a)", a: "There is|There's", e: "il y a + singulier → there is." },
      { q: "___ three bugs left in the backlog. (il y a)", a: "There are", e: "il y a + pluriel → there are." },
      { q: "She ___ a new laptop. (possède)", a: "has got|'s got|has", e: "Possession : has got (UK) ou has." },
      { q: "I'm sorry, I ___ hungry, let's have lunch.", a: "am|'m", e: "faim, froid, soif → be (I'm hungry)." },
      { q: "___ there a meeting room free?", a: "Is", e: "Question : Is there…?" },
      { q: "They ___ in the meeting room.", a: "are|'re", e: "they → are." },
      { q: "There ___ any coffee left.", a: "isn't|is not", e: "Négation : there isn't any…" }
    ]
  },
  {
    id: "a2-past-simple", level: "A2", kind: "conj", title: "Le past simple (prétérit)",
    lesson: `
      <p>Action terminée dans le passé. Verbes réguliers : <b>+ed</b> (worked, played, fixed). Irréguliers : à apprendre (went, saw, made…) — voir le module Verbes irréguliers.</p>
      <table>
        <tr><th>affirmatif</th><td>I <b>fixed</b> the bug.</td></tr>
        <tr><th>négatif</th><td>I <b>didn't fix</b> the bug. (didn't + base verbale !)</td></tr>
        <tr><th>question</th><td><b>Did</b> you <b>fix</b> the bug?</td></tr>
      </table>
      <div class="ex"><span class="bad">I didn't went</span> → <span class="good">I didn't go</span> — <span class="bad">Did you saw?</span> → <span class="good">Did you see?</span></div>
      <p>Orthographe : stop → stop<b>ped</b>, try → tr<b>ied</b>, play → play<b>ed</b>.</p>`,
    ex: [
      { q: "I ___ (work) late yesterday.", a: "worked", e: "Régulier → +ed." },
      { q: "We ___ (go) to a restaurant after the release.", a: "went", e: "go → went (irrégulier)." },
      { q: "I ___ (not / see) your message.", a: "didn't see|did not see", e: "didn't + base verbale." },
      { q: "___ you finish the task yesterday?", a: "Did", e: "Question au passé → Did." },
      { q: "The build ___ (stop) after ten minutes.", a: "stopped", e: "stop → stopped (consonne doublée)." },
      { q: "She ___ (try) three times.", a: "tried", e: "try → tried." },
      { q: "Did you ___ (make) this level?", a: "make", e: "Après did → base verbale." },
      { q: "They ___ (buy) new dev kits last month.", a: "bought", e: "buy → bought." },
      { q: "He ___ (not / come) to the meeting.", a: "didn't come|did not come", e: "didn't + base." }
    ]
  },
  {
    id: "a2-can", level: "A2", kind: "grammar", title: "can / could : capacité et demande",
    lesson: `
      <ul>
        <li><b>can</b> + base verbale : savoir/pouvoir faire. <i>I <b>can</b> code in C++.</i></li>
        <li><b>can't</b> : ne pas pouvoir. <i>I <b>can't</b> open the file.</i></li>
        <li><b>could</b> : passé de can, ou demande plus polie. <i><b>Could</b> you help me?</i></li>
      </ul>
      <div class="ex"><span class="bad">I can to come</span> → <span class="good">I can come</span> · <span class="bad">She cans</span> → <span class="good">She can</span></div>`,
    ex: [
      { q: "I ___ speak Spanish, but not very well.", a: "can", e: "Capacité → can." },
      { q: "I ___ open the file, it's corrupted.", a: "can't|cannot", e: "Impossibilité → can't." },
      { q: "___ you help me, please? (poli)", a: "Could|Can", e: "Demande polie → Could you…?" },
      { q: "When I was a child, I ___ swim very fast.", a: "could", e: "Capacité passée → could." },
      { q: "She can ___ (code) in C++ and Python.", a: "code", e: "can + base verbale, sans to." },
      { q: "___ I ask you a question?", a: "Can|Could|May", e: "Demander la permission : Can / Could I…?" },
      { q: "I couldn't ___ (find) the meeting room.", a: "find", e: "couldn't + base." },
      { q: "He ___ come tomorrow, he's ill.", a: "can't|cannot", e: "Impossibilité → can't." }
    ]
  },
  {
    id: "a2-some-any", level: "A2", kind: "grammar", title: "some / any / no",
    lesson: `
      <table>
        <tr><th>some</th><td>phrases affirmatives, offres et demandes</td><td>I've got <b>some</b> questions. Would you like <b>some</b> coffee?</td></tr>
        <tr><th>any</th><td>négations et questions</td><td>I don't have <b>any</b> time. Are there <b>any</b> bugs?</td></tr>
        <tr><th>no</th><td>= not any</td><td>There are <b>no</b> bugs.</td></tr>
      </table>
      <p>Composés : something / anything / nothing, someone / anyone / no one.</p>`,
    ex: [
      { q: "I have ___ questions about the task.", a: "some", e: "Affirmatif → some." },
      { q: "Do you have ___ questions?", a: "any", e: "Question → any." },
      { q: "I don't have ___ time today.", a: "any", e: "Négation → any." },
      { q: "Would you like ___ tea?", a: "some", e: "Offre → some." },
      { q: "There are ___ bugs left! (aucun)", a: "no", e: "no = not any." },
      { q: "Is there ___ in the meeting room? (quelqu'un)", a: "anyone|anybody", e: "Question → anyone." },
      { q: "I didn't say ___. (rien)", a: "anything", e: "Négation → anything." },
      { q: "___ called you this morning. (quelqu'un)", a: "Someone|Somebody", e: "Affirmatif → someone." }
    ]
  },
  {
    id: "a2-pronouns", level: "A2", kind: "grammar", title: "Pronoms et possessifs",
    lesson: `
      <table>
        <tr><th>sujet</th><td>I, you, he, she, it, we, they</td></tr>
        <tr><th>complément</th><td>me, you, him, her, it, us, them</td></tr>
        <tr><th>adjectif possessif</th><td>my, your, <b>his</b> (à lui), <b>her</b> (à elle), its, our, their</td></tr>
        <tr><th>pronom possessif</th><td>mine, yours, his, hers, ours, theirs</td></tr>
      </table>
      <p>⚠️ Le possessif s'accorde avec le <b>possesseur</b>, pas avec l'objet :</p>
      <div class="ex">Sarah et son PC → <span class="good"><b>her</b> PC</span> · Tom et sa voiture → <span class="good"><b>his</b> car</span></div>
      <p>Possession avec 's : <i>Tom<b>'s</b> laptop</i>, <i>the players<b>'</b> feedback</i>.</p>`,
    ex: [
      { q: "Sarah forgot ___ laptop. (son)", a: "her", e: "Possesseur féminin → her." },
      { q: "Tom is in ___ car. (sa)", a: "his", e: "Possesseur masculin → his." },
      { q: "Can you send ___ the file? (moi)", a: "me", e: "Complément → me." },
      { q: "This desk isn't mine, it's ___. (à elle)", a: "hers", e: "Pronom possessif féminin → hers." },
      { q: "I talked to ___ yesterday. (eux)", a: "them", e: "Complément pluriel → them." },
      { q: "The studio changed ___ logo. (son)", a: "its", e: "Objet/entreprise → its (sans apostrophe)." },
      { q: "That's ___ problem, not ours. (leur)", a: "their", e: "their = leur." },
      { q: "Is this ___ coffee? (ton)", a: "your", e: "your = ton/ta/votre." }
    ]
  },
  {
    id: "a2-frequency", level: "A2", kind: "grammar", title: "Adverbes de fréquence et place des mots",
    lesson: `
      <p><b>always, usually, often, sometimes, rarely, never</b> se placent :</p>
      <ul>
        <li><b>avant</b> le verbe principal : <i>I <b>often</b> work from home.</i></li>
        <li><b>après</b> be : <i>He <b>is always</b> late.</i></li>
      </ul>
      <div class="ex"><span class="bad">I work often from home</span> → <span class="good">I often work from home</span></div>
      <p>Ordre de base : <b>sujet + verbe + complément</b>, on ne sépare pas le verbe de son complément :</p>
      <div class="ex"><span class="bad">I like very much this game</span> → <span class="good">I like this game very much</span></div>`,
    ex: [
      { q: "I ___ work from home on Fridays. (habituellement)", a: "usually", e: "Adverbe avant le verbe principal." },
      { q: "He is ___ late for stand-up. (toujours)", a: "always", e: "Après be." },
      { q: "We ___ have meetings on Mondays. (jamais)", a: "never", e: "never avant le verbe." },
      { q: "I like this game very ___.", a: "much", e: "very much à la fin, après le complément." },
      { q: "How ___ do you deploy? (souvent)", a: "often", e: "How often…? = à quelle fréquence ?" },
      { q: "She ___ forgets her badge. (parfois)", a: "sometimes", e: "sometimes avant le verbe (ou en début de phrase)." },
      { q: "The build is ___ broken on Monday mornings. (souvent)", a: "often", e: "Après be." },
      { q: "I ___ drink coffee after 4 pm. (rarement)", a: "rarely|seldom", e: "rarely avant le verbe." }
    ]
  },

  // ============================== B1 ==============================
  {
    id: "b1-past-continuous", level: "B1", kind: "conj", title: "Past continuous",
    lesson: `
      <p><b>was/were + -ing</b> : action en cours à un moment du passé, souvent interrompue par une action au past simple.</p>
      <div class="ex">I <b>was debugging</b> when the power <b>went</b> out.</div>
      <div class="ex">What <b>were</b> you <b>doing</b> at 3 pm?</div>
      <p><b>while</b> + past continuous, <b>when</b> + past simple (souvent).</p>`,
    ex: [
      { q: "I ___ (work) on the UI when the server crashed.", a: "was working", e: "Action en cours interrompue → was + -ing." },
      { q: "The server crashed while we ___ (test) the build.", a: "were testing", e: "while + past continuous." },
      { q: "What ___ you doing at 3 pm yesterday?", a: "were", e: "you → were." },
      { q: "She ___ (call) me while I was driving.", a: "called", e: "Action courte → past simple." },
      { q: "At 10 am, we ___ (have) the sprint review.", a: "were having", e: "En cours à un moment précis." },
      { q: "I ___ (not / listen) when he explained it.", a: "wasn't listening|was not listening", e: "Négation : wasn't + -ing." },
      { q: "When I arrived, everyone ___ (wait) for me.", a: "was waiting", e: "everyone → singulier : was." },
      { q: "It ___ (rain) when I left the office.", a: "was raining", e: "Décor, situation en cours." }
    ]
  },
  {
    id: "b1-relatives", level: "B1", kind: "grammar", title: "Propositions relatives : who, which, that, where, whose",
    lesson: `
      <table>
        <tr><th>who</th><td>personnes</td><td>The artist <b>who</b> made this…</td></tr>
        <tr><th>which</th><td>choses</td><td>The tool <b>which</b> we use…</td></tr>
        <tr><th>that</th><td>personnes ou choses (relatives essentielles)</td><td>The bug <b>that</b> you found…</td></tr>
        <tr><th>where</th><td>lieux</td><td>The studio <b>where</b> I work…</td></tr>
        <tr><th>whose</th><td>dont (possession)</td><td>The guy <b>whose</b> code crashed…</td></tr>
      </table>
      <p>Quand le relatif est <b>complément</b>, on peut l'omettre : <i>The game (that) I'm playing.</i></p>
      <div class="ex"><span class="bad">The guy which works here</span> → <span class="good">The guy who works here</span></div>`,
    ex: [
      { q: "The programmer ___ wrote this is on holiday.", a: "who|that", e: "Personne → who / that." },
      { q: "The engine ___ we use is very old.", a: "that|which|Ø", e: "Chose complément → that / which, ou rien." },
      { q: "That's the studio ___ I did my internship.", a: "where", e: "Lieu → where." },
      { q: "She's the designer ___ game won an award.", a: "whose", e: "Possession (dont le jeu) → whose." },
      { q: "This is the bug ___ crashes the game.", a: "that|which", e: "Chose sujet → that / which (obligatoire)." },
      { q: "Do you know anyone ___ speaks Japanese?", a: "who|that", e: "Personne → who." },
      { q: "The day ___ we shipped was amazing.", a: "when|that|Ø", e: "Moment → when." },
      { q: "Is this the file ___ you were looking for?", a: "that|which|Ø", e: "Complément → that / which, ou rien." }
    ]
  },
  {
    id: "b1-reported", level: "B1", kind: "conj", title: "Le discours indirect",
    lesson: `
      <p>Rapporter ce que quelqu'un a dit : on <b>recule d'un temps</b> si le verbe introducteur est au passé.</p>
      <table>
        <tr><td>"I <b>am</b> busy."</td><td>He said he <b>was</b> busy.</td></tr>
        <tr><td>"I <b>will</b> fix it."</td><td>She said she <b>would</b> fix it.</td></tr>
        <tr><td>"I <b>fixed</b> it."</td><td>He said he <b>had fixed</b> it.</td></tr>
        <tr><td>"I <b>can</b> help."</td><td>She said she <b>could</b> help.</td></tr>
      </table>
      <p>Questions : ordre affirmatif, <b>if</b> pour les oui/non : <i>He asked <b>if I was</b> ready.</i></p>
      <p><b>say</b> something / <b>tell</b> someone : <i>He <b>told me</b> that…</i></p>`,
    ex: [
      { q: "\"I'm tired.\" → She said she ___ tired.", a: "was", e: "am → was." },
      { q: "\"I'll send it tomorrow.\" → He said he ___ send it the next day.", a: "would|'d", e: "will → would." },
      { q: "\"I can help.\" → She said she ___ help.", a: "could", e: "can → could." },
      { q: "\"Are you ready?\" → He asked me ___ I was ready.", a: "if|whether", e: "Question oui/non → if / whether." },
      { q: "\"Where is the file?\" → She asked where the file ___.", a: "was", e: "Ordre affirmatif + recul du temps." },
      { q: "\"I fixed the bug.\" → He said he ___ the bug.", a: "had fixed|'d fixed", e: "past simple → past perfect." },
      { q: "He ___ me that the build was broken.", a: "told", e: "tell + personne." },
      { q: "\"Don't push to main.\" → She told us ___ push to main.", a: "not to", e: "Ordre négatif → told someone not to…" }
    ]
  },
  {
    id: "b1-perfect-continuous", level: "B1", kind: "conj", title: "Present perfect simple vs continuous",
    lesson: `
      <ul>
        <li><b>have been + -ing</b> : insiste sur la <b>durée</b> ou l'activité (souvent encore en cours). <i>I've been working on this bug all day.</i></li>
        <li><b>have + PP</b> : insiste sur le <b>résultat</b> ou la quantité. <i>I've fixed three bugs.</i></li>
      </ul>
      <div class="ex">I've <b>been writing</b> the doc (pas fini) — I've <b>written</b> the doc (terminé).</div>
      <p>Verbes d'état (know, like…) → simple seulement : <i>I've known him for years.</i></p>`,
    ex: [
      { q: "I ___ (work) on this bug all morning and I'm exhausted.", a: "have been working|'ve been working", e: "Durée de l'activité → continu." },
      { q: "I ___ (fix) three bugs today.", a: "have fixed|'ve fixed", e: "Quantité, résultat → simple." },
      { q: "How long ___ you been waiting?", a: "have", e: "How long have you been -ing?" },
      { q: "I ___ (know) Sam since university.", a: "have known|'ve known", e: "know = état → simple." },
      { q: "She ___ (write) the design doc. It's ready to read.", a: "has written|'s written", e: "Terminé, résultat → simple." },
      { q: "Your eyes are red. ___ you been staring at the screen all day?", a: "Have", e: "Activité récente avec effet visible → continu." },
      { q: "We ___ (test) the new build since 9 am.", a: "have been testing|'ve been testing", e: "Activité qui continue → continu." },
      { q: "How many levels ___ you finished?", a: "have", e: "How many → résultat → simple." }
    ]
  },
  {
    id: "b1-too-enough", level: "B1", kind: "grammar", title: "too, enough, so, such",
    lesson: `
      <table>
        <tr><th>too + adj</th><td>trop</td><td>It's <b>too</b> slow.</td></tr>
        <tr><th>adj + enough</th><td>assez (après l'adjectif !)</td><td>It's not fast <b>enough</b>.</td></tr>
        <tr><th>enough + nom</th><td>assez de (avant le nom)</td><td>We don't have <b>enough</b> time.</td></tr>
        <tr><th>so + adj</th><td>si, tellement</td><td>It's <b>so</b> good.</td></tr>
        <tr><th>such (a) + adj + nom</th><td>un(e) tellement…</td><td>It's <b>such a</b> good game.</td></tr>
      </table>
      <div class="ex"><span class="bad">enough fast</span> → <span class="good">fast enough</span> · <span class="bad">too much slow</span> → <span class="good">too slow</span></div>`,
    ex: [
      { q: "The game is ___ slow on Switch. (trop)", a: "too", e: "too + adjectif." },
      { q: "It's not fast ___.", a: "enough", e: "Adjectif + enough." },
      { q: "We don't have ___ time.", a: "enough", e: "enough + nom." },
      { q: "It's ___ a good idea!", a: "such", e: "such a + adj + nom." },
      { q: "The trailer was ___ good that everyone shared it.", a: "so", e: "so + adj + that." },
      { q: "There are ___ many meetings this week. (trop de)", a: "too", e: "too many + nom pluriel." },
      { q: "There's ___ much noise in the open space.", a: "too", e: "too much + indénombrable." },
      { q: "He's not experienced ___ for this role.", a: "enough", e: "Adjectif + enough." }
    ]
  },
  {
    id: "b1-linkers", level: "B1", kind: "grammar", title: "Connecteurs : because, so, but, although…",
    lesson: `
      <table>
        <tr><th>cause</th><td><b>because</b> + phrase · <b>because of</b> + nom</td></tr>
        <tr><th>conséquence</th><td><b>so</b> (donc) · <b>that's why</b></td></tr>
        <tr><th>opposition</th><td><b>but</b> · <b>although</b> + phrase · <b>however</b> (début de phrase, suivi d'une virgule)</td></tr>
        <tr><th>but</th><td><b>to</b> / <b>in order to</b> + verbe · <b>so that</b> + phrase</td></tr>
      </table>
      <div class="ex"><span class="bad">for fix the bug</span> → <span class="good">to fix the bug</span></div>`,
    ex: [
      { q: "We're late ___ the server crashed.", a: "because|as|since", e: "Cause + phrase → because." },
      { q: "We're late ___ the server crash.", a: "because of|due to", e: "Cause + nom → because of." },
      { q: "The build failed, ___ I couldn't test.", a: "so", e: "Conséquence → so." },
      { q: "___ it was hard, we finished on time.", a: "Although|Even though|Though", e: "Opposition + phrase → although." },
      { q: "I stayed late ___ fix the bug. (pour)", a: "to|in order to", e: "But + verbe → to." },
      { q: "It's fast. ___, it uses a lot of memory.", a: "However", e: "However en début de phrase + virgule." },
      { q: "I'll write it down ___ I don't forget.", a: "so that|so", e: "But + phrase → so that." },
      { q: "I like the idea, ___ it's too expensive.", a: "but", e: "Opposition simple → but." }
    ]
  },

  // ============================== B2 ==============================
  {
    id: "b2-mixed-conditionals", level: "B2", kind: "conj", title: "Conditionnels mixtes et alternatives à if",
    lesson: `
      <p>On mélange les types quand la condition et le résultat ne sont pas à la même époque :</p>
      <ul>
        <li>Passé → présent : <i>If I <b>had taken</b> the job, I <b>would be</b> in London now.</i></li>
        <li>Présent → passé : <i>If I <b>were</b> more organised, I <b>would have finished</b> yesterday.</i></li>
      </ul>
      <h3>Alternatives à if</h3>
      <p><b>unless</b> (= if not), <b>as long as / provided that</b> (à condition que), <b>otherwise</b> (sinon), <b>in case</b> (au cas où).</p>`,
    ex: [
      { q: "If I had learned English earlier, I ___ (be) more confident now.", a: "would be|'d be", e: "Condition passée → résultat présent : would + base." },
      { q: "If he weren't so stubborn, he ___ (accept) the feedback yesterday.", a: "would have accepted|'d have accepted|would've accepted", e: "Condition présente → résultat passé : would have + PP." },
      { q: "We'll miss the deadline ___ we get more people. (à moins que)", a: "unless", e: "unless = if not." },
      { q: "You can use my laptop ___ you're careful.", a: "as long as|provided that|providing|so long as", e: "À condition que." },
      { q: "Take an umbrella ___ it rains.", a: "in case", e: "au cas où → in case." },
      { q: "Save your work, ___ you'll lose it.", a: "otherwise|or", e: "sinon → otherwise." },
      { q: "If we ___ (not / cut) the feature, we'd still be in crunch now.", a: "hadn't cut|had not cut", e: "Condition passée → had + PP." },
      { q: "___ I known about the bug, I would have told you.", a: "Had", e: "Inversion formelle : Had I known = If I had known." }
    ]
  },
  {
    id: "b2-wish", level: "B2", kind: "conj", title: "wish / if only / regrets",
    lesson: `
      <table>
        <tr><th>regret présent</th><td>wish + <b>prétérit</b></td><td>I wish I <b>had</b> more time. (je n'en ai pas)</td></tr>
        <tr><th>regret passé</th><td>wish + <b>past perfect</b></td><td>I wish I <b>hadn't said</b> that.</td></tr>
        <tr><th>agacement / souhait de changement</th><td>wish + <b>would</b></td><td>I wish he <b>would</b> stop interrupting.</td></tr>
      </table>
      <p><b>If only</b> = même structure, plus fort. <b>should have + PP</b> = j'aurais dû.</p>`,
    ex: [
      { q: "I wish I ___ (speak) English fluently.", a: "spoke|could speak", e: "Regret présent → prétérit." },
      { q: "I wish I ___ (not / send) that email.", a: "hadn't sent|had not sent", e: "Regret passé → past perfect." },
      { q: "I wish you ___ stop tapping your pen. (agacement)", a: "would|'d", e: "Agacement → wish + would." },
      { q: "If only we ___ (have) more QA testers!", a: "had", e: "If only + prétérit (présent)." },
      { q: "If only I ___ (listen) to your advice last year.", a: "had listened|'d listened", e: "Passé → past perfect." },
      { q: "I ___ have tested it before pushing. (j'aurais dû)", a: "should", e: "should have + PP = j'aurais dû." },
      { q: "I wish I ___ in London. (être)", a: "were|was", e: "wish + were (ou was à l'oral)." },
      { q: "She wishes she ___ (choose) the other offer.", a: "had chosen|'d chosen", e: "Regret passé → had + PP." }
    ]
  },
  {
    id: "b2-past-modals", level: "B2", kind: "conj", title: "Modaux au passé : must have, could have, should have",
    lesson: `
      <table>
        <tr><th>must have + PP</th><td>déduction quasi certaine</td><td>He <b>must have forgotten</b>. (il a dû oublier)</td></tr>
        <tr><th>can't have + PP</th><td>impossible</td><td>She <b>can't have seen</b> it.</td></tr>
        <tr><th>might / could have + PP</th><td>possible</td><td>It <b>might have been</b> a network issue.</td></tr>
        <tr><th>should have + PP</th><td>reproche, regret</td><td>We <b>should have tested</b> it.</td></tr>
        <tr><th>could have + PP</th><td>possibilité non réalisée</td><td>You <b>could have asked</b> me!</td></tr>
      </table>`,
    ex: [
      { q: "The lights are off. They ___ have gone home. (sûrement)", a: "must", e: "Déduction certaine → must have." },
      { q: "She ___ have written that code, she was on holiday. (impossible)", a: "can't|cannot|couldn't", e: "Impossibilité → can't have." },
      { q: "It ___ have been a driver issue, I'm not sure.", a: "might|could|may", e: "Possibilité → might have." },
      { q: "We should ___ (test) it before the release.", a: "have tested", e: "should have + PP." },
      { q: "You ___ have asked me, I would have helped! (tu aurais pu)", a: "could", e: "Possibilité non saisie → could have." },
      { q: "He must have ___ (forget) about the meeting.", a: "forgotten", e: "must have + PP : forget → forgotten." },
      { q: "I ___ have stayed so late, I'm exhausted. (je n'aurais pas dû)", a: "shouldn't|should not", e: "Regret → shouldn't have." },
      { q: "They might have ___ (take) the wrong train.", a: "taken", e: "might have + PP : take → taken." }
    ]
  },
  {
    id: "b2-causative", level: "B2", kind: "grammar", title: "Faire faire : have / get something done",
    lesson: `
      <p><b>have / get + objet + participe passé</b> = faire faire par quelqu'un d'autre.</p>
      <div class="ex">I <b>had my laptop repaired</b>. (je l'ai fait réparer) — We need to <b>get the build checked</b>.</div>
      <p><b>make someone do</b> = forcer · <b>let someone do</b> = laisser · <b>get someone to do</b> = convaincre de faire.</p>
      <div class="ex">He <b>made</b> us redo it. — She <b>let</b> me leave early. — I <b>got</b> Tom <b>to review</b> my PR.</div>`,
    ex: [
      { q: "I had my laptop ___ (repair) last week.", a: "repaired", e: "have + objet + PP." },
      { q: "We need to get the translations ___ (check).", a: "checked", e: "get + objet + PP." },
      { q: "The lead made us ___ (redo) the whole level.", a: "redo", e: "make someone + base verbale (sans to)." },
      { q: "She let me ___ (leave) early.", a: "leave", e: "let someone + base verbale." },
      { q: "I got Tom ___ review my PR.", a: "to", e: "get someone to do." },
      { q: "We're having the office ___ (paint).", a: "painted", e: "have + objet + PP." },
      { q: "Can you get someone ___ (look) at this crash?", a: "to look", e: "get someone to + verbe." },
      { q: "Where did you get your hair ___ (cut)?", a: "cut", e: "get + objet + PP : cut → cut." }
    ]
  },
  {
    id: "b2-reporting-verbs", level: "B2", kind: "grammar", title: "Verbes introducteurs : suggest, admit, deny, remind…",
    lesson: `
      <table>
        <tr><th>+ -ing</th><td>suggest, admit, deny, recommend</td><td>He <b>admitted breaking</b> the build.</td></tr>
        <tr><th>+ to</th><td>agree, refuse, promise, offer, threaten</td><td>She <b>offered to help</b>.</td></tr>
        <tr><th>+ qqn + to</th><td>ask, tell, remind, warn, encourage, advise</td><td>He <b>reminded me to send</b> it.</td></tr>
        <tr><th>+ prép. + -ing</th><td>apologise <b>for</b>, insist <b>on</b>, accuse sb <b>of</b>, blame sb <b>for</b></td><td>She <b>apologised for being</b> late.</td></tr>
      </table>
      <div class="ex"><span class="bad">He suggested me to</span> → <span class="good">He suggested that I… / He suggested doing…</span></div>`,
    ex: [
      { q: "He admitted ___ (break) the build.", a: "breaking|having broken", e: "admit + -ing." },
      { q: "She offered ___ (help) me with the shaders.", a: "to help", e: "offer + to." },
      { q: "He reminded me ___ (send) the report.", a: "to send", e: "remind someone to." },
      { q: "She apologised ___ being late.", a: "for", e: "apologise for + -ing." },
      { q: "They denied ___ (delete) the files.", a: "deleting|having deleted", e: "deny + -ing." },
      { q: "The lead insisted ___ reviewing every PR.", a: "on", e: "insist on + -ing." },
      { q: "I'd recommend ___ (use) the profiler first.", a: "using", e: "recommend + -ing." },
      { q: "He warned us ___ to touch the network code.", a: "not", e: "warn someone not to." }
    ]
  },
  {
    id: "b2-non-defining", level: "B2", kind: "grammar", title: "Relatives explicatives et which de commentaire",
    lesson: `
      <p>Les relatives <b>non essentielles</b> ajoutent une info entre virgules. Pas de <b>that</b>, et on ne peut pas omettre le pronom.</p>
      <div class="ex">Our lead, <b>who</b> joined last year, is great. — Unity, <b>which</b> we use, is popular.</div>
      <p><b>, which</b> peut reprendre toute la phrase (= ce qui) :</p>
      <div class="ex">The build failed, <b>which</b> means we can't ship today.</div>
      <p>Avec préposition (registre soutenu) : <i>the team <b>with whom</b> I work</i>, <i>most of <b>whom</b></i>, <i>some of <b>which</b></i>.</p>`,
    ex: [
      { q: "My manager, ___ is from Leeds, speaks very fast.", a: "who", e: "Personne, relative explicative → who (pas that)." },
      { q: "The server crashed, ___ means we lost the data. (ce qui)", a: "which", e: ", which = ce qui." },
      { q: "Our engine, ___ is twenty years old, is hard to maintain.", a: "which", e: "Chose, relative explicative → which." },
      { q: "We hired ten testers, most of ___ are students.", a: "whom", e: "most of whom (personnes)." },
      { q: "We found many bugs, some of ___ were critical.", a: "which", e: "some of which (choses)." },
      { q: "The person to ___ I spoke was very helpful.", a: "whom", e: "Préposition + whom (formel)." },
      { q: "London, ___ our HQ is based, is expensive.", a: "where", e: "Lieu → where." },
      { q: "She didn't reply, ___ was strange. (ce qui)", a: "which", e: ", which reprend la phrase." }
    ]
  },
  {
    id: "b2-future-perfect", level: "B2", kind: "conj", title: "Future continuous & future perfect",
    lesson: `
      <table>
        <tr><th>will be + -ing</th><td>en cours à un moment du futur</td><td>This time tomorrow, I<b>'ll be flying</b> to Montreal.</td></tr>
        <tr><th>will have + PP</th><td>terminé avant un moment du futur</td><td>By Friday, we<b>'ll have fixed</b> all the crashes.</td></tr>
      </table>
      <p><b>by</b> + moment = d'ici à, au plus tard. <b>by the time</b> + présent.</p>`,
    ex: [
      { q: "By Friday, we ___ (fix) all the crashes.", a: "will have fixed|'ll have fixed", e: "Terminé avant un moment futur → will have + PP." },
      { q: "This time tomorrow, I ___ (present) the demo.", a: "will be presenting|'ll be presenting", e: "En cours à un moment futur → will be + -ing." },
      { q: "By the time you arrive, the meeting ___ (start).", a: "will have started|'ll have started", e: "Antériorité dans le futur." },
      { q: "Don't call at 3, I ___ (sit) in a meeting.", a: "will be sitting|'ll be sitting", e: "En cours → will be + -ing." },
      { q: "By next year, I ___ (work) here for five years.", a: "will have worked|'ll have worked|will have been working|'ll have been working", e: "Durée jusqu'à un point futur." },
      { q: "Send me the file ___ Monday at the latest.", a: "by", e: "by = au plus tard." },
      { q: "___ the time we ship, the engine will be outdated.", a: "By", e: "By the time + présent." },
      { q: "Will you ___ (use) the car tonight? (demande polie sur les plans)", a: "be using", e: "Future continuous pour demander poliment les plans de qqn." }
    ]
  },
  {
    id: "b2-gerund-meaning", level: "B2", kind: "grammar", title: "-ing ou to : le sens change !",
    lesson: `
      <table>
        <tr><th>stop doing</th><td>arrêter de faire</td><th>stop to do</th><td>s'arrêter pour faire</td></tr>
        <tr><th>remember doing</th><td>se souvenir d'avoir fait</td><th>remember to do</th><td>penser à faire</td></tr>
        <tr><th>forget doing</th><td>oublier avoir fait</td><th>forget to do</th><td>oublier de faire</td></tr>
        <tr><th>try doing</th><td>essayer (pour voir)</td><th>try to do</th><td>s'efforcer de faire</td></tr>
        <tr><th>regret doing</th><td>regretter d'avoir fait</td><th>regret to say</th><td>avoir le regret de dire</td></tr>
      </table>`,
    ex: [
      { q: "Remember ___ (save) before you quit. (pense à)", a: "to save", e: "remember to = penser à faire." },
      { q: "I remember ___ (meet) him at GDC. (souvenir)", a: "meeting", e: "remember -ing = se souvenir d'avoir fait." },
      { q: "We stopped ___ (use) that engine years ago. (arrêté de)", a: "using", e: "stop -ing = arrêter de." },
      { q: "On the way, we stopped ___ (get) coffee. (pour)", a: "to get", e: "stop to = s'arrêter pour." },
      { q: "If it doesn't compile, try ___ (clean) the cache. (pour voir)", a: "cleaning", e: "try -ing = essayer une solution." },
      { q: "I'm trying ___ (understand) your point. (m'efforcer)", a: "to understand", e: "try to = faire un effort." },
      { q: "I regret ___ (not / learn) English earlier.", a: "not learning|not having learned|not having learnt", e: "regret -ing = regretter d'avoir fait." },
      { q: "Don't forget ___ (lock) your screen.", a: "to lock", e: "forget to = oublier de." }
    ]
  },
  {
    id: "b2-contrast", level: "B2", kind: "grammar", title: "Opposition : despite, although, whereas, even though",
    lesson: `
      <table>
        <tr><th>although / even though</th><td>+ phrase</td><td>Although it was late, we kept going.</td></tr>
        <tr><th>despite / in spite of</th><td>+ nom ou -ing</td><td>Despite the delay / Despite being late…</td></tr>
        <tr><th>despite the fact that</th><td>+ phrase</td><td>Despite the fact that it was late…</td></tr>
        <tr><th>whereas / while</th><td>contraste entre deux faits</td><td>I use Unity, whereas she uses Unreal.</td></tr>
        <tr><th>however / nevertheless</th><td>début de phrase + virgule</td><td>However, …</td></tr>
      </table>
      <div class="ex"><span class="bad">Despite it was late</span> → <span class="good">Despite it being late / Although it was late</span></div>`,
    ex: [
      { q: "___ the delay, the launch went well.", a: "Despite|In spite of", e: "+ nom → despite." },
      { q: "___ it was late, we kept working.", a: "Although|Even though|Though", e: "+ phrase → although." },
      { q: "Despite ___ (be) tired, she finished the level.", a: "being", e: "despite + -ing." },
      { q: "I prefer Unity, ___ my colleague prefers Unreal.", a: "whereas|while|but", e: "Contraste → whereas." },
      { q: "Despite the fact ___ we had no budget, the game sold well.", a: "that", e: "despite the fact that + phrase." },
      { q: "The demo was buggy. ___, the publisher liked it.", a: "Nevertheless|However|Nonetheless|Still", e: "Début de phrase + virgule." },
      { q: "In spite ___ the bugs, players loved it.", a: "of", e: "in spite of." },
      { q: "___ though I had studied, I failed the test.", a: "Even", e: "even though = même si (fait réel)." }
    ]
  },

  // ============================== C1 ==============================
  {
    id: "c1-inversion", level: "C1", kind: "grammar", title: "L'inversion pour l'emphase",
    lesson: `
      <p>Après un adverbe négatif ou restrictif <b>en tête de phrase</b>, on inverse sujet et auxiliaire (registre soutenu, présentations, écrit).</p>
      <div class="ex"><b>Never have I seen</b> such a stable build. — <b>Not only did we ship</b> on time, but we also…</div>
      <ul>
        <li>Never / Rarely / Seldom + aux + sujet</li>
        <li>Not only + aux + sujet…, but also…</li>
        <li>No sooner had + sujet + PP … than…</li>
        <li>Hardly had + sujet + PP … when…</li>
        <li>Under no circumstances / At no point / Only then / Not until…</li>
      </ul>`,
    ex: [
      { q: "Never ___ I seen such a stable launch.", a: "have", e: "Never + have + sujet + PP." },
      { q: "Not only ___ we ship on time, but we also stayed under budget.", a: "did", e: "Not only + did + sujet + base." },
      { q: "Rarely ___ players finish the tutorial.", a: "do", e: "Rarely + do + sujet." },
      { q: "No sooner had we launched ___ the servers went down.", a: "than", e: "No sooner… than." },
      { q: "Under no circumstances ___ you push to main on a Friday.", a: "should|must|can", e: "Under no circumstances + modal + sujet." },
      { q: "Hardly ___ I sat down when the phone rang.", a: "had", e: "Hardly had + sujet + PP… when." },
      { q: "Only after the playtest ___ we realise the problem.", a: "did", e: "Only after… + did + sujet." },
      { q: "At no point ___ anyone mention this requirement.", a: "did", e: "At no point + did + sujet." }
    ]
  },
  {
    id: "c1-cleft", level: "C1", kind: "grammar", title: "Phrases clivées : What I need is… / It was… who",
    lesson: `
      <p>Pour mettre en relief une information (très naturel à l'oral) :</p>
      <ul>
        <li><b>What</b> + sujet + verbe + <b>is/was</b> … : <i><b>What</b> we need <b>is</b> more time.</i></li>
        <li><b>It is/was</b> … <b>who/that</b> … : <i><b>It was</b> Sarah <b>who</b> found the bug.</i></li>
        <li><b>All</b> I want <b>is</b>… · <b>The thing is</b>… · <b>The reason why</b>… <b>is that</b>…</li>
      </ul>`,
    ex: [
      { q: "___ we need is a clear roadmap.", a: "What", e: "What … is … = ce dont on a besoin, c'est…" },
      { q: "It ___ Sarah who found the memory leak.", a: "was", e: "It was … who …" },
      { q: "All I want ___ a stable build.", a: "is", e: "All I want is…" },
      { q: "It was the network code ___ caused the crash.", a: "that|which", e: "It was X that…" },
      { q: "What I don't understand ___ why we changed engines.", a: "is", e: "What … is …" },
      { q: "The reason ___ we're late is that the specs changed.", a: "why|Ø|that", e: "The reason why… is that…" },
      { q: "What happened ___ that the server ran out of memory.", a: "was", e: "What happened was that…" },
      { q: "___ thing is, we don't have enough testers.", a: "The", e: "The thing is, … = le problème, c'est que…" }
    ]
  },
  {
    id: "c1-participle", level: "C1", kind: "grammar", title: "Propositions participiales",
    lesson: `
      <p>Pour condenser deux phrases (écrit pro, présentations) :</p>
      <ul>
        <li><b>-ing</b> (actif, simultané) : <i><b>Looking</b> at the data, we noticed a drop.</i></li>
        <li><b>Having + PP</b> (antériorité) : <i><b>Having finished</b> the review, she merged the PR.</i></li>
        <li><b>PP</b> (passif) : <i><b>Built</b> in 2010, the engine is showing its age.</i></li>
      </ul>
      <p>⚠️ Le sujet doit être le même dans les deux parties.</p>`,
    ex: [
      { q: "___ (look) at the analytics, we noticed most players quit at level 3.", a: "Looking", e: "Action simultanée active → -ing." },
      { q: "___ (finish) the review, she merged the PR.", a: "Having finished", e: "Antériorité → Having + PP." },
      { q: "___ (write) in 2010, the code is hard to maintain.", a: "Written", e: "Sens passif → participe passé." },
      { q: "Not ___ (know) the codebase, I asked for help.", a: "knowing", e: "Négation : Not + -ing." },
      { q: "___ (give) the deadline, we had to cut features.", a: "Given", e: "Given = étant donné." },
      { q: "The team ___ (work) on the sequel is in Montreal.", a: "working", e: "= the team that is working → -ing." },
      { q: "The bugs ___ (report) by players have been fixed.", a: "reported", e: "= that were reported → PP." },
      { q: "Having ___ (miss) the train, I joined the call from home.", a: "missed", e: "Having + PP." }
    ]
  },
  {
    id: "c1-subjunctive", level: "C1", kind: "conj", title: "Subjonctif et irréel : it's time, would rather, suggest that",
    lesson: `
      <table>
        <tr><th>It's (high) time + prétérit</th><td>Il est grand temps que</td><td>It's time we <b>shipped</b> this.</td></tr>
        <tr><th>would rather + sujet + prétérit</th><td>préférer que qqn</td><td>I'd rather you <b>didn't</b> push today.</td></tr>
        <tr><th>would rather + base</th><td>préférer (soi-même)</td><td>I'd rather <b>work</b> from home.</td></tr>
        <tr><th>suggest / insist / recommend that + base</th><td>subjonctif (formel)</td><td>I suggest that he <b>be</b> involved.</td></tr>
        <tr><th>as if / as though + prétérit</th><td>comme si</td><td>He talks as if he <b>were</b> the boss.</td></tr>
      </table>`,
    ex: [
      { q: "It's high time we ___ (fix) the build pipeline.", a: "fixed", e: "It's time + prétérit." },
      { q: "I'd rather you ___ (not / tell) anyone yet.", a: "didn't tell|did not tell", e: "would rather + autre sujet + prétérit." },
      { q: "I'd rather ___ (stay) late than come in on Saturday.", a: "stay", e: "would rather + base (même sujet)." },
      { q: "The lead insisted that every PR ___ reviewed.", a: "be", e: "Subjonctif : insist that + be." },
      { q: "He talks as if he ___ the CEO.", a: "were|was", e: "as if + prétérit (were)." },
      { q: "I recommend that she ___ (join) the meeting.", a: "join|should join", e: "Subjonctif : base verbale sans -s." },
      { q: "It's about time you ___ (take) a holiday.", a: "took", e: "It's about time + prétérit." },
      { q: "I'd rather we ___ (discuss) this in private.", a: "discussed", e: "would rather + autre sujet + prétérit." }
    ]
  },
  {
    id: "c1-hedging", level: "C1", kind: "grammar", title: "Prendre ses distances : it seems, is said to, tend to",
    lesson: `
      <p>Pour nuancer, rester diplomate, ou rapporter sans s'engager :</p>
      <ul>
        <li><b>It seems / appears that</b>… · <b>There seems to be</b> a problem.</li>
        <li><b>is said / believed / thought to</b> + base : <i>The sequel <b>is said to be</b> huge.</i></li>
        <li><b>is said to have</b> + PP (passé) : <i>He <b>is believed to have left</b>.</i></li>
        <li><b>It is reported that</b>… · <b>tend to</b>… · <b>arguably</b>, <b>presumably</b>, <b>to some extent</b></li>
        <li>Adoucir : <i>I'd say…, It might be worth…, I'm not entirely sure that…</i></li>
      </ul>`,
    ex: [
      { q: "There ___ to be a problem with the servers.", a: "seems|appears", e: "There seems to be…" },
      { q: "The new engine is said ___ very fast.", a: "to be", e: "is said to + base." },
      { q: "He is believed to ___ (leave) the company last year.", a: "have left", e: "Passé → to have + PP." },
      { q: "It ___ that the patch fixed the issue. (il semblerait)", a: "seems|appears|would seem|would appear", e: "It seems / appears that…" },
      { q: "Players ___ to skip long cutscenes. (ont tendance à)", a: "tend", e: "tend to = avoir tendance à." },
      { q: "It might be ___ checking the logs first. (vaudrait la peine)", a: "worth", e: "It might be worth + -ing." },
      { q: "I'm not ___ sure that's the right approach. (pas tout à fait)", a: "entirely|completely|totally", e: "Atténuer : not entirely sure." },
      { q: "It is ___ that the studio will be sold. (on rapporte)", a: "reported|said|rumoured|believed", e: "It is reported that…" }
    ]
  },
  {
    id: "c1-modal-nuance", level: "C1", kind: "conj", title: "Nuances : needn't have, be supposed to, be bound to",
    lesson: `
      <table>
        <tr><th>needn't have + PP</th><td>fait, mais c'était inutile</td><td>You <b>needn't have come</b>, it was cancelled.</td></tr>
        <tr><th>didn't need to</th><td>pas nécessaire (souvent pas fait)</td><td>I <b>didn't need to</b> come.</td></tr>
        <tr><th>be supposed to</th><td>être censé</td><td>The build <b>is supposed to</b> be ready.</td></tr>
        <tr><th>be bound to</th><td>c'est sûr que</td><td>It's <b>bound to</b> crash on old phones.</td></tr>
        <tr><th>be about to</th><td>être sur le point de</td><td>I'm <b>about to</b> push.</td></tr>
        <tr><th>be due to</th><td>prévu pour</td><td>The patch is <b>due to</b> go live at noon.</td></tr>
      </table>`,
    ex: [
      { q: "You ___ have bought lunch, they provided food. (inutile)", a: "needn't|need not", e: "Fait mais inutile → needn't have." },
      { q: "The build is ___ to be ready by now. (censé)", a: "supposed", e: "be supposed to = être censé." },
      { q: "With so many changes, something is ___ to break. (forcément)", a: "bound|sure|certain", e: "be bound to = c'est sûr que." },
      { q: "Don't leave, I'm ___ to push the fix. (sur le point de)", a: "about", e: "be about to." },
      { q: "The patch is ___ to go live at noon. (prévu)", a: "due|scheduled|set", e: "be due to = prévu pour." },
      { q: "I didn't ___ to wake up early, so I slept in.", a: "need|have", e: "didn't need to = pas nécessaire (et pas fait)." },
      { q: "You were supposed ___ tell me before merging!", a: "to", e: "be supposed to." },
      { q: "We needn't have ___ (worry): the demo went perfectly.", a: "worried", e: "needn't have + PP." }
    ]
  }
);

// Ordre pédagogique des leçons (les nouvelles cartes de grammaire arrivent dans cet ordre)
(() => {
  const ORDER = [
    "a2-be-there", "a2-pronouns", "present", "a2-past-simple", "a2-can", "articles", "a2-some-any",
    "questions", "a2-frequency", "prepositions", "comparatives", "uncountables",
    "past-perfect", "since-for", "future", "b1-past-continuous", "make-do", "b1-linkers", "conditionals",
    "modals", "ing-to", "b1-relatives", "b1-too-enough", "passive", "b1-perfect-continuous", "b1-reported", "confusions"
  ];
  const pos = (t) => { const i = ORDER.indexOf(t.id); return i === -1 ? ORDER.length : i; };
  const LEVELS = ["A2", "B1", "B2", "C1"];
  DATA.grammar.sort((a, b) => LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level) || pos(a) - pos(b));
})();
