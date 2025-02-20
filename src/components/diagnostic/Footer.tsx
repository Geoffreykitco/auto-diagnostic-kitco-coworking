import { motion } from 'framer-motion';
import { IMAGES } from '@/utils/constants';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
export const Footer = () => {
  const [imgError, setImgError] = useState(false);
  useEffect(() => {
    console.log("Current footer image path:", IMAGES.LOGO.FOOTER);
  }, []);
  return;
};