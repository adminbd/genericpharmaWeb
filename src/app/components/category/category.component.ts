import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../servicios/content-header.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html'
})

export class CategoryComponent implements OnInit {
    constructor(private _contentHeaderService: ContentHeaderService) { }

    ngOnInit() {
        this._contentHeaderService.setTitleHeader('Categorias')
    }
}