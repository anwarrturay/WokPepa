import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router';

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  return (
    <section className='font-montserrat flex justify-center'>
        <header>
            <h1 className='text-4xl font-semibold mt-3'>My Resumes </h1>
        </header>
    </section>
  );
};

export default MyResumes;
