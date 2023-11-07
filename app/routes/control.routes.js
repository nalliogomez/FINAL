module.exports = app => {
    const control = require("../controllers/control.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", control.create);
  
    router.get("/", control.findAll);
    router.get("/:id", control.findOne);
    
  
    router.put("/:id", control.update);
  
    router.delete("/:id", control.delete);
  
    app.use("/api/clients", router);
  };