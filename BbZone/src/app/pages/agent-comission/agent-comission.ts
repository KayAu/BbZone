import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'agent-comission',
  templateUrl: './agent-comission.html'
})

export class AgentComission {
  agents: any[];

  constructor() { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.agents = [
      {
        "agentId": "1001",
        "agentName": "Agent 1",
        "product": "Unifi ",
        "package": "unifi 100Mbps - 2020(RM129)M2U",
        "commission": "180%",
        "isActive": true
      },
      {
        "agentId": "1002",
        "agentName": "Agent 2",
        "product": "Unifi ",
        "package": "ebiz package 30Mbps - RM249(M2U)",
        "commission": "160%",
        "isActive": true
      },
      {
        "agentId": "1003",
        "agentName": "Agent 3",
        "product": "Unifi ",
        "package": "ebiz package 30Mbps - RM249(M2U)",
        "commission": "130%",
        "isActive": true
      },
      {
        "agentId": "1004",
        "agentName": "Agent 4",
        "product": "Unifi ",
        "package": "unifi 100Mbps - 2020(RM129)newnew",
        "commission": "100%",
        "isActive": true
      },
      {
        "agentId": "1005",
        "agentName": "Agent 5",
        "product": "Unifi ",
        "package": "ebiz package 50Mbps - RM299(M2U)",
        "commission": "150%",
        "isActive": true
      },
      {
        "agentId": "1006",
        "agentName": "Agent 6",
        "product": "Unifi ",
        "package": "ebiz package 50Mbps - RM299(M2U)",
        "commission": "170%",
        "isActive": true
      },
      {
        "agentId": "1007",
        "agentName": "Agent 7",
        "product": "Unifi ",
        "package": "unifi Mobile RM59(12 months)",
        "commission": "150%",
        "isActive": true
      },
      {
        "agentId": "1008",
        "agentName": "Agent 8",
        "product": "Unifi ",
        "package": "unifi 30Mbps - Upsizing Promo(M2U)",
        "commission": "100%",
        "isActive": true
      },
      {
        "agentId": "1009",
        "agentName": "Agent 9",
        "product": "Unifi ",
        "package": "unifi 30Mbps - Upsizing Promo(M2U)",
        "commission": "100%",
        "isActive": false
      },
      {
        "agentId": "1010",
        "agentName": "Agent 10",
        "product": "Unifi ",
        "package": "unifi 100Mbps - 2020(RM129)M2U",
        "commission": "100%",
        "isActive": false
      }
    ]
  }

  setRowOnEdit(rowIndex: number) {

  }
}
