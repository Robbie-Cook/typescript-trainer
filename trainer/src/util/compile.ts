import * as monaco from "monaco-editor";

export const compileCode = async (
  monacoInstance: typeof monaco,
  modelUri: monaco.Uri
) => {
  const worker =
    await monacoInstance.languages.typescript.getTypeScriptWorker();
  const client = await worker(modelUri);
  const emitOutput = await client.getEmitOutput(modelUri.toString());
  console.log(emitOutput.outputFiles[0].text);

  const diagnostics = await client.getSemanticDiagnostics(modelUri.toString());
  console.log(diagnostics);

  if (diagnostics.length > 0) {
    diagnostics.forEach((diag) => {
      console.error(diag.messageText);
    });
    return false;
  } else {
    console.log("No semantic diagnostics found");
    return true;
  }
};
