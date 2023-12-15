import React, { useState, useEffect } from 'react';

import Navbar1 from '../components/UserNav';
import Breadcrumbs from '../components/Breadcrumbs';
import GalleryVid from '../components/GalleryVid';
import GalleryImg from '../components/GalleryImg';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

function Gallery() {
  const [loading, setLoading] = useState(true); // Initial loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even in case of an error
      }
    };

    fetchData(); // Invoke the data fetching function
  }, []); // The empty dependency array ensures the effect runs once on mount

  const breadcrumbsPaths = [
    { label: 'Home', link: '/' },
    { label: 'Gallery' },
  ];

  return (
    <div>
      <Navbar1 />
      <Breadcrumbs paths={breadcrumbsPaths} />
      {loading ? (
        <Loader /> // Render your Loader component while loading
      ) : (
        <>
          <GalleryVid />
          <GalleryImg />
        </>
      )}
      <Footer />
    </div>
  );
}

export default Gallery;
