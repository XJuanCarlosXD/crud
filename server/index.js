const express = require("express");
const app = express();

const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "mysql-stuart.alwaysdata.net",
  user: "stuart_root",
  password: "edwin1817",
  database: "stuart_empleados",
});

app.post("/create/proyecto", (req, res) => {
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  db.query(
    "INSERT INTO proyectos (nombre, descripcion) VALUES (?,?)",
    [nombre, descripcion],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Empleados registrados con exito");
      }
    }
  );
});

app.get("/proyectos", (req, res) => {
  db.query("SELECT * FROM proyectos", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update/proyecto", (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;

  db.query(
    "UPDATE proyectos SET nombre =?,descripcion=? WHERE id=?",
    [nombre, descripcion, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
/*
este es del usuario 
*/
app.post("/create/empleados", (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const anios = req.body.anios;
  const proyectId = req.body.proyectId;
  console.log(proyectId);

  db.query(
    "INSERT INTO empleados (nombre,edad,pais,cargo,anios,id_proyec) VALUES (?,?,?,?,?,?)",
    [nombre, edad, pais, cargo, anios, proyectId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Empleados registrados con exito");
      }
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update/empleados", (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const anios = req.body.anios;
  const proyectId = req.body.proyectId;
  console.log(proyectId);

  db.query(
    "UPDATE  empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=?,id_proyec=? WHERE id=?",
    [nombre, edad, pais, cargo, anios, id, proyectId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM  empleados  WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("corriendo en el puerto 3001");
});
