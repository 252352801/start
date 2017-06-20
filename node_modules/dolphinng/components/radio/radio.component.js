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
var RadioComponent = (function () {
    function RadioComponent(elemRef) {
        this.elemRef = elemRef;
        this.keyChange = new core_1.EventEmitter();
    }
    RadioComponent.prototype.ngOnInit = function () {
    };
    RadioComponent.prototype.toggleCheck = function (ev) {
        if (!this.disabled) {
            var target = ev.target || ev.srcElement;
            if (target.nodeName !== 'INPUT') {
                this.keyChange.emit(this.value);
            }
        }
    };
    RadioComponent.prototype.changeValue = function (ev) {
        ev.stopPropagation();
        if (!this.disabled) {
            this.keyChange.emit(this.value);
        }
    };
    return RadioComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RadioComponent.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RadioComponent.prototype, "display", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RadioComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RadioComponent.prototype, "size", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RadioComponent.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RadioComponent.prototype, "key", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RadioComponent.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RadioComponent.prototype, "customBackground", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RadioComponent.prototype, "keyChange", void 0);
RadioComponent = __decorate([
    core_1.Component({
        selector: 'radio',
        templateUrl: './radio.component.html',
        styleUrls: ['./radio.component.less']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], RadioComponent);
exports.RadioComponent = RadioComponent;
//# sourceMappingURL=radio.component.js.map