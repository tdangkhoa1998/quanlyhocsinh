import { Injectable } from '@angular/core';
import { Lophoc } from '../models/lophoc.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Hocsinh } from '../models/hocsinh.model';

@Injectable({
  providedIn: 'root'
})
export class LophocService {

  formData: Lophoc;
  lophocList: Lophoc[];
  hocsinhList: Hocsinh[];

  constructor(private http: HttpClient) { }

  getLopHoc() {
    return this.http.get(environment.apiURL + '/LopHoc').toPromise();
  }

  refreshLopHoc() {
    return this.http.get(environment.apiURL + '/LopHoc').toPromise().then(res => {
      this.lophocList = res as Lophoc[]
    });
  }

  getLopHocByID(id: number): any {
    return this.http.get(environment.apiURL + '/LopHoc/' + id).toPromise();
  }

  postLopHoc(lophoc: Lophoc) {
    return this.http.post(environment.apiURL + '/LopHoc', lophoc);
  }
  putLopHoc(lophoc: Lophoc) {
    return this.http.put(environment.apiURL + '/LopHoc/' + lophoc.MaLop, lophoc);
  }

  deleteLopHoc(id: number) {
    return this.http.delete(environment.apiURL + '/LopHoc/' + id).toPromise();
  }

  updateLopHoc() {
    var body = {
      ...this.formData,
      HocSinhs: this.hocsinhList
    }
    return this.http.post(environment.apiURL + '/PostLopHoc', body);
  }

  deleteHocSinh(id: number) {
    return this.http.delete(environment.apiURL + '/HocSinh/' + id).toPromise();
  }



}

