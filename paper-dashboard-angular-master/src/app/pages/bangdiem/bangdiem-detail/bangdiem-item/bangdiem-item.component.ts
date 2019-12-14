import { Component, OnInit, Inject } from '@angular/core';
import { Ctbangdiem } from 'app/shared/models/ctbangdiem.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BangdiemDetailComponent } from '../bangdiem-detail.component';
import { BangdiemService } from 'app/shared/services/bangdiem.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bangdiem-item',
  templateUrl: './bangdiem-item.component.html',
  styleUrls: ['./bangdiem-item.component.scss']
})
export class BangdiemItemComponent implements OnInit {


  formData: Ctbangdiem;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<BangdiemDetailComponent>,
    private bangdiemService: BangdiemService) { }

  ngOnInit() {

    this.bangdiemService.getHocSinhList();

    if (this.data.ctbangdiemIndex == null) {
      this.formData = {
        MaCTDiem: null,
        MaDiem: this.data.MaDiem,
        MaHocSinh: null,
        TenHocSinh: "",
        Diem15Phut: 0,
        Diem1Tiet: 0,
        DiemTB: 0
      }
    }

    else {
      this.formData = Object.assign({}, this.bangdiemService.ctBangDiemList[this.data.ctbangdiemIndex]);
    }
  }

  onSubmit(form: NgForm) {
    if (this.data.ctbangdiemIndex == null) {
      this.bangdiemService.ctBangDiemList.push(form.value);
    }
    else {
      this.bangdiemService.ctBangDiemList[this.data.ctbangdiemIndex] = form.value;
    }

    this.dialogRef.close();

  }

}
