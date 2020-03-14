import { Observer, Subscription } from "./index";

export class EventEmitter<T = any> {
  subscriptions: Subscription[] = [];
  childEmitters: EventEmitter[] = [];
  parentEmitter: EventEmitter;
  pipeline: Function[];

  next(value: T): void {
    this.subscriptions.forEach(s => s.observer.next(value));
    this.childEmitters.forEach(c => c.next(value));
  }

  subscribe(next?: Function, error?: Function, complete?: Function): Subscription {
    const subscription = new Subscription(this, new Observer(next, error, complete));
    this.subscriptions.push(subscription);
    return subscription;
  }

  unsubscribe(subscription: Subscription): void {
    this.subscriptions = this.subscriptions.filter(s => s !== subscription);
    if (!this.subscriptions.length && this.parentEmitter) {
      this.parentEmitter.removeChildEmitter(this);
    }
  }

  pipe(...operators: Function[]): EventEmitter {
    const childEmitter = new EventEmitter();
    childEmitter.parentEmitter = this;
    childEmitter.pipeline = operators;
    this.childEmitters.push(childEmitter);
    return childEmitter;
  }

  private removeChildEmitter(childEmitter: EventEmitter) {
    this.childEmitters = this.childEmitters.filter(c => c !== childEmitter);
  }
}
