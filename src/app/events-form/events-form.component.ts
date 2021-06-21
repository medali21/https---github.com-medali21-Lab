import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from 'src/models/evenement.model';
import { EvenementService } from 'src/services/evenement.service';
import {Member} from 'src/models/member.model';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent implements OnInit {
  form : any;
  currentItemId : string="";
  toppings :string ="";
  Source :any;
  toppingList: Member[] =[];
  displayedColumns: string[] = ['id', 'Titre', 'Date','Lieu','Icon'];
  currentItem : any;
  selectedValue : string;

  constructor(private memberservice : EvenementService,private ms : MemberService,private router : Router,private activatedRoute :ActivatedRoute) { 
    this.selectedValue="";

  }
  
  isFormInEditMode():boolean{

    return (!!this.currentItemId);
  }
  ngOnInit(): void {
    this.ms.GetAllmembers().then(data =>this.toppingList=data)

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
        Titre : new FormControl (item?.Titre, [Validators.required]),
        Date : new FormControl (item?.Date, [Validators.required]),
        Lieu : new FormControl (item?.Lieu, [Validators.required]),
        Members  : new FormControl (item?.Members, [Validators.required])
        
  
      }
    )
  }

  onSubmit():void{
    console.log(this.form.value);
    const memberToSave ={...this.currentItem,...this.form.value}
    this.memberservice.SaveMember(memberToSave).then
    (()=>this.router.navigate(['/events']))
    
  }
}
