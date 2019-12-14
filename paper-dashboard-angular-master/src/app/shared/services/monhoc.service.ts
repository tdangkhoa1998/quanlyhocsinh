import { Injectable } from '@angular/core';
import { Monhoc } from '../models/monhoc.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MonhocService {

  formData: Monhoc;
  monhocList: Monhoc[];

  constructor(private http: HttpClient) { }

  getMonHoc() {
    return this.http.get(environment.apiURL + '/MonHoc').toPromise();
  }

  refreshMonHoc() {
    return this.http.get(environment.apiURL + '/MonHoc').toPromise().then(res => {
      this.monhocList = res as Monhoc[]
    });
  }

  postMonHoc(monhoc: Monhoc) {
    return this.http.post(environment.apiURL + '/MonHoc', monhoc);
  }
  putMonHoc(monhoc: Monhoc) {
    return this.http.put(environment.apiURL + '/MonHoc/' + monhoc.MaMonHoc, monhoc);
  }

  deleteMonHoc(id: number) {
    return this.http.delete(environment.apiURL + '/MonHoc/' + id).toPromise();
  }

}
