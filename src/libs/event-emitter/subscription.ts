import { EventEmitter, Observer } from "./index";

export class Subscription {
  constructor(public emitter: EventEmitter, public observer: Observer) {}

  unsubscribe() {
    this.emitter.unsubscribe(this);
  }
}
