import { Subscription, Observer } from "./index";

interface SubjectShape {
  subscriptions: Subscription[];
  pipeline: Function[];
  subscribe: Function;
  pipe: Function;
}

export class Subject<T = any> implements SubjectShape {
  subscriptions: Subscription[] = [];
  derivedSubjects: Subject[] = [];
  parentSubject: Subject;
  pipeline: Function[];

  next(value: T): void {
    this.subscriptions.forEach(sub => sub.observer.update(value));
    this.derivedSubjects.forEach(ds => ds.next(value));
  }

  subscribe(update?: Function, error?: Function, complete?: Function): Subscription {
    const subscription = new Subscription(this, new Observer(update, error, complete));
    this.subscriptions.push(subscription);
    return subscription;
  }

  unsubscribe(subscription: Subscription): void {
    this.subscriptions = this.subscriptions.filter(s => s !== subscription);
    if (!this.subscriptions.length && this.parentSubject) {
      this.parentSubject.removeDerivedSubject(this);
    }
  }

  pipe(...operators: Function[]): Subject {
    const derivedSubject = new Subject();
    derivedSubject.parentSubject = this;
    derivedSubject.pipeline = operators;
    this.derivedSubjects.push(derivedSubject);
    return derivedSubject;
  }

  removeDerivedSubject(derivedSubject: Subject) {
    this.derivedSubjects = this.derivedSubjects.filter(ds => ds !== derivedSubject);
  }
}
