function generateCode(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength)); // Generates a random number less than length of character which is later gives a random output from string
  }
  return result;
}
  

module.exports = generateCode;
//Now the above function will be used when required.
//Don't forget to add "type" : "module", above licence line 



