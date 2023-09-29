const mongoose = require('mongoose');

const KhachHangSchema = mongoose.Schema({
    tenKhachHang:{type: String},
    sdt:{type:String},
    cccd:{type:String},
    diaChi:{type:String},
});
module.exports = mongoose.model('KhachHang', KhachHangSchema);