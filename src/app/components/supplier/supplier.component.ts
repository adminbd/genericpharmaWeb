import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../servicios/content-header.service';

@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html'
})

export class SupplierComponent implements OnInit {
    constructor(private _contentHeaderService: ContentHeaderService) { }

    ngOnInit() {
        this._contentHeaderService.setTitleHeader('Proveedores');
    }
}