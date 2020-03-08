import { DataFieldControl } from "./data.field.control";

export class FormDataMapping {

  constructor(
    public fieldName: string,
    public displayText: string,
    public readonly: boolean,
    public dataFieldControl?: DataFieldControl
  ) { }
}
