import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Market';
  parent_marketList: any;
  
  getMsgFromLeftbar(event: any) {
    this.parent_marketList = event;
    console.log('getMsgFromSidebar');
    console.log(this.parent_marketList);
  }
}
