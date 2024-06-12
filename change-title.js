const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'build', 'index.html');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const result = data.replace(/<title>.*<\/title>/, '<title>NilUrl</title>');

  fs.writeFile(filePath, result, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Title has been updated to NilUrl');
  });
});