import { Component, OnInit } from '@angular/core';
import { LophocService } from 'app/shared/services/lophoc.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-danhsachlop',
  templateUrl: './danhsachlop.component.html',
  styleUrls: ['./danhsachlop.component.scss']
})
export class DanhsachlopComponent implements OnInit {

  constructor(private lophocService: LophocService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.lophocService.refreshLopHoc();
  }

  openForEdit(MaLop: number) {
    this.router.navigate(['/lop-detail/edit/' + MaLop]);
  }

  onLopHocDelete(MaLop: number) {
    if (confirm('Bạn có chắc muốn xóa lớp học này')) {
      this.lophocService.deleteLopHoc(MaLop).then(res => {
        this.lophocService.refreshLopHoc();
        this.toastr.warning("Xóa Lớp Học Thành Công", "Quản Lí Học Sinh");
      });
    }

  }


}
