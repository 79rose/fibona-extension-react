'use client';

import Modal from '@src/components/modal';
import useFeedBackModal from '@src/hooks/useFeedBackMadal';
import FeedBack from './feedBack';
const AuthModal = () => {
  const { isOpen, onClose } = useFeedBackModal();

  const onChange = (open: boolean): void => {
    if (!open) {
      onClose();
    }
  };
  return (
    // <Modal
    //   isOpen={isOpen}
    //   onChange={onChange}
    //   title="请向我们反馈您的问题"
    //   description="欢迎加入Fibona社区，我们会尽快回复您的问题。">
    //   <FeedBack></FeedBack>
    // </Modal>
    <Modal isOpen={isOpen} onChange={onChange}>
      <FeedBack></FeedBack>
    </Modal>
  );
};

export default AuthModal;
