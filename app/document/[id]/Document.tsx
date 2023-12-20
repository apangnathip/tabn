"use client";

import { DocJson } from "@/app/(models)/Doc";
import { FormEvent, useEffect, useState } from "react";
import CodeEditor from "./(components)/CodeEditor";
import Sheet from "./(components)/Sheet";
import { renameDoc } from "@/app/(utils)/docFunctions";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Document = ({ doc }: { doc: DocJson }) => {
  const [tab, setTab] = useState(doc.notation);
  const [lastSaved, setLastSaved] = useState(doc.notation);
  const SAVE_INTERVAL = 5000;
  const router = useRouter();

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

  const handleTitleChange = (e: FormEvent) => {
    const newTitle = e.currentTarget.textContent;
    if (newTitle === doc.title) return;
    if (newTitle) {
      renameDoc(newTitle, router, doc._id);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      saveDocument(tab);
    }, SAVE_INTERVAL);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="flex items-center gap-2 p-2 text-lg">
        <Link className="rounded-full" href="/">
          <FontAwesomeIcon
            className="rounded-full p-3 hover:bg-gray-300"
            icon={faMusic}
            size="xl"
          />
        </Link>
        <span
          suppressContentEditableWarning
          contentEditable
          className="rounded border border-transparent px-2 hover:border-black"
          onBlur={handleTitleChange}
        >
          {doc.title}
        </span>
      </div>
      <CodeEditor doc={doc} setTab={setTab} />
      <Sheet title={doc.title} tab={tab} />
    </>
  );
};

export default Document;
