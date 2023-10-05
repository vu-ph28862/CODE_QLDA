const mongoose = require('mongoose');


const nhanVienSchema = mongoose.Schema({
    tenNhanVien:{type: String},
    sdt: {type: String},
    matKhau: {type: String},
    chucVu:{type: String}
});
module.exports = mongoose.model('nhanVien', nhanVienSchema);