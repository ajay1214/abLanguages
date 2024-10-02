import { create } from "zustand"; // Importing Zustand for state management

// Defining the type for the hearts modal state and actions
type HeartsModalState = {
  isOpen: boolean; // Represents if the modal is open or closed
  open: () => void; // Function to open the modal
  close: () => void; // Function to close the modal
};

// Creating Zustand store for hearts modal state
export const useHeartsModal = create<HeartsModalState>((set) => ({
  isOpen: false, // Initial state: modal is closed
  open: () => set({ isOpen: true }), // Function to set 'isOpen' to true, opening the modal
  close: () => set({ isOpen: false }), // Function to set 'isOpen' to false, closing the modal
}));
