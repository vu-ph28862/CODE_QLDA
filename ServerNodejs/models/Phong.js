const mongoose = require('mongoose');


const phongSchema = mongoose.Schema({
    maLoaiPhong:{type: mongoose.Schema.Types.ObjectId, ref: 'loaiPhong'},  // const LoaiPhong = mongoose.model("loaiPhong");
    tenPhong:{type: String},
    tinhTrang: {type: String},
    tienThueTheoGio: {type: String},
    tienThueTheoNgay:{type: String}
});
module.exports = mongoose.model('phong', phongSchema);