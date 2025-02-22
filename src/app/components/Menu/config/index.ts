import laruinarecordsIcon from "../../../../assets/svg/laruinarecords-logo.svg";
import elumbralstudiosIcon from "../../../../assets/svg/elumbralstudios-logo.svg";
import terminalcoreIcon from "../../../../assets/svg/terminalcore-logo.svg";
import fulgorsystemsIcon from "../../../../assets/svg/fulgorsystems-logo.svg";

export const menuList: Array<any> = [
  {
    label: "Departamentos",
    url: null,
    submenu: [
      {
        label: "La Ruina Records",
        description: "Estudio de Sonido",
        icon: laruinarecordsIcon,
        url: "#"
      }, {
        label: "El Umbral Studios",
        description: "Estudio de diseño y animación 3D",
        icon: elumbralstudiosIcon,
        url: "#"
      }, {
        label: "Terminal Core",
        description: "Desarrollo de Software",
        icon: terminalcoreIcon,
        url: "#"
      }, {
        label: "Fulgor Systems",
        description: "Ciberseguridad",
        icon: fulgorsystemsIcon,
        url: "#"
      }
    ]
  }, {
    label: "Aplicaciones",
    url: null,
    submenu: [
      {
        label: "Nhexa TV",
        description: "Streaming",
        url: "#"
      }, {
        label: "Nhexa Play",
        description: "Audio y música",
        url: "#"
      }, {
        label: "Nhexa Merch",
        description: "E-commerce",
        url: "#"
      }
    ]
  }, {
    label: "Soporte técnico",
    url: "#",
  }, {
    label: "Contacto",
    url: "/contact",
  }
];