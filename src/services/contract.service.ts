import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { Web3Service } from "./web3.service";

import { Precinct, Actor, Evidence, Action } from "../models/models";

const ContractArtifacts = require("../../build/contracts/ChainOfCustody.json");
const contract = require("truffle-contract");

@Injectable()
export class ContractService {
  ChainOfCustody = contract(ContractArtifacts);

  constructor(private Web3Ser: Web3Service) {
    this.ChainOfCustody.setProvider(Web3Ser.Web3.currentProvider);
  }

  NewPrecinct(newPrecinct: Precinct, Sherif: Actor): Observable<any> {
    var contract;
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          contract = instance;
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
          console.log(actor);
          let precinct = localStorage.getItem("precinct");
          let isAdmin = JSON.stringify(actor.IsAdmin);
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
          console.log(evidence);
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

  NewAction(action: Action, EvidenceID: number): Observable<any> {
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          // var precinct = JSON.parse(localStorage.getItem('precinct'))
          console.log(action);
          // debugger;
          return instance.NewAction(
            // precinct.id,
            EvidenceID,
            action.What,
            action.Location,
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
          console.log(Actor);
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

  GetActor(Address: string = ""): Observable<any> {
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          if (Address == ""){
            return instance.actorMap.call(this.Web3Ser.Account, {
              from: this.Web3Ser.Account
            });
          } else {
            return instance.actorMap.call(Address, {
              from: this.Web3Ser.Account
            });
          }
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
          // console.log(PrecinctArr);
          var precinct = new Precinct();
          precinct.ID = PrecinctArr[0].toNumber();
          precinct.Name = PrecinctArr[1];
          precinct.Address = PrecinctArr[2];
          precinct.EvidenceCount = PrecinctArr[3].toNumber();

          this.GetAllEvidenceForPrecinct(
            precinct.ID,
            precinct.EvidenceCount
          ).subscribe(
            result => {
              precinct.Evidence = result;
              // console.log(result);
              observer.next(precinct);
              observer.complete();
            },
            err => {
              observer.error(err);
            }
          );
        })
        .catch(e => {
          observer.error(e);
        });
    });
  }

  GetAllEvidenceForPrecinct(
    PrecinctID: string,
    EvidenceCount: number,
    idx: number = 0
  ): Observable<Evidence[]> {
    if (EvidenceCount == idx) {
      return Observable.create(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    if (EvidenceCount == null) {
      return this.GetAllEvidenceForPrecinct(PrecinctID, idx + 1);
    }
    return Observable.create(observer => {
      this.GetEvidenceForPrecinct(PrecinctID, idx).subscribe(
        result => {
          this.GetAllEvidenceForPrecinct(
            PrecinctID,
            EvidenceCount,
            idx + 1
          ).subscribe(
            pluralResult => {
              observer.next(pluralResult.concat(result));
              observer.complete();
            },
            err => {
              //bubble up, no comment
              observer.error(err);
            }
          );
        },
        err => {
          observer.error("idx " + idx + err);
        }
      );
    });
  }

  GetAllActionsForEvidenceByID(EvidenceID: number): Observable<Action[]> {
    return Observable.create(observer => {
      this.GetPrecinctByActor().subscribe(
        precinct => {
          console.log("precinct.ID", precinct.ID)
          console.log("EvidenceID", EvidenceID)
          console.log("precinct.action[EvidenceID].ActionCount", precinct.Evidence[EvidenceID])
          console.log("precinct.action[EvidenceID].ActionCount", precinct.Evidence[EvidenceID].ActionCount)
          // debugger;
          this.GetAllActionsForEvidence(
            precinct.ID,
            EvidenceID,
            precinct.Evidence[EvidenceID].ActionCount
          ).subscribe(
            result => {
              // debugger;
              observer.next(result);
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

  GetAllActionsForEvidence(
    PrecinctID: string,
    EvidenceID: number,
    ActionCount: number,
    idx: number = 0
  ): Observable<Action[]> {
    if (ActionCount == idx) {
      return Observable.create(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    if (ActionCount == null) {
      return this.GetAllActionsForEvidence(PrecinctID, EvidenceID, idx + 1);
    }
    return Observable.create(observer => {
      this.GetActionForEvidence(PrecinctID, EvidenceID, idx).subscribe(
        result => {
          this.GetAllActionsForEvidence(
            PrecinctID,
            EvidenceID,
            ActionCount,
            idx + 1
          ).subscribe(
            pluralResult => {
              observer.next(pluralResult.concat(result));
              observer.complete();
            },
            err => {
              //bubble up, no comment
              observer.error(err);
            }
          );
        },
        err => {
          observer.error("idx " + idx + err);
        }
      );
    });
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
          // console.log(result);
          var evidence = new Evidence();
          evidence.ID = result[0].toNumber();
          evidence.PrecinctID = result[1].toNumber();
          evidence.Image = result[2];
          evidence.Title = result[3];
          evidence.What = result[4];
          evidence.ActionCount = result[5].toNumber();
          // debugger
          this.GetActionForEvidence(PrecinctID, EvidenceIdx, 1).subscribe(
            result => {
              evidence.Actions[0] = result;
            },
            err => {
              observer.error("couldn't get 0th action:", err);
            }
          );
          observer.next(evidence);
          observer.complete();
        })
        .catch(e => {
          observer.error(e);
        });
    });
  }

  GetActionForEvidence(PrecinctID, EvidenceIdx, ActionIdx): Observable<Action> {
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          return instance.GetAction(PrecinctID, EvidenceIdx, ActionIdx, {
            from: this.Web3Ser.Account
          });
        })
        .then((result: any) => {
          console.log(result);
          // debugger;
          var action = new Action();
          action.ID = result[0].toNumber();
          action.EvidenceID = result[1].toNumber();
          
          action.What = result[3];
          action.When = new Date(result[4] * 1000).toString();
          action.Location = result[5];

          this.GetActor(result[2]).subscribe(actor => {
            console.log(actor)
            // debugger
            action.Who = actor[1];
            observer.next(action);
            observer.complete();
          }, err => {
            observer.error(err);
          })

          // observer.next(action);
          // observer.complete();
          
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
