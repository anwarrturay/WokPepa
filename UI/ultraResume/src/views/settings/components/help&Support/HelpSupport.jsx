import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Footer from '../../../components/Footer';
import { useNavigate } from "react-router";
import ChannelReports from './ChannelReports';
import TermsConditions from './TermsConditions';
import HelpCenter from './HelpCenter';
import Menu from './Menu';
const HelpSupport = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("menu");

  return (
    <section className='font-montserrat'>
      {activeSection !== "menu" && (
        <header className='flex m-3'>
          <ArrowLeft onClick={() => setActiveSection("menu")} size={20} className='mr-3 cursor-pointer' />
        </header>
      )}

      {activeSection === "menu" && (
        <Menu />
      )}

      {activeSection === "helpCenter" && (
        <HelpCenter />
      )}

      {activeSection === "channelReports" && (
        <ChannelReports />
      )}

      {activeSection === "terms" && (
        <TermsConditions />
      )}

      {activeSection === "menu" && <Footer />}
    </section>
  );
};

export default HelpSupport;
