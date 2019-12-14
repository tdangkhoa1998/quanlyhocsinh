import { Component, OnInit } from '@angular/core';
import { MonhocService } from 'app/shared/services/monhoc.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-monhoc-detail',
  templateUrl: './monhoc-detail.component.html',
  styleUrls: ['./monhoc-detail.component.scss']
})
export class MonhocDetailComponent implements OnInit {

  constructor(private monhocService: MonhocService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {

    if (form = null) {
      form.resetForm();
    }

    this.monhocService.formData = {
      MaMonHoc: null,
      TenMonHoc: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.MaMonHoc == null)
      this.insertMonHoc(form);
    else
      this.updateMonHoc(form);
  }

  insertMonHoc(form: NgForm) {
    this.monhocService.postMonHoc(form.value).subscribe(res => {
      this.toastr.success("Thêm Môn Học Thành Công", "Quản Lí Học Sinh");
      this.resetForm(form);
      this.monhocService.refreshMonHoc();
    })
  }

  updateMonHoc(form: NgForm) {
    this.monhocService.putMonHoc(form.value).subscribe(res => {
      this.toastr.info("Cập Nhật Môn Học Thành Công", "Quản Lí Học Sinh");
      this.resetForm(form);
      this.monhocService.refreshMonHoc();
    })
  }


}
