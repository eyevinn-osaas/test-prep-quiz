import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import GameMaster from "./pages/GameMaster.jsx";
import PlayerJoin from "./pages/PlayerJoin.jsx";
import PlayerGame from "./pages/PlayerGame.jsx";

const shell = (children) => (
  <div style={{fontFamily:"Poppins, system-ui", color:"#e8ebff", background:"#0f1320", minHeight:"100vh"}}>
    <header style={{display:"flex",justifyContent:"space-between",padding:"12px 16px",background:"#12172b",borderBottom:"1px solid #242b4a"}}>
      <strong style={{fontSize:18,fontWeight:600}}>⚡ Test Prep – Multiplayer</strong>
      <nav style={{display:"flex",gap:12}}>
        <Link to="/gm" style={{color:"#6ee7b7",textDecoration:"none",fontWeight:500}}>Game Master</Link>
        <Link to="/play" style={{color:"#9aa6ff",textDecoration:"none",fontWeight:500}}>Join</Link>
      </nav>
    </header>
    <main style={{maxWidth:960,margin:"16px auto",padding:"0 12px"}}>
      {children}
    </main>
  </div>
);

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/gm" />} />
      <Route path="/gm" element={shell(<GameMaster/>)} />
      <Route path="/play" element={shell(<PlayerJoin/>)} />
      <Route path="/play/:code/:name" element={shell(<PlayerGame/>)} />
      <Route path="*" element={<Navigate to="/gm" />} />
    </Routes>
  );
}