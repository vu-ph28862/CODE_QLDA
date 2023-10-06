const mongoose = require('mongoose');

const DichVuSchema = mongoose.Schema({
    tenDichVu:{type: String},
    giaDichVu:{type: String},
    hinhAnh:{type:String},
    maLoaiDichVu:{type: mongoose.Schema.Types.ObjectId, ref: 'LoaiDichVu'},
});
module.exports = mongoose.model('DichVu', DichVuSchema);