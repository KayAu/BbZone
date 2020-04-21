import { Component, Inject, ViewChild } from '@angular/core';
import { ManageLoginBannerColumns } from '../../metadata/ManageLoginBannerColumns';
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
    selector: 'manage-login-banner',
    templateUrl: './manage-login-banner.html'
})

export class ManageLoginBanner extends ListDataCrud {

    dataRowMapper: TablerowDataMapping[] = [];
    displayType = DataDisplayType;
    controlType = ControlType;
    uploading: boolean;
    selectedFile: null;

    constructor(public loaderService: LoaderService, public dataService: DataService) {
        super(loaderService, dataService, 'BannerId');
    }

    ngOnInit() {

        this.formName = "tableForm";
        this.controllerName = ApiController.LoginBanner;
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchParams = new StatusAndKeywordParams(null, null);
        this.initDataRecord(this.dataRowMapper);
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = ManageLoginBannerColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
            o.headerText,
            DataDisplayType[o.displayType],
            o.keyField,
            o.colWidth));

        return columnMappings;
    }

    clearSelectedFile() {
        this.selectedFile = null;
        this.showNewRow = false;
    }

    fileSelected(file) {
        this.selectedFile = file.files[0];
        console.log(file);
    }

    uploadFile() {
        if (this.selectedFile) {
            const formData = new FormData();

            formData.append("file", this.selectedFile);
            this.uploading = true;
            this.dataService.postForm(ApiController.LoginBanner, formData).subscribe(data => {
                this.uploading = false;
                this.clearSelectedFile();
                this.setListDisplay(data);
                this.resetPageAndColSort();
            });
        }
    }
}
