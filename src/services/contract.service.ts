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
          return instance.NewActor(
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

  public GetPrecinctByActor(): Observable<any> {
    return Observable.create(observer => {
      // this.GetActor().subscribe(
      //   Actor => {
      //     this.GetPrecinct(Actor.PrecinctID).subscribe(
      //       Precinct => {
      //         observer.next(Precinct);
      //         observer.complete();
      //       },
      //       err => {
      //         observer.error(err);
      //       }
      //     );
      //   },
      //   err => {
      //     observer.error(err);
      //   }
      // );
      observer.next({
        ID: 1,
        Name: "bobs precinct",
        Address: "123 bob st",
        Evidence: [
          {
            ID: 1,
            Title: "bandana B",
            What:
              "A blue bandana found on the living room floor of suspects house",
            img:
              "https://www.icing.com/dw/image/v2/BBTK_PRD/on/demandware.static/-/Sites-master-catalog/default/dw90f825e4/images/icing/hi-res/98274_1.jpg?sw=734&sh=734&sm=fit",
            Actions: [
              {
                Who: {
                  Name: "officer bob",
                  BadgeNumber: "4376893205",
                  Title: "Detective"
                },
                What: "discovered on floor of living room",
                When: "11:09 PM - 1 Jan 2016",
                Location: "123 baker st."
              }
            ]
          },
          {
            ID: 1,
            Title: "bandana B",
            What:
              "A blue bandana found on the living room floor of suspects house",
            img:
              "https://www.icing.com/dw/image/v2/BBTK_PRD/on/demandware.static/-/Sites-master-catalog/default/dw90f825e4/images/icing/hi-res/98274_1.jpg?sw=734&sh=734&sm=fit",
            Actions: [
              {
                Who: {
                  Name: "officer bob",
                  BadgeNumber: "4376893205",
                  Title: "Detective"
                },
                What: "discovered on floor of living room",
                When: "11:09 PM - 1 Jan 2016",
                Location: "123 baker st."
              }
            ]
          },
          {
            ID: 1,
            Title: "bandana B",
            What:
              "A blue bandana found on the living room floor of suspects house",
            img:
              "https://www.icing.com/dw/image/v2/BBTK_PRD/on/demandware.static/-/Sites-master-catalog/default/dw90f825e4/images/icing/hi-res/98274_1.jpg?sw=734&sh=734&sm=fit",
            Actions: [
              {
                Who: {
                  Name: "officer bob",
                  BadgeNumber: "4376893205",
                  Title: "Detective"
                },
                What: "discovered on floor of living room",
                When: "11:09 PM - 1 Jan 2016",
                Location: "123 baker st."
              }
            ]
          },
          {
            ID: 1,
            Title: "bandana B",
            What:
              "A blue bandana found on the living room floor of suspects house",
            img:
              "https://www.icing.com/dw/image/v2/BBTK_PRD/on/demandware.static/-/Sites-master-catalog/default/dw90f825e4/images/icing/hi-res/98274_1.jpg?sw=734&sh=734&sm=fit",
            Actions: [
              {
                Who: {
                  Name: "officer bob",
                  BadgeNumber: "4376893205",
                  Title: "Detective"
                },
                What: "discovered on floor of living room",
                When: "11:09 PM - 1 Jan 2016",
                Location: "123 baker st."
              }
            ]
          },
          {
            ID: 1,
            Title: "bandana B",
            What:
              "A blue bandana found on the living room floor of suspects house",
            img:
              "https://www.icing.com/dw/image/v2/BBTK_PRD/on/demandware.static/-/Sites-master-catalog/default/dw90f825e4/images/icing/hi-res/98274_1.jpg?sw=734&sh=734&sm=fit",
            Actions: [
              {
                Who: {
                  Name: "officer bob",
                  BadgeNumber: "4376893205",
                  Title: "Detective"
                },
                What: "discovered on floor of living room",
                When: "11:09 PM - 1 Jan 2016",
                Location: "123 baker st."
              }
            ]
          },
        ]
      });
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

  GetPrecinct(PrecinctID): Observable<any> {
    return Observable.create(observer => {
      this.ChainOfCustody.deployed()
        .then(instance => {
          return instance.precinctMap.call(PrecinctID, {
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
