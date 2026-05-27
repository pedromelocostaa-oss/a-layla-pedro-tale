import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import coupleFestival from "../assets/couple-festival.jpg";
import coupleDinner from "../assets/couple-dinner.jpg";

export const Route = createFileRoute("/")({
  component: App,
});

// ── Constants ────────────────────────────────────────────────────────────────

const START_DATE = new Date("2014-11-14T00:00:00");
const SPOTIFY_EMBED =
  "https://open.spotify.com/embed/track/71zgAw6PFhleZnH23jAzXK?utm_source=generator&autoplay=1&theme=0";

const PINK = "#D4537E";
const GREEN = "#5DCAA5";
const PURPLE = "#7F77DD";
const PF = "'Playfair Display', Georgia, serif";

const SLIDE_BG = [
  "#1a0a12",
  "#0a1a14",
  "#0d0d1a",
  "#1a1000",
  "#0d0d1a",
  "#1a0a12",
];

// ── Types ─────────────────────────────────────────────────────────────────────

type Mode = "stories" | "page";
type Photo = { src: string; legenda: string };
type Achievement = { emoji: string; name: string; color: string };

// ── Data ──────────────────────────────────────────────────────────────────────

const ALL_PHOTOS: Photo[] = [
  { src: coupleFestival, legenda: "Show do Alok" },
  { src: coupleDinner, legenda: "Jantar especial" },
  { src: "/fotos/foto1.jpg", legenda: "Austrália" },
  { src: "/fotos/foto2.jpg", legenda: "Miami" },
  { src: "/fotos/foto3.jpg", legenda: "Califórnia" },
  { src: "/fotos/foto4.jpg", legenda: "Cumuruxatiba" },
  { src: "/fotos/foto5.jpg", legenda: "Sertão Nordestino" },
  { src: "/fotos/foto6.jpg", legenda: "Kite Trip" },
  { src: "/fotos/foto7.jpg", legenda: "Dubai" },
  { src: "/fotos/foto8.jpg", legenda: "Petrópolis com a Mel" },
];

const UNLOCKED: Achievement[] = [
  { emoji: "💪", name: "Superamos Momentos Difíceis", color: "#EF9F27" },
  { emoji: "🔄", name: "Superamos um Término", color: "#E24B4A" },
  { emoji: "🥂", name: "10 Reveillons Juntos", color: "#7F77DD" },
  { emoji: "🏖️", name: "Cumuruxatiba", color: "#378ADD" },
  { emoji: "✈️", name: "1ª Viagem Juntos", color: "#85B7EB" },
  { emoji: "🌍", name: "1ª Viagem Internacional", color: "#5DCAA5" },
  { emoji: "👫", name: "Viagem com Amigos", color: "#AFA9EC" },
  { emoji: "⏳", name: "2 Meses Sem Parada", color: "#EF9F27" },
  { emoji: "🌴", name: "Califórnia", color: "#ED93B1" },
  { emoji: "🥂", name: "Viagem a Sós", color: "#FAC775" },
  { emoji: "🏄", name: "1° Kite Trip", color: "#5DCAA5" },
  { emoji: "📸", name: "Book de 15", color: "#ED93B1" },
];

const LOCKED: Achievement[] = [
  { emoji: "💍", name: "Noivado", color: "#f9a8d4" },
  { emoji: "👰", name: "Casamento", color: "#fde68a" },
  { emoji: "🌅", name: "Lua de Mel", color: "#fed7aa" },
  { emoji: "🎉", name: "Despedida de Solteiro", color: "#86efac" },
  { emoji: "👶", name: "Primeiro Filho", color: "#a5f3fc" },
  { emoji: "🏠", name: "Nossa Casa Própria", color: "#c4b5fd" },
  { emoji: "✈️", name: "Costa Rica", color: "#6ee7b7" },
  { emoji: "🎂", name: "15 Anos Juntos", color: "#fca5a5" },
  { emoji: "🌍", name: "Volta ao Mundo", color: "#93c5fd" },
  { emoji: "🍼", name: "Segundo Filho", color: "#f9a8d4" },
  { emoji: "🐾", name: "Irmão da Mel", color: "#86efac" },
  { emoji: "🎓", name: "Nosso Negócio", color: "#c4b5fd" },
];

const CHAPTERS = [
  {
    title: "Você me viu primeiro",
    content: `Tinha um dia comum, daqueles que você não espera nada.

Eu estava dando rolê no shopping, encontrei a Nanda do nada e parei pra conversar. Você estava na mesa com ela e outras amigas. Você me viu. Eu não te vi.

Mas você não deixou aquilo passar. Me adicionou no Facebook e começou a puxar assunto com aquela leveza sua que é difícil de resistir. Fui respondendo, fui gostando, fui querendo conversar mais. Você é tão gente boa que é impossível não gostar.

E foi assim que tudo começou, por iniciativa sua, numa mesa de shopping em que eu nem te notei. Sorte a minha que você é mais atenta do que eu.`,
  },
  {
    title: "A roupa de vôlei",
    content: `Eu estava saindo pra uma festa quando decidi.

Subi pro apartamento do meu amigo, tomei banho, escovei o dente (sim, escovei o dente com intenção) e desci. Você tinha acabado de jogar vôlei e ainda estava com aquela roupa. Eu te peguei pela mão, levei até o lado do elevador, e a gente ficou pela primeira vez.

Lembro exatamente do que senti. Achei você bonita, gostei demais. Mas não quis dar o braço a torcer, queria ser aquele cara que não se apega. Só que no fundo eu já gostava muito de você, só não admitia nem pra mim mesmo.

Essa época foi muito boa. Eu só pensava em você.`,
  },
  {
    title: "As histórias que nunca esqueço",
    content: `Onze anos dão muita história. Essas são algumas que eu nunca vou esquecer.

O seu pai no bar. Eu estava muito de boa, tranquilo, quando seu pai chegou do nada trocando ideia comigo. A conversa foi indo e então ele apertou meu saco. Literalmente. Fiquei completamente sem reação. Conversamos mais um pouco e eu saí. O melhor é que ele nunca pediu desculpas.

A barraca. Nossa primeira vez foi especial por dois motivos: primeiro porque foi com você, segundo porque foi numa barraca de acampamento. Não existe uma história mais nossa do que essa.

Dubai. Dormindo no mesmo quarto que sua tia e a gente foi pro banheiro. Até hoje não sei como não fomos descobertos.

As viagens. Austrália. Miami. Califórnia. O sertão nordestino. Petrópolis pra buscar a Mel.

O show do Alok no BHDF. Só nós dois. Que noite boa foi aquela.`,
  },
  {
    title: "Quem você é",
    content: `Você é, antes de tudo, gente boa. De verdade, daquele jeito raro. Feliz com a vida, com as pessoas, com as pequenas coisas. Pra mim isso vale mais do que qualquer outra coisa.

Além disso você é linda, sabe muito sobre muita coisa (aprendeu bem com sua mãe) e é cuidadosa de um jeito que não é comum. Você está sempre presente. Sempre.

Estivemos juntos em todas as fases: escola, faculdade, primeiro emprego, crescimento. A gente se conhece como ninguém. Essa conexão que temos é uma coisa bizarra de boa.

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
  let years = now.getFullYear() - START_DATE.getFullYear();
  let months = now.getMonth() - START_DATE.getMonth();
  let days = now.getDate() - START_DATE.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) { years -= 1; months += 12; }
  return { years, months, days, hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() };
}

function useShuffledPhotos() {
  const [queue, setQueue] = useState<Photo[]>(() => shuffle(ALL_PHOTOS));
  const [idx, setIdx] = useState(0);
  const current = queue[idx] ?? ALL_PHOTOS[0];
  function next() {
    if (idx < queue.length - 1) setIdx((i) => i + 1);
    else { setQueue(shuffle(ALL_PHOTOS)); setIdx(0); }
  }
  return { current, next };
}

// ── Global CSS ────────────────────────────────────────────────────────────────

const GCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0d0d0d; }
  @keyframes pulse-text { 0%,100%{opacity:.4} 50%{opacity:1} }
  @keyframes bounce-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes blink-sec { 0%,100%{opacity:1} 50%{opacity:.35} }
`;

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  const [mode, setMode] = useState<Mode>("stories");
  const [slide, setSlide] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [spotOpen, setSpotOpen] = useState(false);

  function fadeTo(fn: () => void, dur = 400) {
    setOpacity(0);
    setTimeout(() => { fn(); setOpacity(1); }, dur);
  }

  function goSlide(n: number) {
    if (n < 0 || n > 5) return;
    fadeTo(() => setSlide(n));
  }

  function goPage() {
    fadeTo(() => setMode("page"), 600);
  }

  function goStories() {
    fadeTo(() => { setMode("stories"); setSlide(0); }, 400);
  }

  return (
    <>
      <style>{GCSS}</style>
      <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100dvh", background: "#0d0d0d", position: "relative" }}>
        <div style={{ opacity, transition: `opacity ${mode === "stories" ? ".4s" : ".6s"} ease` }}>
          {mode === "stories" && (
            <Stories
              slide={slide}
              goSlide={goSlide}
              goPage={goPage}
              spotOpen={spotOpen}
              setSpotOpen={setSpotOpen}
            />
          )}
          {mode === "page" && <FullPage onBackToStories={goStories} />}
        </div>
      </div>
    </>
  );
}

// ── Stories shell ─────────────────────────────────────────────────────────────

function Stories({
  slide, goSlide, goPage, spotOpen, setSpotOpen,
}: {
  slide: number;
  goSlide: (n: number) => void;
  goPage: () => void;
  spotOpen: boolean;
  setSpotOpen: (v: boolean) => void;
}) {
  const txStart = useRef({ x: 0, y: 0 });

  function handleTap(e: React.MouseEvent) {
    const tag = (e.target as HTMLElement).closest("button,iframe,a");
    if (tag) return;
    if (slide === 2) return; // Memórias — só o botão troca foto
    const x = e.clientX;
    const w = (e.currentTarget as HTMLElement).clientWidth;
    if (x < w * 0.33) goSlide(slide - 1);
    else if (slide < 5) goSlide(slide + 1);
    else goPage();
  }

  function onTouchStart(e: React.TouchEvent) {
    txStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  function onTouchEnd(e: React.TouchEvent) {
    const dy = e.changedTouches[0].clientY - txStart.current.y;
    const dx = e.changedTouches[0].clientX - txStart.current.x;
    if (slide === 5 && dy > 60 && Math.abs(dy) > Math.abs(dx)) goPage();
  }

  return (
    <div
      onClick={handleTap}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        width: "100%",
        height: "100dvh",
        background: SLIDE_BG[slide],
        transition: "background 0.5s ease",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <StoryProgress current={slide} total={6} />

      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {slide === 0 && <Slide1 />}
        {slide === 1 && <Slide2 />}
        {slide === 2 && <Slide3 />}
        {slide === 3 && <Slide4 />}
        {slide === 4 && <Slide5 />}
        {slide === 5 && <Slide6 onGoPage={goPage} />}
      </div>

      <MiniPlayer open={spotOpen} onToggle={() => setSpotOpen(!spotOpen)} />
    </div>
  );
}

function StoryProgress({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: 4, padding: "14px 14px 0", flexShrink: 0 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i <= current ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.2)",
          }}
        />
      ))}
    </div>
  );
}

// ── Slide 1 — Abertura ────────────────────────────────────────────────────────

function Slide1() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", textAlign: "center" }}>
      <div style={{
        width: 100, height: 100, borderRadius: "50%",
        background: `linear-gradient(135deg, ${PINK}, #8B1A3C)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 44, fontFamily: PF, fontWeight: 900, color: "#fff",
        marginBottom: 28, boxShadow: `0 0 48px ${PINK}55`,
      }}>
        L
      </div>
      <h1 style={{ fontFamily: PF, fontSize: 36, fontWeight: 900, color: "#fff", margin: "0 0 10px", lineHeight: 1.2 }}>
        Layla & Pedro
      </h1>
      <p style={{ fontSize: 18, color: PINK, margin: "0 0 52px", fontStyle: "italic", fontFamily: PF }}>
        11 anos de história
      </p>
      <p style={{ color: "rgba(255,255,255,.4)", fontSize: 13, letterSpacing: ".5px", animation: "pulse-text 2s ease-in-out infinite" }}>
        toque para começar →
      </p>
    </div>
  );
}

// ── Slide 2 — Tempo Juntos ────────────────────────────────────────────────────

function Slide2() {
  const t = useCountdown();
  const [tick, setTick] = useState(false);
  useEffect(() => {
    setTick(true);
    const id = setTimeout(() => setTick(false), 280);
    return () => clearTimeout(id);
  }, [t.seconds]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "24px 28px 40px" }}>
      <p style={{ color: "rgba(255,255,255,.4)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 28 }}>
        vocês estão juntos há
      </p>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: PF, fontSize: 88, fontWeight: 900, color: GREEN, lineHeight: 1, letterSpacing: "-3px" }}>
          {t.years}
        </div>
        <div style={{ color: "rgba(255,255,255,.4)", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", marginTop: 2 }}>
          anos
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        {[
          { v: pad(t.months), l: "meses" },
          { v: pad(t.days), l: "dias" },
          { v: pad(t.hours), l: "horas" },
          { v: pad(t.minutes), l: "minutos" },
        ].map((c) => (
          <div key={c.l} style={{ background: "rgba(255,255,255,.05)", borderRadius: 14, padding: "14px 18px" }}>
            <div style={{ fontFamily: PF, fontSize: 32, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{c.v}</div>
            <div style={{ color: "rgba(255,255,255,.35)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", marginTop: 3 }}>{c.l}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 14, padding: "12px 18px", display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <div style={{
          fontFamily: PF, fontSize: 42, fontWeight: 700, color: PINK, lineHeight: 1,
          transition: "opacity .15s", opacity: tick ? .3 : 1,
          animation: "blink-sec .9s ease infinite",
        }}>
          {pad(t.seconds)}
        </div>
        <div style={{ color: "rgba(255,255,255,.35)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase" }}>segundos</div>
      </div>

      <p style={{ color: "rgba(255,255,255,.25)", fontSize: 13, fontStyle: "italic", fontFamily: PF, lineHeight: 1.55, marginTop: "auto" }}>
        e os segundos continuam passando enquanto você lê isso
      </p>
    </div>
  );
}

// ── Slide 3 — Memórias ────────────────────────────────────────────────────────

function Slide3() {
  const { current, next } = useShuffledPhotos();
  const [err, setErr] = useState(false);
  useEffect(() => setErr(false), [current]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "16px 20px 24px" }}>
      <p style={{ color: "rgba(255,255,255,.4)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 14, flexShrink: 0 }}>
        uma memória nossa
      </p>

      <div style={{ flex: 1, borderRadius: 16, overflow: "hidden", position: "relative", marginBottom: 14 }} onClick={(e) => e.stopPropagation()}>
        {!err ? (
          <img src={current.src} alt={current.legenda} onError={() => setErr(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1a1a2e,#0d0d1a)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <span style={{ fontSize: 52 }}>📷</span>
            <span style={{ color: "rgba(255,255,255,.3)", fontSize: 14 }}>foto em breve</span>
          </div>
        )}
        <div style={{ position: "absolute", inset: "auto 0 0 0", padding: "52px 20px 20px", background: "linear-gradient(transparent,rgba(0,0,0,.8))" }}>
          <p style={{ color: "#fff", fontSize: 22, fontWeight: 700, fontFamily: PF }}>{current.legenda}</p>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        style={{ background: "transparent", border: `1.5px solid ${PURPLE}`, borderRadius: 50, padding: "13px 24px", color: "#AFA9EC", fontSize: 14, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}
      >
        ↺ próxima memória
      </button>
    </div>
  );
}

// ── Slide 4 — Conquistas ──────────────────────────────────────────────────────

function Slide4() {
  const total = UNLOCKED.length + LOCKED.length;
  const pct = Math.round((UNLOCKED.length / total) * 100);
  return (
    <div style={{ height: "100%", overflowY: "auto", padding: "16px 20px 24px" }}>
      <p style={{ color: "rgba(255,255,255,.4)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 14 }}>
        o que já conquistamos
      </p>

      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,.5)", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>
          <span>{UNLOCKED.length} / {total}</span><span>{pct}%</span>
        </div>
        <div style={{ background: "#2a2a2a", borderRadius: 4, height: 5, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg,${PURPLE},${PINK})` }} />
        </div>
      </div>

      <Label muted>CONQUISTADAS ({UNLOCKED.length})</Label>
      <AchGrid items={UNLOCKED} mb={20} />
      <Label muted dim>EM BREVE ({LOCKED.length})</Label>
      <AchGrid items={LOCKED} locked />
    </div>
  );
}

// ── Slide 5 — O que Construímos ───────────────────────────────────────────────

function Slide5() {
  const items = [
    { e: "🐕", t: "A Mel", d: "nossa cachorrinha, buscada em Petrópolis" },
    { e: "🤝", t: "Parceiros", d: "mais do que namorados, somos parceiros" },
    { e: "👨‍👩‍👧", t: "Duas Famílias", d: "que viraram uma só ao longo dos anos" },
    { e: "📈", t: "Crescimento", d: "escola, faculdade, carreira — juntos em tudo" },
    { e: "🌎", t: "4 Países", d: "e muitos mais pela frente" },
    { e: "❤️", t: "11 Anos", d: "e ainda muita história pra escrever" },
  ];
  return (
    <div style={{ height: "100%", overflowY: "auto", padding: "16px 20px 24px" }}>
      <p style={{ color: "rgba(255,255,255,.4)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 20 }}>
        além de tudo isso
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {items.map((it) => (
          <div key={it.t} style={{ background: "#141428", border: `1px solid ${PURPLE}28`, borderRadius: 16, padding: "16px 14px" }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>{it.e}</div>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 800, marginBottom: 4 }}>{it.t}</div>
            <div style={{ color: "rgba(255,255,255,.4)", fontSize: 11, lineHeight: 1.45 }}>{it.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Slide 6 — Transição ───────────────────────────────────────────────────────

function Slide6({ onGoPage }: { onGoPage: () => void }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 32px" }}>
      <h2 style={{ fontFamily: PF, fontSize: 38, fontWeight: 900, color: "#fff", lineHeight: 1.3, marginBottom: 16 }}>
        e tem muito mais<br />para lembrar
      </h2>
      <p style={{ color: "rgba(255,255,255,.4)", fontSize: 15, marginBottom: 48 }}>
        deslize para baixo para ver tudo
      </p>
      <button
        onClick={(e) => { e.stopPropagation(); onGoPage(); }}
        style={{ background: "transparent", border: "none", cursor: "pointer", animation: "bounce-y 1.5s ease-in-out infinite", color: PINK, fontSize: 36 }}
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
        <div onClick={(e) => e.stopPropagation()} style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,.55)" }}>
          <iframe title="Spotify" src={SPOTIFY_EMBED} width={260} height={80} frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ display: "block" }} />
        </div>
      )}
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
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

// ── Achievement grid + card ───────────────────────────────────────────────────

function AchGrid({ items, locked, mb }: { items: Achievement[]; locked?: boolean; mb?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: mb ?? 0 }}>
      {items.map((a) => <AchCard key={a.name} a={a} locked={locked} />)}
    </div>
  );
}

function AchCard({ a, locked }: { a: Achievement; locked?: boolean }) {
  return (
    <div style={{
      background: locked ? "#111" : "#1e1e1e",
      border: `2px solid ${locked ? "#2a2a2a" : a.color}`,
      borderRadius: 14, padding: "12px 6px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
      opacity: locked ? 0.4 : 1,
      filter: locked ? "grayscale(.5)" : "none",
      position: "relative", overflow: "hidden",
    }}>
      {locked && (
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,.03) 50%,transparent 60%)",
          backgroundSize: "200% 100%", animation: "shimmer 2.6s infinite linear",
        }} />
      )}
      <div style={{ fontSize: 21 }}>{a.emoji}</div>
      {locked && <div style={{ fontSize: 10 }}>🔒</div>}
      <div style={{ color: locked ? "#555" : "#fff", fontSize: 9, fontWeight: 800, textAlign: "center", lineHeight: 1.3 }}>
        {a.name}
      </div>
    </div>
  );
}

// ── Full Page ─────────────────────────────────────────────────────────────────

function FullPage({ onBackToStories }: { onBackToStories: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fn = () => setShowTop(el.scrollTop > 320);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  }, []);

  return (
    <div ref={ref} style={{ height: "100dvh", overflowY: "auto", background: "#0d0d0d" }}>
      <PageHero onBack={onBackToStories} />
      <PageGallery />
      <PageConquistas />
      <PageHistoria />
      <PageFim />

      {showTop && (
        <button
          onClick={() => ref.current?.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed", bottom: 28, right: 20, width: 44, height: 44,
            borderRadius: "50%", background: PINK, border: "none", color: "#fff",
            fontSize: 18, cursor: "pointer", zIndex: 100,
            boxShadow: `0 4px 20px ${PINK}55`,
          }}
        >↑</button>
      )}
    </div>
  );
}

// ── Page: Hero ────────────────────────────────────────────────────────────────

function PageHero({ onBack }: { onBack: () => void }) {
  const t = useCountdown();
  const cells = [
    { v: String(t.years), l: "anos", big: true },
    { v: pad(t.months), l: "meses" },
    { v: pad(t.days), l: "dias" },
    { v: pad(t.hours), l: "h" },
    { v: pad(t.minutes), l: "min" },
    { v: pad(t.seconds), l: "s" },
  ];
  return (
    <div style={{ padding: "56px 24px 44px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,.06)", position: "relative" }}>
      <button onClick={onBack} style={{ position: "absolute", top: 18, left: 16, background: "rgba(255,255,255,.07)", border: "none", borderRadius: 50, padding: "7px 14px", color: "rgba(255,255,255,.45)", fontSize: 12, cursor: "pointer" }}>
        ← stories
      </button>
      <h1 style={{ fontFamily: PF, fontSize: 44, fontWeight: 900, color: "#fff", margin: "0 0 8px", lineHeight: 1.15 }}>Layla & Pedro</h1>
      <p style={{ color: "rgba(255,255,255,.3)", fontSize: 13, marginBottom: 28 }}>14 de novembro de 2014</p>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "4px 0" }}>
        {cells.map((c, i) => (
          <div key={c.l} style={{ display: "flex", alignItems: "baseline" }}>
            {i > 0 && <span style={{ color: "rgba(255,255,255,.15)", margin: "0 6px" }}>·</span>}
            <span style={{ fontFamily: PF, fontWeight: 900, fontSize: c.big ? 22 : 16, color: c.big ? GREEN : "#fff" }}>{c.v}</span>
            <span style={{ color: "rgba(255,255,255,.3)", fontSize: 11, marginLeft: 3 }}>{c.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page: Gallery ─────────────────────────────────────────────────────────────

function PageGallery() {
  const { current, next } = useShuffledPhotos();
  const [focus, setFocus] = useState<Photo | null>(null);

  return (
    <section style={{ padding: "40px 20px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
      <SecTitle>nossas memórias</SecTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {ALL_PHOTOS.map((p, i) => <Thumb key={i} photo={p} onClick={() => setFocus(p)} />)}
      </div>
      <button onClick={next} style={{ width: "100%", background: "transparent", border: `1.5px solid ${PURPLE}`, borderRadius: 50, padding: "12px 20px", color: "#AFA9EC", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
        ↺ memória aleatória: {current.legenda}
      </button>

      {focus && (
        <div onClick={() => setFocus(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.95)", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", maxWidth: 430, margin: "0 auto" }}>
          <Thumb photo={focus} large />
          <p style={{ color: "rgba(255,255,255,.6)", marginTop: 14, fontSize: 15, fontFamily: PF, fontStyle: "italic" }}>{focus.legenda}</p>
          <p style={{ color: "rgba(255,255,255,.2)", fontSize: 11, marginTop: 6 }}>toque para fechar</p>
        </div>
      )}
    </section>
  );
}

function Thumb({ photo, large, onClick }: { photo: Photo; large?: boolean; onClick?: () => void }) {
  const [err, setErr] = useState(false);
  return (
    <div onClick={onClick} style={{ borderRadius: 12, overflow: "hidden", aspectRatio: large ? "4/3" : "1", background: "#1a1a2e", cursor: onClick ? "pointer" : "default", width: large ? "88vw" : "auto", maxWidth: large ? 390 : "auto", position: "relative" }}>
      {!err ? (
        <img src={photo.src} alt={photo.legenda} onError={() => setErr(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <span style={{ fontSize: 30 }}>📷</span>
          <span style={{ color: "rgba(255,255,255,.3)", fontSize: 10 }}>{photo.legenda}</span>
        </div>
      )}
      {!large && !err && (
        <div style={{ position: "absolute", inset: "auto 0 0 0", padding: "22px 8px 8px", background: "linear-gradient(transparent,rgba(0,0,0,.72))", color: "#fff", fontSize: 10, fontWeight: 700 }}>
          {photo.legenda}
        </div>
      )}
    </div>
  );
}

// ── Page: Conquistas ──────────────────────────────────────────────────────────

function PageConquistas() {
  const total = UNLOCKED.length + LOCKED.length;
  const pct = Math.round((UNLOCKED.length / total) * 100);
  return (
    <section style={{ padding: "40px 20px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
      <SecTitle>tudo que já conquistamos</SecTitle>
      <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,.45)", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>
        <span>{UNLOCKED.length} / {total}</span><span>{pct}%</span>
      </div>
      <div style={{ background: "#2a2a2a", borderRadius: 4, height: 5, overflow: "hidden", marginBottom: 22 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg,${PURPLE},${PINK})` }} />
      </div>
      <Label muted>CONQUISTADAS ({UNLOCKED.length})</Label>
      <AchGrid items={UNLOCKED} mb={26} />
      <Label muted dim>EM BREVE ({LOCKED.length})</Label>
      <AchGrid items={LOCKED} locked />
    </section>
  );
}

// ── Page: História ────────────────────────────────────────────────────────────

function PageHistoria() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section style={{ padding: "40px 20px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
      <SecTitle>nossa história</SecTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CHAPTERS.map((ch, i) => (
          <div key={i} style={{ background: "#141414", border: `1px solid ${open === i ? PINK + "44" : "rgba(255,255,255,.07)"}`, borderRadius: 16, overflow: "hidden", transition: "border-color .2s" }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "transparent", border: "none", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", gap: 12 }}>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "rgba(255,255,255,.3)", fontSize: 10, marginBottom: 3 }}>Capítulo {i + 1}</div>
                <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: PF }}>{ch.title}</div>
              </div>
              <div style={{ color: "rgba(255,255,255,.35)", fontSize: 20, flexShrink: 0 }}>{open === i ? "−" : "+"}</div>
            </button>
            {open === i && (
              <div style={{ padding: "0 20px 22px", color: "rgba(255,255,255,.7)", fontSize: 15, lineHeight: 1.75, whiteSpace: "pre-line", fontFamily: PF, fontStyle: "italic" }}>
                {ch.content}
              </div>
            )}
          </div>
        ))}

        {/* Capítulo bloqueado */}
        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,.05)", borderRadius: 16, padding: "22px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: .5 }}>
          <div style={{ fontSize: 28 }}>🔒</div>
          <p style={{ fontFamily: PF, fontStyle: "italic", color: "rgba(255,255,255,.5)", fontSize: 15, textAlign: "center", lineHeight: 1.55 }}>
            "Este capítulo ainda está sendo escrito.<br />Em breve, juntos."
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Page: Encerramento ────────────────────────────────────────────────────────

function PageFim() {
  return (
    <section style={{ padding: "80px 32px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 30%,${PINK}1a,transparent 60%)`, pointerEvents: "none" }} />
      <div style={{ position: "relative" }}>
        <p style={{ fontFamily: PF, fontSize: 38, fontWeight: 900, color: "#fff", lineHeight: 1.35, marginBottom: 24 }}>
          Te amo muito.<br />Muito mesmo.
        </p>
        <p style={{ color: "rgba(255,255,255,.3)", fontSize: 14 }}>Pedro — novembro de 2025</p>
      </div>
    </section>
  );
}

// ── Micro-components ──────────────────────────────────────────────────────────

function SecTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: PF, fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 18 }}>{children}</h2>;
}

function Label({ children, muted, dim }: { children: React.ReactNode; muted?: boolean; dim?: boolean }) {
  return (
    <div style={{ color: dim ? "rgba(255,255,255,.2)" : muted ? "rgba(255,255,255,.35)" : "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "1.5px", marginBottom: 12 }}>
      {children}
    </div>
  );
}
