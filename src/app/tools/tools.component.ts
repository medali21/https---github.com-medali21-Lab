import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tools } from 'src/models/tools.model';
import { ToolsService } from 'src/services/tools.service';
import { ConfirmDialogComponent } from 'src/@root/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  form : any;
  currentItemId : string="";
  currentItem : any;
  constructor(private toolservice : ToolsService,private router : Router,private activatedRoute :ActivatedRoute) { }

  isFormInEditMode():boolean{

    return (!!this.currentItemId);
  }
  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId)
    {//Edit
      this.toolservice.getMemberById(this.currentItemId).then(
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
        Date : new FormControl (item?.cin, [Validators.required]),
        Source : new FormControl (item?.Name, [Validators.required]),
  
      }
    )
  }

  onSubmit():void{
    console.log(this.form.value);
    const memberToSave ={...this.currentItem,...this.form.value}
    this.toolservice.SaveMember(memberToSave).then
    (()=>this.router.navigate(['/tools']))
  }

}
