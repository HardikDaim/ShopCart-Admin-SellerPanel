import io from 'socket.io-client';

const socketUrl = process.env.NODE_ENV === 'production'
  ? 'https://shop-cart-backend-green.vercel.app' 
  : 'http://localhost:4000';

const socket = io(socketUrl);