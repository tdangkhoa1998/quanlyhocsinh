import { Component, OnInit } from '@angular/core';
import { LophocService } from 'app/shared/services/lophoc.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lophoc-detail',
  templateUrl: './lophoc-detail.component.html',
  styleUrls: ['./lophoc-detail.component.scss']
})
export class LophocDetailComponent implements OnInit {

  constructor(private lophocService: LophocService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {

    if (form = null) {
      form.resetForm();
    }

    this.lophocService.formData = {
      MaLop: null,
      TenLop: "",
      SiSo: 0,
      DeletedHocSinh: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.MaMonHoc == null)
      this.insertLopHoc(form);
    else
      this.updateLopHoc(form);
  }

  insertLopHoc(form: NgForm) {
    this.lophocService.postLopHoc(form.value).subscribe(res => {
      this.toastr.success("Thêm Lớp Học Thành Công", "Quản Lí Học Sinh");
      this.resetForm(form);
      this.lophocService.refreshLopHoc();
    })
  }

  updateLopHoc(form: NgForm) {
    this.lophocService.putLopHoc(form.value).subscribe(res => {
      this.toastr.info("Cập Nhật Lớp Học Thành Công", "Quản Lí Học Sinh");
      this.resetForm(form);
      this.lophocService.refreshLopHoc();
    })
  }


}

