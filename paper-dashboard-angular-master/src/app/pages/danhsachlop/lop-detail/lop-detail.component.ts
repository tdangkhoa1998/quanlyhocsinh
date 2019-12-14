import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LophocService } from 'app/shared/services/lophoc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HocsinhDetailComponent } from '../hocsinh-list/hocsinh-detail/hocsinh-detail.component';
import { Hocsinh } from 'app/shared/models/hocsinh.model';

@Component({
  selector: 'app-lop-detail',
  templateUrl: './lop-detail.component.html',
  styleUrls: ['./lop-detail.component.scss']
})
export class LopDetailComponent implements OnInit {

  constructor(private lophocService: LophocService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit() {

    let malop = this.currentRoute.snapshot.paramMap.get('id');

    if (malop == null) {
      this.resetForm();
    }
    else {
      this.resetForm();
      this.lophocService.getLopHocByID(parseInt(malop)).then(res => {
        this.lophocService.formData = res.lophoc;
        this.lophocService.hocsinhList = res.hocsinhList;
      })
    }


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

    this.lophocService.hocsinhList = []
  }


  AddOrEditHocSinh(hocsinhIndex, MaLop) {
    const dialogconfig = new MatDialogConfig;
    dialogconfig.autoFocus = true;
    dialogconfig.disableClose = true;
    dialogconfig.width = "50%";
    dialogconfig.data = { hocsinhIndex, MaLop };
    this.dialog.open(HocsinhDetailComponent, dialogconfig).afterClosed().subscribe(res => {
      this.updateSiSo();
    })
  }

  onSubmit(form: NgForm) {
    this.lophocService.updateLopHoc().subscribe(res => {
      this.resetForm();
      this.toastr.success("Cập nhật lớp thành công", "Quản Lí Học Sinh");
      this.router.navigate(['/danhsachlop']);
    })
  }

  updateSiSo() {
    this.lophocService.formData.SiSo = this.lophocService.hocsinhList.length;
  }

  OnDeleteLopHoc(MaHocSinh: number, index: number) {
    if (MaHocSinh != null) {
      this.lophocService.formData.DeletedHocSinh += MaHocSinh + ",";
    }
    this.lophocService.hocsinhList.splice(index, 1);
    this.updateSiSo();
  }


}
