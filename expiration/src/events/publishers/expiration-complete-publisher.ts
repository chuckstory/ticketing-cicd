import { Publisher, ExpirationCompleteEvent, Subjects } from '@poowatickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;

    
}