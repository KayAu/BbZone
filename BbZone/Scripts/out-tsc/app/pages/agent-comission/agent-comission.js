"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AgentComission = /** @class */ (function () {
    function AgentComission() {
    }
    AgentComission.prototype.ngOnInit = function () {
        this.loadData();
    };
    AgentComission.prototype.loadData = function () {
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
        ];
    };
    AgentComission.prototype.setRowOnEdit = function (rowIndex) {
    };
    AgentComission = __decorate([
        core_1.Component({
            selector: 'agent-comission',
            templateUrl: './agent-comission.html'
        }),
        __metadata("design:paramtypes", [])
    ], AgentComission);
    return AgentComission;
}());
exports.AgentComission = AgentComission;
//# sourceMappingURL=agent-comission.js.map