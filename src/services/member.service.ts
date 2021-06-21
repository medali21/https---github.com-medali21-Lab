import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/app-config';
import { Member } from 'src/models/member.model';
@Injectable({
  providedIn: 'root'
})

export class MemberService {
 
  
  public tab : Member[] = GLOBAL._DB.members;
  constructor(private httpClient : HttpClient) {
   
   }
  SaveMember(member : any) : Promise<Member> {
  
  const memberToSave ={
  id : member.id ?? Math.ceil (Math.random() * 10000).toString(),
  CreatedDate : member.createdDate ?? new Date().toLocaleDateString(),
  ...member};
  this.tab = [memberToSave, ...this.tab.filter(item => item.id !== member.id)] 
  return new Promise (resolve => resolve (memberToSave)) };

  getMemberById (id : string) : Promise<Member> {
    return new Promise (resolve => resolve (this.tab.filter(item => item.id=== id)[0]?? null))
  };
  RemoveMemberById(id:String):Promise<void>{
    // this.httpClient.delete<void> ('linkToRestAPI', member)
    // .toPromise;
    this.tab = this.tab.filter(item=> item.id!==id)
    return new Promise (resolve => resolve());
  }
  GetAllmembers() : Promise <Member[]>
  {
    //return this.httpClient.get<Member[] ('linkToRestAPI').toPromise;>
    return new Promise( resolve => resolve(this.tab));
  }
}
