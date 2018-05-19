import { Component, OnInit } from '@angular/core';

import {
  ContractService,
  Web3Service
} from '../../services/services'

const MAX_PROFS = 15200
const LOAD_NUM = 1000

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private CryptoProfSer: CryptoProfService,
    private Web3Ser: Web3Service,
    ) {
   }


  ngOnInit() {
  }


}
