import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { environment } from '../environments/environment';

const Web3 = require('web3');

declare var window: any;

@Injectable()
export class Web3Service {

	public Web3: any;
  public Account: any;
  public Accounts: any;

  constructor() { 
  	this.checkAndInstantiateWeb3();

    this.getAccounts().subscribe(accs => {
      this.Accounts = accs;
      this.Account = this.Accounts[0];
    })
  }

  checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // console.warn(
      //   'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      // );
      // Use Mist/MetaMask's provider
      this.Web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to ${environment.HttpProvider}. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.Web3 = new Web3(
        new Web3.providers.HttpProvider(environment.HttpProvider)
      );
    }
  };

  getAccounts(): Observable<any>{
  	return Observable.create(observer => {
  	  this.Web3.eth.getAccounts((err, accs) => {
  	    if (err != null) {
          if (accs.length === 0) {
            observer.error('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
          }
  	      observer.error('There was an error fetching your accounts.')
  	    }

  	    observer.next(accs)
  	    observer.complete()
  	  });
  	})
  }

}
