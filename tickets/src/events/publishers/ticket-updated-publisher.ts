import { Publisher, Subjects, TicketUpdatedEvent } from '@poowatickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}