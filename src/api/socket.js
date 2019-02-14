import io from 'socket.io-client'

const socket = io('ws://127.0.0.1:8081')

export default socket