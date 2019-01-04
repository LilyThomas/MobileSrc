import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import {HttpClient} from "@angular/common/http";
import {selector} from "rxjs/operator/publish";
import {AnimalProvider} from "../animals/animals";


@Injectable()
export class MatchProvider {

  public pdb;
  public remote;
  public matches;

  constructor(
    public http: HttpClient) {
    PouchDB.plugin(PouchDBFind);
  }

  createPouchDB() {
    this.pdb = new PouchDB('matches');
    this.remote = 'http://localhost:5984/matches';

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.pdb.sync(this.remote, options);
  }

  create(match) {
    return this.pdb.post(match);
  }

  update(match) {
    return this.pdb.put(match);
  }

  delete(match) {
    return this.pdb.remove(match);
  }

  getSeenIds(id){
    // let answeredIds: any = [];

    let _seenIdsPromise = this.pdb.find({
      selector: {
        $or : [
          {animalId1: id}, {animalId2: id}
        ]
      }
    });
    // .then(function(result){
    //   let answeredIds: any = [];
    //   for(let seen of result.docs){
    //     console.log(seen);
    //     if(seen.animalId1 == id && typeof seen.match1 != 'undefined'){
    //       answeredIds.push(seen.animalId2);
    //     }
    //     else if(seen.animalId2 == id && typeof seen.match2 != 'undefined'){
    //       answeredIds.push(seen.animalId1);
    //     }
    //   }
    //   console.log("this.pdb.find");
    //   aniProv.getRandomBatch(answeredIds, id);
    // });

    // Promise.resolve(_match);
    //
    // console.log("getSeenIds");
    // console.log(answeredIds);
    // console.log(_match);

    return _seenIdsPromise;
  }

}
