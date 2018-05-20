import { Component, OnInit } from '@angular/core';
import { ContractService} from "../../services/services";
import { Evidence } from '../../models/models'

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {

	list: Evidence[];

  constructor(
  	private ContractSer: ContractService,
  	) { 
  	this.ContractSer.GetPrecinctByActor().subscribe(Precinct => {
  		// debugger;
  		this.list = Precinct.Evidence
  	}, err => {
  		alert("an error occured")
  	})
  }

  ngOnInit() {
  }

}
