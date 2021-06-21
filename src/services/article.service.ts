import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/app-config';
import { Article } from 'src/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public tab:Article[]=GLOBAL._DB.articles;
  constructor (private httpClient : HttpClient){}
  SaveMember(member: any) : Promise <Article>{
  // return this.httpClient.post<Member>
  // ('linkToRestAPI', member).ToPromise();
  const memberToSave = {
  id : member.id ?? Math.ceil(Math.random()*10000).toString(),
  CreateDate : member.CreateDate ?? new Date().toISOString(),
  ...member
  };

  this.tab= [memberToSave, ...this.tab.filter(
    item => item.id!==member.id)]

  return new Promise ( resolve => resolve(memberToSave))
  };

  getMemberById(id : string) : Promise <Article>{
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
  GetAllmembers() : Promise <Article[]>
  {
    //return this.httpClient.get<Member[] ('linkToRestAPI').toPromise;>
    return new Promise( resolve => resolve(this.tab));
  }
}
