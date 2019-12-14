import { Injectable } from '@angular/core';
import { Bangdiem } from '../models/bangdiem.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Lophoc } from '../models/lophoc.model';
import { Hocky } from '../models/hocky.model';
import { Monhoc } from '../models/monhoc.model';
import { Ctbangdiem } from '../models/ctbangdiem.model';
import { Hocsinh } from '../models/hocsinh.model';

@Injectable({
  providedIn: 'root'
})
export class BangdiemService {


  lophocList: Lophoc[];
  hockyList: Hocky[];
  monhocList: Monhoc[];
  hocsintList: Hocsinh[];
  formData: Bangdiem;
  bangdiemList: Bangdiem[] = [];
  ctBangDiemList: Ctbangdiem[];

  constructor(private http: HttpClient) { }

  getHocSinhList() {
    return this.http.get(environment.apiURL + '/HocSinh').toPromise().then(res => {
      this.hocsintList = res as Hocsinh[]
    })
  }

  getBangDiemList() {
    return this.http.get(environment.apiURL + '/Diem').toPromise();
  }

  getBangDiemByID(id: number): any {
    return this.http.get(environment.apiURL + '/Diem/' + id).toPromise();
  }

  getLopHocList() {
    return this.http.get(environment.apiURL + '/LopHoc').toPromise().then(res => {
      this.lophocList = res as Lophoc[]
    })
  }

  getHocKyList() {
    return this.http.get(environment.apiURL + '/HocKy').toPromise().then(res => {
      this.hockyList = res as Hocky[]
    })
  }

  saveOrUpdateBangDiem() {
    var body = {
      ...this.formData,
      CTDiems: this.ctBangDiemList
    }

    return this.http.post(environment.apiURL + '/Diem', body);

  }

  getMonHocList() {
    return this.http.get(environment.apiURL + '/MonHoc').toPromise().then(res => {
      this.monhocList = res as Monhoc[]
    })
  }

  refreshBangDiem() {
    return this.http.get(environment.apiURL + '/Diem').toPromise().then(res => {
      this.bangdiemList = res as Bangdiem[]
    });
  }

  deleteBangDiem(id: number) {
    return this.http.delete(environment.apiURL + '/Diem/' + id).toPromise();
  }


}
