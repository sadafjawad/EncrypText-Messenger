import cryptoJs from "crypto-js";


export const unlock = (text) => {
    let locked = cryptoJs.AES.decrypt(text, 'insertKeyABC');
    return locked.toString(cryptoJs.enc.Utf8)
}
