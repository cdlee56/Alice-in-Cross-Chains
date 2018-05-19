import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'

const ContractArtifacts = require('../../build/contracts/ChainOfCustody.json');
const contract = require('truffle-contract');

//simple truffle template project

@Injectable()
export class ContractService {

	ChainOfCustody = contract(ContractArtifacts);

  constructor(
  	private Web3Ser: Web3Service,
  	) {
  	this.ChainOfCustody.setProvider(Web3Ser.Web3.currentProvider);
  }

  NewPrecinct(name: string, address: string): Observable<any>{
    let contract;
    return Observable.create(observer => {
      this.ChainOfCustody
        .deployed()
        .then(instance => {
          contract = instance;
          return contract.NewPrecinct(name, address,{
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

  GetPermission(): Observable<any>{
    let contract;
    return Observable.create(observer => {
      this.ChainOfCustody
        .deployed()
        .then(instance => {
          contract = instance;
          return contract.addrToPerson.call({
            from: this.Web3Ser.Account
          });
        })
        .then((addrToPerson: any) => {
          observer.next(addrToPerson)
          observer.complete()
        })
        .catch(e => {
          observer.error(e)
        });
    })
  }
}
