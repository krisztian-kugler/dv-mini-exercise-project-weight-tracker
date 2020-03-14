import { EventEmitter } from "@event-emitter";
import { Entry } from "../models/entry.model";

export default class EventService {
  addEntry$ = new EventEmitter<Entry>();
}
