import { Component, DependencyInjector } from "@core";
import HistoryItemComponent from "../history-item/history-item.component";
import EventService from "../../services/event.service";
import StorageService from "../../services/storage.service";
import { Entry } from "src/app/models/entry.model";
import "./history.component.scss";
import { quicksort } from "../../core/utils/quicksort";

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
    this.querySelector(".list").append(item);
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
    console.log(quicksort([9, 23, 4, 9, 3, 29, 6, 46, 44, 54, 10, 8, 1, 136, 78, 11, 5, 2, 0, 22, 18, 20, 7]));

    this.innerHTML = /*html*/ `
      <h2>History</h2>
      <div class="list"></div>
    `;
  }
}
