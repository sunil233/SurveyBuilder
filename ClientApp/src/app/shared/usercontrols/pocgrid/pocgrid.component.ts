import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Format } from './format';
export interface GridAction {
    action: string,
    values: {
        key: string,
        value: string
    }[]
}
@Component({
    selector: 'poc-grid',
    styleUrls: ['./pocgrid.component.css'],
    templateUrl: './pocgrid.component.html',
})
export class CustomGridComponent {
    /*********************  DECLARATIONS   *********************/
    //Input Variables
    @Input() columns: any[];
    @Input() data: any[];
    @Input() sort: any;
    @Input() gridbtns: any[];
    @Input() hdrbtns: any[];
    @Input() isEdit: boolean = false;
    @Input() isDelete: boolean = false;   
    @Input() showSearch: boolean = true; 
    @Input() showPaging: boolean = true;
    @Input() itemsPerPage: number = 10;
    @Input() filter: any;   
    //Output Variable
    @Output()
    btnclick: EventEmitter<GridAction> = new EventEmitter<GridAction>();

    //paging variables
    public currnetPageNo: number = 1;
    public length: number = 0;
    public maxSize: number = 5;
    public numPages: number = 1;
    public rows: Array<any> = [];
    public colcount: number = 0;

    //Local Variable
    returnedArray: any[] = this.data;
    listFilter: string;
    config = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['table-bordered']
    };
     /*********************  END OF DECLARATIONS   *********************/
    constructor(private cd: ChangeDetectorRef) {
    }
    ngOnChanges(changes: any) {
        if (JSON.stringify(changes).indexOf("data") != -1) {
            if (this.data != undefined && this.data != null) {
                //to reset to first page when data refreshes
                setTimeout(() => { this.currnetPageNo = 1; }, 0);
                this.criteriaChange(this.listFilter);
                this.length = this.data.length;
                this.colcount = this.columns.length;
                if (this.isEdit == true) {
                    this.colcount = this.colcount + 1;
                }
                if (this.isDelete == true) {
                    this.colcount = this.colcount + 1;
                }
                this.returnedArray = this.data.slice(0, 10);
            }
        }
    }
    selectedClass(columnName: string): any {
        return columnName == this.sort.column ? 'sort-' + this.sort.descending : false;
    }
    convertSorting(): string {
        return this.sort.descending ? '-' + this.sort.column : this.sort.column;
    }
    click(action: any, row: any): void {
        let keyds = <GridAction>{};
        keyds.action = action;
        if (row != null) {
            keyds.values = [];
            keyds.values.push({ key: action, value: row });
        }
        this.btnclick.emit(keyds);
    }
    criteriaChange(filtervalue: any) {
        if (filtervalue != '[object Event]') {
            this.config.filtering.filterString = filtervalue
            this.returnedArray = this.changeFilter(this.data, this.config);
        }
    }
    changeFilter(data: any, config: any): any {
        var filterString = config.filtering.filterString;
        let filteredData: Array<any> = data;
        if (!filterString) {
            return filteredData;
        }
        let tempArray: Array<any> = [];
        filteredData.forEach((item: any) => {
            let flag = false;
            this.columns.forEach((column: any) => {
                if (item[column.name] != null && item[column.name] != undefined) {
                    if (this.compareString(item[column.name].toString(), (filterString))) {
                        flag = true;
                    }
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;
        return filteredData;
    }
    compareString(s1: string, s2: string): boolean {
        return s1.toLowerCase().indexOf(s2.toLowerCase()) != -1;
    }
    onSearch($ev:any, filtervalue:any) {
        $ev.preventDefault();
        this.config.filtering.filterString = filtervalue
        this.currnetPageNo = 1;
        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData);
        this.returnedArray = sortedData.slice(0, 10);;
        this.length = sortedData.length;
    }
    changeSort(data: any): any {
        let columns = this.columns || [];
        let columnName: string = "";
        let sort: string = "";
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        // simple sorting
        return data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }
    onPageChange(config: any, event: any): any {
        if (this.config.filtering) {
            (<any>Object).assign(this.config.filtering, this.config.filtering);
        }
        if (this.config.sorting) {
            (<any>Object).assign(this.config.sorting, this.config.sorting);
        }
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData);
        this.returnedArray = sortedData.slice(startItem, endItem);
        this.length = sortedData.length;
    }
    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }
}

