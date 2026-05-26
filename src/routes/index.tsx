import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import coupleFestival from "../assets/couple-festival.jpg";
import coupleDinner from "../assets/couple-dinner.jpg";

export const Route = createFileRoute("/")({
  component: Valentine,
});

const PLAYLIST_URL = "https://open.spotify.com/playlist/COLOQUE_O_LINK_AQUI";
const SPOTIFY_EMBED =
  "https://open.spotify.com/embed/track/71zgAw6PFhleZnH23jAzXK?utm_source=generator&autoplay=1&theme=0";
const START_DATE = new Date("2014-11-14T00:00:00");

type Screen = "landing" | "main" | "message" | "conquistas";

const MESSAGE_PREVIEW =
  "Tinha um dia comum, daqueles que você não espera nada. Eu estava dando rolê no shopping, encontrei a Nanda do nada e parei pra conversar. Você estava na mesa com ela e outras amigas. Você me viu. Eu não te vi...";
const FULL_MESSAGE = `Capítulo 1: Você me viu primeiro

Tinha um dia comum, daquele jeito que você não espera nada de especial.

Eu estava dando rolê no shopping, encontrei a Nanda do nada e parei pra conversar. Você estava na mesa com ela e outras amigas. Você me viu. Eu não te vi.

Mas você não deixou aquilo passar. Me adicionou no Facebook e começou a puxar assunto, batendo papo do nada, com aquela leveza sua que é difícil de resistir. Fui respondendo, fui gostando, fui querendo conversar mais. Você é tão gente boa que é impossível não gostar.

Foi assim que tudo começou, por iniciativa sua, numa mesa de shopping em que eu nem te notei. Sorte a minha que você é mais atenta do que eu.


Capítulo 2: A roupa de vôlei

Eu estava saindo pra uma festa quando decidi.

Subi pro apartamento do meu amigo, tomei banho, escovei o dente (sim, escovei o dente com intenção) e desci. Você tinha acabado de jogar vôlei e ainda estava com aquela roupa. Eu te peguei pela mão, levei até o lado do elevador, e a gente ficou pela primeira vez.

Lembro exatamente do que senti. Achei você bonita, gostei demais de ter ficado com você. Mas não quis dar o braço a torcer, queria ser aquele cara que não se apega, sabe como é. Só que no fundo eu já gostava muito de você, só não admitia nem pra mim mesmo.

A gente continuou se encontrando todo final de semana. Eu ia pra casa do Bubs, você ia pra casa da Nanda, e os dois moravam no mesmo prédio. Conversávamos pelo Snapchat, pelo Facebook. Nas férias eu pegava ônibus pro Belvedere e a gente andava de skate. Ficávamos do lado de fora da Perse, você falava pros seus pais que estava lá e a gente ficava na rua, conversando, andando, se pegando.

Essa época foi muito boa. Eu só pensava em você.


Capítulo 3: As histórias que a gente sempre vai contar

Onze anos dão muita história. Essas são algumas que eu nunca vou esquecer.

O seu pai no bar. Eu estava muito de boa, tranquilo, quando seu pai chegou do nada trocando ideia comigo. A conversa foi indo e então ele apertou meu saco. Literalmente. Fiquei completamente sem reação, não sabia o que falar, o que fazer, o que pensar. Conversamos mais um pouco e eu saí. O melhor é que ele nunca pediu desculpas. Até hoje acho que ele fez isso de propósito pra me testar.

A barraca. Nossa primeira vez foi especial por dois motivos: primeiro porque foi com você, segundo porque foi numa barraca de acampamento. Eu saí da minha, fui pra sua, e o resto a gente sabe. Não existe uma história mais nossa do que essa.

Dubai. Dormindo no mesmo quarto que sua tia, aquele clima de missão impossível, e a gente foi pro banheiro. Até hoje não sei como não fomos descobertos.

A loja no Atlanta. Eu chegava de ônibus do trabalho, te encontrava na loja, ficava um pouco te ajudando e a gente ia junto pra faculdade em Milton Campos. Aos sábados ficávamos contando os minutos pra dar meio-dia e a gente poder ir embora. Tenho que ser honesto: quando lembro dessa época, a primeira coisa que me vem é o quanto você era brava. Mas passava.

As viagens. Austrália. Miami. Califórnia. O sertão nordestino, aquela viagem maluca que só a gente faria. Petrópolis pra buscar a Mel. Cada uma com a sua história, cada uma construindo mais um pedaço do que somos.

O show do Alok no BHDF. Só nós dois. Que noite boa foi aquela.


Capítulo 4: Quem você é

Tenho muito a te falar sobre o que enxergo em você.

Você é, antes de tudo, gente boa. De verdade, daquele jeito raro. Feliz com a vida, com as pessoas, com as pequenas coisas. Pra mim isso vale mais do que qualquer outra coisa, é o que mais importa em uma pessoa.

Além disso você é linda, sabe muito sobre muita coisa (aprendeu bem com sua mãe) e é cuidadosa de um jeito que não é comum. Você está sempre presente. Sempre.

Estivemos juntos em todas as fases: escola, faculdade, primeiro emprego, crescimento. A gente se conhece como ninguém. Essa conexão que temos é uma coisa bizarra de boa, não tem como explicar pra quem está de fora.

Você definitivamente é minha escolha. Todo dia.


Capítulo 5: O que vem pela frente

Onze anos e eu ainda tenho muita coisa pra viver com você.

Já passamos por muita coisa boa e por alguns momentos muito difíceis também. É assim que funciona, a vida não dá desconto pra ninguém. Mas a gente está aqui, crescendo, aprendendo a ser homem e mulher de verdade.

Somos mais do que namorados. Somos parceiros.

Ainda temos muito pra fazer, pra construir, pra melhorar. Mas já posso dizer que a nossa história está escrita com felicidade, amor e muito aprendizado.

Vamos continuar, juntos, pra tudo que vier.

Te amo muito. Muito mesmo.`;

type Achievement = {
  emoji: string;
  name: string;
  color: string;
  photos: string[];
  locked?: boolean;
};

const achievements: Achievement[] = [
  { emoji: "💪", name: "Superamos Momentos Difíceis", color: "#f59e0b", photos: [] },
  { emoji: "🔄", name: "Superamos um Término", color: "#ef4444", photos: [] },
  { emoji: "🥂", name: "10 Reveillons Juntos", color: "#a855f7", photos: [] },
  { emoji: "🏖️", name: "Amamos o Mesmo Lugar: Cumuruxatiba", color: "#38bdf8", photos: [] },
  { emoji: "✈️", name: "1ª Viagem Juntos", color: "#60a5fa", photos: [] },
  { emoji: "🌍", name: "1ª Viagem Internacional Juntos", color: "#34d399", photos: [] },
  { emoji: "👫", name: "1ª Viagem Internacional com Amigos", color: "#818cf8", photos: [] },
  { emoji: "⏳", name: "Mais de 2 Meses Sem Parada", color: "#fb923c", photos: [] },
  { emoji: "🌴", name: "Viagem para a Califórnia", color: "#f472b6", photos: [] },
  { emoji: "🥂", name: "1ª Viagem Juntos a Sós", color: "#facc15", photos: [] },
  { emoji: "🏄", name: "1° Kite Trip", color: "#06b6d4", photos: [] },
  { emoji: "📸", name: "Book de 15", color: "#ec4899", photos: [] },
  // — em breve —
  { emoji: "💍", name: "Noivado", color: "#f9a8d4", photos: [], locked: true },
  { emoji: "👰", name: "Casamento", color: "#fde68a", photos: [], locked: true },
  { emoji: "🎉", name: "Despedida de Solteiro", color: "#86efac", photos: [], locked: true },
  { emoji: "👶", name: "Primeiro Filho", color: "#a5f3fc", photos: [], locked: true },
  { emoji: "🌿", name: "Viagem para a Costa Rica", color: "#6ee7b7", photos: [], locked: true },
  { emoji: "🏠", name: "Nossa Casa Própria", color: "#c4b5fd", photos: [], locked: true },
  { emoji: "🎂", name: "15 Anos Juntos", color: "#fca5a5", photos: [], locked: true },
  { emoji: "🌏", name: "Volta ao Mundo Juntos", color: "#93c5fd", photos: [], locked: true },
];

const pad = (n: number) => String(n).padStart(2, "0");

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
    const prev = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return {
    years: pad(years),
    months: pad(months),
    days: pad(days),
    hours: pad(now.getHours()),
    minutes: pad(now.getMinutes()),
    seconds: pad(now.getSeconds()),
  };
}

const container: CSSProperties = {
  maxWidth: 390,
  margin: "0 auto",
  width: "100%",
  position: "relative",
};

function Valentine() {
  const [screen, setScreen] = useState<Screen>("landing");

  return (
    <div style={{ background: "#121212", minHeight: "100vh" }}>
      <div style={container}>
        {screen === "landing" && <Landing onStart={() => setScreen("main")} />}
        {screen === "main" && (
          <Main
            onMessage={() => setScreen("message")}
            onConquistas={() => setScreen("conquistas")}
          />
        )}
        {screen === "message" && <MessageScreen onBack={() => setScreen("main")} />}
        {screen === "conquistas" && <ConquistasScreen onBack={() => setScreen("main")} />}
      </div>
    </div>
  );
}

/* ============ TELA 1 ============ */
function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div
      style={{
        background: "#121212",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          aria-label="Fechar"
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#333",
            color: "#fff",
            border: "none",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          ✕
        </button>
        <div
          style={{
            background: "#1DB954",
            borderRadius: 20,
            padding: "5px 16px",
            color: "#000",
            fontWeight: 900,
            fontSize: 13,
          }}
        >
          Wrapped
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #f093fb, #f5576c, #4facfe)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 52,
            marginBottom: 36,
          }}
        >
          💝
        </div>
        <h1
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
            margin: 0,
          }}
        >
          Pedro separou um <span style={{ color: "#1DB954" }}>presente</span>{" "}
          especial!
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "#b3b3b3",
            marginTop: 16,
            marginBottom: 48,
            lineHeight: 1.6,
            maxWidth: 280,
          }}
        >
          Um momento único feito com carinho para celebrar a jornada de vocês
        </p>
        <button
          onClick={onStart}
          style={{
            background: "#1DB954",
            borderRadius: 50,
            padding: "16px 56px",
            fontSize: 16,
            fontWeight: 900,
            color: "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          Ver Presente
        </button>
      </div>

      <div
        style={{
          borderTop: "1px solid #2a2a2a",
          padding: "12px 0 20px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {[
          { icon: "🏠", label: "Início" },
          { icon: "🔍", label: "Pesquisar" },
          { icon: "📚", label: "Sua biblioteca" },
        ].map((it) => (
          <div
            key={it.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#b3b3b3",
            }}
          >
            <span style={{ fontSize: 22 }}>{it.icon}</span>
            <span style={{ fontSize: 10, marginTop: 2 }}>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ TELA 2 ============ */
function Main({
  onMessage,
  onConquistas,
}: {
  onMessage: () => void;
  onConquistas: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = useCountdown();

  const cells = [
    { v: t.years, l: "Anos" },
    { v: t.months, l: "Meses" },
    { v: t.days, l: "Dias" },
    { v: t.hours, l: "Horas" },
    { v: t.minutes, l: "Minutos" },
    { v: t.seconds, l: "Segundos" },
  ];

  return (
    <div
      style={{
        background: "#121212",
        minHeight: "100vh",
        paddingBottom: 80,
      }}
    >
      {/* BLOCO A — Player */}
      <div style={{ padding: "16px 20px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span style={{ color: "#fff", fontSize: 24, cursor: "pointer" }}>⌄</span>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 800 }}>
            Juntos para sempre ❤️
          </span>
          <span style={{ color: "#b3b3b3", fontSize: 20, cursor: "pointer" }}>⋯</span>
        </div>

        <div
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            marginBottom: 24,
          }}
        >
          <img
            src={coupleFestival}
            alt="Pedro e Layla"
            width={1024}
            height={1024}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "32px 16px 12px",
              background:
                "linear-gradient(transparent, rgba(0,0,0,0.6))",
              color: "rgba(255,255,255,0.7)",
              fontStyle: "italic",
              fontSize: 12,
            }}
          >
            juntos para sempre
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 12,
          }}
        >
          <div>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 900 }}>
              Amor Puro
            </div>
            <div
              style={{ color: "#b3b3b3", fontSize: 14, marginTop: 2 }}
            >
              Djavan
            </div>
          </div>
          <div style={{ color: "#1DB954", fontSize: 26 }}>✓</div>
        </div>

        <div style={{ marginBottom: 4 }}>
          <div
            style={{
              background: "#4a4a4a",
              borderRadius: 2,
              height: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "#fff",
                height: "100%",
                width: isPlaying ? "8%" : "2%",
                transition: "width 1s linear",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#b3b3b3",
              fontSize: 11,
              marginTop: 4,
            }}
          >
            <span>0:05</span>
            <span>-4:42</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 0 16px",
          }}
        >
          <span style={{ color: "#b3b3b3", fontSize: 20 }}>⇄</span>
          <span style={{ color: "#fff", fontSize: 22 }}>⏮</span>
          <button
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#fff",
              border: "none",
              color: "#000",
              fontSize: 26,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <span style={{ color: "#fff", fontSize: 22 }}>⏭</span>
          <span style={{ color: "#b3b3b3", fontSize: 20 }}>↻</span>
        </div>

        <div
          style={{
            maxHeight: isPlaying ? 80 : 0,
            overflow: "hidden",
            transition: "max-height 0.4s ease",
            marginBottom: isPlaying ? 16 : 0,
          }}
        >
          {isPlaying && (
            <iframe
              title="Spotify Embed"
              src={SPOTIFY_EMBED}
              width="100%"
              height={80}
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              style={{ borderRadius: 12, display: "block" }}
            />
          )}
        </div>
      </div>

      {/* BLOCO B — Sobre o casal */}
      <div
        style={{
          margin: "0 16px 16px",
          borderRadius: 20,
          overflow: "hidden",
          background: "#1a1a2e",
        }}
      >
        <div
          style={{
            padding: "14px 16px 10px",
            borderBottom: "1px solid #2a2a3a",
            color: "#b3b3b3",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          Sobre o casal
        </div>
        <div style={{ height: 280, overflow: "hidden", position: "relative" }}>
          <img
            src={coupleDinner}
            alt="Pedro e Layla jantar"
            loading="lazy"
            width={1024}
            height={1024}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 35%",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 60,
              background: "linear-gradient(transparent, #1a1a2e)",
            }}
          />
        </div>
        <div style={{ padding: 20 }}>
          <div
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: 900,
              marginBottom: 2,
            }}
          >
            Pedro e Layla
          </div>
          <div
            style={{ color: "#b3b3b3", fontSize: 13, marginBottom: 24 }}
          >
            Juntos desde 2014
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              columnGap: 8,
              rowGap: 16,
            }}
          >
            {cells.map((c) => (
              <div key={c.l} style={{ textAlign: "left" }}>
                <div
                  style={{
                    color: "#fff",
                    fontSize: 28,
                    fontWeight: 900,
                    letterSpacing: "-1px",
                  }}
                >
                  {c.v}
                </div>
                <div
                  style={{
                    color: "#aaa",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "1.2px",
                  }}
                >
                  {c.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BLOCO C — Mensagem */}
      <div
        style={{
          margin: "0 16px 16px",
          borderRadius: 20,
          background: "#4da6ff",
          padding: 20,
        }}
      >
        <div
          style={{
            color: "rgba(0,40,90,0.8)",
            fontSize: 12,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: 12,
          }}
        >
          MENSAGEM ESPECIAL
        </div>
        <div
          style={{
            color: "#003566",
            fontSize: 19,
            fontWeight: 900,
            lineHeight: 1.45,
            WebkitMaskImage:
              "linear-gradient(180deg, #000 60%, transparent 100%)",
            maskImage:
              "linear-gradient(180deg, #000 60%, transparent 100%)",
            marginBottom: 16,
          }}
        >
          {MESSAGE_PREVIEW}
        </div>
        <button
          onClick={onMessage}
          style={{
            background: "rgba(0,0,0,0.18)",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: 20,
            padding: "10px 22px",
            color: "#fff",
            fontSize: 14,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Mostrar Mensagem
        </button>
      </div>

      {/* BLOCO D */}
      <div style={{ margin: "0 16px 16px" }}>
        <div
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: 900,
            marginBottom: 14,
          }}
        >
          Conheça Pedro e Layla
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
          }}
        >
          {[
            {
              label: "Nossos Dates",
              grad: "linear-gradient(135deg, #f093fb, #f5576c)",
              emoji: "💑",
            },
            {
              label: "Fotos aleatórias",
              grad: "linear-gradient(135deg, #4facfe, #00f2fe)",
              emoji: "📸",
            },
            {
              label: "Primeira viagem",
              grad: "linear-gradient(135deg, #43e97b, #38f9d7)",
              emoji: "✈️",
            },
          ].map((a) => (
            <div
              key={a.label}
              style={{
                aspectRatio: "0.75",
                borderRadius: 12,
                overflow: "hidden",
                cursor: "pointer",
                background: a.grad,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 36 }}>{a.emoji}</span>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "20px 8px 8px",
                  background:
                    "linear-gradient(transparent, rgba(0,0,0,0.85))",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 800,
                }}
              >
                {a.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BLOCO E — Conquistas */}
      <div
        style={{
          margin: "0 16px 16px",
          background: "#1e1e1e",
          borderRadius: 20,
          padding: "18px 18px 14px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 900 }}>
            Conquistas
          </div>
          <div
            style={{
              background: "#2a2a2a",
              borderRadius: 20,
              padding: "4px 12px",
              color: "#b3b3b3",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            12/20
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
            marginBottom: 14,
          }}
        >
          {achievements.slice(0, 4).map((a) => (
            <div
              key={a.name}
              style={{
                background: "#2a2a2a",
                borderRadius: 14,
                aspectRatio: "1",
                border: `2px solid ${a.color}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              {a.emoji}
            </div>
          ))}
        </div>
        <button
          onClick={onConquistas}
          style={{
            width: "100%",
            background: "transparent",
            border: "1px solid #444",
            borderRadius: 10,
            padding: 12,
            color: "#b3b3b3",
            fontSize: 14,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Ver todas as conquistas →
        </button>
      </div>

      {/* BLOCO F — Playlist */}
      <div style={{ margin: "0 16px 16px" }}>
        <a
          href={PLAYLIST_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "linear-gradient(135deg, #1DB954, #17a348)",
            borderRadius: 20,
            padding: "16px 20px",
            textDecoration: "none",
            transition: "transform 0.2s ease",
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.transform = "scale(0.98)")
          }
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.208c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 11-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 01.207.856zm1.223-2.722a.78.78 0 01-1.072.257C14.5 12.226 11.2 11.68 7.326 12.64a.78.78 0 01-.379-1.512c4.28-1.072 7.925-.483 10.605 1.502a.78.78 0 01.257 1.072zm.105-2.835C15.19 9.125 10.892 8.986 8.34 9.729a.937.937 0 11-.543-1.794c2.93-.888 7.805-.716 10.884 1.208a.937.937 0 01-1.027 1.572l.26-.848z" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontSize: 15, fontWeight: 900 }}>
              Nossa Playlist ❤️
            </div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>
              Abre no Spotify
            </div>
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 20 }}>→</div>
        </a>
      </div>

      {/* BLOCO G — Retrospectiva */}
      <div
        style={{
          background: "#0a0a0a",
          padding: "60px 24px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 60%, rgba(220,20,60,.22), transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(255,20,147,.15), transparent 50%)",
          }}
        />
        {[
          { top: "20%", rot: "-12deg", op: 0.7 },
          { top: "55%", rot: "8deg", op: 0.5 },
          { top: "80%", rot: "-5deg", op: 0.6 },
        ].map((r, i) => (
          <div
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              left: "-50%",
              top: r.top,
              width: "200%",
              height: 3,
              background: `linear-gradient(90deg, transparent, rgba(255,20,147,${r.op}), transparent)`,
              transform: `rotate(${r.rot})`,
              pointerEvents: "none",
            }}
          />
        ))}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              color: "#fff",
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: "-1px",
              marginBottom: 8,
            }}
          >
            Sua Retrospectiva
          </div>
          <div style={{ color: "#888", fontSize: 15, marginBottom: 36 }}>
            Explore o seu tempo de casal
          </div>
          <button
            style={{
              background: "#4da6ff",
              borderRadius: 50,
              padding: "14px 44px",
              fontSize: 16,
              fontWeight: 900,
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Vamos lá
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============ TELA 3 ============ */
function MessageScreen({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ background: "#4da6ff", minHeight: "100vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#4da6ff",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={onBack}
          aria-label="Voltar"
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.2)",
            color: "#fff",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
          }}
        >
          ⌄
        </button>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "rgba(0,40,90,0.7)",
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            Amor Puro
          </div>
          <div style={{ color: "rgba(0,40,90,0.5)", fontSize: 11 }}>
            Djavan
          </div>
        </div>
        <div style={{ width: 38 }} />
      </div>
      <div
        style={{
          padding: "24px 24px 60px",
          color: "#003566",
          fontSize: 22,
          fontWeight: 900,
          lineHeight: 1.55,
          whiteSpace: "pre-line",
        }}
      >
        {FULL_MESSAGE}
      </div>
    </div>
  );
}

/* ============ GALERIA ============ */
function GalleryModal({
  achievement,
  onClose,
}: {
  achievement: Achievement;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const startX = useRef<number | null>(null);

  const hasPhotos = achievement.photos.length > 0;

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) setCurrent((c) => Math.min(c + 1, achievement.photos.length - 1));
    else setCurrent((c) => Math.max(c - 1, 0));
    startX.current = null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.97)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        maxWidth: 390,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid #222",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onClose}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#2a2a2a",
            color: "#fff",
            border: "none",
            fontSize: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          ✕
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22 }}>{achievement.emoji}</span>
          <div>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 800 }}>
              {achievement.name}
            </div>
            {hasPhotos && (
              <div style={{ color: "#888", fontSize: 11 }}>
                {current + 1} / {achievement.photos.length}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {hasPhotos ? (
        <>
          <div
            style={{ flex: 1, position: "relative", overflow: "hidden" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={achievement.photos[current]}
              alt={`${achievement.name} ${current + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
            {achievement.photos.length > 1 && (
              <>
                <button
                  onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
                  disabled={current === 0}
                  style={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    fontSize: 18,
                    cursor: "pointer",
                    opacity: current === 0 ? 0.3 : 1,
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={() =>
                    setCurrent((c) =>
                      Math.min(c + 1, achievement.photos.length - 1)
                    )
                  }
                  disabled={current === achievement.photos.length - 1}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    fontSize: 18,
                    cursor: "pointer",
                    opacity:
                      current === achievement.photos.length - 1 ? 0.3 : 1,
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>
          {/* Dots */}
          {achievement.photos.length > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 6,
                padding: "14px 0",
                flexShrink: 0,
              }}
            >
              {achievement.photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 18 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === current ? achievement.color : "#444",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "width 0.2s ease, background 0.2s ease",
                  }}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: 32,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              border: `3px solid ${achievement.color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            {achievement.emoji}
          </div>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>
            {achievement.name}
          </div>
          <div style={{ color: "#666", fontSize: 14, lineHeight: 1.5 }}>
            As fotos dessa conquista ainda vão ser adicionadas 📷
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ TELA 4 ============ */
function ConquistasScreen({ onBack }: { onBack: () => void }) {
  const [gallery, setGallery] = useState<Achievement | null>(null);

  const unlocked = achievements.filter((a) => !a.locked);
  const locked = achievements.filter((a) => a.locked);
  const total = achievements.length;
  const pct = Math.round((unlocked.length / total) * 100);

  return (
    <div style={{ background: "#121212", minHeight: "100vh" }}>
      {gallery && (
        <GalleryModal achievement={gallery} onClose={() => setGallery(null)} />
      )}

      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#121212",
          borderBottom: "1px solid #2a2a2a",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={onBack}
          aria-label="Voltar"
          style={{
            background: "transparent",
            color: "#fff",
            border: "none",
            fontSize: 26,
            cursor: "pointer",
            width: 26,
          }}
        >
          ⌄
        </button>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 900 }}>
          Conquistas
        </div>
        <div style={{ width: 26 }} />
      </div>

      <div style={{ padding: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#b3b3b3",
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          <span>{unlocked.length}/{total}</span>
          <span>{pct}%</span>
        </div>
        <div
          style={{
            background: "#333",
            borderRadius: 4,
            height: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: "linear-gradient(90deg, #a855f7, #60a5fa)",
              transition: "width 0.6s ease",
            }}
          />
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>
        {/* — conquistadas — */}
        <div
          style={{
            color: "#888",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "1.5px",
            marginBottom: 14,
          }}
        >
          CONQUISTADAS ({unlocked.length})
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 28,
          }}
        >
          {unlocked.map((a) => (
            <div
              key={a.name}
              onClick={() => setGallery(a)}
              style={{
                background: "#1e1e1e",
                border: `2px solid ${a.color}`,
                borderRadius: 16,
                padding: "16px 6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                transition: "transform 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div style={{ fontSize: 26 }}>{a.emoji}</div>
              <div
                style={{
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 800,
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                {a.name}
              </div>
            </div>
          ))}
        </div>

        {/* — em breve — */}
        <div
          style={{
            color: "#555",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "1.5px",
            marginBottom: 14,
          }}
        >
          EM BREVE ({locked.length})
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
          }}
        >
          {locked.map((a) => (
            <div
              key={a.name}
              style={{
                background: "#161616",
                border: `2px solid #2a2a2a`,
                borderRadius: 16,
                padding: "16px 6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                opacity: 0.45,
                filter: "grayscale(0.6)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* shimmer */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2.4s infinite linear",
                }}
              />
              <div style={{ fontSize: 26 }}>{a.emoji}</div>
              <div style={{ fontSize: 12 }}>🔒</div>
              <div
                style={{
                  color: "#666",
                  fontSize: 10,
                  fontWeight: 800,
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                {a.name}
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes shimmer {
            0%   { background-position: -200% 0; }
            100% { background-position:  200% 0; }
          }
        `}</style>

        <button
          style={{
            width: "100%",
            background: "#1e1e1e",
            border: "1px solid #444",
            borderRadius: 50,
            padding: 16,
            color: "#fff",
            fontWeight: 900,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 24,
            marginBottom: 40,
            cursor: "pointer",
          }}
        >
          🔗 COMPARTILHAR CONQUISTAS
        </button>
      </div>
    </div>
  );
}
