import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-program-list',
  template: `
    <ag-grid-angular 
      style="width: 100%; height: 500px;" 
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="columnDefs">
    </ag-grid-angular>
  `
})
export class ProgramListComponent implements OnInit {
  rowData: any[] = [];
  columnDefs = [
    { field: 'program_title', headerName: 'Title' },
    { field: 'program_description', headerName: 'Description' }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    this.http.get<any[]>('http://localhost:3002/Program').subscribe(
      (data: any[]) => {
        console.log(data)
        this.rowData = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
