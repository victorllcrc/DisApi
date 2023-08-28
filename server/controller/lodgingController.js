const Lodging = require('../model/lodging');
const User = require('../model/user');

// Obtener todos los hospedajes
exports.getLodgings = async (req, res) => {
  try {
    const lodgings = await Lodging.find();
    res.json(lodgings);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los hospedajes' });
  }
};

/*// Crear un nuevo hospedaje
exports.createLodging = async (req, res) => {
  try {
    const newLodging = new Lodging(req.body);
    const lodging = await newLodging.save();
    res.json(lodging);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo hospedaje' });
  }
};*/

exports.createLodging = async (req, res) => {

  // Obtener los datos del hospedaje del cuerpo de la solicitud
  const formularioData = req.body;

  // Se obtiene el usuario que está creando el hospedaje
  const user = await User.findById(formularioData._id);

  // Crear el nuevo objeto de hospedaje
  const newLodging = new Lodging({
    userDueño: formularioData._id,
    name: formularioData.name,
    location: formularioData.location,
    num_rooms: formularioData.num_rooms,
    price: formularioData.price,
    image: formularioData.image
  });

  // Guarda el hospedaje en la base de datos
  newLodging.save((err, lodging) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error de servidor');
    }

    // Agrega el ID del nuevo hospedaje al arreglo lodgings del usuario
    user.lodgings.push(lodging._id);

    // Guarda los cambios en el usuario
    user.save((err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error de servidor');
      }

      // El hospedaje se ha creado y asignado correctamente al usuario
      res.json(lodging);
    });
  });
};

// Obtener un hospedaje por su ID
exports.getLodgingById = async (req, res) => {
  try {
    const lodging = await Lodging.findById(req.params.id);
    res.json(lodging);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el hospedaje' });
  }
};

// Actualizar un hospedaje
exports.updateLodging = async (req, res) => {
  try {
    const updatedLodging = await Lodging.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedLodging);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el hospedaje' });
  }
};

// Eliminar un hospedaje
exports.deleteLodging = async (req, res) => {
  try {
    await Lodging.findByIdAndRemove(req.params.id);
    res.json({ message: 'Hospedaje eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el hospedaje' });
  }
};

// Obtener los hospedajes de un usuario por su ID
exports.getLodgingsByUserId = (req, res) => {
  const userId = req.params.id;

  Lodging.find({ user: userId }, (err, lodgings) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      res.render('lodgings', { lodgings });
    }
  });
};

