import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Table } from "react-bootstrap";

const Home = () => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [proyectId, setProyectId] = useState("1");
  const [proyectoList, setProyectos] = useState([]);
  const [id, setId] = useState();
  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    nombre === "" || edad === "" || pais === "" || cargo === "" || anios === ""
      ? alert("los campos estan vacios")
      : Axios.post("http://localhost:3001/create/empleados", {
          nombre: nombre,
          edad: edad,
          pais: pais,
          cargo: cargo,
          anios: anios,
          proyectId: proyectId,
        })
          .then(() => {
            getEmpleados();
            limpiarCampos();
            Swal.fire({
              title: "Registro exitoso!",
              text: `El usuario ${nombre} se ingreso`,
              icon: "success",
              timer: 3000,
            });
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text:
                JSON.parse(JSON.stringify(error)).message === "Network Error"
                  ? "Intente mas tarde"
                  : JSON.parse(JSON.stringify(error)),
            });
          });
  };
  const editarEmpleados = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
  };

  const update = () => {
    Axios.put("http://localhost:3001/update/empleados", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
      proyectId: proyectId,
    })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: "Actualizacion exitosa!",
          text: `El usuario ${nombre} se actualizo`,
          icon: "success",
          timer: 3000,
        });
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            JSON.parse(JSON.stringify(error)).message === "Network Error"
              ? "Intente mas tarde"
              : JSON.parse(JSON.stringify(error)),
        });
      });
  };

  const deleteEmple = (val) => {
    Swal.fire({
      title: "Confirmar eliminado?",
      text: `Seguro que va a elimiar a ${val.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, ELiminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`)
          .then(() => {
            getEmpleados();
            limpiarCampos();
            Swal.fire({
              title: "Eliminado!",
              text: "El usuario a sido eliminado",
              icon: "success",
              timer: 3000,
            });
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logro Eliminar el empleado",
              footer:
                JSON.parse(JSON.stringify(error)).message === "Network Error"
                  ? "Intente mas tarde"
                  : JSON.parse(JSON.stringify(error)),
            });
          });
      }
    });
  };

  const limpiarCampos = () => {
    setAnios("");
    setNombre("");
    setCargo("");
    setEdad("");
    setPais("");
    setId("");
    setEditar(false);
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };
  const getProyectos = () => {
    Axios.get("http://localhost:3001/proyectos").then((response) => {
      setProyectos(response.data);
    });
  };
  useEffect(() => {
    getProyectos();
    getEmpleados();
  }, []);

  return (
    <div className="container">
      <div className="card text-center mb-4">
        <div className="card-header">Gestion de usuarios</div>

        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:{" "}
            </span>
            <input
              type="text"
              value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              placeholder="Ingresa nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:{" "}
            </span>
            <input
              type="number"
              value={edad}
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control"
              placeholder="Ingresa edad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Pais:{" "}
            </span>
            <input
              type="text"
              value={pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control"
              placeholder="Ingresa el pais"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cargo:{" "}
            </span>
            <input
              type="text"
              value={cargo}
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control"
              placeholder="Ingresa el cargo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Años de experiencia:{" "}
            </span>
            <input
              type="number"
              value={anios}
              onChange={(event) => {
                setAnios(event.target.value);
              }}
              className="form-control"
              placeholder="Ingresa Años de experiencia"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              asignar proyecto:{" "}
            </span>
            <Form.Select
              onChange={(event) => {
                setProyectId(event.target.value);
              }}
              aria-label="Default select example"
            >
              {proyectoList?.map(({ nombre, id }, index) => (
                <option key={index} value={id}>
                  {nombre}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>

        <div className="card-footer text-muted">
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>
                actualizar
              </button>
              <button className="btn btn-info m-2" onClick={limpiarCampos}>
                cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success m-2" onClick={add}>
              registrar
            </button>
          )}
        </div>
      </div>
      {empleadosList.length > 0 && (
        <Table
          className="table table-striped bordered bordered"
          variant="success"
        >
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">Pais</th>
              <th scope="col">Cargo</th>
              <th scope="col">Experiencia</th>
              <th scope="col">acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleadosList.map((val, key) => (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarEmpleados(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        deleteEmple(val);
                      }}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
export default Home;
