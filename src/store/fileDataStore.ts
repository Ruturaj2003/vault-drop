import { create } from "zustand";

interface FileData {
  id: string;
  fileName: string;
  realFileUrl: string;
  dummyFileUrl: string;
  uploadedAt: number;
  lastViewedAt?: number;
  totalTimeViewed?: number;
}

interface FileDataState {
  filesData: FileData[];
  currentFile: FileData | null;
  setFileData: (data: FileData[]) => void;
  clearFileData: () => void;
  setCurrentFile: (id: string) => void;
  getCurrentFile: () => FileData | null;
}

const useFileDataStore = create<FileDataState>((set, get) => ({
  filesData: [],
  currentFile: null,
  setFileData: (data) => set({ filesData: data }),
  clearFileData: () => set({ filesData: [] }),
  setCurrentFile: (id) => {
    const file = get().filesData.find((file) => file.id === id);
    if (!file) set({ currentFile: null });
    set({ currentFile: file });
  },
  getCurrentFile: () => {
    const file = get().currentFile;
    return file;
  },
}));

export default useFileDataStore;
