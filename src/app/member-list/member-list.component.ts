import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/member.model';
import { MemberService } from 'src/services/member.service';
import {MatTableDataSource} from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/@root/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  Source: MatTableDataSource<Member>;

  displayedColumns: string[] = ['id', 'CIN', 'Name', 'Type','CV','CreateDate','Tools','icon'];
  //Source:Member[]=[]

  constructor( private memberS:MemberService, private dialog : MatDialog) {
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
