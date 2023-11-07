"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const DocForm = () => {
  const router = useRouter();

  const createDoc = async () => {
    const res = await fetch("../api/Docs", {
      method: "POST",
      body: JSON.stringify({ docData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to create document");
    }

    router.refresh();
  };

  const [docData, setDocData] = useState({ title: "Untitled" });

  return (
    <button
      className="border-2 border-black rounded text-5xl bg-gray-50 hover:bg-gray-200 active:bg-blue-100"
      onClick={createDoc}
    >
      +
    </button>
  );
};

export default DocForm;
