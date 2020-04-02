import { Component } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { ApiController } from 'src/app/enums/apiController';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'upload-incentives',
    templateUrl: './upload-incentives.html'
})
export class UploadIncentives  {
    uploading: boolean;
    selectedFile: null;
    incentivesNotUpdated: any;

    constructor(private loaderService: LoaderService, private dataService: DataService, private toastr: ToastrService) {}

    ngOnInit() {  }

    fileSelected(file) {
        this.selectedFile = file.files[0];
        console.log(file);
    }

    uploadFile() {
        if (this.selectedFile) {
            const formData = new FormData();
         
            formData.append("file", this.selectedFile);
            this.uploading = true;
            this.dataService.postForm(ApiController.IncentivesUpload, formData).subscribe(data => {
                this.uploading = false;
                this.incentivesNotUpdated = data;
                if (!this.incentivesNotUpdated) {
                    this.toastr.success('The payment incentives is updated successfully', 'Record Updated', { positionClass: 'toast-bottom-full-width' });
                }
            });
        }
    }
}


