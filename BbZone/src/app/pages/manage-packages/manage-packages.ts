import { Component, Inject, ViewChild } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { ManagePackageColumns } from '../../metadata/managePackageColumns';
import { TablerowDataMapping } from '../../model/tablerow.data.mapping';
import { DataDisplayType, ControlType } from '../../enums/dataDisplayType';
import { ListDataCrud } from '../../interfaces/ListDataCrud';
import { DataFieldControl } from '../../model/data.field.control';
import { BroadcastService } from '../../services/broadcast.service';
import { DataService } from '../../services/data.service';
import { LoaderService } from '../../loader/loader.service';
import { ApiController } from '../../enums/apiController';
import { StatusAndKeywordParams } from '../../model/search-params';

@Component({
  selector: 'manage-packages',
  templateUrl: './manage-packages.html'
})

export class ManagePackage extends ListDataCrud {
  
    dataRowMapper: TablerowDataMapping[] = [];
    displayType = DataDisplayType;
    controlType = ControlType;

  constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService) {
      super(loaderService, dataService, 'ProdPkgId', formEvent);
  }

  ngOnInit() {

    this.formName = "tableForm";
    this.controllerName = ApiController.ProductPackage;
    this.dataRowMapper = this.getTablerowDataMapping();
    this.searchParams = new StatusAndKeywordParams(null, null);
    this.initDataRecord(this.dataRowMapper);
  }

  getTablerowDataMapping(): TablerowDataMapping[] {
      let columnMappings = ManagePackageColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
      o.headerText,
      DataDisplayType[o.displayType],
      o.keyField,
      o.colWidth,
      !o.dataFieldControl ? null :
        new DataFieldControl(
          o.dataFieldControl.controlName,
          ControlType[o.dataFieldControl.controlType],
          o.dataFieldControl.required,
          o.dataFieldControl.maxLength,
          o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null
    )));

    return columnMappings;
  }
}
