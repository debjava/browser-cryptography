"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestcryptoCFB8 = void 0;
const crypto = __importStar(require("crypto"));
const cryptocfb8_1 = require("./assets/javascript/cryptocfb8");
class TestcryptoCFB8 {
    encryptUsingNodeJsCrypto(valueToEncrypt, secretKey) {
        const key = crypto.createHash('md5').update(secretKey).digest('hex');
        const iv = Buffer.from(TestcryptoCFB8.DEFAULT_IV);
        const cipher = crypto.createCipheriv(TestcryptoCFB8.CRYPTO_ALGORITHM, key, iv);
        let encrypted = cipher.update(valueToEncrypt, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }
}
exports.TestcryptoCFB8 = TestcryptoCFB8;
TestcryptoCFB8.CRYPTO_ALGORITHM = 'aes-256-cfb8'; // 128 bits segemnt size
TestcryptoCFB8.DEFAULT_IV = "0123456789123456";
const test = new TestcryptoCFB8();
// const text2Encrypt = "A brown lazy dog";
const text2Encrypt = "token-token-1-2-3-3";
const someSecretKey = "projectId" + "~" + "India";
console.log("*************** Encryption using NodeJS Crypto *******************\n");
const cryptoEncryptedValue = test.encryptUsingNodeJsCrypto(text2Encrypt, someSecretKey);
console.log("Encrypted Value using NodeJS Crypto : ", cryptoEncryptedValue);
console.log("\n*************** Encryption using CryptoJS *******************\n");
const cryptoJsEncryptedValue = cryptocfb8_1.encryptTextWithKey(text2Encrypt, someSecretKey);
console.log("Encrypted Value using CryptoJS : ", cryptoJsEncryptedValue);
