import { Subject, Observer } from "./index";

export class Subscription {
  constructor(public subject: Subject, public observer: Observer) {}

  unsubscribe() {
    this.subject.unsubscribe(this);
  }
}
