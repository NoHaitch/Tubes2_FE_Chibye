import React, { useState } from 'react';
import Profiles from './Profiles';

const AboutUs = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='pt-2'>
      <h1 onClick={openModal} className='text-xl hover:cursor-pointer'>About Us</h1>
      <Profiles isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default AboutUs;
