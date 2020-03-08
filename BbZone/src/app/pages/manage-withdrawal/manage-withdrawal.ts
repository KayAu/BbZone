import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'manage-withdrawal',
  templateUrl: './manage-withdrawal.html'
})

export class ManageWithdrawal {
  withdrawals: any[];

  constructor() { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.withdrawals = [
      {
        "withdrawalID": 1465,
        "agent": "amirulannuar87",
        "amount": "RM600.00",
        "dateSubmitted": "27 Jan 2020",
        "giroFee": "RM2.00",
        "completed": false,
        "completedOn": "",
        "refNo": ""
      },
      {
        "withdrawalID": 1464,
        "agent": "danielho",
        "amount": "RM1,900.00",
        "dateSubmitted": "27 Jan 2020",
        "giroFee": "RM0",
        "completed": false,
        "completedOn": "",
        "refNo": ""
      },
      {
        "withdrawalID": 1463,
        "agent": "samlee2234",
        "amount": "RM928.70",
        "dateSubmitted": "27 Jan 2020",
        "giroFee": "RM0",
        "completed": false,
        "completedOn": "",
        "refNo": ""
      },
      {
        "withdrawalID": 1462,
        "agent": "sayang",
        "amount": "RM2,207.90",
        "dateSubmitted": "24 Jan 2020",
        "giroFee": "RM0",
        "completed": true,
        "completedOn": "24 Jan 2020",
        "refNo": "7308836054"
      },
      {
        "withdrawalID": 1461,
        "agent": "BIG-WAN",
        "amount": "RM159.00",
        "dateSubmitted": "23 Jan 2020",
        "giroFee": "RM2.00",
        "completed": true,
        "completedOn": "24 Jan 2020",
        "refNo": "7308840034"
      },
      {
        "withdrawalID": 1459,
        "agent": "BIG-KUSYAFIQ",
        "amount": "RM1,100.00",
        "dateSubmitted": "23 Jan 2020",
        "giroFee": "RM0",
        "completed": true,
        "completedOn": "24 Jan 2020",
        "refNo": "7308833218"
      },
      {
        "withdrawalID": 1458,
        "agent": "ZEN",
        "amount": "RM174.70",
        "dateSubmitted": "23 Jan 2020",
        "giroFee": "RM2.00",
        "completed": true,
        "completedOn": "24 Jan 2020",
        "refNo": "7308843640"
      },
      {
        "withdrawalID": 1457,
        "agent": "mryandao",
        "amount": "RM5,785.10",
        "dateSubmitted": "22 Jan 2020",
        "giroFee": "RM0",
        "completed": false,
        "completedOn": "",
        "refNo": ""
      },
      {
        "withdrawalID": 1456,
        "agent": "BIG-APEK",
        "amount": "RM150.00",
        "dateSubmitted": "22 Jan 2020",
        "giroFee": "RM0",
        "completed": true,
        "completedOn": "24 Jan 2020",
        "refNo": "7308829116"
      },
      {
        "withdrawalID": 1455,
        "agent": "carol8788",
        "amount": "RM5,411.80",
        "dateSubmitted": "22 Jan 2020",
        "giroFee": "RM2.00",
        "completed": false,
        "completedOn": "",
        "refNo": ""
      },
      {
        "withdrawalID": 1454,
        "agent": "BIG-MAZLAN",
        "amount": "RM206.70",
        "dateSubmitted": "22 Jan 2020",
        "giroFee": "RM0",
        "completed": true,
        "completedOn": "24 Jan 2020",
        "refNo": "7308825816"
      },
      {
        "withdrawalID": 1452,
        "agent": "miri-chee hao",
        "amount": "RM3,000.00",
        "dateSubmitted": "22 Jan 2020",
        "giroFee": "RM0",
        "completed": true,
        "completedOn": "24 Jan 2020",
        "refNo": "7308888709"
      },
      {
        "withdrawalID": 1451,
        "agent": "kalyn90",
        "amount": "RM118.80",
        "dateSubmitted": "22 Jan 2020",
        "giroFee": "RM0",
        "completed": true,
        "completedOn": "24 Jan 2020",
        "refNo": "7308891548"
      },
      {
        "withdrawalID": 1450,
        "agent": "bbchee",
        "amount": "RM302.10",
        "dateSubmitted": "22 Jan 2020",
        "giroFee": "RM0",
        "completed": true,
        "completedOn": "24 Jan 2020",
        "refNo": "7308893883"
      },
      {
        "withdrawalID": 1449,
        "agent": "MSKL-JCCH",
        "amount": "RM356.40",
        "dateSubmitted": "22 Jan 2020",
        "giroFee": "RM0",
        "completed": true,
        "completedOn": "24 Jan 2020",
        "refNo": "7311006791"
      }];
  }

  editRow(rowIndex: number) {

  }
}
