const mongoose = require('mongoose');

const HoaDonSchema = mongoose.Schema({
    ngayTao:{type: String},
    tongTienHoaDon:{type: String},
    trangThai:{type: String},
    maNV:{type: String},
    maCTDV:{type: mongoose.Schema.Types.ObjectId, ref: 'PhieuDatDichVu'},
    maDatPhong:{type: mongoose.Schema.Types.ObjectId, ref: 'DatPhong'}, 
});
module.exports = mongoose.model('HoaDon', HoaDonSchema);