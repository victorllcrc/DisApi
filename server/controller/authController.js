const User = require('../model/user');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    // Verificar si el correo y la contraseña están presentes en la solicitud
    if (!email || !password) {
      return res.status(400).send('Correo y contraseña requeridos');
    }
  
    // Buscar el usuario por correo
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error de servidor');
      }
      
      // Verificar si se encontró un usuario con el correo proporcionado
      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      // Verificar la contraseña
      if (user.password !== password) {
        return res.status(401).send('Contraseña incorrecta');
      }
      req.session.user = user;
      res.json(user);

    });
};