import { Component, OnInit } from "@angular/core";

import { ContractService, Web3Service } from "../../services/services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public isKnown: boolean = false;
  public isAdmin: boolean = false;

  constructor(
    private ContractSer: ContractService,
    private Web3Ser: Web3Service
  ) {
    this.ContractSer.GetPermission().subscribe(
      result => {
        if (result){
          this.isKnown = true;
        }

        if (result[4]){
          this.isAdmin = true;
        }
      },
      err => {
        console.log("something broke:", err);
      }
    );
  }

  ngOnInit() {}
}
