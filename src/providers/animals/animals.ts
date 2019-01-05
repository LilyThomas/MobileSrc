import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AnimalProvider {

  public pdb;
  public remote;
  public animals;
  public seen;

  createPouchDB() {
    this.pdb = new PouchDB('animals');
    this.remote = 'http://localhost:5984/animals';

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.pdb.sync(this.remote, options);
  }

  constructor(public http: HttpClient){
    PouchDB.plugin(PouchDBFind);
  }

  create(animal) {
    return this.pdb.post(animal);
  }

  update(animal) {
    return this.pdb.put(animal);
  }

  delete(animal) {
    return this.pdb.remove(animal);
  }

  read() {
    let pdb = this.pdb;

    function allDocs() {

      let _animals = pdb.allDocs({ include_docs: true })
        .then(docs => {
          return docs.rows;
        });
      ;

      return Promise.resolve(_animals);
    };

    return allDocs();
  }

  getAnimalRandomBatch(id, seenIdsPromise){

    let randomBatchPromise:any;
    let pdb = this.pdb;

    randomBatchPromise = seenIdsPromise.then(function(result){
      let answeredIds: any = [];
      for(let seen of result.docs){
        console.log(seen);
        if(seen.animalId1 == id && typeof seen.match1 != 'undefined'){
          answeredIds.push(seen.animalId2);
        }
        else if(seen.animalId2 == id && typeof seen.match2 != 'undefined'){
          answeredIds.push(seen.animalId1);
        }
      }
      console.log("this.pdb.find");

      let _randomBatchPromise = pdb.find({
        selector: {
          $and: [
            {_id: {$ne: id}},
            {_id: {$nin: answeredIds}}
          ]
        }
      })
      return _randomBatchPromise;
    });

    return randomBatchPromise;
  }

  findAnimalById(id){
    return this.pdb.find({
      selector:{ _id: id}
    });
  }
}
