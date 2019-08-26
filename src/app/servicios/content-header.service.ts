import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

@Injectable()
export class ContentHeaderService {
  titleHeader: string = '';
  urlPage: string;

  constructor(private router: Router) { }

  setTitleHeader(title: string): any {
    // console.log(this.router.url);
    this.urlPage = this.router.url;
    this.titleHeader = title;
  }

  getTitleHeader(): string {
    return this.titleHeader
  }

}
