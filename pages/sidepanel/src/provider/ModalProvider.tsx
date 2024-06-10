'use client';
import FeedBackModal from '@src/components/feedBackModal';
import { useEffect, useState } from 'react';
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <FeedBackModal />
    </>
  );
};

export default ModalProvider;
