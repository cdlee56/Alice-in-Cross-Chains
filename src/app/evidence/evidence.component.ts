import { Component, OnInit } from '@angular/core';
import { ContractService} from "../../services/services";
import { Evidence } from '../../models/models'
import { Router } from '@angular/router';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {

	list: Evidence[];

  constructor(
  	private ContractSer: ContractService,
    private router: Router,
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

  Open(Evidence: Evidence){
    this.router.navigate(['evidence/' + Evidence.ID]);
  }

}
