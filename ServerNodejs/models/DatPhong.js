const mongoose = require('mongoose');

const DatPhongSchema = mongoose.Schema({
    thoiGianDen:{type:String},
    thoiGianTra:{type:String},
    thoiGianThue:{type:String},
    tinhTrang:{type: String},
    tongTien:{type: String},
    maKhachHang:{type: mongoose.Schema.Types.ObjectId, ref: 'KhachHang'},
    maPhong:{type: mongoose.Schema.Types.ObjectId, ref: 'phong'},
});
module.exports = mongoose.model('DatPhong', DatPhongSchema);