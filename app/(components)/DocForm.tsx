"use client";

import { useRouter } from "next/navigation";
import { createDoc } from "../(utils)/docFunctions";

const DocForm = () => {
  const router = useRouter();

  return (
    <button
      className="box-content h-80 w-48 rounded-md border-2 border-transparent bg-gray-100 bg-clip-padding text-5xl shadow-[inset_0_0_0_2px_black] hover:border-black active:bg-blue-100"
      onClick={() => createDoc(router)}
    >
      +
    </button>
  );
};

export default DocForm;
