import { Module } from "@core";
import HistoryComponent from "./app/components/history/history.component";
import HistoryItemComponent from "./app/components/history-item/history-item.component";
import FormComponent from "./app/components/form/form.component";
import RootComponent from "./app/components/root/root.component";
import "./styles.scss";

@Module({
  components: [RootComponent, FormComponent, HistoryComponent, HistoryItemComponent]
})
export default class App {}
