import { Routes } from '@angular/router';

import { MonhocComponent } from 'app/pages/monhoc/monhoc.component';
import { LophocComponent } from 'app/pages/lophoc/lophoc.component';
import { DanhsachlopComponent } from 'app/pages/danhsachlop/danhsachlop.component';
import { LopDetailComponent } from 'app/pages/danhsachlop/lop-detail/lop-detail.component';
import { BangdiemComponent } from 'app/pages/bangdiem/bangdiem.component';
import { BangdiemDetailComponent } from 'app/pages/bangdiem/bangdiem-detail/bangdiem-detail.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'monhoc', component: MonhocComponent },
    { path: 'lophoc', component: LophocComponent },
    { path: 'danhsachlop', component: DanhsachlopComponent },
    {
        path: 'lop-detail', children: [
            { path: '', component: LopDetailComponent },
            { path: 'edit/:id', component: LopDetailComponent }
        ]
    },
    { path: 'bangdiem', component: BangdiemComponent },
    {
        path: 'bangdiem-detail', children: [
            { path: '', component: BangdiemDetailComponent },
            { path: 'edit/:id', component: BangdiemDetailComponent }
        ]
    }
];
