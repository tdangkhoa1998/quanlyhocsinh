import { Component, OnInit } from '@angular/core';
import { BangdiemService } from 'app/shared/services/bangdiem.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bangdiem',
  templateUrl: './bangdiem.component.html',
  styleUrls: ['./bangdiem.component.scss']
})
export class BangdiemComponent implements OnInit {

  constructor(private bangdiemService: BangdiemService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.bangdiemService.refreshBangDiem();
  }

  openForEdit(MaBangDiem: number) {
    this.router.navigate(['/bangdiem-detail/edit/' + MaBangDiem]);
  }

  opBangDiemDelete(MaBangDiem: number) {
    if (confirm('Bạn có chắc muốn xóa bảng điểm này')) {
      this.bangdiemService.deleteBangDiem(MaBangDiem).then(res => {
        this.bangdiemService.refreshBangDiem();
        this.toastr.warning("Xóa Bảng Điểm Thành Công", "Quản Lí Học Sinh")
      })
    }
  }


}
