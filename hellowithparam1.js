var express = require('express');
var app = express();
app.get('/color', (req, res) => {
   console.log(req.query.color1) ;
   console.log(req.query.color2) ;
    res.send("Color are :   "+ req.query.color1 + " and "+ req.query.color2 );

 console.log("colors printing");
});
app.listen(8000);
