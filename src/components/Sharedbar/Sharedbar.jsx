import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FacebookShareButton } from 'react-share'; // Importa FacebookShareButton
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faShareAlt, faClose } from '@fortawesome/free-solid-svg-icons';

const Sharedbar = ({ description, isOpen, setIsOpen }) => {
  const toggleIcons = () => {
    setIsOpen(!isOpen);
  };

  const url = window.location.href;

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 mr-2 z-40">
      <div className="flex gap-1 flex-col items-center">
        {isOpen ? (
          <button
            onClick={toggleIcons}
            className="p-1 rounded-full bg-gray-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        ) : (
          <button
            onClick={toggleIcons}
            className="p-1 rounded-full bg-secondary text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75"
          >
            <FontAwesomeIcon icon={faShareAlt} />
          </button>
        )}

        {isOpen && (
          <div className="flex flex-col space-y-1">
            {/* Reemplaza el enlace de Facebook por FacebookShareButton */}
            <FacebookShareButton
              url={url}
              hashtag="#InnovaXD"
              className="text-2xl"
            >
              <FontAwesomeIcon icon={faFacebookF} className="p-1 rounded-full bg-blue-500 text-white w-10 h-10 flex items-center justify-center shadow-md hover:opacity-75" />
            </FacebookShareButton>
            
            {/* Conserva los demás botones como están */}
            <a
              href={`mailto:?&subject=Tienes que ver esto!&cc=&bcc=&body=Tienes que ver esto ${url}%0D%0A%0D%0A${encodeURI(
                description
              )}`}
              target="_blank"
              rel="noreferrer"
              className="p-1 my-1 rounded-full bg-red-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
            </a>
            <a
              href={`https://api.whatsapp.com/send/?text=${url}&type=custom_url&app_absent=0`}
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded-full bg-green-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="text-3xl" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURI(
                description
              )}`}
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded-full bg-blue-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75"
            >
              <FontAwesomeIcon icon={faTwitter} className="text-3xl" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sharedbar;
