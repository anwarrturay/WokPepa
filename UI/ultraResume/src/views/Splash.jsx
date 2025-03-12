import React, { useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/ultraResume-full.png";

const Splash = ({ setShowSplash }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="flex justify-center items-center h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        src={logo}
        alt="UltraResume Logo"
        className="w-[100px]"
        animate={{
          scale: [1, 1.2, 1], // Scale up to 1.2x and back to normal
        }}
        transition={{
          duration: 2.5, // Animation duration
          repeat: Infinity, // Repeat indefinitely
          ease: "easeInOut", // Smooth easing
        }}
      />
    </motion.div>
  );
};

export default Splash;
