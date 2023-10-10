const mongoose = require('mongoose');

const ChiTietDichVuSchema = mongoose.Schema({
    soLuong:{type:String},
    tongTien:{type: String},
    maDichVu:{type: mongoose.Schema.Types.ObjectId, ref: 'DichVu'},
    tienDichVu:{type: mongoose.Schema.Types.ObjectId, ref: 'DichVu'},
    maPhong:{type: mongoose.Schema.Types.ObjectId, ref: 'phong'},
});
module.exports = mongoose.model('ChiTietDichVu', ChiTietDichVuSchema);