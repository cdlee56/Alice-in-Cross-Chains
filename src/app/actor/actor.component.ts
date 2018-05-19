import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  	console.log(this.isEmbedded)
  	if (this.isEmbedded) {
  		// this.PaddingStyle = ""
  	}
  }

  Submit() {
  	if (this.isEmbedded) {
  		this.ResultActor.emit(this.Actor);
  	}
  }

}
