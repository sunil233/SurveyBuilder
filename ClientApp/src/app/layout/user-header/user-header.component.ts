import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
    selector: 'user-header',
    templateUrl: './user-header.component.html',
    styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
    isCollapsed = true;
    userName: string = "";
    constructor(private router: Router) {
        this.userName = localStorage["Username"];
    }
    ngOnInit() {
    }
    onMenuClick(routepath) {
        switch (routepath) {
          case 'survey':
            this.router.navigate(['/survey/schema']);
            break;
            case 'logout':
                this.router.navigate(['/login']);
                break;
        }
    }
}
