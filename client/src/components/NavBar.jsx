import React from "react";
import { Link } from "react-router-dom";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Gestion de Usuario",
    href: "/home",
  },
  {
    name: "Gestion de Proyectos",
    href: "/contact",
  },
];

const NavBar = () => {
  return (
    <div>
      <h2 className="h2 mt-3">Sistema Gestion de Grupo de Usuario</h2>

      <div className="d-flex gap-4 mt-2 mb-4">
        {links.map((x, index) => (
          <Link key={index} to={x.href}>
            {x.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
