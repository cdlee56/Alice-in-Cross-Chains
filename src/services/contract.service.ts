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
