var aes256 = require("aes256");

var key = process.env.REACT_APP_KEY;

export const DoEncrypt = (text) => {
  var encrypted = aes256.encrypt(key, text);
  return encrypted;
};
export const DoDecrypt = (cipher) => {

  var decrypted = aes256.decrypt(key, cipher);
  return decrypted;
};