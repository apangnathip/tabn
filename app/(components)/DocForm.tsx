"use client";

import { useRouter } from "next/navigation";

const DocForm = () => {
  const router = useRouter();

  const createDoc = async () => {
    const res = await fetch("../api/Docs", {
      method: "POST",
      body: JSON.stringify({ docData: { title: "Untitled" } }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to create document");
    }

    router.refresh();
  };

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
