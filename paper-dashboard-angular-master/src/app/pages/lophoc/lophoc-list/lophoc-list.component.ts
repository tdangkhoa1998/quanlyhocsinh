import { Component, OnInit } from '@angular/core';
import { LophocService } from 'app/shared/services/lophoc.service';
import { ToastrService } from 'ngx-toastr';
import { Lophoc } from 'app/shared/models/lophoc.model';

@Component({
  selector: 'app-lophoc-list',
  templateUrl: './lophoc-list.component.html',
  styleUrls: ['./lophoc-list.component.scss']
})
export class LophocListComponent implements OnInit {

  constructor(private lophocService: LophocService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.lophocService.refreshLopHoc();
  }

  populateForm(item: Lophoc) {
    this.lophocService.formData = Object.assign({}, item);
  }

  onLopHocDelete(MaLop: number) {
    if (confirm("Bạn có chắc muốn xóa lớp học này")) {
      this.lophocService.deleteLopHoc(MaLop).then(res => {
        this.lophocService.refreshLopHoc();
        this.toastr.warning("Xóa Lớp Học Thành Công", "Quản Lí Học Sinh");
      })
    }

  }


}


