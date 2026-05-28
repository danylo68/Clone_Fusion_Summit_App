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
exports.Bond = exports.BondType = exports.CouponFrequency = void 0;
const typeorm_1 = require("typeorm");
var CouponFrequency;
(function (CouponFrequency) {
    CouponFrequency["ANNUAL"] = "ANNUAL";
    CouponFrequency["SEMI_ANNUAL"] = "SEMI_ANNUAL";
    CouponFrequency["QUARTERLY"] = "QUARTERLY";
})(CouponFrequency || (exports.CouponFrequency = CouponFrequency = {}));
var BondType;
(function (BondType) {
    BondType["FIXED"] = "FIXED";
    BondType["FLOATING"] = "FLOATING";
    BondType["ZERO_COUPON"] = "ZERO_COUPON";
})(BondType || (exports.BondType = BondType = {}));
let Bond = class Bond {
};
exports.Bond = Bond;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Bond.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Bond.prototype, "isin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bond.prototype, "ticker", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bond.prototype, "issuer", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3 }),
    __metadata("design:type", String)
], Bond.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'face_value', type: 'decimal', precision: 20, scale: 4, default: 1000 }),
    __metadata("design:type", Number)
], Bond.prototype, "faceValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coupon_rate', type: 'decimal', precision: 8, scale: 6 }),
    __metadata("design:type", Number)
], Bond.prototype, "couponRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coupon_frequency', type: 'enum', enum: CouponFrequency }),
    __metadata("design:type", String)
], Bond.prototype, "couponFrequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'issue_date', type: 'date' }),
    __metadata("design:type", String)
], Bond.prototype, "issueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'maturity_date', type: 'date' }),
    __metadata("design:type", String)
], Bond.prototype, "maturityDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bond.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3 }),
    __metadata("design:type", String)
], Bond.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bond.prototype, "sector", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: BondType, default: BondType.FIXED }),
    __metadata("design:type", String)
], Bond.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Bond.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Bond.prototype, "createdAt", void 0);
exports.Bond = Bond = __decorate([
    (0, typeorm_1.Entity)('bonds')
], Bond);
//# sourceMappingURL=bond.entity.js.map