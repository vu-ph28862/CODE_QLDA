//demo
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

require('./models/LoaiPhong')
require('./models/Phong')

const LoaiPhong = mongoose.model("loaiPhong")
const Phong = mongoose.model("phong")

const port = 3000;
// const hostname = '192.168.1.6'; //long
const hostname = '192.168.126.1'; //hantnph28876
app.use(bodyParser.json())

const mongoURL= 'mongodb+srv://hantnph28876:1234@cluster0.fwxkt48.mongodb.net/QuanLyDuAnAgile'
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

// server loại phòng
app.post('/insertLoaiPhong', (req,res) => {
  const loaiPhong = new LoaiPhong({
    tenLoaiPhong: req.body.tenLoaiPhong,
  })
  loaiPhong.save()
  .then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {console.log(err)})
})

app.get('/getLoaiPhong', (req,res) => {
  LoaiPhong.find({}).then(data => {
    console.log(data)
    res.send(data)
  })
})



// server phòng
app.post('/insertPhong', (req,res) => {
  const phong = new Phong({
    maLoaiPhong: req.body.maLoaiPhong,
    tenPhong: req.body.tenPhong,
    tinhTrang: req.body.tinhTrang,
    tienThueTheoGio: req.body.tienThueTheoGio,
    tienThueTheoNgay: req.body.tienThueTheoNgay
  })
  phong.save()
  .then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {console.log(err)})
})

app.get('/getPhong', async (req,res) => {
  try {
    const phong = await Phong.find().populate('maLoaiPhong'); // maLoaiPhong là thuộc tính của Phòng
    res.json(phong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.delete('/deletePhong/:id', async (req,res) => {
  try{
    const data =  await Phong.findByIdAndDelete(req.params.id)
    if(!data){
      return res.status(404).json({message: "delete failed"})
    }else{
      return res.status(200).json({message: "delete successful"})
    }
  }catch(err){
    return res.status(500).json({message: err.message})

  }
})

app.put('/updatePhong/:id', async (req,res) => {
  try{
    const data = await Phong.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!data){
      return res.status(404).json({message: "update failed"})

    }else{
      return res.status(200).json({message: "update successful"})

    }
  }catch(err){
    return res.status(500).json({message: err.message})
  }
})
// API để lấy danh sách phòng theo loại phòng
app.get('/getTheoLoaiPhong/:id', async (req, res) => {
  try {
    const roomTypeId = req.params.id;
    const rooms = await Phong.find({ maLoaiPhong: roomTypeId }).populate('maLoaiPhong', '_id').populate('maLoaiPhong');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách Phòng' });
  }
});



// app.listen(3000, "192.168.1.135"); // e.g. app.listen(3000, "192.183.190.3");
app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`)
});