const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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

exports.singUp = async (req, res) => {
  const {
    name,
    lastname,
    age,
    email,
    gender,
    password
  } = req.body

  const newUser = new User({
    name: name,
    lastname: lastname,
    age: age,
    email: email,
    gender: gender,
    password: await User.encryptPassword(password)
  })

  
  try {
    const saveUser = await newUser.save()
    const token = jwt.sign({id: saveUser._id},process.env.SECRET_KEY,{
      expiresIn:86400 //24horas
    })
    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo usuario' });
  }
}
exports.singIn = async (req, res) => {
  try {
    const userFound = await User. findOne({email: req.body.email})
  
    if (!userFound) return res.status(400).json({message: "User not found"})
  
    const macthPassword = await User.comparePassword(req.body.password, userFound.password)
  
    if(!macthPassword) return res.status(401).json({token:null, message: "Invalid password" })
  
    const token = jwt.sign({id: userFound._id},process.env.SECRET_KEY,{
      expiresIn:86400 //24horas
    })
    console.log({token})
    res.status(200).json({token});
    
  } catch (error) {
    res.status(500).json({ error: 'Error al crear token' });
  }
}