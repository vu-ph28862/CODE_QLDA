const mongoose = require('mongoose');

const PhieuDatDichVuSchema = mongoose.Schema({
    tongTien:{type: String},
    maPhong:{type: mongoose.Schema.Types.ObjectId, ref: 'phong'},
});
module.exports = mongoose.model('PhieuDatDichVu', PhieuDatDichVuSchema);