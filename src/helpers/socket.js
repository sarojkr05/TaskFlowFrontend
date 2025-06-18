import { io } from 'socket.io-client';

const socket = io("http://localhost:3300", {
    withCredentials: true,
})

export default socket;