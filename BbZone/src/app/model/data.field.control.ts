import { ControlType } from "../enums/dataDisplayType";

export class DataFieldControl {
  constructor(public controlName: string,
              public controlType: ControlType,
              public required: boolean,
              public maxLength?: number,
              public datasourceUrl?: string,
              public cascadeTo?: string,
              public adminField?: boolean,
              public dataChangedEvent? :string
  ) { }

}


export class SearchFieldControl {
    constructor(public controlName: string,
        public controlType: ControlType,
        public maxLength?: number,
        public datasourceUrl?: string,
        public cascadeTo?: string,
        public placeholder?: string

    ) { }

}
