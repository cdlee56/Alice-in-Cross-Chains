import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { Web3Service } from "./web3.service";

import { Precinct, Actor, Evidence } from "../models/models";

const ContractArtifacts = require("../../build/contracts/ChainOfCustody.json");
const contract = require("truffle-contract");

@Injectable()
export class ContractService {
  ChainOfCustody = contract(ContractArtifacts);

  constructor(private Web3Ser: Web3Service) {
    this.ChainOfCustody.setProvider(Web3Ser.Web3.currentProvider);
  }

  NewPrecinct(newPrecinct: Precinct, Sherif: Actor): Observable<any> {
    var contract
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          contract = instance
          // debugger
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
          // debugger
          observer.next();
          observer.complete();
        })
        .catch(e => {
          // debugger
          console.log(e);
          observer.error(e);
        });
    });
  }

  NewActor(actor: Actor): Observable<any> {
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          console.log(actor)
          let precinct = localStorage.getItem('precinct')
          let isAdmin = JSON.stringify(actor.IsAdmin)
          // debugger
          return instance.NewActor(
            0,
            actor.Address,
            actor.Name,
            actor.BadgeNumber,
            actor.Title,
            isAdmin,
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

  NewEvidence(evidence: Evidence): Observable<any> {
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          // var precinct = JSON.parse(localStorage.getItem('precinct'))
          console.log(evidence)
          // debugger;
          return instance.NewEvidence(
            // precinct.id,
            evidence.Image,
            evidence.Title,
            evidence.What,
            evidence.Actions[0].What,
            evidence.Actions[0].Location,
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

  public GetPrecinctByActor(): Observable<any> {
    return Observable.create(observer => {
      this.GetActor().subscribe(
        Actor => {
          console.log(Actor)
          this.GetPrecinct(Actor[0]).subscribe(
            Precinct => {
              observer.next(Precinct);
              observer.complete();
            },
            err => {
              observer.error("precinct: " + err);
            }
          );
        },
        err => {
          observer.error("actor: " + err);
        }
      );
    });
  }

  GetActor(): Observable<any> {
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          return instance.actorMap.call(this.Web3Ser.Account, {
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

  GetPrecinct(PrecinctID): Observable<Precinct> {
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          return instance.precinctMap.call(PrecinctID, {
            from: this.Web3Ser.Account
          });
        })
        .then((PrecinctArr: any) => {
          console.log(PrecinctArr)
          var precinct = new Precinct()
          precinct.ID = PrecinctArr[0]
          precinct.Name = PrecinctArr[1]
          precinct.Address = PrecinctArr[2]
          precinct.EvidenceCount = PrecinctArr[3].toNumber()
          this.GetAllEvidenceForPrecinct(precinct.ID, precinct.EvidenceCount).subscribe(result => {
            precinct.Evidence = result
            console.log(result)  
            observer.next(precinct);
            observer.complete();
          }, err => {
            observer.error(err);
          })
          
          
        })
        .catch(e => {
          observer.error(e);
        });
    });
  }

  GetAllEvidenceForPrecinct(PrecinctID: string, EvidenceCount:number, idx:number = 0): Observable<Evidence[]>{
    if (EvidenceCount == idx) {
      return Observable.create(observer => {
        observer.next([])
        observer.complete()
      })
    }
    if (EvidenceCount == null) {
      return this.GetAllEvidenceForPrecinct(PrecinctID, idx+1)
    }
    return Observable.create(observer => {
      this.GetEvidenceForPrecinct(PrecinctID, idx).subscribe(result =>{
        this.GetAllEvidenceForPrecinct(PrecinctID, EvidenceCount, idx+1).subscribe(pluralResult => {
          observer.next(pluralResult.concat(result))
          observer.complete()
        }, err => {
          //bubble up, no comment
          observer.error(err)
        })
      }, err => {
        observer.error("idx "+ idx + err)
      })
    })
  }


  GetEvidenceForPrecinct(PrecinctID, EvidenceIdx): Observable<Evidence> {
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          return instance.GetEvidence(PrecinctID, EvidenceIdx, {
            from: this.Web3Ser.Account
          });
        })
        .then((result: any) => {
          console.log(result)
          var evidence = new Evidence()
          evidence.ID = result[0].toNumber()
          evidence.PrecinctID = result[1].toNumber()
          evidence.Image = result[2]
          evidence.Title = result[3]
          evidence.What = result[4]
          evidence.ActionCount = result[5].toNumber()
          observer.next(evidence);
          observer.complete();
        })
        .catch(e => {
          observer.error(e);
        });
    });
  }

  GetPermission(): Observable<any> {
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          return instance.actorMap.call(this.Web3Ser.Account, {
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
}
