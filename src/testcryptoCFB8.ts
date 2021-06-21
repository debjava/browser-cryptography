import * as crypto from "crypto";
import {encryptTextWithKey} from './assets/javascript/cryptocfb8';


export class TestcryptoCFB8 {
    private static readonly CRYPTO_ALGORITHM = 'aes-256-cfb8' // 128 bits segemnt size
    private static readonly DEFAULT_IV = "0123456789123456";

    public encryptUsingNodeJsCrypto(valueToEncrypt: string, secretKey: string): string {
        const key = crypto.createHash('md5').update(secretKey).digest('hex');
        const iv = Buffer.from( TestcryptoCFB8.DEFAULT_IV)
        const cipher = crypto.createCipheriv( TestcryptoCFB8.CRYPTO_ALGORITHM, key, iv);
        let encrypted = cipher.update(valueToEncrypt, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }
}

const test = new TestcryptoCFB8();
// const text2Encrypt = "A brown lazy dog";
const text2Encrypt = "token-token-1-2-3-3";
const someSecretKey = "projectId" + "~" + "India";
console.log("*************** Encryption using NodeJS Crypto *******************\n");
const cryptoEncryptedValue = test.encryptUsingNodeJsCrypto(text2Encrypt, someSecretKey);
console.log("Encrypted Value using NodeJS Crypto : ", cryptoEncryptedValue);

console.log("\n*************** Encryption using CryptoJS *******************\n");
const cryptoJsEncryptedValue = encryptTextWithKey(text2Encrypt,someSecretKey);
console.log("Encrypted Value using CryptoJS : ", cryptoJsEncryptedValue);
