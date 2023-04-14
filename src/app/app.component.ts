import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UpdateModalComponent } from './update-modal/update-modal.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Market';
  parent_marketList: any;
  mainToModal: any;
  dialogConfig = new MatDialogConfig();
  updateModalComponent: MatDialogRef<UpdateModalComponent, any> | undefined;
  matDialog: MatDialog;
  
  constructor(matDialog: MatDialog) {
    this.matDialog = matDialog;
  }

  getMsgFromLeftbar(event: any) {
    this.parent_marketList = event;
  }

  getMsgFromMain(event: any) {
    this.mainToModal = event;
    // if(this.mainToModal['action'] == 'create'){
    //   this.dialogConfig.id = "createModalComponent";
    //   this.createModalDialog = this.matDialog.open(CreateModalComponent, this.dialogConfig);
    // }
    // if(this.mainToModal['action'] == 'update'){
      this.dialogConfig.id = "updateModalComponent";
      const params = {
        action: this.mainToModal['action'],
        market: this.mainToModal['market'],
      };
      this.updateModalComponent = this.matDialog.open(UpdateModalComponent,{...this.dialogConfig, data: params});
    // }
  }
}
