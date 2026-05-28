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
exports.LegalEntity = void 0;
const typeorm_1 = require("typeorm");
let LegalEntity = class LegalEntity {
};
exports.LegalEntity = LegalEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LegalEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], LegalEntity.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'BBG' }),
    __metadata("design:type", String)
], LegalEntity.prototype, "referential", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LegalEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3 }),
    __metadata("design:type", String)
], LegalEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3, default: 'EUR' }),
    __metadata("design:type", String)
], LegalEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LegalEntity.prototype, "lei", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], LegalEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], LegalEntity.prototype, "createdAt", void 0);
exports.LegalEntity = LegalEntity = __decorate([
    (0, typeorm_1.Entity)('legal_entities')
], LegalEntity);
//# sourceMappingURL=legal-entity.entity.js.map