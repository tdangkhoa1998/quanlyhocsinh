import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/monhoc', title: 'Môn Học', icon: 'nc-bank', class: '' },
    { path: '/lophoc', title: 'Lớp Học', icon: 'nc-bank', class: '' },
    { path: '/danhsachlop', title: 'Danh Sách Lớp', icon: 'nc-bank', class: '' },
    { path: '/bangdiem', title: 'Bảng Điểm', icon: 'nc-bank', class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
