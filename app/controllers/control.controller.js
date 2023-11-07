const db = require("../models");
const Clients = db.client;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No hay datos!"
    });
    return;
  }

  const client = {
    name:req.body.name,
    address: req.body.address,
    nit: req.body.nit,
    phone: req.body.phone,
    status: 1
  };
  
  Clients.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message+": Error al crear"
      });
    });
};

// Find a single Hall with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Clients.findAll({ 
    where: {
      id: id,
      status: 1
    }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener id=" + id
      });
    });
};

exports.findAll = (req, res) => {

  Clients.findAll({ 
    where: {
      status: 1,
    }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener datos"
      });
    });
};

// Update a Hall by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const client = {
    name:req.body.name,
    address: req.body.address,
    nit: req.body.nit,
    phone: req.body.phone,
  };

  Clients.update(client, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Actualizacion exitosa."
        });
      } else {
        res.send({
          message: `error al actualizar id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error en el servidor al actualizar id=" + id
      });
    });
};

// Delete a Hall with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Clients.update({status: 0}, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Registro Eliminado exitosamente!"
        });
      } else {
        res.send({
          message: `Error al eliminar registro con id=${id}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error servidor al eliminar registro con id=" + id
      });
    });
};