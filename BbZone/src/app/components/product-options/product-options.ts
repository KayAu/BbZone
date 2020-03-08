import { Component, Output, EventEmitter } from '@angular/core';;
import { DataService } from 'src/app/services/data.service';
import { ApiController } from 'src/app/enums/apiController';

@Component({
    selector: 'product-options',
    templateUrl: './product-options.html'
})

export class ProductOptions  {
    products: any[];
    @Output() onProductSelected = new EventEmitter();

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.loadOptions();
    }

    loadOptions() {
        this.dataService.getAll(`${ApiController.Dropdown}/GetProducts`).subscribe(results => {
            this.products = results;
        });
    }

    onClick(productId: number) {
        this.onProductSelected.emit(productId);
    }
}


