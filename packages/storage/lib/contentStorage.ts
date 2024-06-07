import { BaseStorage, createStorage, StorageType } from './base';

type Content = {
  keyTermsStr: string;
};

type ContentStorage = BaseStorage<Content> & {
  updateDocument: (keyTermsStr: string) => Promise<void>;
};

const storage = createStorage<Content>(
  'content-storage-key',
  { keyTermsStr: '' },
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);

export const contentStorage: ContentStorage = {
  ...storage,
  updateDocument: async keyTermsStr => {
    await storage.set(() => {
      return { keyTermsStr };
    });
  },
};
