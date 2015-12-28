var fs = require('fs');

var path = __dirname;

console.log(path);

fs.writeFile(path + "/asdf.txt", "hello what the hell", (err) => {
  if(err) throw err;
  console.log("done");
});