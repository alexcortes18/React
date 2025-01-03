// const request = require('supertest');
// const app = require('../app');

// let eventId;

// describe('Events API', () => {
//   it('should fetch all events', async () => {
//     const response = await request(app).get('/events');
//     expect(response.statusCode).toBe(200);
//     expect(Array.isArray(response.body.events)).toBe(true);
//   });

//   it('should fetch a specific event by ID', async () => {
//     const response = await request(app).get(`/events/${eventId}`);
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('event');
//   });

//   it('should return 404 for non-existent event ID', async () => {
//     const response = await request(app).get('/events/non-existent-id');
//     expect(response.statusCode).toBe(404);
//   });

//   it('should add a new event', async () => {
//     const newEvent = {
//       title: 'Test Event',
//       description: 'This is a test event',
//       date: '2025-01-15',
//       image: 'http://example.com/test.jpg',
//     };
//     const response = await request(app).post('/events').send(newEvent);
//     expect(response.statusCode).toBe(201);
//     expect(response.body).toHaveProperty('event');
//     eventId = newEvent.title; // Using title as a stand-in for ID
//     console.log('Created event with ID:', eventId);
//   });

//   it('should return 422 for invalid event data', async () => {
//     const invalidEvent = {
//       title: '',
//       description: 'Invalid event with missing title',
//       date: 'invalid-date',
//       image: 'not-a-url',
//     };
//     const response = await request(app).post('/events').send(invalidEvent);
//     expect(response.statusCode).toBe(422);
//     expect(response.body).toHaveProperty('message');
//   });

//   it('should update an existing event', async () => {
//     const updatedEvent = {
//       title: 'Updated Test Event',
//       description: 'This is an updated test event',
//       date: '2025-01-20',
//       image: 'http://example.com/updated.jpg',
//     };
//     const response = await request(app).patch(`/events`).send({ oldTitle: eventId, ...updatedEvent });
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('message', 'Event updated.');
//   });

//   it('should delete an event', async () => {
//     const response = await request(app).delete(`/events`).send({ title: eventId });
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('message', 'Event deleted.');
//   });

//   it('should return 404 for deleting a non-existent event', async () => {
//     const response = await request(app).delete('/events').send({ title: 'Non-Existent Event' });
//     expect(response.statusCode).toBe(404);
//   });
// });

// ------------------------------------------------ Model 1 : ------------------------------------------------

// app.test.js
const request = require('supertest');
const app = require('../app'); // Ajusta la ruta según la ubicación de tu app.js

// Casos de prueba
describe('Eventos API', () => {

    // Caso normal: obtener todos los eventos
    test('GET /events debería devolver todos los eventos', async () => {
        const response = await request(app).get('/events');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('events');
    });

    // Caso normal: agregar un evento válido
    test('POST /events debería crear un nuevo evento', async () => {
        const newEvent = {
            title: 'Concierto',
            description: 'Concierto en vivo.',
            date: '2023-10-10T10:00:00Z',
            image: 'http://ejemplo.com/imagen.jpg'
        };

        const response = await request(app).post('/events').send(newEvent);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Event saved.');
    });

    // Caso límite: estructura del evento vacía
    test('POST /events debería devolver errores de validación por evento vacío', async () => {
        const response = await request(app).post('/events').send({});
        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message', 'Adding the event failed due to validation errors.');
    });

    // Caso límite: formato de imagen no válido
    test('POST /events debería devolver errores de validación por URL de imagen inválida', async () => {
        const newEvent = {
            title: 'Concierto',
            description: 'Concierto en vivo.',
            date: '2023-10-10T10:00:00Z',
            image: 'invalid-url'
        };

        const response = await request(app).post('/events').send(newEvent);
        expect(response.status).toBe(422);
        expect(response.body.errors).toHaveProperty('image', 'Invalid image.');
    });

    // Caso de error: evento no encontrado
    test('GET /events/:id debería devolver 404 para un evento inexistente', async () => {
        const response = await request(app).get('/events/9999'); // Suponiendo que 9999 no existe
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Could not find event for id 9999');
    });

    // Caso de error: intentar actualizar un evento que no existe
    test('PATCH /events/:id debería devolver 404 para un evento inexistente', async () => {
        const response = await request(app).patch('/events/9999').send({
            title: 'Concierto Actualizado'
        });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Could not find event for id 9999');
    });

    // Caso normal: actualizar un evento existente
    test('PATCH /events/:id debería actualizar un evento existente', async () => {
        const newEvent = {
            title: 'Concierto',
            description: 'Concierto en vivo.',
            date: '2023-10-10T10:00:00Z',
            image: 'http://ejemplo.com/imagen.jpg'
        };
        const postResponse = await request(app).post('/events').send(newEvent);
        const createdEventId = postResponse.body.event.id;

        const updateResponse = await request(app)
            .patch(`/events/${createdEventId}`)
            .send({ title: 'Concierto Actualizado' });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body).toHaveProperty('message', 'Event updated.');
    });

    // Caso normal: borrar un evento existente
    test('DELETE /events/:id debería eliminar un evento', async () => {
        const newEvent = {
            title: 'Concierto',
            description: 'Concierto en vivo.',
            date: '2023-10-10T10:00:00Z',
            image: 'http://ejemplo.com/imagen.jpg'
        };
        const postResponse = await request(app).post('/events').send(newEvent);
        const createdEventId = postResponse.body.event.id;

        const deleteResponse = await request(app).delete(`/events/${createdEventId}`);
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body).toHaveProperty('message', 'Event deleted.');
    });

    // Caso de error: intentar borrar un evento que no existe
    test('DELETE /events/:id debería devolver 404 para un evento inexistente', async () => {
        const response = await request(app).delete('/events/9999'); // Suponiendo que 9999 no existe
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Could not find event for id 9999');
    });
});

// Caso normal: actualizar un evento existente
test('PATCH /events/:id debería actualizar un evento existente', async () => {
    const newEvent = {
        title: 'Concierto',
        description: 'Concierto en vivo.',
        date: '2023-10-10T10:00:00Z',
        image: 'http://ejemplo.com/imagen.jpg'
    };
    const postResponse = await request(app).post('/events').send(newEvent);
    const createdEventId = postResponse.body.event.id;

    const updateResponse = await request(app)
        .patch(`/events/${createdEventId}`)
        .send({ title: 'Concierto Actualizado' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty('message', 'Event updated.');
});

// Caso normal: borrar un evento existente
test('DELETE /events/:id debería eliminar un evento', async () => {
    const newEvent = {
        title: 'Concierto',
        description: 'Concierto en vivo.',
        date: '2023-10-10T10:00:00Z',
        image: 'http://ejemplo.com/imagen.jpg'
    };
    const postResponse = await request(app).post('/events').send(newEvent);
    const createdEventId = postResponse.body.event.id;

    const deleteResponse = await request(app).delete(`/events/${createdEventId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty('message', 'Event deleted.');
});

// Caso de error: intentar borrar un evento que no existe
test('debería devolver 400 si el ID del evento es inválido al intentar eliminarlo', async () => {
    const response = await request(app).delete('/events/abc');  // ID no numérico
    expect(response.status).toBe(400);  // Se espera 400 Bad Request
    expect(response.body.message).toBe('Invalid event ID.');
});
