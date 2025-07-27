import { useState, useEffect } from 'react';

import ContactForm from '../components/ContactForm';
import Breadcrumbs from '../components/Breadcrumbs';
import Navbar1 from '../components/UserNav';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

function Contact() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const breadcrumbsPaths = [
    { label: 'Home', link: '/' },
    { label: 'Contact' },
  ];

  return (
    <div>
      <Navbar1 />
      <Breadcrumbs paths={breadcrumbsPaths} />
      {loading ? (
        <Loader />
      ) : (
        <ContactForm />
      )}
      <Footer />
    </div>
  );
}

export default Contact;