import { Component, OnInit } from '@angular/core';
import { ContractService } from "../../services/services";
import { Precinct, Actor } from '../../models/models'
import { Router } from '@angular/router';

@Component({
  selector: 'app-precinct',
  templateUrl: './precinct.component.html',
  styleUrls: ['./precinct.component.css']
})
export class PrecinctComponent implements OnInit {

	Precinct: Precinct = new Precinct();

  constructor(
  	private ContractSer: ContractService,
  	private router: Router
  	) { }

  ngOnInit() {
  }

  Submit(Actor) {
  	console.log(Actor)
  	console.log(this.Precinct)

  	this.ContractSer.NewPrecinct(this.Precinct, Actor).subscribe(() => {
      this.ContractSer.GetActor().subscribe(Actor => {
        debugger
            localStorage.setItem('actor', Actor);
            this.router.navigate(['/']);
      })
  	}, err => {
  		alert("an error occured, try again later")
  	})
  }

}
