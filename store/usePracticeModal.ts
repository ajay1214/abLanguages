import { create } from "zustand"; // Importing Zustand for state management

// Defining the type for the practice modal state and actions
type PracticeModalState = {
  isOpen: boolean; // Tracks if the modal is open or closed
  open: () => void; // Function to open the modal
  close: () => void; // Function to close the modal
};

// Creating Zustand store for managing the practice modal's state
export const usePracticeModal = create<PracticeModalState>((set) => ({
  isOpen: false, // Initial state: the modal is closed
  open: () => set({ isOpen: true }), // Function to open the modal by setting 'isOpen' to true
  close: () => set({ isOpen: false }), // Function to close the modal by setting 'isOpen' to false
}));
