import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { Table } from "react-bootstrap";

const Contact = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [proyectoList, setProyectos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState();

  const add = () => {
    if (nombre === "" || descripcion === "") {
      alert("Los campos están vacíos");
    } else {
      Axios.post("http://localhost:3001/create/proyecto", {
        nombre: nombre,
        descripcion: descripcion,
      }).then(() => {
        getProyectos();
        limpiarCampos();
        Swal.fire({
          title: "Agrego exitosamente!",
          text: "Se agregó correctamente",
          icon: "success",
          timer: 3000,
        }).catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
              JSON.parse(JSON.stringify(error)).message === "Network Error"
                ? "Intente más tarde"
                : JSON.parse(JSON.stringify(error)),
          });
        });
      });
    }
  };

  const limpiarCampos = () => {
    setNombre("");
    setDescripcion("");
    setId("");
    setEditar(false);
  };

  const deleteProyecto = (val) => {
    Swal.fire({
      title: "Confirmar eliminado?",
      text: `Seguro que va a eliminar a ${val.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, ELiminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`)
          .then(() => {
            getProyectos();
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

  const editarProyecto = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setDescripcion(val.descripcion);
    setId(val.id);
  };

  const update = () => {
    Axios.put("http://localhost:3001/update/proyecto", {
      id: id,
      nombre: nombre,
      descripcion: descripcion,
    })
      .then(() => {
        getProyectos();
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

  const getProyectos = () => {
    Axios.get("http://localhost:3001/proyectos").then((response) => {
      setProyectos(response.data);
    });
  };

  useEffect(() => {
    getProyectos();
  }, []);

  return (
    <div className="container">
      <div className="card text-center mb-4">
        <div className="card-header">Gestion de Proyectos</div>

        <div className="card-body">
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="basic-addon1">
              Nombre del Proyecto:{" "}
            </span>
            <input
              type="text"
              value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              placeholder="Ingresa el Nombre del proyecto"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Descripcion del Proyecto:{" "}
            </span>
            <input
              type="text"
              value={descripcion}
              onChange={(event) => {
                setDescripcion(event.target.value);
              }}
              className="form-control"
              placeholder="Ingresa la descripcion del proyecto"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
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
      {proyectoList.length > 0 && (
        <Table className="table table-striped bordered bordered" variant="info">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre del Proyecto</th>
              <th scope="col">Descripcion Del Proyecto</th>

              <th scope="col">acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectoList.map((val, key) => {
              return (
                <tr key={val.id}>
                  <th>{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.descripcion}</td>

                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          editarProyecto(val);
                        }}
                        className="btn btn-info"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          deleteProyecto(val);
                        }}
                        className="btn btn-danger"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};
export default Contact;
