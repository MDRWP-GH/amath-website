const fs = require('fs');
const pdf = require('pdf-parse/dist/pdf-parse/cjs/index.cjs');

let dataBuffer = fs.readFileSync('d:/WedDev/AMath_Website/โปรแกรมเกมกลยุทธ์การต่อสมการตัวเลข.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(error) {
    console.error("Error reading PDF:", error);
});
