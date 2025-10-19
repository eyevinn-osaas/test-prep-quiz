import { serverURL } from "./socket";

export async function listPacks(){
  const r = await fetch(`${serverURL}/api/packs`);
  const j = await r.json();
  return j.packs || [];
}