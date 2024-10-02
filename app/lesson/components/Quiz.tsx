"use client"; // Enabling client-side rendering for this component

import Image from "next/image"; // Importing the Next.js Image component
import { useRouter } from "next/navigation"; // Importing useRouter for navigation
import { FC, useState, useTransition } from "react"; // Importing hooks and types from React

import Confetti from "react-confetti"; // Confetti animation for the completion screen
import { useAudio, useMount, useWindowSize } from "react-use"; // React-use hooks for audio, mount, and window size

import { upsertChallengeProgress } from "@/actions/challengeProgress"; // Action to update challenge progress
import { reduceHearts } from "@/actions/userProgress"; // Action to reduce hearts on incorrect answers
import { challengeOptions, challenges, userSubscription } from "@/db/schema"; // Database schema imports
import { useHeartsModal } from "@/store/useHeartsModal"; // Custom hook for hearts modal
import { usePracticeModal } from "@/store/usePracticeModal"; // Custom hook for practice modal

import { toast } from "sonner"; // Toast notifications for error handling

import { Challenge } from "./Challenge"; // Challenge component import
import { Footer } from "./Footer"; // Footer component import
import { Header } from "./Header"; // Header component import
import { QuestionBubble } from "./QuestionBubble"; // QuestionBubble component import
import ResultCard from "./ResultCard"; // ResultCard component import

// Defining the Quiz component's props interface
interface QuizProps {
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[]; // Challenge options for each challenge
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription:
    | (typeof userSubscription.$inferSelect & {
        isActive: boolean; // Check if the user's subscription is active
      })
    | null;
}

// Creating the Quiz functional component with props destructuring
export const Quiz: FC<QuizProps> = ({
  initialHearts,
  initialLessonChallenges,
  initialLessonId,
  initialPercentage,
  userSubscription,
}) => {
  const router = useRouter(); // Initializing the Next.js router

  const { open: openHeartsModal } = useHeartsModal(); // Hook to open hearts modal
  const { open: openPracticeModal } = usePracticeModal(); // Hook to open practice modal

  useMount(() => {
    // On mount, if the lesson is completed, open the practice modal
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const { width, height } = useWindowSize(); // Getting window dimensions for Confetti animation

  const [finishAudio] = useAudio({
    src: "/finish.mp3", // Audio for lesson completion
    autoPlay: true,
  });

  const [correctAudio, _c, correctAudioControls] = useAudio({
    src: "/correct.wav", // Audio for correct answer
  });

  const [incorrectAudio, _i, incorrectAudioControls] = useAudio({
    src: "/incorrect.wav", // Audio for incorrect answer
  });

  const [pending, startTransition] = useTransition(); // Handling transitions for async actions

  // Setting initial state variables
  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage; // Reset percentage if lesson is fully completed
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed // Find the first uncompleted challenge
    );

    return uncompletedIndex === -1 ? 0 : uncompletedIndex; // If all are completed, start from the first one
  });
  const [selectedOption, setSelectedOption] = useState<number>(); // State for selected option
  const [status, setStatus] = useState<"none" | "wrong" | "correct">("none"); // Status for answer (none, wrong, or correct)

  const currentChallenge = challenges[activeIndex]; // Get the current challenge

  const options = currentChallenge?.challengeOptions ?? []; // Get the options for the current challenge

  const onNext = () => {
    setActiveIndex((current) => current + 1); // Move to the next challenge
  };

  const onSelect = (id: number) => {
    if (status !== "none") return; // Prevent selection if the status is not 'none'
    setSelectedOption(id); // Set the selected option
  };

  const onContinue = () => {
    if (!selectedOption) return; // Prevent continuation if no option is selected

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined); // Reset the status and selected option on wrong answer
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined); // Move to next challenge if the answer is correct
      return;
    }

    const correctOption = options.find((option) => option.correct); // Find the correct option

    if (!correctOption) {
      return;
    }

    if (correctOption.id === selectedOption) {
      // If selected option is correct
      startTransition(() => {
        upsertChallengeProgress(currentChallenge.id)
          .then((res) => {
            if (res?.error === "hearts") {
              console.error("Missing hearts");
              openHeartsModal(); // Open hearts modal if there are not enough hearts
              return;
            }

            correctAudioControls.play(); // Play correct answer audio

            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length); // Update progress percentage

            // If it's practice mode, increase hearts
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Something went wrong, plz try again !")); // Handle error with toast notification
      });
    } else {
      // If selected option is incorrect
      startTransition(() => {
        reduceHearts(currentChallenge.id)
          .then((res) => {
            if (res?.error === "hearts") {
              console.error("Missing hearts");
              openHeartsModal();
              return;
            }

            incorrectAudioControls.play(); // Play incorrect answer audio

            setStatus("wrong");

            if (!res?.error) {
              setHearts((prev) => Math.max(prev - 1, 0)); // Decrease hearts
            }
          })
          .catch(() => {
            toast.error("Something went wrong. plz try again !"); // Handle error with toast notification
          });
      });
    }
  };

  // If there are no more challenges, show the finish screen
  if (!currentChallenge) {
    return (
      <>
        {finishAudio} {/* Play finish audio */}

        <Confetti
          width={width} // Display confetti with window width
          height={height} // Display confetti with window height
          recycle={false}
          numberOfPieces={500} // Number of confetti pieces
          tweenDuration={10000} // Duration of confetti animation
        />

        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto items-center justify-center text-center h-full">
          <Image
            src="/finish.svg" // Finished lesson image
            alt="Finished"
            height={100}
            width={100}
            className="size-12 lg:size-24"
          />

          <h1 className="text-xl lg:text-3xl text-neutral-700 font-bold">
            Great job ! <br /> You've completed the lesson. {/* Completion message */}
          </h1>

          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} /> {/* Points result */}
            <ResultCard
              variant="hearts"
              value={!!userSubscription?.isActive ? "active" : hearts} // Hearts result
            />
          </div>
        </div>

        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")} // Redirect to learn page
        />
      </>
    );
  }

  // Main quiz screen
  return (
    <>
      {correctAudio}
      {incorrectAudio}

      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive} // Header showing hearts and progress
      />

      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {currentChallenge.type === "ASSIST"
                ? "Select the correct meaning" // Display challenge type or question
                : currentChallenge.question}
            </h1>

            <div>
              {currentChallenge.type === "ASSIST" && (
                <QuestionBubble question={currentChallenge.question} /> // Show question bubble for assist type challenges
              )}

              <Challenge
                options={options} // Render the challenge with options
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={currentChallenge.type}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer
        onCheck={onContinue} // Footer with continue button
        status={status}
        disabled={pending || !selectedOption} // Disable button if pending or no option is selected
      />
    </>
  );
};
