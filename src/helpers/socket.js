import { io } from 'socket.io-client';

const socket = io("https://taskflowbackend-cbxp.onrender.com", {
    withCredentials: true,
})

export default socket;