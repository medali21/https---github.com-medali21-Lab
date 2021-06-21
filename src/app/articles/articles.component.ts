import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../app-config';
import {Article} from 'src/models/article.model';
import {MatTableDataSource} from '@angular/material/table';
import { ArticleService } from 'src/services/article.service';
import { ConfirmDialogComponent } from 'src/@root/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

     Source: MatTableDataSource<Article>;
    //Source : Article[]=[];
    displayedColumns: string[] = ['id', 'titre', 'type', 'dateApparition','lien','sourcePdf','auteur','action'];
  constructor(private memberS:ArticleService,private dialog : MatDialog) {
    this.Source = new MatTableDataSource(this.memberS.tab); }

  ngOnInit(): void {
    //this.Source=GLOBAL._DB.articles;
    //this.articleService.getAllArticles().then(data => this.Source=data)
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
