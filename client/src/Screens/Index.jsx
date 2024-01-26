import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

const Index = (props) => {
  const [proyectoList, setProyectos] = useState([]);
  const [empleadosList, setEmpleados] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  const getEmpleados = async () => {
    await Axios.get("http://localhost:3001/empleados").then((response) => {
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
  }, [proyectoSeleccionado]);
  return (
    <div>
      <div className="d-flex gap-4 justify-center items-center w-100 h-100 ">
        <div>
          <h2 className="h4">Tabla Usuario</h2>
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
                  <th scope="col">Proyecto Pertenece</th>
                </tr>
              </thead>
              <tbody>
                {empleadosList
                  .filter(
                    (x) =>
                      proyectoSeleccionado === null ||
                      x.id_proyec === proyectoSeleccionado
                  )
                  .map((val, key) => (
                    <tr key={val.id} className="text-center">
                      <th>{val.id}</th>
                      <td>{val.nombre}</td>
                      <td>{val.edad}</td>
                      <td>{val.pais}</td>
                      <td>{val.cargo}</td>
                      <td>{val.anios}</td>
                      <td>
                        {
                          proyectoList.find((x) => x.id === val.id_proyec)
                            ?.nombre
                        }
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </div>
        <div>
          <h2 className="h4">Tabla Proyectos</h2>
          {proyectoList.length > 0 && (
            <Table className="table table-striped bordered " variant="info">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre del Proyecto</th>
                  <th scope="col">Descripcion Del Proyecto</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {proyectoList.map((val, key) => {
                  return (
                    <tr key={val.id}>
                      <th>{val.id}</th>
                      <td>{val.nombre}</td>
                      <td>{val.descripcion}</td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => {
                            setProyectoSeleccionado(val.id);
                          }}
                        >
                          Filtrar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
