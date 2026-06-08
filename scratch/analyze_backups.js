const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('scratch');
files.forEach(file => {
  if (file.startsWith('backup_') && file.endsWith('.txt')) {
    const filePath = path.join('scratch', file);
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`\n=================== FILE: ${file} (Size: ${content.length} bytes) ===================`);
    console.log(content.substring(0, 400));
  }
});
