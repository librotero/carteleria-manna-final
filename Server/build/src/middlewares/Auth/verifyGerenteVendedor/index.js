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
exports.isGerenteVendedor = void 0;
const user_1 = __importDefault(require("../../../Models/user"));
const roles_1 = __importDefault(require("../../../Models/roles"));
const isGerenteVendedor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userId);
        const roles = yield roles_1.default.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            switch (roles[i].name) {
                case "gerente":
                    console.log("hola soy un jdidio gererente");
                    next();
                    return;
                case "vendedor":
                    console.log("hola soy un jdidio vendedor", roles[i].name);
                    next();
                    return;
                case "impresiones":
                    console.log("hola soy un jdidio impresiones", roles[i].name);
                    next();
                    return;
                default:
                    break;
            }
        }
        console.log("no se que pasa ");
        return res.status(403).json({ message: "Require gerente Role!" });
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
});
exports.isGerenteVendedor = isGerenteVendedor;
