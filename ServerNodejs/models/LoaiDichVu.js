const mongoose = require('mongoose');

const LoaiDichVuSchema = mongoose.Schema({
    tenLoaiDichVu:{type: String},
});
module.exports = mongoose.model('LoaiDichVu', LoaiDichVuSchema);