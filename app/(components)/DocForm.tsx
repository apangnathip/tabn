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
      className="box-content h-80 w-48 rounded-md border-2 border-transparent bg-gray-100 bg-clip-padding text-5xl shadow-[inset_0_0_0_2px_black] hover:border-black active:bg-blue-100"
      onClick={createDoc}
    >
      +
    </button>
  );
};

export default DocForm;
