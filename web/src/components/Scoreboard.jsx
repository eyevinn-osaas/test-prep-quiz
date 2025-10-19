import React from "react";

export default function Scoreboard({ players }){
  const sorted = [...(players||[])].sort((a,b)=>b.score-a.score);
  return (
    <div style={{marginTop:12}}>
      <h3 style={{color:"#9aa6ff",margin:"8px 0"}}>Scoreboard</h3>
      <div style={{display:"grid",gap:8}}>
        {sorted.map(p=>(
          <div key={p.name} style={{display:"flex",justifyContent:"space-between",background:"#12183a",border:"1px solid #2b3361",padding:"10px 12px",borderRadius:10}}>
            <div>{p.name}</div>
            <strong style={{color:"#6ee7b7"}}>{p.score}</strong>
          </div>
        ))}
        {sorted.length===0 && <div style={{opacity:.7}}>Waiting for players…</div>}
      </div>
    </div>
  );
}