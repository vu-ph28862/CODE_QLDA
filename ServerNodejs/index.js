//demo
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

require('./models/LoaiPhong')
require('./models/Phong')
require('./models/NhanVien')

///

require('./models/KhachHang');
require('./models/LoaiDichVu');
require('./models/DichVu');
const LoaiPhong = mongoose.model("loaiPhong")
const Phong = mongoose.model("phong")
const NhanVien = mongoose.model("nhanVien")

//
const KhachHang = mongoose.model("KhachHang");
const LoaiDichVu = mongoose.model("LoaiDichVu")
const DichVu = mongoose.model("DichVu");
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






//CRUD khách hàng

app.get('/getKhachHang', (req,res) => {
  KhachHang.find({}).then(data => {
    console.log(data)
    res.send(data)
  })
})

app.post('/insertKhachHang', (req,res) => {
  const khachHang = new KhachHang({
    tenKhachHang: req.body.tenKhachHang,
    sdt : req.body.sdt,
    cccd: req.body.cccd,
    diaChi:req.body.diaChi,
      })
  khachHang.save()
  .then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {console.log(err)})
})

app.put("/updateKhachHang/:id", async (req, res ) => {
  try{
    const data = await KhachHang.findByIdAndUpdate(req.params.id , req.body , {new : true})
    if(!data){
      return res.status(404).json({
        message:"update failed"
      })
    }
    return res.status(200).json({
        message:"update successfully"
        
      })
  }catch(error){
    return res.status(500).json({
      message: error.message,
    })
  }
})

app.delete('/deleteKhachHang/:id', async (req,res) => {
  try{
    const data =  await KhachHang.findByIdAndDelete(req.params.id)
    if(!data){
      return res.status(404).json({message: "delete failed"})
    }else{
      return res.status(200).json({message: "delete successful"})
    }
  }catch(err){
    return res.status(500).json({message: err.message})

  }
})


//CRUD loại dịch vụ
app.post('/insertLoaiDichVu', (req,res) => {
  const loaiDichVu = new LoaiDichVu({
    tenLoaiDichVu: req.body.tenLoaiDichVu,
  })
  loaiDichVu.save()
  .then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {console.log(err)})
})

app.get('/getLoaiDichVu', (req,res) => {
  LoaiDichVu.find({}).then(data => {
    console.log(data)
    res.send(data)
  })
})

//CRUD dịch vụ

app.post('/insertDichVu' , (req,res) => {
  const dichVu = new DichVu({
    tenDichVu: req.body.tenDichVu,
    giaDichVu: req.body.giaDichVu,
    hinhAnh: req.body.hinhAnh,
    maLoaiDichVu: req.body.maLoaiDichVu
  })
  dichVu.save()
  .then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {console.log(err)})

}) 

//xem ở cmd nó ra dữ liệu 
app.get('/getDichVu', (req,res) => {
  DichVu.find({}).populate('maLoaiDichVu').then(data => {
    console.log(data)
    res.send(data)
    //giờ mới lấy tên đc
  })
})

app.put("/updateDichVu/:id", async (req, res ) => {
  try{
    const data = await DichVu.findByIdAndUpdate(req.params.id , req.body , {new : true})
    if(!data){
      return res.status(404).json({
        message:"update failed"
      })
    }
    return res.status(200).json({
        message:"update successfully"
        
      })
  }catch(error){
    return res.status(500).json({
      message: error.message,
    })
  }
})

app.delete('/deleteDichVu/:id', async (req,res) => {
  try{
    const data =  await DichVu.findByIdAndDelete(req.params.id)
    if(!data){
      return res.status(404).json({message: "delete failed"})
    }else{
      return res.status(200).json({message: "delete successful"})
    }
  }catch(err){
    return res.status(500).json({message: err.message})

  }
})


app.get('/getTheoLoaiDV/:id', async (req, res) => {
  try {
    const serviceTypeId = req.params.id;
    const service = await DichVu.find({ maLoaiDichVu: serviceTypeId }).populate('maLoaiDichVu', '_id').populate('maLoaiDichVu');
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách Phòng' });
  }
});


//server nhân viên
app.post('/insertNhanVien', (req,res) => {
  const nhanVien = new NhanVien({
    tenNhanVien: req.body.tenNhanVien,
    sdt: req.body.sdt,
    matKhau: req.body.matKhau,
    chucVu: req.body.chucVu
  })
  nhanVien.save()
  .then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {console.log(Berr)})
})

app.get('/getNhanVien', async (req,res) => {
  try {
    const nhanVien = await NhanVien.find();
    res.json(nhanVien);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.delete('/deleteNhanVien/:id', async (req,res) => {
  try{
    const data =  await NhanVien.findByIdAndDelete(req.params.id)
    if(!data){
      return res.status(404).json({message: "delete failed"})
    }else{
      return res.status(200).json({message: "delete successful"})
    }
  }catch(err){
    return res.status(500).json({message: err.message})

  }
})

app.put('/updateNhanVien/:id', async (req,res) => {
  try{
    const data = await NhanVien.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!data){
      return res.status(404).json({message: "update failed"})

    }else{
      return res.status(200).json({message: "update successful"})

    }
  }catch(err){
    return res.status(500).json({message: err.message})
  }
})

// app.listen(3000, "192.168.1.135"); // e.g. app.listen(3000, "192.183.190.3");
app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`)
});