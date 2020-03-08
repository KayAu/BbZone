import { DataDisplayType, ControlType } from "../enums/dataDisplayType";
import { DataFieldControl } from "./data.field.control";

export class TablerowDataMapping {

  constructor(
    public fieldName: string,
    public headerText: string,
    public displayType: DataDisplayType,
    public keyField: boolean,
    public readonly: boolean,
    public colWidth?: string,
    public dataFieldControl?: DataFieldControl
  ) { }
}
