import nats, { Message, Stan } from "node-nats-streaming";
// @ts-ignore
import { randomBytes } from "crypto";
import { TicketCreatedListener } from './events/ticket-created-listener';

//npm run listen
// @ts-ignore

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});
// @ts-ignore
stan.on('connect', () => {
  console.log('Listener connected to NATS');
    // @ts-ignore
  stan.on('close', () => {
    console.log('NATS connection closed!');
    // @ts-ignore
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});
// @ts-ignore
process.on('SIGINT', () => stan.close());
// @ts-ignore
process.on('SIGTERM', () => stan.close());

 
