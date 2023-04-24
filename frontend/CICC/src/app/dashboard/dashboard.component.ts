import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  programs: any[] = [];
  columnDefs = [
    { field: 'program_title', headerName: 'Title', width: 200 },
    { field: 'program_details', headerName: 'Description', width: 200 }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    this.http.get<any[]>('http://localhost:3002/Program').subscribe(
      (data: any[]) => {
        console.log(data);
        this.programs = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
