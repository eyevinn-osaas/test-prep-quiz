import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PlayerJoin(){
  const [code,setCode] = useState("");
  const [name,setName] = useState("");
  const nav = useNavigate();
  return (
    <div style={{maxWidth:420}}>
      <h2 style={{margin:"6px 0"}}>Join a game</h2>
      <div style={{display:"grid",gap:10}}>
        <input placeholder="Room code (e.g. 7H6GQ2)" value={code} onChange={e=>setCode(e.target.value.toUpperCase())}
               style={{background:"#2b335c",color:"#e8ebff",border:"1px solid #3a4478",padding:"12px",borderRadius:12}}/>
        <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)}
               style={{background:"#2b335c",color:"#e8ebff",border:"1px solid #3a4478",padding:"12px",borderRadius:12}}/>
        <button onClick={()=>nav(`/play/${encodeURIComponent(code)}/${encodeURIComponent(name||"Player")}`)}
                style={{background:"#6ee7b7",border:"none",borderRadius:12,padding:"12px 14px",fontWeight:700,cursor:"pointer"}}>
          Join
        </button>
      </div>
    </div>
  );
}