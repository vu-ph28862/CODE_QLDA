//demo
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const port = 3000;
// const hostname = '192.168.1.6'; //long
const hostname = '192.168.126.1'; //hantnph28876
app.use(bodyParser.json())

const mongoURL= ''
mongoose.connect(mongoURL , {
  useNewUrlParser : true ,
  useUnifiedTopology: true,
})

mongoose.connection.on("conntected", () => {
  console.log("Connect success")
})
mongoose.connection.on("err" , (err) => {
  console.log("error" , err)
})



// app.listen(3000, "192.168.1.135"); // e.g. app.listen(3000, "192.183.190.3");
app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`)
});