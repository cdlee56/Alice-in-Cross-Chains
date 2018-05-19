import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'

const ContractArtifacts = require('../../build/contracts/Tracker.json');
const contract = require('truffle-contract');

//simple truffle template project

@Injectable()
export class ContractService {

	Tracker = contract(ContractArtifacts);

  constructor(
  	private Web3Ser: Web3Service,
  	) {
  	this.Tracker.setProvider(Web3Ser.Web3.currentProvider);
  }

  BidProf(ProfID: number, Amount: number): Observable<any>{
    let contract;
    return Observable.create(observer => {
      this.Tracker
        .deployed()
        .then(instance => {
          contract = instance;
          return contract.BidProf(ProfID, {
            value: this.Web3Ser.Web3.toWei(Amount, "ether"),
            from: this.Web3Ser.Account
          });
        })
        .then(() => {
          observer.next()
          observer.complete()
        })
        .catch(e => {
          console.log(e);
          observer.error(e)
        });
    })
  }

  GetOwner(ProfID: number): Observable<any>{
    let contract;
    return Observable.create(observer => {
      this.Tracker
        .deployed()
        .then(instance => {
          contract = instance;
          return contract.profToOwner.call(ProfID, {
            from: this.Web3Ser.Account
          });
        })
        .then((ProfOwner: any) => {
          observer.next(ProfOwner)
          observer.complete()
        })
        .catch(e => {
          observer.error(e)
        });
    })
  }
}
