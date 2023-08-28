const User = require('../model/user');
const Lodging = require('../model/lodging');

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo usuario' });
  }
};

// Obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

//Obtener usuario por su correo
exports.getUserByEmail = (email) => {
  return User.findOne({ email: email });
};

//Obtener todos los hospedajes
exports.getLodgingsByUserId = async (req, res) => {
  try {
    //Obtener el usuario
    const user = await User.findById(req.params.id);
    //Obtener los lodgings
    const lodgings = await Lodging.find({ _id: { $in: user.lodgings } });
    res.json(lodgings);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};