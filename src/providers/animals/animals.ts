import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';

@Injectable()
export class AnimalProvider {

  public pdb;
  public remote;
  public animals;

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
    console.log("hello reader");
    let pdb = this.pdb;

    function allDocs() {

      let _animals = pdb.allDocs({ include_docs: true })
        .then(docs => {
          return docs.rows;
        });

      console.log(_animals);
      console.log(Promise.resolve(_animals));

      return Promise.resolve(_animals);
    };

    return allDocs();
  }


}
