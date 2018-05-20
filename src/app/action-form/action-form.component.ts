import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ContractService} from "../../services/services";
import { Action } from '../../models/models'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.css']
})
export class ActionFormComponent implements OnInit {

  EvidenceID: number;

  Action: Action = new Action()

  @Input() isEmbedded: boolean = false;
  @Output() ResultAction = new EventEmitter<Action>();

  constructor(
  	private ContractSer: ContractService,
    private router: Router,
    private ARouteSer: ActivatedRoute,
  	) { 

  	this.ARouteSer.params.subscribe(params => {
  	   this.EvidenceID = params['ID'];

  	   // this.ContractSer.GetEvidenceByID().subscribe(Evidence => {
  	   // 	// debugger;
  	   // 	this.list = Evidence.Actions
  	   // }, err => {
  	   // 	alert("an error occured")
  	   // })
  	});
  }

  ngOnInit() {
  }

  Submit() {
  	if (this.isEmbedded) {
  		this.ResultAction.emit(this.Action);
  	} else {
      this.ContractSer.NewAction(this.Action, this.EvidenceID).subscribe(() => {
         this.router.navigate(['/evidence/' + this.EvidenceID]);
      }, err => {
        alert("an error occured, try again later")
      })
    }
  }

}
