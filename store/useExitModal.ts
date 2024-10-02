import { create } from "zustand"; // Importing the Zustand library for state management

// Defining the type for the exit modal state and actions
type ExitModalState = {
  isOpen: boolean; // Represents whether the modal is open or closed
  open: () => void; // Function to open the modal
  close: () => void; // Function to close the modal
};

// Creating the Zustand store for the exit modal state
export const useExitModal = create<ExitModalState>((set) => ({
  isOpen: false, // Initial state: modal is closed
  open: () => set({ isOpen: true }), // Action to open the modal
  close: () => set({ isOpen: false }), // Action to close the modal
}));
