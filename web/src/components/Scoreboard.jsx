import React from "react";

export default function Scoreboard({ players }){
  const sorted = [...(players||[])].sort((a,b)=>b.score-a.score);
  return (
    <div style={{marginTop:12}}>
      <h3 style={{color:"#9aa6ff",margin:"8px 0"}}>Scoreboard</h3>
      <div style={{display:"grid",gap:8}}>
        {sorted.map((p, idx)=>(
          <div key={p.name} style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            background: idx === 0 && sorted.length > 1 ? "linear-gradient(135deg, #2d1b4e 0%, #12183a 100%)" : "#12183a",
            border: idx === 0 && sorted.length > 1 ? "2px solid var(--accent, #6ee7b7)" : "1px solid #2b3361",
            padding:"10px 12px",
            borderRadius:10,
            transition:"all 0.3s"
          }}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:28}}>{p.avatar || "😀"}</span>
              <div>
                {idx === 0 && sorted.length > 1 && <span style={{marginRight:6}}>👑</span>}
                {p.name}
              </div>
            </div>
            <strong style={{color: idx === 0 && sorted.length > 1 ? "var(--accent, #6ee7b7)" : "#6ee7b7", fontSize:18}}>{p.score}</strong>
          </div>
        ))}
        {sorted.length===0 && <div style={{opacity:.7}}>Waiting for players…</div>}
      </div>
    </div>
  );
}