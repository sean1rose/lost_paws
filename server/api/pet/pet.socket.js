/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Pet = require('./pet.model');

exports.register = function(socket) {
  Pet.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Pet.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('pet:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('pet:remove', doc);
}