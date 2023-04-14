import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  http: HttpClient;
  @Input() parent_marketList: any | null = [];
  @Output() callParent = new EventEmitter();
  actionToModal: any;

  constructor(http: HttpClient) {
    this.http = http;
    this.actionToModal = ({
      action: '',
      mID: null
    });
  }

  msgToModal() {
    this.callParent.emit(this.actionToModal);
  }

  setModal(event: any, action: String, mID: number | null = null){
    this.actionToModal.action = action;
    this.actionToModal.mID = mID;
    console.log(action);
    console.log(this.actionToModal);
    this.msgToModal();
    event.preventDefault();
  }
}
