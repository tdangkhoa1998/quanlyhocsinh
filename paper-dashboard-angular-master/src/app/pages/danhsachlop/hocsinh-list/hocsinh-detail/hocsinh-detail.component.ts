import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hocsinh } from 'app/shared/models/hocsinh.model';
import { LophocService } from 'app/shared/services/lophoc.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-hocsinh-detail',
  templateUrl: './hocsinh-detail.component.html',
  styleUrls: ['./hocsinh-detail.component.scss']
})
export class HocsinhDetailComponent implements OnInit {


  formData: Hocsinh;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<HocsinhDetailComponent>,
    private lophocService: LophocService) { }

  ngOnInit() {
    if (this.data.hocsinhIndex == null) {
      this.formData = {
        MaHocSinh: null,
        MaLop: this.data.MaLop,
        HoTen: "",
        Email: "",
        DiaChi: "",
        NgaySinh: "",
        GioiTinh: ""
      }
    }

    else {
      this.formData = Object.assign({}, this.lophocService.hocsinhList[this.data.hocsinhIndex]);
    }

  }

  onSubmit(form: NgForm){
    if(this.data.hocsinhIndex == null){
      this.lophocService.hocsinhList.push(form.value);
    }
    else{
      this.lophocService.hocsinhList[this.data.hocsinhIndex] = form.value;
    }

    this.dialogRef.close();
  }

}
