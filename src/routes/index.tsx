import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import coupleFestival from "../assets/couple-festival.jpg";
import coupleDinner from "../assets/couple-dinner.jpg";

export const Route = createFileRoute("/")({
  component: App,
});

// ── Constants ────────────────────────────────────────────────────────────────

const PIN_CORRECT = "1411";
const START_DATE   = new Date("2014-11-14T00:00:00");
// Um Amor Puro – Djavan | preview CDN (30 s, loop, sem login)
const MUSIC_SRC = "https://p.scdn.co/mp3-preview/0f79ae825508d6be951528ec48a7f286d3bcc943.mp3";

const PINK   = "#D4537E";
const GREEN  = "#5DCAA5";
const PURPLE = "#7F77DD";
const GOLD   = "#FAC775";
const PF     = "'Playfair Display', Georgia, serif";
const MO     = "'Montserrat', Arial, sans-serif";

// ── Types ─────────────────────────────────────────────────────────────────────

type Screen = "lock" | "unlock" | "stories" | "page";
type Photo  = { src: string; legenda: string };
type Achievement = { emoji: string; name: string; color: string };

// ── Story slides config ───────────────────────────────────────────────────────

// Substitua os valores de `src` com as fotos reais quando disponíveis.
// Se o arquivo não existir, o slide mostra um placeholder bonito.
const STORY_SLIDES = [
  {
    type: "music" as const,
  },
  {
    type: "photo" as const,
    src: "/fotos/inicio.png",
    fallbackSrc: coupleDinner,
    label: "14 de novembro de 2014",
    sublabel: "quando tudo começou",
    accent: PINK,
    grad: "linear-gradient(160deg,#2d0a18,#1a0a12)",
    fitMode: "contain" as const,
  },
  {
    type: "photo" as const,
    src: "/fotos/cumuru1.jpg",
    fallbackSrc: null,
    label: "Cumuruxatiba",
    sublabel: "nossa 1ª viagem juntos",
    accent: GREEN,
    grad: "linear-gradient(160deg,#0a1f18,#0a1a14)",
  },
  {
    type: "photo" as const,
    src: "/fotos/internacional.jpg",
    fallbackSrc: coupleFestival,
    label: "1ª Viagem Internacional",
    sublabel: "o mundo ficou pequeno",
    accent: PURPLE,
    grad: "linear-gradient(160deg,#0d0a1f,#0d0d1a)",
  },
  {
    type: "photo" as const,
    src: "/fotos/cumuru2.jpg",
    fallbackSrc: null,
    label: "Cumuruxatiba",
    sublabel: "voltamos. como sempre.",
    accent: GOLD,
    grad: "linear-gradient(160deg,#1f1500,#1a1000)",
  },
  {
    type: "end" as const,
  },
];

// ── Photo gallery data ────────────────────────────────────────────────────────

const p2 = (n: number) => String(n).padStart(2, "0");

const PHOTO_CATEGORIES: { label: string; photos: Photo[] }[] = [
  {
    label: "Casal",
    photos: Array.from({ length: 24 }, (_, i) => ({
      src: `/fotos/casal-${p2(i + 1)}.jpg`,
      legenda: "Casal",
    })),
  },
  {
    label: "Família & Amigos",
    photos: Array.from({ length: 7 }, (_, i) => ({
      src: `/fotos/familia-${p2(i + 1)}.jpg`,
      legenda: "Família & Amigos",
    })),
  },
  {
    label: "Praia",
    photos: [{ src: "/fotos/praia-01.jpg", legenda: "Praia" }],
  },
  {
    label: "A Mel",
    photos: [{ src: "/fotos/mel-01.jpg", legenda: "A Mel" }],
  },
  {
    label: "Mais memórias",
    photos: Array.from({ length: 26 }, (_, i) => ({
      src: `/fotos/fb-${p2(i + 1)}.jpg`,
      legenda: "Memória",
    })),
  },
];

// lista plana usada pelo shuffle e lightbox
const ALL_PHOTOS: Photo[] = PHOTO_CATEGORIES.flatMap(c => c.photos);

// ── Achievements ──────────────────────────────────────────────────────────────

const UNLOCKED: Achievement[] = [
  { emoji: "💪", name: "Superamos Momentos Difíceis", color: "#EF9F27" },
  { emoji: "🔄", name: "Superamos um Término",        color: "#E24B4A" },
  { emoji: "🥂", name: "10 Reveillons Juntos",         color: "#7F77DD" },
  { emoji: "🏖️", name: "Cumuruxatiba",                color: "#378ADD" },
  { emoji: "✈️", name: "1ª Viagem Juntos",            color: "#85B7EB" },
  { emoji: "🌍", name: "1ª Viagem Internacional",     color: "#5DCAA5" },
  { emoji: "👫", name: "Viagem com Amigos",           color: "#AFA9EC" },
  { emoji: "⏳", name: "2 Meses Sem Parada",           color: "#EF9F27" },
  { emoji: "🌴", name: "Califórnia",                  color: "#ED93B1" },
  { emoji: "🥂", name: "Viagem a Sós",                color: "#FAC775" },
  { emoji: "🏄", name: "1° Kite Trip",                color: "#5DCAA5" },
  { emoji: "📸", name: "Book de 15",                  color: "#ED93B1" },
];

const LOCKED: Achievement[] = [
  { emoji: "💍", name: "Noivado",              color: "#f9a8d4" },
  { emoji: "👰", name: "Casamento",            color: "#fde68a" },
  { emoji: "🌅", name: "Lua de Mel",           color: "#fed7aa" },
  { emoji: "🎉", name: "Despedida de Solteiro",color: "#86efac" },
  { emoji: "👶", name: "Primeiro Filho",       color: "#a5f3fc" },
  { emoji: "🏠", name: "Nossa Casa Própria",   color: "#c4b5fd" },
  { emoji: "✈️", name: "Costa Rica",           color: "#6ee7b7" },
  { emoji: "🎂", name: "15 Anos Juntos",       color: "#fca5a5" },
  { emoji: "🌍", name: "Volta ao Mundo",       color: "#93c5fd" },
  { emoji: "🍼", name: "Segundo Filho",        color: "#f9a8d4" },
  { emoji: "🐾", name: "Irmão da Mel",         color: "#86efac" },
  { emoji: "🎓", name: "Nosso Negócio",        color: "#c4b5fd" },
];

// ── Chapters ──────────────────────────────────────────────────────────────────

const CHAPTERS = [
  {
    title: "Você me viu primeiro",
    content: `Tinha um dia comum, daqueles que você não espera nada.

Eu estava dando rolê no shopping, encontrei a Nanda do nada e parei pra conversar. Você estava na mesa com ela e outras amigas. Você me viu. Eu não te vi.

Mas você não deixou aquilo passar. Me adicionou no Facebook e começou a puxar assunto com aquela leveza sua que é difícil de resistir. Fui respondendo, fui gostando, fui querendo conversar mais.

E foi assim que tudo começou, por iniciativa sua, numa mesa de shopping em que eu nem te notei. Sorte a minha que você é mais atenta do que eu.`,
  },
  {
    title: "A roupa de vôlei",
    content: `Eu estava saindo pra uma festa quando decidi.

Subi pro apartamento do meu amigo, tomei banho, escovei o dente (sim, escovei o dente com intenção) e desci. Você tinha acabado de jogar vôlei e ainda estava com aquela roupa. Eu te peguei pela mão, levei até o lado do elevador, e a gente ficou pela primeira vez.

Lembro exatamente do que senti. Achei você bonita, gostei demais. Mas não quis dar o braço a torcer. Só que no fundo eu já gostava muito de você, só não admitia nem pra mim mesmo.

Essa época foi muito boa. Eu só pensava em você.`,
  },
  {
    title: "As histórias que nunca esqueço",
    content: `Onze anos dão muita história. Essas são algumas que eu nunca vou esquecer.

O seu pai no bar. Eu estava muito de boa quando ele chegou trocando ideia comigo. A conversa foi indo e então ele apertou meu saco. Literalmente. Fiquei sem reação. Saí e ele nunca pediu desculpas.

A barraca. Nossa primeira vez foi especial por dois motivos: primeiro porque foi com você, segundo porque foi numa barraca de acampamento.

Dubai. Dormindo no mesmo quarto que sua tia e a gente foi pro banheiro. Até hoje não sei como não fomos descobertos.

As viagens. Austrália. Miami. Califórnia. O sertão nordestino. Petrópolis pra buscar a Mel.

O show do Alok no BHDF. Só nós dois. Que noite boa foi aquela.`,
  },
  {
    title: "Quem você é",
    content: `Você é, antes de tudo, gente boa. De verdade, daquele jeito raro. Feliz com a vida, com as pessoas, com as pequenas coisas.

Além disso você é linda, sabe muito sobre muita coisa (aprendeu bem com sua mãe) e é cuidadosa de um jeito que não é comum. Você está sempre presente. Sempre.

Estivemos juntos em todas as fases: escola, faculdade, primeiro emprego, crescimento. A gente se conhece como ninguém.

Você definitivamente é minha escolha. Todo dia.`,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const pad = (n: number) => String(n).padStart(2, "0");

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useCountdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  let years  = now.getFullYear() - START_DATE.getFullYear();
  let months = now.getMonth()    - START_DATE.getMonth();
  let days   = now.getDate()     - START_DATE.getDate();
  if (days   < 0) { months--; days   += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (months < 0) { years--;  months += 12; }
  return { years, months, days, h: now.getHours(), m: now.getMinutes(), s: now.getSeconds() };
}

function useShuffledPhotos() {
  const [queue, setQueue] = useState<Photo[]>(() => shuffle(ALL_PHOTOS));
  const [idx,   setIdx]   = useState(0);
  const current = queue[idx] ?? ALL_PHOTOS[0];
  function next() {
    if (idx < queue.length - 1) setIdx(i => i + 1);
    else { setQueue(shuffle(ALL_PHOTOS)); setIdx(0); }
  }
  return { current, next };
}

// ── Global CSS ────────────────────────────────────────────────────────────────

const GCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0d0d0d; font-family: 'Montserrat', Arial, sans-serif; }
  @keyframes pulse-op  { 0%,100%{opacity:.35} 50%{opacity:.9} }
  @keyframes bounce-y  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
  @keyframes shimmer   { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes shake     { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
  @keyframes pop-in    { 0%{transform:scale(.85);opacity:0} 100%{transform:scale(1);opacity:1} }
  @keyframes fade-up   { 0%{transform:translateY(16px);opacity:0} 100%{transform:translateY(0);opacity:1} }
  @keyframes glow-pulse{ 0%,100%{box-shadow:0 0 18px ${PINK}44} 50%{box-shadow:0 0 36px ${PINK}88} }
  @keyframes eq-bar    { 0%{transform:scaleY(.2)} 100%{transform:scaleY(1)} }
`;

// ── App root ──────────────────────────────────────────────────────────────────

function App() {
  const [screen, setScreen] = useState<Screen>("lock");
  const [slide,  setSlide]  = useState(0);
  const [alpha,  setAlpha]  = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Chamado DENTRO do handler de clique → browser permite autoplay
  function startMusic() {
    if (!audioRef.current) {
      const a    = new Audio(MUSIC_SRC);
      a.loop     = true;
      a.volume   = 0.75;
      audioRef.current = a;
    }
    audioRef.current.play().catch(() => {});
  }

  function stopMusic() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  function fadeTo(fn: () => void, ms = 420) {
    setAlpha(0);
    setTimeout(() => { fn(); setAlpha(1); }, ms);
  }

  function goSlide(n: number) {
    if (n < 0 || n >= STORY_SLIDES.length) return;
    fadeTo(() => setSlide(n));
  }

  function goPage() { fadeTo(() => setScreen("page"), 600); }

  return (
    <>
      <style>{GCSS}</style>
      <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100dvh", background: "#0d0d0d", position: "relative", fontFamily: MO }}>
        <div style={{ opacity: alpha, transition: `opacity ${screen === "stories" ? ".42s" : ".6s"} ease` }}>
          {screen === "lock"   && <LockScreen    onUnlock={() => fadeTo(() => setScreen("unlock"))} />}
          {screen === "unlock" && <UnlockMessage onStart={() => fadeTo(() => setScreen("stories"))} onMusicStart={startMusic} />}
          {screen === "stories" && <StoriesShell slide={slide} goSlide={goSlide} goPage={goPage} />}
          {screen === "page"   && <FullPage onBackToStories={() => fadeTo(() => { setScreen("stories"); setSlide(0); })} onStopMusic={stopMusic} />}
        </div>
      </div>
    </>
  );
}

// ── Lock screen ───────────────────────────────────────────────────────────────

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin,   setPin]   = useState("");
  const [error, setError] = useState(false);

  function press(d: string) {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      if (next === PIN_CORRECT) {
        setTimeout(onUnlock, 340);
      } else {
        setError(true);
        setTimeout(() => { setError(false); setPin(""); }, 700);
      }
    }
  }

  function del() { setPin(p => p.slice(0, -1)); }

  const dots = Array.from({ length: 4 }, (_, i) => ({
    filled: i < pin.length,
    correct: pin === PIN_CORRECT && i < 4,
  }));

  return (
    <div style={{ minHeight: "100dvh", background: "#0d0d0d", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "60px 32px 48px", textAlign: "center" }}>

      {/* Header */}
      <div style={{ animation: "fade-up .7s ease both" }}>
        <div style={{ fontSize: 40, marginBottom: 20 }}>💝</div>
        <h1 style={{ fontFamily: PF, fontSize: 30, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 10 }}>
          Retrospectiva<br />dos 11 Anos
        </h1>
        <p style={{ color: "rgba(255,255,255,.35)", fontSize: 14, lineHeight: 1.5 }}>
          dia e mês em que tudo começou
        </p>
      </div>

      {/* PIN dots */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div
          style={{
            display: "flex", gap: 18,
            animation: error ? "shake .5s ease" : "none",
          }}
        >
          {dots.map((d, i) => (
            <div
              key={i}
              style={{
                width: 16, height: 16, borderRadius: "50%",
                background: error
                  ? "#E24B4A"
                  : d.filled
                    ? pin.length === 4 && pin === PIN_CORRECT
                      ? GREEN
                      : "#fff"
                    : "rgba(255,255,255,.18)",
                transition: "background .2s, transform .2s",
                transform: d.filled ? "scale(1.15)" : "scale(1)",
                boxShadow: d.filled && !error ? `0 0 10px rgba(255,255,255,.3)` : "none",
              }}
            />
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,.2)", fontSize: 12, letterSpacing: "1px" }}>
          {error ? "senha incorreta" : "digite 4 números"}
        </p>
      </div>

      {/* Keypad */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, width: "100%", maxWidth: 280 }}>
        {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((k, i) => (
          k === "" ? (
            <div key={i} />
          ) : (
            <button
              key={i}
              onClick={() => k === "⌫" ? del() : press(k)}
              style={{
                background: k === "⌫" ? "transparent" : "rgba(255,255,255,.07)",
                border: k === "⌫" ? "none" : "1px solid rgba(255,255,255,.1)",
                borderRadius: 14,
                height: 60,
                color: "#fff",
                fontSize: k === "⌫" ? 22 : 24,
                fontWeight: k === "⌫" ? 400 : 300,
                fontFamily: k === "⌫" ? "inherit" : PF,
                cursor: "pointer",
                transition: "background .15s, transform .1s",
              }}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(.93)")}
              onMouseUp={e   => (e.currentTarget.style.transform = "scale(1)")}
            >
              {k}
            </button>
          )
        ))}
      </div>
    </div>
  );
}

// ── Unlock message ────────────────────────────────────────────────────────────

function UnlockMessage({ onStart, onMusicStart }: { onStart: () => void; onMusicStart: () => void }) {
  return (
    <div style={{ minHeight: "100dvh", background: "#0d0d0d", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 32px", textAlign: "center" }}>
      <div style={{ animation: "pop-in .6s ease both" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: `linear-gradient(135deg,${PINK},#8B1A3C)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 36, margin: "0 auto 32px",
          animation: "glow-pulse 2.5s ease-in-out infinite",
        }}>
          💌
        </div>

        <h2 style={{ fontFamily: PF, fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1.3, marginBottom: 24 }}>
          Pedro guardou algo<br />especial para você.
        </h2>

        <p style={{ color: "rgba(255,255,255,.55)", fontSize: 16, lineHeight: 1.75, marginBottom: 16, fontFamily: PF, fontStyle: "italic" }}>
          São 11 anos de memórias,<br />histórias e muito amor.
        </p>
        <p style={{ color: "rgba(255,255,255,.35)", fontSize: 15, lineHeight: 1.75, marginBottom: 52 }}>
          Prepare o coração. ❤️
        </p>

        <button
          style={{
            background: PINK,
            border: "none",
            borderRadius: 50,
            padding: "16px 52px",
            color: "#fff",
            fontSize: 16,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: `0 8px 28px ${PINK}55`,
            transition: "transform .15s, box-shadow .15s",
          }}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(.96)")}
          onMouseUp={e   => (e.currentTarget.style.transform = "scale(1)")}
          onClick={() => { onMusicStart(); onStart(); }}
        >
          Começar →
        </button>
      </div>
    </div>
  );
}

// ── Stories shell ─────────────────────────────────────────────────────────────

const STORY_BKGS = ["#121212", "#1a0a12", "#0a1f18", "#0d0d1a", "#1a1000", "#1a0a12"];

function StoriesShell({
  slide, goSlide, goPage,
}: {
  slide: number; goSlide: (n: number) => void; goPage: () => void;
}) {
  const tx = useRef({ x: 0, y: 0 });

  function handleTap(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("button,iframe,a")) return;
    const x = e.clientX;
    const w = (e.currentTarget as HTMLElement).clientWidth;
    if (x < w * 0.3) goSlide(slide - 1);
    else if (slide < STORY_SLIDES.length - 1) goSlide(slide + 1);
    else goPage();
  }

  function onTouchStart(e: React.TouchEvent) {
    tx.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    const dy = e.changedTouches[0].clientY - tx.current.y;
    const dx = e.changedTouches[0].clientX - tx.current.x;
    if (slide === STORY_SLIDES.length - 1 && dy > 60 && Math.abs(dy) > Math.abs(dx)) goPage();
  }

  return (
    <div
      onClick={handleTap}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        width: "100%", height: "100dvh",
        background: STORY_BKGS[slide] ?? "#0d0d0d",
        transition: "background .5s ease",
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden", userSelect: "none",
      }}
    >
      <StoryProgress current={slide} total={STORY_SLIDES.length} />

      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {(() => {
          const s = STORY_SLIDES[slide];
          if (s.type === "music") return <SlideMusicIntro />;
          if (s.type === "photo") return <SlidePhoto config={s} />;
          if (s.type === "end")   return <SlideEnd onGoPage={goPage} />;
        })()}
      </div>
    </div>
  );
}

function StoryProgress({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: 4, padding: "14px 14px 0", flexShrink: 0, zIndex: 10, position: "relative" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 2,
          background: i <= current ? "rgba(255,255,255,.82)" : "rgba(255,255,255,.2)",
        }} />
      ))}
    </div>
  );
}

// ── Story slide: Music intro (layout Spotify player) ─────────────────────────

function SlideMusicIntro() {
  // Simula o progresso real da música na tela
  const [secs, setSecs] = useState(29); // começa em 0:29 como no screenshot
  const TOTAL = 327; // 5:27 total

  useEffect(() => {
    const id = setInterval(() => setSecs(s => (s >= TOTAL ? 0 : s + 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const pct      = (secs / TOTAL) * 100;
  const rem      = TOTAL - secs;
  const fmt      = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  // ── SVG icons Spotify-style ──────────────────────────────────────────────────
  const IcoShuffle = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,.45)">
      <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
    </svg>
  );
  const IcoPrev = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
    </svg>
  );
  const IcoPause = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="black">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
  );
  const IcoNext = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
    </svg>
  );
  const IcoRepeat = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,.45)">
      <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
    </svg>
  );
  const IcoConnect = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DB954">
      <path d="M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11z"/>
    </svg>
  );
  const IcoShare = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,.55)">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
    </svg>
  );
  const IcoQueue = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,.55)">
      <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
    </svg>
  );

  return (
    <div style={{
      height: "100%",
      background: "linear-gradient(180deg, #1e3321 0%, #121212 38%)",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>

      {/* ── Top bar ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 22px 8px", flexShrink: 0,
      }}>
        <button style={{ background: "none", border: "none", cursor: "default", padding: "4px 0", lineHeight: 1 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(255,255,255,.7)">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </button>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,.5)", fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", fontFamily: MO, textTransform: "uppercase" }}>
            Djavan &quot;Ao Vivo&quot;
          </p>
        </div>
        <button style={{ background: "none", border: "none", cursor: "default", padding: "4px 0" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,.7)">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </div>

      {/* ── Album art — foto do casal ── */}
      <div style={{ padding: "10px 22px 18px", flexShrink: 0 }}>
        <div style={{
          width: "100%", aspectRatio: "1 / 1",
          borderRadius: 6, overflow: "hidden",
          boxShadow: "0 28px 72px rgba(0,0,0,.7)",
        }}>
          <img
            src="/fotos/casal-01.jpg"
            alt="nós"
            onError={e => { (e.target as HTMLImageElement).src = "/fotos/casal-02.jpg"; }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>

      {/* ── Texto verde e info da faixa ── */}
      <div style={{ padding: "0 22px 10px", flexShrink: 0 }}>
        <p style={{ color: "#1DB954", fontSize: 13, fontWeight: 600, fontFamily: MO, marginBottom: 14, lineHeight: 1.3 }}>
          O que há dentro do meu coração
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ color: "#fff", fontSize: 22, fontWeight: 700, fontFamily: MO, marginBottom: 3, lineHeight: 1.2 }}>
              Um Amor Puro
            </p>
            <p style={{ color: "#b3b3b3", fontSize: 14, fontFamily: MO }}>Djavan</p>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", background: "#1DB954", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="black">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Barra de progresso animada ── */}
      <div style={{ padding: "0 22px 4px", flexShrink: 0 }}>
        <div style={{ position: "relative", height: 4, background: "#535353", borderRadius: 2 }}>
          <div style={{
            position: "absolute", top: 0, left: 0,
            height: "100%", width: `${pct}%`,
            background: "#fff", borderRadius: 2,
            transition: "width 1s linear",
          }}>
            <div style={{
              position: "absolute", right: -6, top: "50%",
              transform: "translateY(-50%)",
              width: 12, height: 12, borderRadius: "50%", background: "#fff",
            }} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ color: "#b3b3b3", fontSize: 11, fontFamily: MO }}>{fmt(secs)}</span>
          <span style={{ color: "#b3b3b3", fontSize: 11, fontFamily: MO }}>-{fmt(rem)}</span>
        </div>
      </div>

      {/* ── Controles ── */}
      <div style={{
        padding: "6px 18px 4px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button style={{ background: "none", border: "none", cursor: "default", padding: 8 }}><IcoShuffle /></button>
        <button style={{ background: "none", border: "none", cursor: "default", padding: 8 }}><IcoPrev /></button>
        <button style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "#fff", border: "none", cursor: "default",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,.4)",
          flexShrink: 0,
        }}>
          <IcoPause />
        </button>
        <button style={{ background: "none", border: "none", cursor: "default", padding: 8 }}><IcoNext /></button>
        <button style={{ background: "none", border: "none", cursor: "default", padding: 8 }}><IcoRepeat /></button>
      </div>

    </div>
  );
}

// ── Story slide: Counter (mantido como fallback) ───────────────────────────────

function SlideCounter() {
  const t = useCountdown();
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "22px 28px 40px" }}>
      <p style={{ color: "rgba(255,255,255,.4)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 24 }}>
        estamos juntos há
      </p>

      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: PF, fontSize: 90, fontWeight: 900, color: GREEN, lineHeight: 1, letterSpacing: "-3px" }}>{t.years}</div>
        <div style={{ color: "rgba(255,255,255,.38)", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", marginTop: 2, fontFamily: MO }}>anos</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        {[
          { v: pad(t.months), l: "meses"   },
          { v: pad(t.days),   l: "dias"    },
          { v: pad(t.h),      l: "horas"   },
          { v: pad(t.m),      l: "minutos" },
        ].map(c => (
          <div key={c.l} style={{ background: "rgba(255,255,255,.05)", borderRadius: 14, padding: "12px 16px" }}>
            <div style={{ fontFamily: MO, fontSize: 30, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{c.v}</div>
            <div style={{ color: "rgba(255,255,255,.32)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", marginTop: 3, fontFamily: MO }}>{c.l}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <div style={{ fontFamily: MO, fontSize: 40, fontWeight: 800, color: PINK, lineHeight: 1 }}>{pad(t.s)}</div>
        <div style={{ color: "rgba(255,255,255,.32)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", fontFamily: MO }}>segundos</div>
      </div>

      <p style={{ color: "rgba(255,255,255,.22)", fontSize: 13, fontStyle: "italic", fontFamily: PF, lineHeight: 1.55, marginTop: "auto" }}>
        e os segundos continuam passando enquanto você lê isso
      </p>
    </div>
  );
}

// ── Story slide: Photo ────────────────────────────────────────────────────────

type PhotoSlideConfig = Extract<typeof STORY_SLIDES[number], { type: "photo" }>;

function SlidePhoto({ config }: { config: PhotoSlideConfig }) {
  const [src, setSrc]     = useState(config.src);
  const [err, setErr]     = useState(false);
  const [tried, setTried] = useState(false);

  useEffect(() => {
    setSrc(config.src);
    setErr(false);
    setTried(false);
  }, [config.src]);

  function handleError() {
    if (!tried && config.fallbackSrc) {
      setSrc(config.fallbackSrc as string);
      setTried(true);
    } else {
      setErr(true);
    }
  }

  return (
    <div style={{ height: "100%", position: "relative" }}>
      {!err ? (
        <img
          src={src}
          alt={config.label}
          onError={handleError}
          style={{ width: "100%", height: "100%", objectFit: (config as any).fitMode ?? "cover", display: "block" }}
        />
      ) : (
        <div style={{
          width: "100%", height: "100%",
          background: config.grad,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 14,
        }}>
          <span style={{ fontSize: 64 }}>📷</span>
          <span style={{ color: "rgba(255,255,255,.3)", fontSize: 14 }}>foto em breve</span>
        </div>
      )}

      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: "auto 0 0 0", padding: "80px 24px 32px", background: "linear-gradient(transparent,rgba(0,0,0,.82))" }}>
        <p style={{ color: "rgba(255,255,255,.55)", fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>
          {config.sublabel}
        </p>
        <p style={{ fontFamily: PF, fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1.25 }}>
          {config.label}
        </p>
        <div style={{ width: 36, height: 3, borderRadius: 2, background: config.accent, marginTop: 14 }} />
      </div>
    </div>
  );
}

// ── Story slide: End ──────────────────────────────────────────────────────────

function SlideEnd({ onGoPage }: { onGoPage: () => void }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 32px" }}>
      <p style={{ color: "rgba(255,255,255,.38)", fontSize: 12, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 20 }}>e tem muito mais</p>
      <h2 style={{ fontFamily: PF, fontSize: 36, fontWeight: 900, color: "#fff", lineHeight: 1.3, marginBottom: 14 }}>
        para lembrar
      </h2>
      <p style={{ color: "rgba(255,255,255,.38)", fontSize: 15, marginBottom: 52 }}>deslize para baixo para ver tudo</p>
      <button
        onClick={e => { e.stopPropagation(); onGoPage(); }}
        style={{ background: "transparent", border: "none", cursor: "pointer", animation: "bounce-y 1.5s ease-in-out infinite", color: PINK, fontSize: 36, lineHeight: 1 }}
      >
        ↓
      </button>
    </div>
  );
}

// ── Spotify mini player ───────────────────────────────────────────────────────

function MiniPlayer({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div style={{ position: "absolute", bottom: 24, right: 16, zIndex: 50, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
      {open && (
        <div onClick={e => e.stopPropagation()} style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,.6)" }}>
          <iframe title="Spotify" src={SPOTIFY_EMBED} width={260} height={80} frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ display: "block" }} />
        </div>
      )}
      <button
        onClick={e => { e.stopPropagation(); onToggle(); }}
        style={{
          width: 44, height: 44, borderRadius: "50%", border: "none", cursor: "pointer",
          background: open ? "#1DB954" : "rgba(255,255,255,.12)",
          backdropFilter: "blur(8px)", fontSize: 20,
          boxShadow: "0 4px 16px rgba(0,0,0,.35)",
          transition: "background .2s",
        }}
      >🎵</button>
    </div>
  );
}

// ── Full page ─────────────────────────────────────────────────────────────────

function FullPage({ onBackToStories, onStopMusic }: { onBackToStories: () => void; onStopMusic: () => void }) {
  const ref  = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fn = () => setShowTop(el.scrollTop > 300);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  }, []);

  return (
    <div ref={ref} style={{ height: "100dvh", overflowY: "auto", background: "#0d0d0d" }}>
      <PageHero   onBack={onBackToStories} />
      <PageConquistas />
      <PageGallery />
      <PageHistoria onStopMusic={onStopMusic} />
      <PageFim />

      {showTop && (
        <button
          onClick={() => ref.current?.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed", bottom: 28, right: 20, width: 46, height: 46,
            borderRadius: "50%", background: PINK, border: "none", color: "#fff",
            fontSize: 18, cursor: "pointer", zIndex: 100,
            boxShadow: `0 4px 20px ${PINK}55`,
          }}
        >↑</button>
      )}
    </div>
  );
}

// ── Page sections ─────────────────────────────────────────────────────────────

function PageHero({ onBack }: { onBack: () => void }) {
  const t = useCountdown();
  const cells = [
    { v: String(t.years),   l: "anos",    big: true  },
    { v: pad(t.months),     l: "meses"               },
    { v: pad(t.days),       l: "dias"                },
    { v: pad(t.h),          l: "h"                   },
    { v: pad(t.m),          l: "min"                 },
    { v: pad(t.s),          l: "s"                   },
  ];
  return (
    <div style={{ padding: "56px 24px 44px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,.06)", position: "relative" }}>
      <button onClick={onBack} style={{ position: "absolute", top: 18, left: 16, background: "rgba(255,255,255,.07)", border: "none", borderRadius: 50, padding: "7px 14px", color: "rgba(255,255,255,.45)", fontSize: 12, cursor: "pointer" }}>
        ← stories
      </button>

      <h1 style={{ fontFamily: PF, fontSize: 40, fontWeight: 900, color: "#fff", margin: "0 0 6px", lineHeight: 1.15 }}>Layla & Pedro</h1>
      <p style={{ color: "rgba(255,255,255,.28)", fontSize: 13, marginBottom: 26 }}>14 de novembro de 2014</p>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", rowGap: 4 }}>
        {cells.map((c, i) => (
          <div key={c.l} style={{ display: "flex", alignItems: "baseline" }}>
            {i > 0 && <span style={{ color: "rgba(255,255,255,.13)", margin: "0 5px" }}>·</span>}
            <span style={{ fontFamily: c.big ? PF : MO, fontWeight: 900, fontSize: c.big ? 22 : 16, color: c.big ? GREEN : "#fff" }}>{c.v}</span>
            <span style={{ color: "rgba(255,255,255,.28)", fontSize: 10, marginLeft: 3, fontFamily: MO }}>{c.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Conquistas ────────────────────────────────────────────────────────────────

function PageConquistas() {
  const total = UNLOCKED.length + LOCKED.length;
  const pct   = Math.round((UNLOCKED.length / total) * 100);
  return (
    <section style={{ padding: "40px 20px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
      <SecTitle>conquistas</SecTitle>
      <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,.4)", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>
        <span>{UNLOCKED.length} / {total}</span><span>{pct}%</span>
      </div>
      <div style={{ background: "#2a2a2a", borderRadius: 4, height: 5, overflow: "hidden", marginBottom: 20 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg,${PURPLE},${PINK})` }} />
      </div>

      <SmLabel>CONQUISTADAS ({UNLOCKED.length})</SmLabel>
      <AchGrid items={UNLOCKED} mb={24} />
      <SmLabel dim>EM BREVE ({LOCKED.length})</SmLabel>
      <AchGrid items={LOCKED} locked />
    </section>
  );
}

function AchGrid({ items, locked, mb }: { items: Achievement[]; locked?: boolean; mb?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: mb ?? 0 }}>
      {items.map(a => <AchCard key={a.name} a={a} locked={locked} />)}
    </div>
  );
}

function AchCard({ a, locked }: { a: Achievement; locked?: boolean }) {
  return (
    <div style={{
      background: locked ? "#111" : "#1e1e1e",
      border: `2px solid ${locked ? "#252525" : a.color}`,
      borderRadius: 14, padding: "12px 6px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
      opacity: locked ? 0.4 : 1,
      filter: locked ? "grayscale(.5)" : "none",
      position: "relative", overflow: "hidden",
    }}>
      {locked && <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,.025) 50%,transparent 60%)", backgroundSize: "200% 100%", animation: "shimmer 2.6s infinite linear" }} />}
      <div style={{ fontSize: 20 }}>{a.emoji}</div>
      {locked && <div style={{ fontSize: 9 }}>🔒</div>}
      <div style={{ color: locked ? "#555" : "#fff", fontSize: 9, fontWeight: 700, textAlign: "center", lineHeight: 1.3, fontFamily: MO }}>{a.name}</div>
    </div>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────

const GAP    = 2;
const ROW_H  = 130;
// padrão de larguras relativas que se repete (Google Photos / iPhone style)
const ROW_PATTERN = [[2, 1], [1, 1, 1], [1, 2], [1, 1, 1]];

function buildRows(photos: Photo[]) {
  const rows: { flex: number; photo: Photo }[][] = [];
  let i = 0, pi = 0;
  while (i < photos.length) {
    const pattern = ROW_PATTERN[pi % ROW_PATTERN.length];
    const row: { flex: number; photo: Photo }[] = [];
    for (const flex of pattern) {
      if (i >= photos.length) break;
      row.push({ flex, photo: photos[i++] });
    }
    if (row.length) rows.push(row);
    pi++;
  }
  return rows;
}

function PageGallery() {
  const { current, next } = useShuffledPhotos();
  const [lightbox, setLightbox]   = useState<number | null>(null);
  const [lbPhoto,  setLbPhoto]    = useState<Photo | null>(null);
  const txStart = useRef(0);

  function openLb(photo: Photo) {
    setLbPhoto(photo);
    setLightbox(ALL_PHOTOS.indexOf(photo));
  }
  function closeLb() { setLightbox(null); setLbPhoto(null); }
  function goPrev() {
    setLightbox(i => {
      if (i === null) return null;
      const next = (i - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length;
      setLbPhoto(ALL_PHOTOS[next]);
      return next;
    });
  }
  function goNext() {
    setLightbox(i => {
      if (i === null) return null;
      const next = (i + 1) % ALL_PHOTOS.length;
      setLbPhoto(ALL_PHOTOS[next]);
      return next;
    });
  }
  function onTouchStart(e: React.TouchEvent) { txStart.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - txStart.current;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) goNext(); else goPrev();
  }

  return (
    <section style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>

      {/* Header */}
      <div style={{ padding: "40px 20px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <SecTitle>nossas memórias</SecTitle>
        <button onClick={next} style={{ background: "rgba(255,255,255,.07)", border: "none", borderRadius: 50, padding: "8px 14px", color: "rgba(255,255,255,.55)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: MO, whiteSpace: "nowrap" }}>
          ↺ aleatória
        </button>
      </div>

      {/* Destaque aleatório */}
      <div onClick={() => openLb(current)} style={{ margin: "0 0 2px", position: "relative", height: 200, overflow: "hidden", cursor: "pointer", background: "#111" }}>
        <PhotoImg photo={current} fill />
        <div style={{ position: "absolute", inset: "auto 0 0 0", padding: "48px 16px 14px", background: "linear-gradient(transparent,rgba(0,0,0,.75))" }}>
          <p style={{ color: "#fff", fontSize: 18, fontFamily: PF, fontStyle: "italic" }}>{current.legenda}</p>
        </div>
      </div>

      {/* Grade por categoria */}
      {PHOTO_CATEGORIES.map(cat => (
        <div key={cat.label}>
          {/* Label categoria */}
          <div style={{ padding: "14px 14px 6px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "rgba(255,255,255,.55)", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: MO }}>
              {cat.label}
            </span>
            <span style={{ color: "rgba(255,255,255,.2)", fontSize: 11, fontFamily: MO }}>
              {cat.photos.length}
            </span>
          </div>

          {/* Mosaico da categoria */}
          <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
            {buildRows(cat.photos).map((row, ri) => (
              <div key={ri} style={{ display: "flex", gap: GAP, height: ROW_H }}>
                {row.map((cell, ci) => (
                  <div
                    key={ci}
                    onClick={() => openLb(cell.photo)}
                    style={{ flex: cell.flex, position: "relative", overflow: "hidden", cursor: "pointer", background: "#111" }}
                  >
                    <PhotoImg photo={cell.photo} fill />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ height: GAP }} />

      {/* Lightbox */}
      {lightbox !== null && lbPhoto && (
        <div
          style={{ position: "fixed", inset: 0, background: "#000", zIndex: 200, display: "flex", flexDirection: "column", maxWidth: 430, margin: "0 auto" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", flexShrink: 0, position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, background: "linear-gradient(rgba(0,0,0,.7),transparent)" }}>
            <button onClick={closeLb} style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: "50%", width: 36, height: 36, color: "#fff", fontSize: 18, cursor: "pointer" }}>✕</button>
            <span style={{ color: "rgba(255,255,255,.6)", fontSize: 12, fontFamily: MO }}>{lightbox + 1} / {ALL_PHOTOS.length}</span>
            <div style={{ width: 36 }} />
          </div>

          <div style={{ flex: 1, position: "relative" }}>
            <PhotoImg photo={lbPhoto} fill contain />
          </div>

          <div style={{ padding: "14px 20px 36px", background: "linear-gradient(transparent,rgba(0,0,0,.8))", position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={goPrev} style={{ background: "rgba(255,255,255,.12)", border: "none", borderRadius: "50%", width: 40, height: 40, color: "#fff", fontSize: 22, cursor: "pointer", opacity: lightbox === 0 ? .3 : 1 }}>‹</button>
            <p style={{ color: "rgba(255,255,255,.8)", fontSize: 15, fontFamily: PF, fontStyle: "italic" }}>{lbPhoto.legenda}</p>
            <button onClick={goNext} style={{ background: "rgba(255,255,255,.12)", border: "none", borderRadius: "50%", width: 40, height: 40, color: "#fff", fontSize: 22, cursor: "pointer", opacity: lightbox === ALL_PHOTOS.length - 1 ? .3 : 1 }}>›</button>
          </div>
        </div>
      )}
    </section>
  );
}

function PhotoImg({ photo, fill, contain }: { photo: Photo; fill?: boolean; contain?: boolean }) {
  const [err, setErr] = useState(false);
  const s: React.CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: contain ? "contain" : "cover", display: "block" }
    : { width: "100%", display: "block" };
  return err ? (
    <div style={{ ...s, background: "#1a1a2e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
      <span style={{ fontSize: 28 }}>📷</span>
      <span style={{ color: "rgba(255,255,255,.3)", fontSize: 10 }}>{photo.legenda}</span>
    </div>
  ) : (
    <img src={photo.src} alt={photo.legenda} onError={() => setErr(true)} style={s} />
  );
}

// ── Nossa História ────────────────────────────────────────────────────────────

function PageHistoria({ onStopMusic }: { onStopMusic: () => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const musicStopped = useRef(false);

  function handleChapterClick(i: number) {
    // Para a música na primeira vez que ela abre um capítulo
    if (!musicStopped.current) {
      musicStopped.current = true;
      onStopMusic();
    }
    setOpen(open === i ? null : i);
  }

  return (
    <section style={{ padding: "40px 20px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
      <SecTitle>nossa história</SecTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CHAPTERS.map((ch, i) => (
          <div key={i} style={{ background: "#141414", border: `1px solid ${open === i ? PINK + "40" : "rgba(255,255,255,.07)"}`, borderRadius: 16, overflow: "hidden", transition: "border-color .2s" }}>
            <button onClick={() => handleChapterClick(i)} style={{ width: "100%", background: "transparent", border: "none", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", gap: 12 }}>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "rgba(255,255,255,.28)", fontSize: 10, marginBottom: 3 }}>Capítulo {i + 1}</div>
                <div style={{ color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: PF }}>{ch.title}</div>
              </div>
              <div style={{ color: "rgba(255,255,255,.3)", fontSize: 20, flexShrink: 0 }}>{open === i ? "−" : "+"}</div>
            </button>
            {open === i && (
              <div style={{ padding: "0 20px 22px", color: "rgba(255,255,255,.68)", fontSize: 15, lineHeight: 1.78, whiteSpace: "pre-line", fontFamily: PF, fontStyle: "italic" }}>
                {ch.content}
              </div>
            )}
          </div>
        ))}

        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,.05)", borderRadius: 16, padding: "22px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: .5 }}>
          <div style={{ fontSize: 26 }}>🔒</div>
          <p style={{ fontFamily: PF, fontStyle: "italic", color: "rgba(255,255,255,.45)", fontSize: 14, textAlign: "center", lineHeight: 1.6 }}>
            "Este capítulo ainda está sendo escrito.<br />Em breve, juntos."
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Encerramento ──────────────────────────────────────────────────────────────

function PageFim() {
  return (
    <section style={{ padding: "80px 32px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 30%,${PINK}18,transparent 60%)`, pointerEvents: "none" }} />
      <div style={{ position: "relative" }}>
        <p style={{ fontFamily: PF, fontSize: 36, fontWeight: 900, color: "#fff", lineHeight: 1.35, marginBottom: 24 }}>
          Te amo muito.<br />Muito mesmo.
        </p>
        <p style={{ color: "rgba(255,255,255,.28)", fontSize: 14 }}>Pedro — novembro de 2025</p>
      </div>
    </section>
  );
}

// ── Micro-components ──────────────────────────────────────────────────────────

function SecTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: PF, fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 18 }}>{children}</h2>;
}

function SmLabel({ children, dim }: { children: React.ReactNode; dim?: boolean }) {
  return <div style={{ color: dim ? "rgba(255,255,255,.2)" : "rgba(255,255,255,.35)", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", marginBottom: 12, fontFamily: MO }}>{children}</div>;
}
