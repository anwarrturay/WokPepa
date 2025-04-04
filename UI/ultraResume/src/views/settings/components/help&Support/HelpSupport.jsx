import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Footer from '../../../components/Footer';
import { useNavigate } from "react-router";
import ChannelReports from './ChannelReports';
import TermsConditions from './TermsConditions';
import HelpCenter from './HelpCenter';
import Menu from './Menu';
import useAuth from '../../../../hooks/useAuth';
const HelpSupport = () => {

  const {activeSectionHS, setActiveSectionHS} = useAuth();

  return (
    <section className='font-montserrat'>
      {activeSectionHS !== "menu" && (
        <header className='flex m-3'>
          <ArrowLeft onClick={() => setActiveSectionHS("menu")} size={20} className='mr-3 cursor-pointer' />
        </header>
      )}

      {activeSectionHS === "menu" && (
        <Menu />
      )}

      {activeSectionHS === "helpCenter" && (
        <HelpCenter />
      )}

      {activeSectionHS === "channelReports" && (
        <ChannelReports />
      )}

      {activeSectionHS === "terms" && (
        <TermsConditions />
      )}

      {activeSectionHS === "menu" && <Footer />}
    </section>
  );
};

export default HelpSupport;
