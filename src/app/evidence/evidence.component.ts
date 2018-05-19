import { Component, OnInit } from '@angular/core';
import { Evidence } from '../../models/models'

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {

	list: Evidence[];

  constructor() { }

  ngOnInit() {
  }

}
