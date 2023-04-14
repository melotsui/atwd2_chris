import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent {
  dialogRef: MatDialogRef<CreateModalComponent>;
  http: HttpClient;
  createMarketForm: FormGroup;
  fb: FormBuilder;

  constructor(private sharedService: SharedService, dialogRef: MatDialogRef<CreateModalComponent>, fb: FormBuilder, http: HttpClient) {
    this.dialogRef = dialogRef;
    this.http = http;
    this.fb = fb;
    this.createMarketForm = fb.group({
      modalmID: [''],
      modalName_e: ['', [Validators.required, this.customValidator]],
      modalName_c: ['', [Validators.required, this.customValidator]],
      modalRegion_e: ['', [Validators.required, this.customValidator]],
      modalRegion_c: ['', [Validators.required, this.customValidator]],
      modalDistrict_e: ['', [Validators.required, this.customValidator]],
      modalDistrict_c: ['', [Validators.required, this.customValidator]],
      modalAddress_e: ['', [Validators.required, this.customValidator]],
      modalAddress_c: ['', [Validators.required, this.customValidator]],
      modalBH_e: ['', [Validators.required, this.customValidator]],
      modalBH_c: ['', [Validators.required, this.customValidator]],
      modalContact_1: ['', [Validators.required, this.customValidator]],
      modalContact_2: ['', [Validators.required, this.customValidator]],
      modalCoordinate: ['', [Validators.required, this.customValidator]],
      modalTC_e: ['', [Validators.required, this.customValidator]],
      modalTC_c: ['', [Validators.required, this.customValidator]],
      modalNosStall: ['', [Validators.required, this.customValidator]],
    });
  }

  customValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value == null || control.value.trim() === '') {
      return { 'required': true };
    }
    return null;
  }


  onSubmit(){
    
  }
}
