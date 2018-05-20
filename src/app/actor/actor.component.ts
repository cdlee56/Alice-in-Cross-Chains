import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from "../../services/services";
import {Actor} from '../../models/models'


@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

	@Input() isEmbedded: boolean = false;
	@Output() ResultActor = new EventEmitter<Actor>();

	Actor: Actor = new Actor()

	// PaddingStyle = {
	// 	"padding-left": 20px, 
	// 	"padding-top": 20px
	// }

  constructor(
    private ContractSer: ContractService,
    private router: Router,
    ) { 

    // let precinct = localStorage.getItem('precinct')
    // debugger

  }

  ngOnInit() {
  	console.log(this.isEmbedded)
  	if (this.isEmbedded) {
  		// this.PaddingStyle = ""
  	}
  }

  Submit() {
  	if (this.isEmbedded) {
  		this.ResultActor.emit(this.Actor);
  	} else {
      this.ContractSer.NewActor(this.Actor).subscribe(() => {
         this.router.navigate(['/']);
      }, err => {
        alert("an error occured, try again later")
      })
    }
  }

}
