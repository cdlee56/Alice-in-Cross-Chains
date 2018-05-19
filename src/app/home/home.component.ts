import { Component, OnInit } from '@angular/core';

import {
  ContractService,
  Web3Service
} from '../../services/services'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private ContractSer: ContractService,
    private Web3Ser: Web3Service,
    ) {
   }


  ngOnInit() {
  }


}
