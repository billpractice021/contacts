var express = require("express"),
    app     = express(); 
    
app
    .use(express.static('./public'))
    
    .listen(process.env.PORT);  