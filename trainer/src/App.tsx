import Editor, { useMonaco } from "@monaco-editor/react";
import "./App.css";
import { useEffect, useState } from "react";
import { compileCode } from "./util/compile";
import Confetti from "react-confetti";
import "bigiron.css/dist/dark.css";
import { FaCheckCircle, FaStar, FaClock } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { challenges } from "./challenges/challenges";
import {
  challengeMetadata,
  getChallengeOfTheDay,
} from "./challenges/challengeMetadata";
import { useMediaQuery } from "react-responsive";

interface LastVisit {
  challengeIndex: number;
  timestamp: number;
}

const LAST_VISIT_KEY = "lastChallengeVisit";
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

function App() {
  const monacoInstance = useMonaco();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const dailyChallengeIndex = getChallengeOfTheDay();
  const [timeUntilNext, setTimeUntilNext] = useState("");
  const [showDailyChallenge, setShowDailyChallenge] = useState(true);
  const [selectValue, setSelectValue] = useState<string | number>("");

  // Get last visit from localStorage
  const getLastVisit = (): LastVisit | null => {
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    return lastVisit ? JSON.parse(lastVisit) : null;
  };

  // Save last visit to localStorage
  const saveLastVisit = (challengeIndex: number) => {
    const lastVisit: LastVisit = {
      challengeIndex,
      timestamp: Date.now(),
    };
    localStorage.setItem(LAST_VISIT_KEY, JSON.stringify(lastVisit));
  };

  // Check if we should show daily challenge
  const shouldShowDailyChallenge = (): boolean => {
    const lastVisit = getLastVisit();
    if (!lastVisit) return true;

    const timeSinceLastVisit = Date.now() - lastVisit.timestamp;
    return timeSinceLastVisit >= TWENTY_FOUR_HOURS;
  };

  // Handle root URL redirect
  useEffect(() => {
    if (location.pathname === "/") {
      if (shouldShowDailyChallenge()) {
        navigate("/daily-challenge", { replace: true });
      } else {
        const lastVisit = getLastVisit();
        if (lastVisit) {
          navigate(`/challenge/${lastVisit.challengeIndex}`, { replace: true });
        } else {
          navigate("/daily-challenge", { replace: true });
        }
      }
    }
  }, [location.pathname]);

  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(() => {
    if (location.pathname === "/daily-challenge") {
      return dailyChallengeIndex;
    }
    if (id) return parseInt(id) - 1; // Convert from 1-based URL to 0-based index
    return dailyChallengeIndex; // Fallback, though this should never be reached
  });
  const [editors, setEditors] = useState([
    { id: 1, code: challenges[currentChallengeIndex] },
  ]);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);
  const minWidth800 = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  // Save visit when challenge changes
  useEffect(() => {
    saveLastVisit(currentChallengeIndex);
  }, [currentChallengeIndex]);

  useEffect(() => {
    const savedEditors = editors.map((editor) => {
      const savedCode = localStorage.getItem(
        `userCode_${currentChallengeIndex}`
      );
      return savedCode ? { ...editor, code: savedCode } : editor;
    });
    setEditors(savedEditors);
  }, [currentChallengeIndex]);

  useEffect(() => {
    if (monacoInstance) {
      monacoInstance.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
        {
          noSemanticValidation: false,
          noSyntaxValidation: false,
        }
      );

      // Type helpers
      monacoInstance.languages.typescript.typescriptDefaults.addExtraLib(
        `declare type Equals<T, U> = (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2) ? true : false;
declare type Expect<T extends true> = T; 
declare type Not<T extends boolean> = T extends true ? false : true;
        `,
        "ts:filename/utils/types.d.ts"
      );
    }
  }, [monacoInstance]);

  // Calculate time until next challenge
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeUntilNext(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEditorChange = (_: number, value: string | undefined) => {
    const newValue = value || "";
    const updatedEditors = editors.map((editor) => ({
      ...editor,
      code: newValue,
    }));
    setEditors(updatedEditors);
    localStorage.setItem(`userCode_${currentChallengeIndex}`, newValue);
    setIsChallengeCompleted(false);
    handleCompile();
  };

  const resetCodeToChallenge = (index: number) => {
    const updatedEditors = editors.map((editor) => ({
      ...editor,
      code: challenges[index],
    }));
    setEditors(updatedEditors);
    localStorage.setItem(`userCode_${index}`, challenges[index]);
    setIsChallengeCompleted(false);
  };

  const switchChallenge = (index: number) => {
    setCurrentChallengeIndex(index);
    navigate(`/challenge/${index + 1}`);
    resetCodeToChallenge(index);
  };

  const handleDailyChallenge = () => {
    if (location.pathname === "/daily-challenge") {
      setShowDailyChallenge(!showDailyChallenge);
    } else {
      navigate("/daily-challenge");
    }
    setSelectValue("");
  };

  const handleCompile = async () => {
    const model = monacoInstance?.editor
      .getModels()
      .find((model) => model.uri.path === `/editor_${currentChallengeIndex}`);
    if (model && monacoInstance) {
      const result = await compileCode(monacoInstance, model.uri);
      setIsChallengeCompleted(result); // Set challenge completion status on successful compile
    }
  };

  return (
    <div className="flex flex-col items-center p-4 text-white min-h-screen mt-10">
      {isChallengeCompleted && <Confetti />}
      <h1 className="text-3xl font-bold pb-3 text-white text-center">
        TypeScript Trainer
      </h1>
      <div className="flex flex-col items-center mb-4 w-full max-w-md">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handleDailyChallenge}
            className={`p-2 rounded flex items-center gap-2 ${
              location.pathname === "/daily-challenge"
                ? "bg-blue-600"
                : "bg-gray-700"
            }`}
          >
            <FaStar className="text-yellow-400" />
            <span>Daily Challenge</span>
          </button>
          <select
            id="challenge-select"
            value={selectValue}
            onChange={(e) => {
              if (e.target.value === "") {
                handleDailyChallenge();
              } else {
                setSelectValue(Number(e.target.value));
                switchChallenge(Number(e.target.value));
              }
            }}
            className="p-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="text-black">
              Select a Challenge
            </option>
            {challenges.map((_, index) => (
              <option key={index} value={index} className="text-black">
                Challenge {index + 1}
              </option>
            ))}
          </select>
        </div>
        {(location.pathname === "/daily-challenge" ||
          currentChallengeIndex === dailyChallengeIndex) &&
          showDailyChallenge && (
            <div className="bg-gray-800 p-4 pt-0 rounded-lg w-full mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Today's Challenge</h3>
                <span className="text-gray-300">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 mb-2">
                <FaClock className="text-blue-400" />
                <span>Next challenge in: {timeUntilNext}</span>
              </div>
              <p className="text-gray-300">
                Difficulty:{" "}
                {challengeMetadata[currentChallengeIndex].difficulty}
              </p>
              <p className="text-gray-300">
                Category: {challengeMetadata[currentChallengeIndex].category}
              </p>
              <p className="text-gray-300">
                {challengeMetadata[currentChallengeIndex].description}
              </p>
            </div>
          )}
      </div>
      <div className="w-full max-w-6xl">
        <Editor
          key={"key"}
          height="40vh"
          width="100%"
          theme="vs-dark"
          defaultLanguage="typescript"
          value={editors[0].code}
          onChange={(value) => handleEditorChange(0, value)}
          options={{
            fontSize: minWidth800 ? 18 : 12,
            minimap: {
              enabled: false,
            },
          }}
          className="mb-4"
          path={`/editor_${currentChallengeIndex}`}
        />
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => resetCodeToChallenge(currentChallengeIndex)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Reset
        </button>
      </div>
      {isChallengeCompleted && (
        <div className="flex flex-col gap-2 animate-fade-in items-center">
          <div className="flex items-center mt-4">
            <FaCheckCircle className="text-green-500 mr-2" />
            <span className="text-xl text-white">Challenge Completed!</span>
          </div>
          <button
            onClick={() => {
              const nextIndex = (currentChallengeIndex + 1) % challenges.length;
              setCurrentChallengeIndex(nextIndex);
              resetCodeToChallenge(nextIndex);
            }}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            Next Challenge
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
