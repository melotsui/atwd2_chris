import { Component, OnInit, Input, EventEmitter, Output, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, Form, FormArray, AbstractControl } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {
  dialogRef: MatDialogRef<UpdateModalComponent>;
  http: HttpClient;
  updateMarketForm: FormGroup;
  fb: FormBuilder;
  data: any;
  modalTitle: string;
  iframeUrl: SafeResourceUrl;

  constructor(private sharedService: SharedService, dialogRef: MatDialogRef<UpdateModalComponent>, @Inject(MAT_DIALOG_DATA) data: any, fb: FormBuilder, http: HttpClient, public sanitizer: DomSanitizer) {
    this.dialogRef = dialogRef;
    this.http = http;
    this.fb = fb;
    this.data = data;
    this.modalTitle = '';
    this.updateMarketForm = fb.group({
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
      modalNosStall: ['', [Validators.required]],
    });
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q=' + this.updateMarketForm.value.modalCoordinate + '&t=&z=13&ie=UTF8&iwloc=&output=embed');

  }

  customValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value == null || control.value.trim() === '') {
      return { 'required': true };
    }
    return null;
  }

  ngOnInit() {
    console.log(this.data);
    this.modalTitle = this.data.action == 'add' ? 'Add Market' : 'Market Detail';
    if (this.data.market) {
      this.updateMarketForm.patchValue({
        modalmID: this.data.market.mID,
        modalName_e: this.data.market.Market_e,
        modalName_c: this.data.market.Market_c,
        modalRegion_e: this.data.market.Region_e,
        modalRegion_c: this.data.market.Region_c,
        modalDistrict_e: this.data.market.District_e,
        modalDistrict_c: this.data.market.District_c,
        modalAddress_e: this.data.market.Address_e,
        modalAddress_c: this.data.market.Address_c,
        modalBH_e: this.data.market.Business_Hours_e,
        modalBH_c: this.data.market.Business_Hours_c,
        modalContact_1: this.data.market.Contact_1,
        modalContact_2: this.data.market.Contact_2,
        modalCoordinate: this.data.market.Coordinate,
        modalTC_e: this.data.market.Tenancy_Commodity_e,
        modalTC_c: this.data.market.Tenancy_Commodity_c,
        modalNosStall: this.data.market.nos_stall,
      });
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q=' + this.updateMarketForm.value.modalCoordinate + '&t=&z=13&ie=UTF8&iwloc=&output=embed');
      this.updateMarketForm.disable();
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  clickModalEditIcon(event: any) {
    this.data.action = 'update';
    this.modalTitle = 'Edit Market Detail';
    this.updateMarketForm.enable();
    event.preventDefault();
  }

  onSubmit(formValue: any): void {
    let url = '';
    let data = null;
    if (this.updateMarketForm.invalid) {
      // Loop through each form control in the form
      let errorMsg = '';
      Object.keys(this.updateMarketForm.controls).forEach(key => {
        const controlErrors = this.updateMarketForm.get(key)?.errors;
        // If the current form control has an error
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            // Get the error message for the current error key
            const modalNameLabel = document.querySelector('label[for="'+key+'"]');
            const modalNameLabelText = modalNameLabel ? modalNameLabel.innerHTML : 'Contact 聯絡電話 2';
            errorMsg += 'Please enter the ' + modalNameLabelText + "\n";
          });
        }
      });
      alert(errorMsg);
      return;
    }
    if (this.data.action == 'create') {
      url = 'http://localhost:8080/market/index.php/market';
      data = {
        mID: null,
        Market_e: formValue.modalName_e,
        Market_c: formValue.modalName_c,
        Region_e: formValue.modalRegion_e,
        Region_c: formValue.modalRegion_c,
        District_e: formValue.modalDistrict_e,
        District_c: formValue.modalDistrict_c,
        Address_e: formValue.modalAddress_e,
        Address_c: formValue.modalAddress_c,
        Business_Hours_e: formValue.modalBH_e,
        Business_Hours_c: formValue.modalBH_c,
        Coordinate: formValue.modalCoordinate,
        Contact_1: formValue.modalContact_1,
        Contact_2: formValue.modalContact_2,
        Tenancy_Commodity_e: formValue.modalTC_e,
        Tenancy_Commodity_c: formValue.modalTC_c,
        nos_stall: formValue.modalNosStall
      };
      console.log(data);
      this.http.post<any>(url, data).subscribe({
        next: (res) => {
          if (res['status'] == 'success') {
            alert(res['message']);
            this.sharedService.updateMarketList.emit();
            this.closeModal();
          } else {
            alert(res['message']);
          }
          console.log(res);
        },
        error: (err) => {
          console.log("Error submitting market data:");
          console.log(err);
          alert('Error submitting market data:' + err);
        }
      });
    }
    if (this.data.action == 'update') {
      url = 'http://localhost:8080/market/index.php/market';
      data = {
        mID: formValue.modalmID,
        Market_e: formValue.modalName_e,
        Market_c: formValue.modalName_c,
        Region_e: formValue.modalRegion_e,
        Region_c: formValue.modalRegion_c,
        District_e: formValue.modalDistrict_e,
        District_c: formValue.modalDistrict_c,
        Address_e: formValue.modalAddress_e,
        Address_c: formValue.modalAddress_c,
        Business_Hours_e: formValue.modalBH_e,
        Business_Hours_c: formValue.modalBH_c,
        Coordinate: formValue.modalCoordinate,
        Contact_1: formValue.modalContact_1,
        Contact_2: formValue.modalContact_2,
        Tenancy_Commodity_e: formValue.modalTC_e,
        Tenancy_Commodity_c: formValue.modalTC_c,
        nos_stall: formValue.modalNosStall
      };
      console.log(data);
      this.http.put<any>(url, data).subscribe({
        next: (res) => {
          if (res['status'] == 'success') {
            alert(res['message']);
            this.sharedService.updateMarketList.emit();
            this.closeModal();
          } else {
            alert(res['message']);
          }
          console.log(res);
        },
        error: (err) => {
          console.log("Error submitting market data:");
          console.log(err);
          alert('Error submitting market data:' + err);
        }
      });
    }
    if (this.data.action == 'delete') {
      url = 'http://localhost:8080/market/index.php/market/' + formValue.modalmID;
      this.http.delete<any>(url).subscribe({
        next: (res) => {
          if (res['status'] == 'success') {
            alert(res['message']);
            this.sharedService.updateMarketList.emit();
            this.closeModal();
          } else {
            alert(res['message']);
          }
          console.log(res);
        },
        error: (err) => {
          console.log("Error submitting market data:");
          console.log(err);
          alert('Error submitting market data:' + err);
        }
      });
    }
  }
}
