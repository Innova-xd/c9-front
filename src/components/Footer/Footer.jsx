import React from 'react';
import { Link } from 'react-router-dom';
import LogoYellow from '../../assets/images/logo_innova_yellow.png';
import LogoMercurio from '../../assets/images/logo-elmercurio.png';
import LogoMicrosoft from '../../assets/images/logo-microsoft.png';
import LogoAdl from '../../assets/images/logo-adl.png';
import LogoKodea from '../../assets/images/logo-kodea.png';

const Footer = () => {
  return (
    <footer className="p-4 lg:text-left mt-8 bg-secondary">
      <div className="container gap-2 mx-auto flex flex-col md:flex-row md:justify-between">
        <div className="flex justify-center md:justify-start">
          <Link to="/" className=''>
            <img src={LogoYellow} alt="LogoYellow" className="h-14 md:h-20 rounded-lg" />
          </Link>
        </div>
        <div className="flex md:w-[50%] justify-end place-items-center place-self-center gap-2 md:gap-2">
          <Link to="">
            <img
              src={LogoMercurio}
              alt="Logo Innovacion"
              className="h-10 md:h-14 rounded-lg border border-white "
            />
          </Link>
          <Link to="">
            <img
              src={LogoMicrosoft}
              alt="Logo Microsoft"
              className="h-10 md:h-14 rounded-lg border border-white "
            />
          </Link>
          <Link to="">
            <img
              src={LogoAdl}
              alt="Logo ADL"
              className="h-10 md:h-14 rounded-lg border border-white"
            />
          </Link>
          <Link to="">
            <img
              src={LogoKodea}
              alt="Logo de Kodea"
              className="h-10 md:h-14 border rounded-lg border-white  bg-white p-1"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
