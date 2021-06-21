import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/article.model';
import { ArticleService } from 'src/services/article.service';
import { MemberService } from 'src/services/member.service';
import { Member } from 'src/models/member.model';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  form : any;
  currentItemId : string="";
  currentItem : any;
  selectedValue: string="";
  Members: Member[]=[];

  constructor(private memberservice : ArticleService,private membersservice : MemberService,private router : Router,private activatedRoute :ActivatedRoute) {
    this.membersservice.GetAllmembers().then(data => this.Members=data);

   }
  ngOnInit(): void {
    this.membersservice.GetAllmembers().then(data => this.Members=data)

    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId)
    {//Edit
      this.memberservice.getMemberById(this.currentItemId).then(
      item => {
        this.currentItem = item;
        this.intiForm(item);
      } );
    }
    else{this.intiForm(null)}
  }

  intiForm(item : any):void{

    this.form = new FormGroup(
      {
        titre : new FormControl (item?.titre, [Validators.required]),
        type : new FormControl (item?.type, [Validators.required]),
        dateApparition : new FormControl (item?.dateApparition, [Validators.required]),
        lien : new FormControl (item?.lien, [Validators.required]),
        sourcePdf : new FormControl (item?.sourcePdf, [Validators.required]),
        auteur : new FormControl (item?.auteur, [Validators.required])
       

  
      }
    )
  }

  onSubmit():void{
    console.log(this.form.value);
    const memberToSave ={...this.currentItem,...this.form.value}
    this.memberservice.SaveMember(memberToSave).then
    (()=>this.router.navigate(['/articles']))
  }
  IsFormInEditMode():boolean{
    return (!!this.currentItemId);
  }
}
