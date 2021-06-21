import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/app-config';
import { nabil } from 'src/models/nabil.model';
@Injectable({
  providedIn: 'root'
})
export class nabilService {
  public tab:nabil[]=GLOBAL._DB.nabil;
  constructor (private httpClient : HttpClient){}
  SaveMember(nabil: any) : Promise <nabil >{
  // return this.httpClient.post<Member>
  // ('linkToRestAPI', member).ToPromise();
  const memberToSave = {
  id : nabil.id ?? Math.ceil(Math.random()*10000).toString(),
  CreateDate : nabil.CreateDate ?? new Date().toISOString(),
  ...nabil
  };

  this.tab= [memberToSave, ...this.tab.filter(
    item => item.id!==nabil.id)]

  return new Promise ( resolve => resolve(memberToSave))
  };

  getMemberById(id : string) : Promise <nabil>{
  // return this.httpClient.get<Member> ('linkToRestAPI', member)
  return new Promise(resolve => resolve (
    this.tab.filter(item => item.id=== id)[0]?? null
    ))
  }
  RemoveMemberById(id:String):Promise<void>{
    // this.httpClient.delete<void> ('linkToRestAPI', member)
    // .toPromise;
    this.tab = this.tab.filter(item=> item.id!==id)
    return new Promise (resolve => resolve());
  }
  GetAllmembers() : Promise <nabil[]>
  {
    //return this.httpClient.get<Member[] ('linkToRestAPI').toPromise;>
    return new Promise( resolve => resolve(this.tab));
  }
}