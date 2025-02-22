import laruinarecordsIcon from "../../../../assets/svg/laruinarecords-logo.svg";
import elumbralstudiosIcon from "../../../../assets/svg/elumbralstudios-logo.svg";
import terminalcoreIcon from "../../../../assets/svg/terminalcore-logo.svg";
import fulgorsystemsIcon from "../../../../assets/svg/fulgorsystems-logo.svg";

export const menuList: Array<any> = [
  {
    label: "Departamentos",
    submenu: [
      {
        label: "La Ruina Records",
        description: "Estudio de Sonido",
        icon: laruinarecordsIcon,
        href: "https://laruina.cl"
      }, {
        label: "El Umbral Studios",
        description: "Estudio de diseño y animación 3D",
        icon: elumbralstudiosIcon,
        href: "#"
      }, {
        label: "Terminal Core",
        description: "Desarrollo de Software",
        icon: terminalcoreIcon,
        href: "https://terminalcore.cl"
      }, {
        label: "Fulgor Systems",
        description: "Ciberseguridad",
        icon: fulgorsystemsIcon,
        href: "#"
      }
    ]
  }, {
    label: "Aplicaciones",
    submenu: [
      {
        label: "Nhexa Vision",
        description: "Streaming",
        route: "#"
      }, {
        label: "Nhexa Pod",
        description: "Audio y música",
        route: "#"
      }, {
        label: "Nhexa Merch",
        description: "E-commerce",
        route: "#"
      }
    ]
  }, {
    label: "Soporte técnico",
    href: "#",
  }, {
    label: "Contacto",
    route: "/contact",
  }
];