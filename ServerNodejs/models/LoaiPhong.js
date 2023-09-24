const mongoose = require('mongoose');

const LoaiPhongSchema = mongoose.Schema({
    tenLoaiPhong:{type: String}
});
module.exports = mongoose.model('loaiPhong', LoaiPhongSchema);