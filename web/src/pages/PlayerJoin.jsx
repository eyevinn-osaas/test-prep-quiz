import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AVATARS = ["😀", "🤩", "😎", "🥳", "🤓", "🦸", "🦄", "🐱", "🐶", "🐼", "🦊", "🐯", "🦁", "🐸", "🐵", "🦉"];

export default function PlayerJoin(){
  const [code,setCode] = useState("");
  const [name,setName] = useState("");
  const [avatar,setAvatar] = useState(AVATARS[0]);
  const nav = useNavigate();
  return (
    <div style={{maxWidth:480}}>
      <h2 style={{margin:"6px 0"}}>Join a game</h2>
      <div style={{display:"grid",gap:10}}>
        <input placeholder="Room code (e.g. 7H6GQ2)" value={code} onChange={e=>setCode(e.target.value.toUpperCase())}
               style={{background:"#2b335c",color:"#e8ebff",border:"1px solid #3a4478",padding:"12px",borderRadius:12}}/>
        <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)}
               style={{background:"#2b335c",color:"#e8ebff",border:"1px solid #3a4478",padding:"12px",borderRadius:12}}/>

        <div>
          <label style={{display:"block",marginBottom:8,fontSize:14,opacity:0.9}}>Choose your avatar:</label>
          <div style={{display:"grid",gridTemplateColumns:"repeat(8, 1fr)",gap:8}}>
            {AVATARS.map(av => (
              <button
                key={av}
                onClick={() => setAvatar(av)}
                style={{
                  fontSize:32,
                  padding:8,
                  borderRadius:10,
                  border: avatar === av ? "3px solid var(--accent, #6ee7b7)" : "2px solid #3a4478",
                  background: avatar === av ? "var(--panel, #2b335c)" : "#1a1e3e",
                  cursor:"pointer",
                  transition:"all 0.2s",
                  transform: avatar === av ? "scale(1.1)" : "scale(1)"
                }}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        <button onClick={()=>{
          const nameParam = encodeURIComponent(name||"Player");
          const avatarParam = encodeURIComponent(avatar);
          nav(`/play/${encodeURIComponent(code)}/${nameParam}?avatar=${avatarParam}`);
        }}
                style={{background:"#6ee7b7",border:"none",borderRadius:12,padding:"12px 14px",fontWeight:700,cursor:"pointer"}}>
          Join
        </button>
      </div>
    </div>
  );
}