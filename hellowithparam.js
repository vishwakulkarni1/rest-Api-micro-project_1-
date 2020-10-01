var express = require('express');
var app = express();
app.get('/color', (req, res) => {
   console.log(req.query.color1) ;
res.send("Color is :   "+ req.query.color1 );

 console.log("colors printing");
});
app.listen(7000);
