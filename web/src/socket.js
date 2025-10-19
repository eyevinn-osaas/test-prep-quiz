import { io } from "socket.io-client";
const SERVER = import.meta.env.VITE_SERVER || window.location.origin; // <= change
export const socket = io(SERVER, { autoConnect: true });
export const serverURL = SERVER;