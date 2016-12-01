var Imagen = require('../models/imagenes');

module.exports = function(image, req,res){

  //true = tiene permiso
  //False =no tiene permisos
  if(req.method === 'GET' && req.path.indexOf('edit') < 0){
    return true;
  }
  if (typeof image.creator == 'undefined') return false;
  
  if(image.creator._id.toString() == res.locals.user._id){
    return true;
  }

  return false;
}
