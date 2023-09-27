const express = require('express');
const route = express.Router()

const services = require('../services/render');

const userController = require('../controller/userController');
const lodgingController = require('../controller/lodgingController');
const bookingController = require('../controller/bookingController');
const authController = require('../controller/authController');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)

//API

// Login
route.post('/api/signup', authController.singUp)
route.post('/api/signin', authController.singIn)

// Rutas para el modelo User
route.post('/api/users', userController.createUser);
route.get('/api/users', userController.getUsers);
route.get('/api/users/:id', userController.getUserById);
route.put('/api/users/:id', userController.updateUser);
route.delete('/api/users/:id', userController.deleteUser);
route.get('/api/users/:id/lodgings', userController.getLodgingsByUserId);

// Rutas para el modelo Lodging
route.post('/api/lodgings', lodgingController.createLodging);
route.get('/api/lodgings', lodgingController.getLodgings);
route.get('/api/lodgings/:id', lodgingController.getLodgingById);
route.put('/api/lodgings/:id', lodgingController.updateLodging);
route.delete('/api/lodgings/:id', lodgingController.deleteLodging);

// Rutas para el modelo Booking
route.post('/api/bookings', bookingController.createBooking);
route.get('/api/bookings', bookingController.getBookings);
route.get('/api/bookings/:id', bookingController.getBookingById);
route.put('/api/bookings/:id', bookingController.updateBooking);
route.delete('/api/bookings/:id', bookingController.deleteBooking);

// Ruta para iniciar sesión
route.post('/login', authController.login);

// Ruta para obtener lodgings por ID
route.get('/user/:id/lodgings', lodgingController.getLodgingsByUserId);

module.exports = route;