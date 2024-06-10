import { create } from 'zustand';

interface FeedBackStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useFeedBackModal = create<FeedBackStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFeedBackModal;
