var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var img_schema = new Schema({
  title:{type: String,require:true},
  creator:{type: Schema.Types.ObjectId, ref:'User'},
  extension:{type:String, require:true}
});

var Imagen = mongoose.model('Imagen',img_schema);
module.exports = Imagen;
