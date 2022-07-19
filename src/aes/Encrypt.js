import cryptoJs from "crypto-js"; 

// const k = 'applePiesSHIT43';
export const lock = (text, k) => {
    let locked = cryptoJs.AES.encrypt(text, 'insertKeyABC');
    return locked.toString();
}



