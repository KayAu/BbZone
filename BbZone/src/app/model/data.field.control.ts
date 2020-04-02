import { ControlType } from "../enums/dataDisplayType";

export class DataFieldControl {
  constructor(public controlName: string,
              public controlType: ControlType,
              public required: boolean,
              public maxLength?: number,
              public datasourceUrl?: string,
              public cascadeTo?: string,
              public adminField?: boolean
  ) { }

}
