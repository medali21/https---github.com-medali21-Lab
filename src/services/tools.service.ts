import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/app-config';
import { Tools } from 'src/models/tools.model';
@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  public tab:Tools[]=GLOBAL._DB.tools;
  constructor (private httpClient : HttpClient){}
  SaveMember(tools: any) : Promise <Tools >{
  // return this.httpClient.post<Member>
  // ('linkToRestAPI', member).ToPromise();
  const memberToSave = {
  id : tools.id ?? Math.ceil(Math.random()*10000).toString(),
  CreateDate : tools.CreateDate ?? new Date().toISOString(),
  ...tools
  };

  this.tab= [memberToSave, ...this.tab.filter(
    item => item.id!==tools.id)]

  return new Promise ( resolve => resolve(memberToSave))
  };

  getMemberById(id : string) : Promise <Tools>{
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
  GetAllmembers() : Promise <Tools[]>
  {
    //return this.httpClient.get<Member[] ('linkToRestAPI').toPromise;>
    return new Promise( resolve => resolve(this.tab));
  }
}