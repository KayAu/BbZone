import { Component, EventEmitter, Input, Output, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getFileNameFromResponseContentDisposition, saveFile } from 'src/app/services/file-download';
import { DataService } from '../../services/data.service';
import { saveAs } from 'file-saver';
@Component({
    selector: 'file-uploader',
    templateUrl: './file-uploader.html',
    styleUrls: ['./file-uploader.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploader),
            multi: true
        }
    ]
})

export class FileUploader implements ControlValueAccessor {
    uploadedFiles: any[] = [];
    onEdit: boolean;
    @Input() readOnly: boolean = false;
    @Input() fileUrl: string;
    @Output() propagateChange: any = () => { };

    constructor(private el: ElementRef, private dataService: DataService) { }


    clear() {
        this.uploadedFiles = null;
        this.propagateChange(null);
    }

    writeValue(files: any): void {
        if (!files) return;
        this.uploadedFiles = files;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    setChangedValue(value) {
        this.propagateChange(value);
    }

    uploadFile(files)
    {
        if (files.length === 0) return;
       
        Array.prototype.push.apply(this.uploadedFiles, files);
        this.propagateChange(this.uploadedFiles);
    }

    removeFile(fileNo: number) {
        this.uploadedFiles[fileNo].deleted = true;
        this.propagateChange(this.uploadedFiles);
        
    }

    getFileSize(filesize) {
 
        return Math.floor(filesize / 1000);
    }

    registerOnTouched() { }
    setDisabledState?() { }

}

