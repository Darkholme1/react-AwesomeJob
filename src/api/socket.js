import io from 'socket.io-client'

const socket = io('ws://192.168.0.104:8081')

export default socket