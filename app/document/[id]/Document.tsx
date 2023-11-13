"use client";

import Sheet from "@/app/(components)/Sheet";
import { DocJson } from "@/app/(models)/Doc";
import { useEffect, useState } from "react";
import CodeEditor from "./(components)/CodeEditor";

const Document = ({ doc }: { doc: DocJson }) => {
  const [tab, setTab] = useState(doc.notation);
  const [lastSaved, setLastSaved] = useState(doc.notation);
  const SAVE_INTERVAL = 5000;

  const saveDocument = async (notation: string) => {
    if (tab === lastSaved) return;

    const newData = { notation: notation };
    const res = await fetch(`http://localhost:3000/api/Docs/${doc._id}`, {
      method: "PUT",
      body: JSON.stringify({ newData }),
    });

    if (!res.ok) {
      throw new Error("Failed to save document");
    }

    setLastSaved(notation);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      saveDocument(tab);
    }, SAVE_INTERVAL);
    return () => clearInterval(interval);
  });

  return (
    <div className="m-4 grid gap-4">
      <CodeEditor doc={doc} setTab={setTab} />
      <Sheet tab={tab} />
    </div>
  );
};

export default Document;
