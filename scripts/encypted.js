import { Socket } from './Socket';


var aes256 = require("aes256");

function get_key(){
  Socket.emit('getk',{bs:'bs'});
  Socket.on('key', (data)=>{
    return(data['key']);

  })
}

export const DoEncrypt = (text) => {
  var x=get_key()
  var encrypted = aes256.encrypt(toString(x), text);
  x='';
  return encrypted;
};
export const DoDecrypt = (cipher) => {
  var x=get_key()
  var decrypted = aes256.decrypt(toString(x), cipher);
  x='';
  return decrypted;
};

