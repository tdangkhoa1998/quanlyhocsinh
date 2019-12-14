import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonhocComponent } from 'app/pages/monhoc/monhoc.component';
import { MonhocListComponent } from 'app/pages/monhoc-list/monhoc-list.component';
import { MonhocDetailComponent } from 'app/pages/monhoc-detail/monhoc-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MonhocService } from 'app/shared/services/monhoc.service';
import { LophocComponent } from 'app/pages/lophoc/lophoc.component';
import { LophocListComponent } from 'app/pages/lophoc/lophoc-list/lophoc-list.component';
import { LophocDetailComponent } from 'app/pages/lophoc/lophoc-detail/lophoc-detail.component';
import { LophocService } from 'app/shared/services/lophoc.service';
import { DanhsachlopComponent } from 'app/pages/danhsachlop/danhsachlop.component';
import { LopDetailComponent } from 'app/pages/danhsachlop/lop-detail/lop-detail.component';
import { HocsinhListComponent } from 'app/pages/danhsachlop/hocsinh-list/hocsinh-list.component';
import { HocsinhDetailComponent } from 'app/pages/danhsachlop/hocsinh-list/hocsinh-detail/hocsinh-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BangdiemComponent } from 'app/pages/bangdiem/bangdiem.component';
import { BangdiemDetailComponent } from 'app/pages/bangdiem/bangdiem-detail/bangdiem-detail.component';
import { BangdiemItemComponent } from 'app/pages/bangdiem/bangdiem-detail/bangdiem-item/bangdiem-item.component';
import { BangdiemService } from 'app/shared/services/bangdiem.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
  ],
  declarations: [
    MonhocComponent,
    MonhocListComponent,
    MonhocDetailComponent,
    LophocComponent,
    LophocListComponent,
    LophocDetailComponent,
    DanhsachlopComponent,
    LopDetailComponent,
    HocsinhListComponent,
    HocsinhDetailComponent,
    BangdiemComponent,
    BangdiemDetailComponent,
    BangdiemItemComponent,
  ],
  providers: [
    MonhocService, LophocService, BangdiemService
  ],
  entryComponents: [HocsinhDetailComponent, BangdiemItemComponent]
})

export class AdminLayoutModule { }
