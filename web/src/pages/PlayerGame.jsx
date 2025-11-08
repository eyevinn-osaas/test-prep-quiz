import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../socket";
import QuestionCard from "../components/QuestionCard.jsx";
import Scoreboard from "../components/Scoreboard.jsx";

function applyThemeToDocument(theme) {
  try {
    const root = document.documentElement;
    const vars = theme?.vars || {};
    Object.keys(vars).forEach(k => root.style.setProperty(k, vars[k]));
    if (vars["--bg-image"]) {
      document.body.style.backgroundImage = `url(${vars["--bg-image"]})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    } else {
      document.body.style.backgroundImage = "";
    }
    if (vars["--bg-color"]) {
      document.body.style.backgroundColor = vars["--bg-color"];
    }
  } catch {}
}

function ThemeOverlay({ effects }) {
  if (!effects) return null;
  if (effects.bats) {
    const bats = Array.from({length: 10}, (_,i)=> i);
    return (
      <div style={{position:"fixed", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0}}>
        {bats.map(i=>(
          <div key={i} style={{
            position:"absolute",
            top: `${Math.random()*80}%`,
            left: `${Math.random()*90}%`,
            fontSize: 24 + Math.round(Math.random()*10),
            opacity: 0.6,
            animation: `bat-fly ${8 + Math.random()*6}s ease-in-out ${Math.random()*3}s infinite alternate`
          }}>🦇</div>
        ))}
        <style>{`
          @keyframes bat-fly {
            0% { transform: translateY(-10px) rotate(-10deg); }
            100% { transform: translateY(10px) rotate(10deg); }
          }
        `}</style>
      </div>
    );
  }
  if (effects.snow) {
    const flakes = Array.from({length: 40}, (_,i)=> i);
    return (
      <div style={{position:"fixed", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0}}>
        {flakes.map(i=>(
          <div key={i} style={{
            position:"absolute",
            top: "-5%",
            left: `${Math.random()*100}%`,
            fontSize: 10 + Math.round(Math.random()*14),
            opacity: 0.8,
            animation: `flake-fall ${6 + Math.random()*8}s linear ${Math.random()*4}s infinite`
          }}>❄️</div>
        ))}
        <style>{`
          @keyframes flake-fall {
            0% { transform: translateY(0px); }
            100% { transform: translateY(110vh); }
          }
        `}</style>
      </div>
    );
  }
  return null;
}

export default function PlayerGame(){
  const { code, name } = useParams();
  const nav = useNavigate();

  const [room,setRoom] = useState(null);
  const [q,setQ] = useState(null);
  const [reveal,setReveal] = useState(null);
  const [locked,setLocked] = useState(false);
  const [theme,setTheme] = useState(null);

  const [now, setNow] = useState(Date.now());
  useEffect(()=>{
    const id = setInterval(()=> setNow(Date.now()), 250);
    return ()=> clearInterval(id);
  },[]);
  const timeLeft = room?.status === "question"
    ? Math.max(0, Math.round((room.endsAt - now)/1000))
    : 0;

  useEffect(()=>{
    socket.emit("player:join", { code, name }, (res)=>{
      if(!res?.ok){ alert("Could not join (bad code?)"); nav("/play"); }
    });

    const onUpdate = (r)=> {
      setRoom(r);
      if (r?.theme) {
        setTheme(r.theme);
        applyThemeToDocument(r.theme);
      }
    };
    const onNew = (payload)=>{ setQ(payload.q); setLocked(false); setReveal(null); };
    const onReveal = (payload)=>{ setReveal(payload); setLocked(true); };
    const onEnd = ()=>{ alert("Game finished!"); nav("/play"); };

    socket.on("room:update", onUpdate);
    socket.on("question:new", onNew);
    socket.on("question:reveal", onReveal);
    socket.on("game:ended", onEnd);

    return ()=>{
      socket.off("room:update", onUpdate);
      socket.off("question:new", onNew);
      socket.off("question:reveal", onReveal);
      socket.off("game:ended", onEnd);
    };
  }, [code, name, nav]);

  const answer = (idx)=>{
    if(locked) return;
    setLocked(true);
    socket.emit("player:answer", { code, choiceIndex: idx }, (res)=>{
      if(!res?.ok){ /* ignore */ }
    });
  };

  const qNum = typeof room?.ix === "number" && room.ix >= 0 ? room.ix + 1 : 0;

  return (
    <div style={{position:"relative", zIndex:1}}>
      {theme && <ThemeOverlay effects={theme.effects} />}

      <div style={{marginBottom:10,display:"flex",gap:10,flexWrap:"wrap",opacity:.9}}>
        <span>Room <strong>{code}</strong></span>
        {room?.packTitle && <span>• {room.packTitle}</span>}
        {room && <span>• Q {qNum} / {room.total}</span>}
        {room?.status==="question" && <span>• ⏳ {timeLeft}s</span>}
      </div>

      {q ? (
        <>
          <QuestionCard
            q={q}
            onChoose={answer}
            disabled={locked}
            revealIndex={reveal?.correctIndex}
            timeLeft={room?.status === "question" ? timeLeft : undefined}
            qIndex={room?.ix}
            qTotal={room?.total}
          />
          <div style={{marginTop:8,opacity:.8}}>
            {room?.status==="question"
              ? <>Time left: <strong>{timeLeft}s</strong></>
              : reveal?.winner
                ? <>Winner: <strong style={{color:"var(--good,#6ee7b7)"}}>{reveal.winner}</strong></>
                : <>No correct answer.</>}
          </div>
        </>
      ) : (
        <div>Waiting for the Game Master to start…</div>
      )}

      <Scoreboard players={room?.players}/>
    </div>
  );
}