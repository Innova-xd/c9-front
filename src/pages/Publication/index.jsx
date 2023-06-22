import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel
import { Carousel } from 'react-responsive-carousel'; // Importa el componente de carrusel

import bgIzq from '../../assets/images/bg-izq.png';
import bgDer from '../../assets/images/bg-der.png';

import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import { Spinner } from '../../components/UI';

const Publication = () => {
  const [publication, setPublication] = useState();
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);

  const carouselRef = useRef(null);
  const { slug } = useParams();

  const [activeIndex, setActiveIndex] = useState(null);
  const toggleQuestion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/publications/${slug}`;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const setLocation = (location) => {
    let locationName = '';
    if (
      location === null ||
      (location?.region === null && location?.city === null)
    ) {
      locationName = 'Chile';
      return locationName;
    }

    if (location?.region?.name) {
      locationName = location.region.name;
    }

    if (location?.city) {
      locationName = `${locationName} / ${location.city.name}`;
    }

    return locationName;
  };

  function formatFecha(publicationDate) {
    const fecha = new Date(publicationDate);
    const numeroDia = fecha.getDate();
    const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });

    return (
      <div className="bg-gray-200 text-center py-4 md:p-5 rounded">
        <p className="text-sm md:text-4xl font-bolder">{numeroDia}</p>
        <p className="text-xs">{nombreMes}</p>
      </div>
    );
  }

  const getPublicationData = async () => {
    try {
      const response = await axios.get(endpoint);
      const { publication } = response.data;
      setPublication(publication);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPublicationData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const isVisible = scrollTop > 100;
      setShowButton(isVisible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const divContent = document.getElementById('content-text');
    divContent.innerHTML = publication?.finalContent;
    if (carouselRef.current && publication) {
      const dots = document.querySelectorAll('.control-dots .dot');
      dots[0].click();
    }
  }, [publication]);

  return (
    <>
      <div className={loading ? '' : 'hidden'}>
        <div className="w-full h-[20vh] sm:h-[60vh] flex justify-center items-center">
          <Spinner />
        </div>
      </div>
      <div className={loading ? 'hidden' : ''}>
        <div className="container container-flex mx-auto py-7 my-3">
          <Link to="/">
            <button
              type="button"
              className="btn_back text-blue-800 text-sm py-2.5 text-center inline-flex items-center"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
              Volver
            </button>
          </Link>
          <h1 className="innova-title pt-5">{publication?.name}</h1>
          <div className="mt-2 flex justify-between">
            <div className="inline-block whitespace-nowrap rounded-full bg-secondary px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.85em] font-bold leading-none text-white hover:shadow-lg ease-in-out hover:scale-110">
              {' '}
              <FontAwesomeIcon
                icon={faCircleUser}
                className="pe-2 text-white "
              />
              {publication?.author}
            </div>

            {/* Etiquetas de publicaciones  */}

            <div className="flex gap-1 mr-4">
              <a
                href="/"
                className="inline-block whitespace-nowrap rounded-full bg-neutral-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.85em] font-bold leading-none text-warning-800 hover:shadow-lg ease-in-out hover:scale-110"
              >
                <FontAwesomeIcon
                  icon={faGlobeAmericas}
                  className="pe-2 text-gray-500 "
                />
                {setLocation(publication?.location)}
              </a>
              <a
                href="/"
                className="inline-block whitespace-nowrap rounded-full bg-green-50 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.85em] font-bold leading-none text-neutral-600 hover:shadow-lg ease-in-out hover:scale-110"
              >
                <FontAwesomeIcon icon={faTag} className="pe-2 text-gray-500 " />
                {publication?.category.name
                  ? publication.category.name
                  : 'Sin categoría'}
              </a>
            </div>
          </div>
        </div>
        <Carousel
          ref={carouselRef}
          showStatus={false}
          showThumbs={false}
          centerMode
          centerSlidePercentage={60}
          autoPlay={true} // Se le agrega autoplay al carrusel
          interval={5000} // se le define un intervalo
          infiniteLoop
          className="pb-4 mt-0 w-full"
        >
          {publication?.images.map((img, index) => (
            <div key={`img_${index}`}>
              <img
                className="imgSlide w-full"
                src={img.url}
                alt={`Imagen ${index}`}
              />
            </div>
          ))}
        </Carousel>

        <div className="publication-content relative">
          <div className="absolute right-0 w-[40%] md:w-52 lg:w-[22%] opacity-40">
            <img src={bgDer} alt="Blob Derecho" />
          </div>

          <div className="absolute left-0 bottom-0 w-[50%] md:w-72 lg:w-[25%] opacity-40">
            <img src={bgIzq} alt="Blob Izquierdo" />
          </div>

          <div className="relative container mx-auto w-5/5 lg:w-4/5 py-4 whitespace-wrap">
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-1">
                {formatFecha(publication?.publicationDate)}
              </div>
              <div className="col-span-7">
                <div id="content-text" className="innova-text"></div>
              </div>
            </div>
          </div>

          <div className="relative innova-text container w-5/5 lg:w-4/5 mx-auto py-4">
            <h2 className="pt-8">PREGUNTAS RELACIONADAS</h2>
            <div className="innova-text">
              {publication?.questions.map((item, index) => (
                <div key={index} className="p-2">
                  <div
                    className="bg-blue-100 flex justify-between items-center cursor-pointer p-3 rounded-lg"
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="p-2">{item.question}</div>
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        activeIndex === index ? 'transform rotate-180' : ''
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {activeIndex === index && (
                    <div className="p-4 bg-gray-100 bg-opacity-60 rounded mt-2">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showButton && (
        <button
          className="fixed bottom-2 right-2 w-12 h-12 bg-gray-800 rounded-full text-white flex items-center justify-center hover:opacity-90"
          onClick={handleScrollToTop}
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-2xl" />
        </button>
      )}
    </>
  );
};

export default Publication;
