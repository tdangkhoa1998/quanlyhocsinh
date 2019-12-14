import { Component, OnInit } from '@angular/core';
import { BangdiemService } from 'app/shared/services/bangdiem.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BangdiemItemComponent } from './bangdiem-item/bangdiem-item.component';

@Component({
  selector: 'app-bangdiem-detail',
  templateUrl: './bangdiem-detail.component.html',
  styleUrls: ['./bangdiem-detail.component.scss']
})
export class BangdiemDetailComponent implements OnInit {

  constructor(private bangdiemService: BangdiemService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit() {

    this.bangdiemService.getLopHocList();
    this.bangdiemService.getHocKyList();
    this.bangdiemService.getMonHocList();

    let mabangdiem = this.currentRoute.snapshot.paramMap.get('id');

    if (mabangdiem == null)
      this.resetForm();

    else {
      this.resetForm();
      this.bangdiemService.getBangDiemByID(parseInt(mabangdiem)).then(res => {
        this.bangdiemService.formData = res.bangdiem;
        this.bangdiemService.ctBangDiemList = res.ctBangDiem;
      })
    }

  }


  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();

    this.bangdiemService.formData = {
      MaDiem: null,
      MaHocSinh: null,
      MaLop: null,
      TenLopHoc: "",
      HocKy: "",
      MaHocKy: null,
      MaMon: null,
      DiemTB: 0,
      DeletedCTBangDiem: ""
    }

    this.bangdiemService.ctBangDiemList = []
  }

  AddOrEditCTDiem(ctbangdiemIndex, MaDiem) {
    const dialogconfig = new MatDialogConfig;
    dialogconfig.autoFocus = true;
    dialogconfig.disableClose = true;
    dialogconfig.width = "50%";
    dialogconfig.data = { ctbangdiemIndex, MaDiem };
    this.dialog.open(BangdiemItemComponent, dialogconfig).afterClosed()
  }

  onSubmit(form: NgForm) {
    this.bangdiemService.saveOrUpdateBangDiem().subscribe(res => {
      this.resetForm();
      this.toastr.success("Cập nhật bảng điểm thành công", "Quản Lí Học Sinh");
      this.router.navigate(['/bangdiem']);
    })
  }

  OnDeleteBangDiem(MaCTDiem, index: number) {
    if (MaCTDiem != null) {
      this.bangdiemService.formData.DeletedCTBangDiem += MaCTDiem + ",";
    }
    this.bangdiemService.ctBangDiemList.splice(index, 1);
  }
}
