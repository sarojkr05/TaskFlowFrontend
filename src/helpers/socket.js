import { io } from 'socket.io-client';

const socket = io("http://localhost:3300" || "https://taskflowbackend-cbxp.onrender.com", {
    withCredentials: true,
})

export default socket;