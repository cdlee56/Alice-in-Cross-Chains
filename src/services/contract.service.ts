import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'

const CryptoProfsArtifacts = require('../../build/contracts/CryptoProfsMarket.json');
const contract = require('truffle-contract');

//simple truffle template project

@Injectable()
export class ContractService {

	CryptoProf = contract(CryptoProfsArtifacts);

  constructor(
  	private Web3Ser: Web3Service,
  	) {
  	this.CryptoProf.setProvider(Web3Ser.Web3.currentProvider);
  }

  BidProf(ProfID: number, Amount: number): Observable<any>{
    let profContract;
    return Observable.create(observer => {
      this.CryptoProf
        .deployed()
        .then(instance => {
          profContract = instance;
          return profContract.BidProf(ProfID, {
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
    let profContract;
    return Observable.create(observer => {
      this.CryptoProf
        .deployed()
        .then(instance => {
          profContract = instance;
          return profContract.profToOwner.call(ProfID, {
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
