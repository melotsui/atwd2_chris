import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {
  http: HttpClient;
  leftBarForm: FormGroup;
  district: any[];
  tc: any[];
  allMarket: any[];
  @Output() callParent = new EventEmitter();
  marketListToParent: any[];

  constructor(private sharedService: SharedService, fb: FormBuilder, http: HttpClient) {
    this.leftBarForm = fb.group({
      'search_region': '',
      'search_district': '',
      'search_tc': []
    });
    this.http = http;
    this.district = [];
    this.tc = [];
    this.allMarket = [];
    this.marketListToParent = [];
    // this.sharedService.updateMarketList.subscribe(() => {
    //   this.onChangeSearch();
    // });

  }

  ngOnInit() {
    this.listMarket();
    this.leftBarForm.controls['search_tc'].setValue('');
    this.loadTC();
  }

  listMarket() {
    this.http.get<any>('http://localhost:8080/market/index.php/market/all')
      .subscribe({
        next: (res) => {
          console.log(res);
          this.allMarket = res;
          this.marketListToParent = this.allMarket;
          this.msgToParent();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  msgToParent() {
    const marketList = Array.isArray(this.marketListToParent) ? this.marketListToParent : Object.values(this.marketListToParent);
    this.callParent.emit(marketList);
  }

  loadTC() {
    this.http.get<any>('http://localhost:8080/market/index.php/market/field/tc')
      .subscribe({
        next: (res) => {
          this.tc = res;
          console.log(res);
        },
        error: (err) => {
          console.log(`Server call failed: ${err}`);
        }
      });
  }

  clickRegion() {
    console.log('clickRegion');
    this.leftBarForm.controls['search_district'].setValue('');
    this.leftBarForm.controls['search_tc'].setValue('');
    if (this.leftBarForm.controls['search_region'].value != '')
      this.marketListToParent = this.allMarket.filter((r: any) => r.Region_e === this.leftBarForm.controls['search_region'].value);
    else
      this.marketListToParent = this.allMarket;
    this.msgToParent();
  }

  changeDistrict() {
    if (this.leftBarForm.controls['search_region'].value != '') {
      this.http.get<any>('http://localhost:8080/market/index.php/market/field/district/' +
        this.leftBarForm.controls['search_region'].value)
        .subscribe({
          next: (res) => {
            this.district = res;
          },
          error: (err) => {
            console.log(`Server call failed: ${err}`);
          }
        });
    }
  }

  clickDistrict() {
    this.leftBarForm.controls['search_tc'].setValue('');
    const District_e = this.leftBarForm.controls['search_district'].value;
    console.log(District_e);
    if (District_e == '') {
      this.clickRegion();
      return;
    }
    if (District_e != '')
      this.marketListToParent = this.allMarket.filter((r: any) => r.District_e === District_e);
    else
      this.marketListToParent = this.allMarket;
    console.log('clickDistrict');
    this.msgToParent();
  }

  clickTC() {
    const tcSearch = this.leftBarForm.controls['search_tc'].value;
    console.log(tcSearch);
    if (this.leftBarForm.controls['search_tc'].value != '')
      this.marketListToParent = this.allMarket.filter((r: any) => r.Tenancy_Commodity_e === tcSearch);
    else
      this.marketListToParent = this.allMarket;

    console.log('clickTC');
    this.msgToParent();
  }
}
