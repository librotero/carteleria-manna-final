"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const presupuesto_1 = __importDefault(require("../../../Models/presupuesto"));
const router = (0, express_1.Router)();
router.put('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha, clientes, contacto, carteles, operacion, orden, lugardecolocacion, lugartraslado, montototal, formadepago, plazodeentrega, fechavalida, observaciones, id } = req.body;
    console.log("holaaaa", orden, id, fechavalida);
    try {
        yield presupuesto_1.default.findByIdAndUpdate(id, {
            fecha, clientes, contacto, carteles, operacion, orden, lugardecolocacion, lugartraslado, montototal, formadepago, plazodeentrega, fechavalida, observaciones
        });
        // Send response in here
        res.send('Item Updated!');
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
