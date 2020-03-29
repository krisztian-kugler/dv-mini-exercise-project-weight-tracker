import { Component, DependencyInjector } from "@core";
import HistoryItemComponent from "../history-item/history-item.component";
import EventService from "../../services/event.service";
import StorageService from "../../services/storage.service";
import { Entry } from "src/app/models/entry.model";
import "./history.component.scss";

@Component({
  selector: "wt-history"
})
export default class HistoryComponent extends HTMLElement {
  private eventService: EventService;
  private storage: StorageService;

  constructor() {
    super();
  }

  addEntry(entry: Entry) {
    const item = document.createElement("wt-history-item") as HistoryItemComponent;
    item.entry = entry;
    item.addEventListener("click", this.deleteEntry.bind(this, item));
    this.querySelector(".list").append(item);
  }

  deleteEntry(element: HistoryItemComponent) {
    /* let index: number;
    for (let i = 0; i < element.parentElement.children.length; i++) {
      if (element.parentElement.children[i] === element) {
        index = i;
        break;
      }
    } */
    // this.storage.entries = this.storage.entries.filter((_, i) => i !== index);
    this.storage.entries = this.storage.entries.filter(entry => entry !== element.entry);
    element.remove();
  }

  connectedCallback() {
    this.eventService = DependencyInjector.inject(this, EventService);
    this.storage = DependencyInjector.inject(this, StorageService);
    this.render();
    this.storage.entries.forEach(entry => this.addEntry(entry));
    this.eventService.addEntry$.subscribe((entry: Entry) => {
      this.addEntry(entry);
    });
  }

  render() {
    this.innerHTML = `
      <h2>History</h2>
      <div class="list"></div>
    `;
  }
}
