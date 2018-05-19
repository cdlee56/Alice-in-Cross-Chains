import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { Web3Service } from "./web3.service";

import { Precinct, Actor } from "../models/models";

const ContractArtifacts = require("../../build/contracts/ChainOfCustody.json");
const contract = require("truffle-contract");

@Injectable()
export class ContractService {
  ChainOfCustody = contract(ContractArtifacts);

  constructor(private Web3Ser: Web3Service) {
    this.ChainOfCustody.setProvider(Web3Ser.Web3.currentProvider);
  }

  NewPrecinct(newPrecinct: Precinct, Sherif: Actor): Observable<any> {
    let contract;
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          contract = instance;
          return contract.NewPrecinct(
            newPrecinct.Name,
            newPrecinct.Address,
            Sherif.Name,
            Sherif.BadgeNumber,
            Sherif.Title,
            {
              from: this.Web3Ser.Account
            }
          );
        })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  NewActor(actor: Actor): Observable<any> {
    let contract;
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          contract = instance;
          return contract.NewActor(
            actor.Name,
            actor.BadgeNumber,
            actor.Title,
            actor.IsAdmin,
            {
              from: this.Web3Ser.Account
            }
          );
        })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  GetPrecinctByActor(): Observable<any> {
    return Observable.create(observer => {
      this.GetActor().subscribe(
        Actor => {
          this.GetPrecinct(Actor.PrecinctID).subscribe(
            Precinct => {
              observer.next(Precinct);
              observer.complete();
            },
            err => {
              observer.error(err);
            }
          );
        },
        err => {
          observer.error(err);
        }
      );
    });
  }

  GetActor(): Observable<any> {
    let contract;
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          contract = instance;
          return contract.actorMap.call({
            from: this.Web3Ser.Account
          });
        })
        .then((Actor: any) => {
          observer.next(Actor);
          observer.complete();
        })
        .catch(e => {
          observer.error(e);
        });
    });
  }

  GetPrecinct(PrecinctID): Observable<any> {
    let contract;
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          contract = instance;
          return contract.precinctMap.call(PrecinctID, {
            from: this.Web3Ser.Account
          });
        })
        .then((Precinct: any) => {
          observer.next(Precinct);
          observer.complete();
        })
        .catch(e => {
          observer.error(e);
        });
    });
  }

  GetPermission(): Observable<any> {
      let contract;
      return Observable.create(observer => {
        this.ChainOfCustody.deployed()
          .then(instance => {
            contract = instance;
            return contract.addrToPerson.call({
              from: this.Web3Ser.Account
            });
          })
          .then((addrToPerson: any) => {
            observer.next(addrToPerson);
            observer.complete();
          })
          .catch(e => {
            observer.error(e);
          });
      });
  }
}
