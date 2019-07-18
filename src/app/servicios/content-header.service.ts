import { Injectable } from '@angular/core';

@Injectable()
export class ContentHeaderService {
  titleHeader: string = '';

  constructor() { }

  setTitleHeader(title: string): any {
    this.titleHeader = title;
  }

  getTitleHeader(): string {
   return this.titleHeader
  }

}
