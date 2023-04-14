import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Market';
  parent_marketList: any;
  mainToModal: any;
  
  getMsgFromLeftbar(event: any) {
    this.parent_marketList = event;
    console.log('getMsgFromSidebar');
    console.log(this.parent_marketList);
    // dialogConfig = new MatDialogConfig();
    // createModalDialog: MatDialogRef<CreateModalComponent, any> | undefined;
    // updateModalComponent: MatDialogRef<UpdateModalComponent, any> | undefined;
    // deleteModalComponent: MatDialogRef<DeleteModalComponent, any> | undefined;
  }

  getMsgFromMain(event: any) {
    this.mainToModal = event;
    // if(this.mainToModal['action'] == 'add'){
    //   this.dialogConfig.id = "createModalComponent";
    //   this.dialogConfig.height = "80%";
    //   this.dialogConfig.width = "50%";
    //   this.createModalDialog = this.matDialog.open(CreateModalComponent, this.dialogConfig);
    // }
    // if(this.mainToModal['action'] == 'edit'){
    //   this.dialogConfig.id = "updateModalComponent";
    //   this.dialogConfig.height = "80%";
    //   this.dialogConfig.width = "50%";
    //   const params = {
    //     mID: this.mainToModal['mID'],
    //   };
    //   this.updateModalComponent = this.matDialog.open(UpdateModalComponent,{...this.dialogConfig, data: params});
    // }
    // if(this.mainToModal['action'] == 'detail'){
    //   this.dialogConfig.id = "deleteModalComponent";
    //   this.dialogConfig.height = "80%";
    //   this.dialogConfig.width = "50%";
    //   const params = {
    //     mID: this.mainToModal['mID'],
    //   };
    //   this.deleteModalComponent = this.matDialog.open(DeleteModalComponent,{...this.dialogConfig, data: params});
    // }
  }
}
