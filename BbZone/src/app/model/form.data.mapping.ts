import { DataFieldControl, SearchFieldControl } from "./data.field.control";

export class FormDataMapping {

  constructor(
    public fieldName: string,
    public displayText: string,
    public hidden: boolean,
    public dataFieldControl?: DataFieldControl,

  ) { } 
}

export class SearchFieldMapping {

    constructor(
        public fieldName: string,
        public displayText: string,
        public width: string,
        public dataFieldControl?: SearchFieldControl,

    ) { }
}
