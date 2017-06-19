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
var RootContainerComponent = (function () {
    function RootContainerComponent() {
    }
    return RootContainerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RootContainerComponent.prototype, "headerFixed", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RootContainerComponent.prototype, "asideFixed", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RootContainerComponent.prototype, "asideFolded", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RootContainerComponent.prototype, "asideDock", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RootContainerComponent.prototype, "container", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RootContainerComponent.prototype, "offScreen", void 0);
RootContainerComponent = __decorate([
    core_1.Component({
        selector: 'root-container',
        templateUrl: './root-container.component.html',
        styleUrls: ['./root-container.component.less']
    }),
    __metadata("design:paramtypes", [])
], RootContainerComponent);
exports.RootContainerComponent = RootContainerComponent;
//# sourceMappingURL=root-container.component.js.map