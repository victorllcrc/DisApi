const Booking = require('../model/booking');
const User = require('../model/user');
const UserController = require('./userController');
const Lodging = require('../model/lodging');

// Obtener todas las reservas
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
};

// Crear una nueva reserva
exports.createBooking = async (req, res) => {
  
  //Se obtienen los datos del formulario para crear una reserva
  const formularioReserva = req.body;

  //Se obtiene el hospedaje del que se desea hacer la reserva
  const lodging = await Lodging.findById(formularioReserva.idLodging);
  //Se obtiene el usuario que ha reservado
  const cliente = await UserController.getUserByEmail(formularioReserva.email)

  //Se crea la reserva con los datos necesarios de "formularioReserva"
  const newBooking = new Booking({
    userDueño: lodging.userDueño,
    userCliente: cliente.id,
    date: formularioReserva.date,
    num_days: formularioReserva.num_days,
    lodging: lodging.id
  })
  //Se guarda el Booking
  newBooking.save((err, booking) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error de servidor');
    }
    // Se agrega el ID del nuevo booking al arreglo bookings del user
    cliente.bookings.push(booking._id);
    cliente.save((err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error de servidor');
      }
    });
    // Agrega el ID del nuevo booking al arreglo bookings del lodging
    lodging.bookings.push(booking._id);

    // Guarda los cambios en el usuario
    lodging.save((err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error de servidor');
      }

      // El hospedaje se ha creado y asignado correctamente al usuario
      res.json(booking);
    });
  });
};

// Obtener una reserva por su ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la reserva' });
  }
};

// Actualizar una reserva
exports.updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
};

// Eliminar una reserva
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndRemove(req.params.id);
    res.json({ message: 'Reserva eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
};