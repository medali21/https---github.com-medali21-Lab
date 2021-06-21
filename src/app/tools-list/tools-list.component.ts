import { Component, OnInit } from '@angular/core';
import { Tools } from 'src/models/tools.model';
import { ToolsService } from 'src/services/tools.service';
import {MatTableDataSource} from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/@root/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.css']
})
export class ToolsListComponent implements OnInit {

  Source: MatTableDataSource<Tools>;

  displayedColumns: string[] = ['id', 'Date', 'Source','Icon'];
  //Source:Member[]=[]

  constructor( private memberS:ToolsService, private dialog : MatDialog) {
    // Assign the data to the data source for the table to render
    this.Source = new MatTableDataSource(this.memberS.tab);
   }

  ngOnInit(): void {
    //this.Source=this.memberS.tab;
  }

  onRemouveAccount(id:any){
    // this.memberS.RemoveMemberById(id).then
    // (()=> this.fetchDataSource());
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{
      height : '200px',
      width : '300px',
    });

    dialogRef.afterClosed().pipe().subscribe(isDeleteConfirmed => {
      console.log (isDeleteConfirmed)
    if (isDeleteConfirmed){
      this.memberS.RemoveMemberById(id).then(()=> this.fetchDataSource());
    }
  });
  }

  fetchDataSource() : void{
    this.memberS.GetAllmembers().then
    ((data) => this.Source.data=data);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Source.filter = filterValue.trim().toLowerCase();
  }

}
