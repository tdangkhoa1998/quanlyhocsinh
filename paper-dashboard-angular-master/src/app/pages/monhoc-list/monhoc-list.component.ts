import { Component, OnInit } from '@angular/core';
import { MonhocService } from 'app/shared/services/monhoc.service';
import { ToastrService } from 'ngx-toastr';
import { Monhoc } from 'app/shared/models/monhoc.model';

@Component({
  selector: 'app-monhoc-list',
  templateUrl: './monhoc-list.component.html',
  styleUrls: ['./monhoc-list.component.scss']
})
export class MonhocListComponent implements OnInit {

  constructor(private monhocService: MonhocService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.monhocService.refreshMonHoc();
  }

  populateForm(item: Monhoc) {
    this.monhocService.formData = Object.assign({}, item);
  }

  onMonHocDelete(MaMonHoc: number) {
    if (confirm("Bạn có chắc muốn xóa môn học này")) {
      this.monhocService.deleteMonHoc(MaMonHoc).then(res => {
        this.monhocService.refreshMonHoc();
        this.toastr.warning("Xóa Môn Học Thành Công", "Quản Lí Học Sinh");
      })
    }

  }


}

