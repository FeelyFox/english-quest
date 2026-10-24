// Grammaire & conjugaison. kind: 'conj' (temps) ou 'grammar'.
// Chaque exercice : q (phrase avec ___), a (réponses acceptées séparées par |), e (explication).
// « Ø » = pas d'article / pas de mot.
window.DATA = window.DATA || {};

DATA.grammar = [
  {
    id: "present", kind: "conj", title: "Present simple vs continuous",
    lesson: `
      <p><b>Present simple</b> : habitudes, vérités générales, comportement d'un système.</p>
      <div class="ex">I <b>start</b> work at 9:30. — This function <b>returns</b> null.</div>
      <p><b>Present continuous</b> (be + -ing) : en cours <i>maintenant</i>, ou situation temporaire.</p>
      <div class="ex">I<b>'m debugging</b> a crash right now. — We<b>'re working</b> on the new level this sprint.</div>
      <h3>⚠️ Verbes d'état</h3>
      <p>Jamais en -ing : <b>know, understand, want, need, like, mean, believe, seem, belong</b>.</p>
      <div class="ex"><span class="bad">I'm not understanding</span> → <span class="good">I don't understand</span></div>
      <h3>Piège francophone</h3>
      <p>En français on dit « je travaille » pour les deux. Demande-toi : <i>habitude</i> ou <i>en ce moment</i> ?</p>`,
    ex: [
      { q: "I usually ___ (start) work at 9:30.", a: "start", e: "Habitude → present simple." },
      { q: "Can you call back later? I ___ (debug) a crash right now.", a: "am debugging|'m debugging", e: "Action en cours → present continuous." },
      { q: "This build ___ (take) ages to compile, it always does.", a: "takes", e: "Vérité générale → present simple, avec -s à la 3e personne." },
      { q: "I ___ (not / understand) what you mean.", a: "don't understand|do not understand", e: "understand est un verbe d'état → jamais en -ing." },
      { q: "We ___ (work) on the new level this sprint.", a: "are working|'re working", e: "Situation temporaire → present continuous." },
      { q: "How often ___ you push to main?", a: "do", e: "Question au present simple → auxiliaire do." },
      { q: "Shh, she ___ (present) the roadmap to the studio heads.", a: "is presenting|'s presenting", e: "En train de se passer → present continuous." },
      { q: "This function ___ (return) null if the asset is missing.", a: "returns", e: "Comportement d'un système → present simple (+ s)." },
      { q: "I ___ (need) more time to fix this.", a: "need", e: "need = verbe d'état → present simple." },
      { q: "She ___ (not / work) on Fridays.", a: "doesn't work|does not work", e: "Négation 3e pers. : doesn't + base verbale (pas de -s)." }
    ]
  },
  {
    id: "past-perfect", kind: "conj", title: "Past simple vs present perfect",
    lesson: `
      <p>Le <b>passé composé</b> français se traduit souvent par le <b>past simple</b> ! C'est LA faute n°1.</p>
      <h3>Past simple (V-ed / forme irrégulière)</h3>
      <p>Action terminée à un <b>moment précis</b> du passé : <i>yesterday, last week, in 2022, two days ago, when…</i></p>
      <div class="ex"><span class="bad">I have fixed it yesterday</span> → <span class="good">I fixed it yesterday</span></div>
      <h3>Present perfect (have + participe passé)</h3>
      <p>Lien avec le présent, <b>pas de moment précis</b> : <i>already, yet, just, ever, never, so far, this week, today</i>.</p>
      <div class="ex">I<b>'ve just pushed</b> the fix. — <b>Have</b> you ever <b>used</b> Unreal? — The server <b>has crashed</b> twice this week.</div>
      <p>Règle simple : <b>si tu peux dire « quand », c'est past simple.</b></p>`,
    ex: [
      { q: "I ___ (fix) that bug yesterday.", a: "fixed", e: "yesterday = moment précis → past simple." },
      { q: "I ___ (already / fix) that bug, check the latest build.", a: "have already fixed|'ve already fixed", e: "already, résultat présent → present perfect." },
      { q: "We ___ (ship) our first game in 2022.", a: "shipped", e: "in 2022 → past simple." },
      { q: "Have you ever ___ (work) with Unreal?", a: "worked", e: "ever → present perfect : have + participe passé." },
      { q: "She ___ (join) the studio three months ago.", a: "joined", e: "ago → toujours past simple." },
      { q: "I ___ (not / finish) the review yet.", a: "haven't finished|have not finished", e: "yet → present perfect." },
      { q: "The build server ___ (crash) twice this week.", a: "has crashed|'s crashed", e: "this week = période pas terminée → present perfect." },
      { q: "Last sprint, we ___ (spend) too long on polish.", a: "spent", e: "Last sprint → past simple. spend/spent/spent." },
      { q: "I ___ (just / push) the fix.", a: "have just pushed|'ve just pushed", e: "just = à l'instant → present perfect." },
      { q: "When ___ you start working here?", a: "did", e: "When → moment précis → past simple, auxiliaire did." }
    ]
  },
  {
    id: "since-for", kind: "conj", title: "Depuis : for / since / ago",
    lesson: `
      <p>« Je travaille ici <b>depuis</b> 3 ans » → l'anglais utilise le <b>present perfect</b>, jamais le présent.</p>
      <div class="ex"><span class="bad">I work here since 2021</span> → <span class="good">I've worked / I've been working here since 2021</span></div>
      <table>
        <tr><th>since</th><td>+ point de départ</td><td>since 2021, since Monday, since 10 o'clock</td></tr>
        <tr><th>for</th><td>+ durée</td><td>for three years, for two hours, for ages</td></tr>
        <tr><th>ago</th><td>il y a (past simple)</td><td>two weeks ago</td></tr>
        <tr><th>during</th><td>pendant (quand ?)</td><td>during the meeting</td></tr>
      </table>
      <p><b>Present perfect continuous</b> (have been + -ing) insiste sur la durée d'une activité : <i>I've been waiting for an hour.</i></p>`,
    ex: [
      { q: "I've worked here ___ 2021.", a: "since", e: "2021 = point de départ → since." },
      { q: "I've worked here ___ three years.", a: "for", e: "three years = durée → for." },
      { q: "I ___ (work) at this studio for two years.", a: "have worked|'ve worked|have been working|'ve been working", e: "« depuis » → present perfect (simple ou continu)." },
      { q: "She ___ (be) in meetings since 10 o'clock.", a: "has been|'s been", e: "since → present perfect." },
      { q: "We released the demo two weeks ___.", a: "ago", e: "il y a → ago, avec le past simple." },
      { q: "I nearly fell asleep ___ the presentation.", a: "during", e: "pendant + nom d'événement → during." },
      { q: "How long ___ you been working on this feature?", a: "have", e: "How long + present perfect continuous : have you been -ing." },
      { q: "We ___ (wait) for the new dev kits for weeks.", a: "have been waiting|'ve been waiting|have waited|'ve waited", e: "Durée qui continue → present perfect (continu de préférence)." },
      { q: "I haven't seen him ___ Monday.", a: "since", e: "Monday = point de départ → since." }
    ]
  },
  {
    id: "future", kind: "conj", title: "Le futur : will / going to / present continuous",
    lesson: `
      <ul>
        <li><b>will</b> : décision prise sur le moment, promesse, offre, prédiction/opinion. <i>I'll check it now.</i></li>
        <li><b>be going to</b> : intention déjà décidée, ou prédiction basée sur ce qu'on voit. <i>I'm going to refactor this next sprint.</i></li>
        <li><b>present continuous</b> : rendez-vous / plan fixé. <i>We're meeting the publisher on Thursday.</i></li>
      </ul>
      <h3>⚠️ Après when / if / as soon as / until / before</h3>
      <p>On met le <b>présent</b>, pas will :</p>
      <div class="ex"><span class="bad">as soon as it will be ready</span> → <span class="good">as soon as it's ready</span></div>`,
    ex: [
      { q: "The phone's ringing. — OK, I ___ (get) it.", a: "'ll get|will get", e: "Décision prise sur le moment → will." },
      { q: "I ___ (refactor) the save system next sprint, it's already planned.", a: "am going to refactor|'m going to refactor|am refactoring|'m refactoring", e: "Intention déjà décidée → going to (ou present continuous)." },
      { q: "We ___ (meet) the publisher on Thursday at 2 pm.", a: "are meeting|'re meeting|are going to meet|'re going to meet", e: "Rendez-vous fixé → present continuous." },
      { q: "I'll send you the build as soon as it ___ (be) ready.", a: "is|'s", e: "Après as soon as → présent, pas will." },
      { q: "Look at that burndown chart, we ___ (miss) the deadline.", a: "are going to miss|'re going to miss", e: "Prédiction basée sur une preuve visible → going to." },
      { q: "Don't worry, I ___ (not / tell) anyone.", a: "won't tell|will not tell", e: "Promesse → will (won't = will not)." },
      { q: "When you ___ (finish), can you ping me?", a: "finish|have finished|'ve finished", e: "Après when → présent (ou present perfect)." },
      { q: "I think players ___ (love) this feature.", a: "will love|'ll love", e: "Opinion / prédiction avec I think → will." }
    ]
  },
  {
    id: "conditionals", kind: "conj", title: "Les conditionnels (if…)",
    lesson: `
      <table>
        <tr><th>Type</th><th>Structure</th><th>Exemple</th></tr>
        <tr><td>0 – toujours vrai</td><td>if + présent, présent</td><td>If you press F5, the level reloads.</td></tr>
        <tr><td>1 – réel / probable</td><td>if + présent, will</td><td>If the build passes, we'll ship it.</td></tr>
        <tr><td>2 – imaginaire</td><td>if + prétérit, would</td><td>If I had more time, I'd rewrite it.</td></tr>
        <tr><td>3 – passé irréel</td><td>if + had + PP, would have + PP</td><td>If we'd tested it, we wouldn't have shipped that bug.</td></tr>
      </table>
      <p>⚠️ <b>Jamais de will ni would après if.</b> <span class="bad">If I would have time</span> → <span class="good">If I had time</span></p>
      <p><i>If I were you, …</i> = si j'étais toi (conseil).</p>`,
    ex: [
      { q: "If you ___ (press) F5, the level reloads.", a: "press", e: "Type 0 : if + présent." },
      { q: "If the build passes, we ___ (ship) it tonight.", a: "will ship|'ll ship", e: "Type 1 : if + présent, will." },
      { q: "If I ___ (have) more time, I would rewrite the whole system.", a: "had", e: "Type 2 : if + prétérit (pas would)." },
      { q: "If I were you, I ___ (ask) the lead.", a: "would ask|'d ask", e: "Conseil : If I were you, I'd…" },
      { q: "If we ___ (test) it properly, we wouldn't have shipped that bug.", a: "had tested|'d tested", e: "Type 3 : if + had + participe passé." },
      { q: "If you ___ (not / fix) that leak, the game will crash on console.", a: "don't fix|do not fix", e: "Type 1 : if + présent." },
      { q: "We ___ (finish) on time if the specs hadn't changed.", a: "would have finished|'d have finished|would've finished", e: "Type 3 : would have + participe passé." },
      { q: "If I ___ (be) in charge, I'd cut that feature.", a: "were|was", e: "Type 2 : were (formel) ou was (courant)." }
    ]
  },
  {
    id: "passive", kind: "conj", title: "La voix passive",
    lesson: `
      <p><b>be</b> (au bon temps) + <b>participe passé</b>. Très utilisé à l'écrit pro et dans les tickets.</p>
      <table>
        <tr><td>présent</td><td>The assets <b>are stored</b> on the drive.</td></tr>
        <tr><td>en cours</td><td>Your PR <b>is being reviewed</b>.</td></tr>
        <tr><td>passé</td><td>The bug <b>was reported</b> by QA.</td></tr>
        <tr><td>present perfect</td><td>The patch <b>has been released</b>.</td></tr>
        <tr><td>futur</td><td>It <b>will be fixed</b> in the next build.</td></tr>
      </table>
      <p>Astuce : le passif évite de pointer quelqu'un du doigt → <i>Mistakes were made.</i> 😉</p>`,
    ex: [
      { q: "The bug ___ (report) by a tester yesterday.", a: "was reported", e: "Passé + passif : was + participe passé." },
      { q: "All assets ___ (store) on the shared drive.", a: "are stored", e: "Présent passif : are + participe passé." },
      { q: "The patch ___ (already / release).", a: "has already been released", e: "Present perfect passif : has been + PP." },
      { q: "The new engine ___ (use) on our next project.", a: "will be used|is going to be used", e: "Futur passif : will be + PP." },
      { q: "The level ___ (still / build) when the power went out.", a: "was still being built", e: "Passé continu passif : was being + PP." },
      { q: "This decision ___ (make) by the studio heads last week.", a: "was made", e: "last week → passé : was made." },
      { q: "Your PR ___ (review) at the moment.", a: "is being reviewed", e: "En cours → is being + PP." },
      { q: "English ___ (speak) in all our meetings.", a: "is spoken", e: "Présent passif ; speak/spoke/spoken." }
    ]
  },
  {
    id: "articles", kind: "grammar", title: "Les articles : a / an / the / Ø",
    lesson: `
      <ul>
        <li><b>a / an</b> : une chose parmi d'autres, première mention, <b>métier</b> : <i>I'm <b>a</b> developer.</i></li>
        <li><b>the</b> : chose précise, déjà connue : <i>Can you send me <b>the</b> build?</i></li>
        <li><b>Ø (rien)</b> : généralités au pluriel ou indénombrable : <i><b>Players</b> love loot. <b>Life</b> is hard.</i> Langues, <i>at work, at home</i>.</li>
      </ul>
      <h3>⚠️ a ou an : c'est le SON qui compte</h3>
      <div class="ex">an hour, an FPS drop (« eff »), an MMO — mais a UI (« you »), a user, a unit test</div>
      <h3>Piège francophone</h3>
      <div class="ex"><span class="bad">The players hate cutscenes</span> (en général) → <span class="good">Players hate cutscenes</span></div>
      <p class="muted">Écris <b>Ø</b> (ou 0) quand il n'y a pas d'article.</p>`,
    ex: [
      { q: "I'm ___ gameplay programmer.", a: "a", e: "Métier → a/an obligatoire en anglais." },
      { q: "___ players hate unskippable cutscenes. (en général)", a: "Ø", e: "Généralité au pluriel → pas d'article." },
      { q: "Can you send me ___ build you made this morning?", a: "the", e: "Build précise → the." },
      { q: "It took ___ hour to compile.", a: "an", e: "hour se prononce « our » → an." },
      { q: "We need to hire ___ UI designer.", a: "a", e: "UI se prononce « you-eye » → a." },
      { q: "She speaks ___ Japanese fluently.", a: "Ø", e: "Langues → pas d'article." },
      { q: "___ life of a game dev is never boring.", a: "The", e: "Précisé par « of a game dev » → the." },
      { q: "I left my laptop at ___ home.", a: "Ø", e: "at home, at work → pas d'article." },
      { q: "There's ___ FPS drop in the forest level.", a: "an", e: "FPS se prononce « eff-pee-ess » → an." },
      { q: "___ information you sent me was very useful.", a: "The", e: "Information précise → the." }
    ]
  },
  {
    id: "uncountables", kind: "grammar", title: "Indénombrables & quantités",
    lesson: `
      <p>Ces mots n'ont <b>ni pluriel ni a/an</b> :</p>
      <div class="ex"><b>feedback, advice, information, news, equipment, software, hardware, research, progress, knowledge, work, furniture, luggage</b></div>
      <div class="ex"><span class="bad">a feedback, informations, advices</span> → <span class="good">some feedback, information, a piece of advice</span></div>
      <table>
        <tr><th>dénombrable</th><td>many, a few, fewer</td><td>How many bugs?</td></tr>
        <tr><th>indénombrable</th><td>much, a little, less</td><td>How much time?</td></tr>
        <tr><th>les deux</th><td>a lot of, some, any</td><td>a lot of bugs / a lot of time</td></tr>
      </table>
      <p><b>people</b> est pluriel : <i>people <b>are</b></i>. <b>news</b> est singulier : <i>the news <b>is</b> good</i>.</p>`,
    ex: [
      { q: "Can you give me some ___ on my level design? (retours)", a: "feedback", e: "feedback est indénombrable : pas de -s." },
      { q: "Thanks for the ___! (conseils)", a: "advice", e: "advice est indénombrable. Le verbe = to advise." },
      { q: "We made a lot of ___ this week. (progrès)", a: "progress", e: "progress est indénombrable." },
      { q: "Here's ___ useful piece of information.", a: "a", e: "useful commence par le son « you » → a." },
      { q: "How ___ time do we have left?", a: "much", e: "time (indénombrable) → much." },
      { q: "How ___ bugs are left in the backlog?", a: "many", e: "bugs (dénombrable) → many." },
      { q: "The news ___ (be) good: we got the funding!", a: "is|'s", e: "news est singulier." },
      { q: "We need to buy new ___ for the mocap studio. (équipement)", a: "equipment", e: "equipment est indénombrable." },
      { q: "The people in my team ___ (be) great.", a: "are|'re", e: "people est pluriel." },
      { q: "We've had ___ crashes than last week. (moins de)", a: "fewer|less", e: "crashes est dénombrable → fewer (less est courant à l'oral mais incorrect)." }
    ]
  },
  {
    id: "prepositions", kind: "grammar", title: "Prépositions : in / on / at",
    lesson: `
      <table>
        <tr><th>at</th><td>heure précise, moments</td><td>at 10 am, at night, at lunchtime, at the weekend (UK)</td></tr>
        <tr><th>on</th><td>jours, dates</td><td>on Friday, on 15 March, on Monday morning</td></tr>
        <tr><th>in</th><td>mois, années, parties de journée, « dans X temps »</td><td>in May, in 2023, in the morning, in ten minutes</td></tr>
      </table>
      <h3>Au boulot</h3>
      <div class="ex">at work, at the office — in a meeting — <b>on</b> a call, <b>on</b> Slack, <b>on</b> Teams, <b>on</b> the screen — in the build</div>`,
    ex: [
      { q: "The stand-up is ___ 10 am.", a: "at", e: "Heure précise → at." },
      { q: "The release is ___ Friday.", a: "on", e: "Jour → on." },
      { q: "We shipped the game ___ 2023.", a: "in", e: "Année → in." },
      { q: "I'll be back ___ ten minutes.", a: "in", e: "« dans 10 minutes » → in." },
      { q: "Let's discuss it ___ Slack.", a: "on", e: "Plateformes → on Slack, on Teams." },
      { q: "I'm ___ a call, I'll ping you after.", a: "on", e: "on a call." },
      { q: "The milestone is ___ 15 March.", a: "on", e: "Date → on." },
      { q: "I usually work better ___ the morning.", a: "in", e: "in the morning / afternoon / evening (mais at night)." },
      { q: "Are you working ___ the weekend?", a: "at|on", e: "at the weekend (UK), on the weekend (US)." },
      { q: "I'm ___ work until 6.", a: "at", e: "at work." }
    ]
  },
  {
    id: "make-do", kind: "grammar", title: "Make vs do",
    lesson: `
      <p><b>make</b> = créer, produire un résultat. <b>do</b> = effectuer une activité, une tâche.</p>
      <table>
        <tr><th>make</th><td>a decision, a mistake, a plan, a change, a call, sense, progress, an effort, money, a suggestion</td></tr>
        <tr><th>do</th><td>a task, your job, research, a favour, your best, a review, the dishes, business, some testing</td></tr>
      </table>`,
    ex: [
      { q: "I need to ___ a decision.", a: "make", e: "make a decision." },
      { q: "Can you ___ me a favour?", a: "do", e: "do someone a favour." },
      { q: "We ___ a lot of mistakes in the first prototype.", a: "made", e: "make a mistake (passé : made)." },
      { q: "I'm ___ some research on procedural generation.", a: "doing", e: "do research." },
      { q: "Let's ___ a plan before we start.", a: "make", e: "make a plan." },
      { q: "She ___ a great job on the UI.", a: "did", e: "do a great job (passé : did)." },
      { q: "Don't ___ any changes to main without a review.", a: "make", e: "make a change." },
      { q: "I've ___ my best.", a: "done", e: "do your best (PP : done)." },
      { q: "It doesn't ___ sense.", a: "make", e: "make sense." },
      { q: "We're ___ good progress.", a: "making", e: "make progress." }
    ]
  },
  {
    id: "questions", kind: "grammar", title: "Poser des questions",
    lesson: `
      <p>Structure : <b>(mot interrogatif) + auxiliaire + sujet + verbe</b>.</p>
      <div class="ex"><span class="bad">You pushed your changes?</span> → <span class="good">Did you push your changes?</span></div>
      <h3>Questions indirectes : ordre normal !</h3>
      <div class="ex"><span class="bad">Do you know where is the file?</span> → <span class="good">Do you know where the file is?</span></div>
      <h3>Who / What sujet : pas de do</h3>
      <div class="ex"><span class="bad">Who did write this?</span> → <span class="good">Who wrote this?</span></div>
      <h3>Question tags</h3>
      <div class="ex">It's a quick fix, <b>isn't it</b>? — You've tested it, <b>haven't you</b>?</div>`,
    ex: [
      { q: "___ you push your changes yesterday?", a: "Did", e: "Question au passé → Did." },
      { q: "What ___ you working on right now?", a: "are", e: "Present continuous → are you working." },
      { q: "Where ___ the build logs stored?", a: "are", e: "Passif au présent : are + sujet + stored." },
      { q: "Do you know where the build logs ___ (be)?", a: "are", e: "Question indirecte → ordre affirmatif : the logs are." },
      { q: "Who ___ (write) this shader?", a: "wrote", e: "Who sujet → pas de did." },
      { q: "How long ___ it take to compile?", a: "does", e: "Present simple, 3e pers. → does." },
      { q: "You've tested it on console, ___ you?", a: "haven't", e: "Tag : auxiliaire inversé (have → haven't)." },
      { q: "Can you tell me what time the meeting ___ (start)?", a: "starts", e: "Question indirecte → ordre affirmatif : the meeting starts." },
      { q: "Why ___ the game crash on launch?", a: "does", e: "Present simple 3e pers. → does." },
      { q: "It's a quick fix, ___ it?", a: "isn't", e: "Tag : is → isn't." }
    ]
  },
  {
    id: "ing-to", kind: "grammar", title: "-ing ou to + verbe ?",
    lesson: `
      <table>
        <tr><th>+ -ing</th><td>enjoy, avoid, finish, mind, suggest, keep, consider, look forward to, be used to, après une préposition (for, about, without, before…)</td></tr>
        <tr><th>+ to</th><td>want, need, decide, plan, agree, manage, hope, try, forget, would like</td></tr>
      </table>
      <div class="ex"><span class="bad">I look forward to work with you</span> → <span class="good">I look forward to working with you</span></div>
      <h3>used to</h3>
      <ul>
        <li><b>used to + base</b> : habitude passée. <i>I used to work at Ubisoft.</i></li>
        <li><b>be used to + -ing</b> : être habitué à. <i>I'm used to working remotely.</i></li>
      </ul>`,
    ex: [
      { q: "I'm looking forward to ___ (work) with you.", a: "working", e: "look forward to + -ing." },
      { q: "We decided ___ (cut) the multiplayer mode.", a: "to cut", e: "decide + to." },
      { q: "Would you mind ___ (send) me the link?", a: "sending", e: "mind + -ing." },
      { q: "I suggest ___ (profile) the game before optimising.", a: "profiling", e: "suggest + -ing." },
      { q: "We managed ___ (fix) it before the deadline.", a: "to fix", e: "manage + to." },
      { q: "Thanks for ___ (help) me.", a: "helping", e: "Après une préposition (for) → -ing." },
      { q: "Keep ___ (try), you'll get there.", a: "trying", e: "keep + -ing." },
      { q: "I'm used to ___ (work) remotely.", a: "working", e: "be used to + -ing." },
      { q: "I used to ___ (work) at a mobile studio.", a: "work", e: "used to + base verbale (habitude passée)." },
      { q: "Avoid ___ (commit) directly to main.", a: "committing", e: "avoid + -ing." }
    ]
  },
  {
    id: "comparatives", kind: "grammar", title: "Comparatifs & superlatifs",
    lesson: `
      <table>
        <tr><th>court (1 syllabe, ou 2 en -y)</th><td>fast → fast<b>er</b> → the fast<b>est</b>; easy → eas<b>ier</b></td></tr>
        <tr><th>long</th><td>complicated → <b>more</b> complicated → the <b>most</b> complicated</td></tr>
        <tr><th>irréguliers</th><td>good → better → best; bad → worse → worst; far → further</td></tr>
      </table>
      <div class="ex"><span class="bad">more easy, more fast</span> → <span class="good">easier, faster</span></div>
      <p><i>as … as</i> = aussi … que. <i>The more…, the more…</i> = plus…, plus…</p>`,
    ex: [
      { q: "This version is ___ (fast) than the previous one.", a: "faster", e: "Adjectif court → -er." },
      { q: "The new UI is ___ (easy) to use than the old one.", a: "easier", e: "easy → easier (pas more easy)." },
      { q: "This is the ___ (good) build we've had.", a: "best", e: "good → better → best." },
      { q: "This bug is ___ (bad) than I thought.", a: "worse", e: "bad → worse → worst." },
      { q: "It's ___ (complicated) than it looks.", a: "more complicated", e: "Adjectif long → more." },
      { q: "This is the ___ (interesting) project I've worked on.", a: "most interesting", e: "Adjectif long → the most." },
      { q: "The game runs ___ (well) on PC than on Switch.", a: "better", e: "well → better." },
      { q: "It's not as ___ (hard) as it looks.", a: "hard", e: "as + adjectif simple + as." },
      { q: "The more we test, the ___ (few) bugs we ship.", a: "fewer", e: "few → fewer." }
    ]
  },
  {
    id: "modals", kind: "grammar", title: "Modaux : must, have to, should…",
    lesson: `
      <table>
        <tr><th>must / have to</th><td>obligation</td><td>I have to leave early.</td></tr>
        <tr><th>mustn't</th><td><b>interdiction</b></td><td>You mustn't push to main.</td></tr>
        <tr><th>don't have to</th><td><b>pas obligé</b></td><td>You don't have to come, it's optional.</td></tr>
        <tr><th>should</th><td>conseil</td><td>You should talk to the lead.</td></tr>
        <tr><th>could / might / may</th><td>possibilité</td><td>It might be a driver issue.</td></tr>
        <tr><th>could / would</th><td>demande polie</td><td>Could you have a look?</td></tr>
      </table>
      <p>⚠️ <b>mustn't ≠ don't have to</b> ! Et pas de « to » après un modal : <span class="bad">I must to go</span>.</p>`,
    ex: [
      { q: "You ___ push directly to main, it's forbidden.", a: "mustn't|must not|can't|cannot", e: "Interdiction → mustn't." },
      { q: "You ___ come to the meeting if you're busy, it's optional.", a: "don't have to|do not have to|don't need to|needn't", e: "Pas obligé → don't have to." },
      { q: "I think you ___ talk to the lead about it. (conseil)", a: "should", e: "Conseil → should." },
      { q: "Yesterday I ___ stay late to fix the build. (obligation passée)", a: "had to", e: "must n'a pas de passé → had to." },
      { q: "It ___ be a driver issue, I'm not sure. (possibilité)", a: "might|may|could", e: "Possibilité incertaine → might / may / could." },
      { q: "___ you help me with this crash, please? (poli)", a: "Could|Can|Would", e: "Demande polie → Could you…?" },
      { q: "I ___ go now, I have a train to catch.", a: "have to|must|'ve got to|have got to|need to", e: "Obligation → have to / must." },
      { q: "You ___ to ask before deleting assets.", a: "need|have|ought", e: "need to / have to + verbe." }
    ]
  },
  {
    id: "confusions", kind: "grammar", title: "Confusions classiques",
    lesson: `
      <table>
        <tr><th>say / tell</th><td>say something — <b>tell someone</b> something</td></tr>
        <tr><th>explain</th><td>explain something <b>to</b> someone (<span class="bad">explain me</span>)</td></tr>
        <tr><th>discuss</th><td>discuss something (<span class="bad">discuss about</span>)</td></tr>
        <tr><th>remind / remember</th><td>remind someone (rappeler à qqn) — remember (se souvenir)</td></tr>
        <tr><th>lend / borrow</th><td>lend = prêter — borrow = emprunter</td></tr>
        <tr><th>wait for, depend on, agree with, listen to</th><td>prépositions fixes</td></tr>
      </table>
      <p class="muted">Écris <b>Ø</b> s'il ne faut rien.</p>`,
    ex: [
      { q: "Can you ___ me what happened?", a: "tell", e: "tell + personne." },
      { q: "She ___ that the build was broken.", a: "said", e: "say + que (pas de personne)." },
      { q: "Can you explain ___ me how this works?", a: "to", e: "explain to someone." },
      { q: "Let's discuss ___ the roadmap.", a: "Ø", e: "discuss something, sans about." },
      { q: "Can you ___ me to send the report?", a: "remind", e: "remind someone to do something." },
      { q: "I'm waiting ___ the build to finish.", a: "for", e: "wait for." },
      { q: "It depends ___ the platform.", a: "on", e: "depend on (pas « of »)." },
      { q: "I agree ___ you.", a: "with", e: "agree with someone. Et « I agree », jamais « I am agree »." },
      { q: "Could you ___ me your charger? (prêter)", a: "lend", e: "lend = prêter." },
      { q: "Can I ___ your charger? (emprunter)", a: "borrow", e: "borrow = emprunter." }
    ]
  }
];
