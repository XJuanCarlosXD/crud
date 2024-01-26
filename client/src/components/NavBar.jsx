import React from "react";
import {Link} from "react-router-dom";

const links = [{
    name:"Gestion de Usuario ",
    href:"/home"
    },
    {
        name:"Gestion de Proyectos",
        href:"/contact"
    }
]

const NavBar = ()=>{
    return <div>
        {
            links.map(x =>(
                <Link to={x.href}>{x.name}</Link>
            ))
        }
    </div>
}

export default NavBar