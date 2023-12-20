"use client";

import { DocJson } from "@/app/(models)/Doc";
import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React, { useRef } from "react";

const CodeEditor = ({
  doc,
  setTab,
}: {
  doc: DocJson;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const editorRef = useRef(null as null | monaco.editor.IStandaloneCodeEditor);

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
  ) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      setTab(editor.getValue());
    });
  };

  return (
    <Editor
      height="40vh"
      width="100%"
      theme="vs-dark"
      defaultLanguage="xml"
      defaultValue={doc.notation}
      onMount={handleEditorDidMount}
      options={{
        minimap: {
          enabled: false,
        },
        padding: {
          top: 15,
          bottom: 15,
        },
      }}
    />
  );
};

export default CodeEditor;
