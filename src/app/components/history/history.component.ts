import { Component, DependencyInjector } from "@core";
import EventBus from "../../services/event-bus";
import HistoryItemComponent from "../history-item/history-item.component";
import { Entry } from "src/app/models/entry.model";
import "./history.component.scss";

@Component({
  selector: "wt-history"
})
export default class HistoryComponent extends HTMLElement {
  eventBus: EventBus;

  constructor() {
    super();
  }

  connectedCallback() {
    this.eventBus = DependencyInjector.inject(this, EventBus);
    this.render();

    this.eventBus.addEntry$.subscribe((entry: Entry) => {
      const item = document.createElement("wt-history-item") as HistoryItemComponent;
      item.entry = entry;
      this.querySelector(".list").append(item);
    });
  }

  render() {
    this.innerHTML = /*html*/ `
      <h2>History</h2>
      <div class="list"></div>
    `;
  }
}
