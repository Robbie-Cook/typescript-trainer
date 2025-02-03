import Editor, { useMonaco } from "@monaco-editor/react";
import "./App.css";
import { useEffect, useState } from "react";
import { compileCode } from "./util/compile";
import Confetti from "react-confetti";
import { FaCheckCircle } from "react-icons/fa";

import { challenges } from "./challenges/challenges"; // Import challenges

function App() {
  const monacoInstance = useMonaco();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [editors, setEditors] = useState([{ id: 1, code: challenges[0] }]);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);

  useEffect(() => {
    const savedEditors = editors.map((editor) => {
      const savedCode = localStorage.getItem(`userCode_0`);
      return savedCode ? { ...editor, code: savedCode } : editor;
    });
    setEditors(savedEditors);
  }, []);

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

  const handleEditorChange = (_: number, value: string | undefined) => {
    const newValue = value || "";
    const updatedEditors = editors.map((editor) => ({
      ...editor,
      code: newValue,
    }));
    setEditors(updatedEditors);
    localStorage.setItem(`userCode_0`, newValue);
    console.log(localStorage.getItem(`userCode_0`));
    setIsChallengeCompleted(false); // Reset challenge completion status on code change

    handleCompile();
  };

  const resetCodeToChallenge = (index: number) => {
    const updatedEditors = editors.map((editor) => ({
      ...editor,
      code: challenges[index],
    }));
    setEditors(updatedEditors);
    localStorage.setItem(`userCode_0`, challenges[index]);
    setIsChallengeCompleted(false); // Reset challenge completion status on reset
  };

  const switchChallenge = (index: number) => {
    setCurrentChallengeIndex(index);
    resetCodeToChallenge(index);
  };

  const handleCompile = async () => {
    const model = monacoInstance?.editor
      .getModels()
      .find((model) => model.uri.path === `/editor_${0}`);
    if (model && monacoInstance) {
      const result = await compileCode(monacoInstance, model.uri);
      setIsChallengeCompleted(result); // Set challenge completion status on successful compile
    }
  };

  return (
    <div className="flex flex-col items-center p-4 text-white min-h-screen mt-10">
      {isChallengeCompleted && <Confetti />}
      <h1 className="text-3xl font-bold mb-14 text-white">
        TypeScript Trainer
      </h1>
      <div className="flex flex-col items-center mb-4">
        <label htmlFor="challenge-select" className="mb-2 text-white">
          Select Challenge:
        </label>
        <select
          id="challenge-select"
          value={currentChallengeIndex}
          onChange={(e) => switchChallenge(Number(e.target.value))}
          className="p-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {challenges.map((_, index) => (
            <option key={index} value={index} className="text-black">
              Challenge {index + 1}
            </option>
          ))}
        </select>
      </div>
      <Editor
        key={"key"}
        height="40vh"
        width="1000px"
        theme="vs-dark"
        defaultLanguage="typescript"
        value={editors[0].code}
        onChange={(value) => handleEditorChange(0, value)}
        options={{
          fontSize: 18,
        }}
        className="mb-4"
        path={`/editor_${0}`}
      />
      <div className="flex space-x-4">
        <button
          onClick={() => resetCodeToChallenge(currentChallengeIndex)}
          className="p-2 bg-red-600 hover:bg-red-700 rounded text-white"
        >
          Reset
        </button>
      </div>
      {isChallengeCompleted && (
        <div className="flex flex-col gap-2 animate-fade-in">
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
