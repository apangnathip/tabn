import React from "react";
import Prompt from "./Prompt";
import { useRouter } from "next/navigation";
import { Types } from "mongoose";

const DropdownPrompts = ({
  id,
  activePrompts,
  setActivePrompts,
}: {
  id: Types.ObjectId;
  activePrompts: { rename: boolean; remove: boolean };
  setActivePrompts: React.Dispatch<
    React.SetStateAction<{ rename: boolean; remove: boolean }>
  >;
}) => {
  const router = useRouter();

  const deleteDoc = async () => {
    const res = await fetch(`http://localhost:3000/api/Docs/${id.toString()}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <>
      <Prompt show={activePrompts.rename}>
        <span>Rename</span>
        <form action="" className="flex flex-col gap-4">
          <input
            className="px-2 py-1 text-sm"
            type="text"
            placeholder="Untitled"
          />
          <span className="flex justify-end gap-6 text-sm">
            <button
              className="rounded bg-gray-300 px-4 py-1 hover:bg-gray-400 active:bg-blue-400"
              onClick={() => {
                setActivePrompts((prev) => ({ ...prev, rename: false }));
              }}
            >
              Cancel
            </button>
            <button className="rounded bg-blue-200 px-4 py-1 hover:bg-blue-300 active:bg-blue-400">
              OK
            </button>
          </span>
        </form>
      </Prompt>

      <Prompt show={activePrompts.remove}>
        <span>Remove</span>
        <span className="text-sm">Permanently Delete?</span>
        <span className="flex justify-end gap-6 text-sm">
          <button
            className="rounded bg-gray-300 px-4 py-1 hover:bg-gray-400 active:bg-blue-400"
            onClick={() => {
              setActivePrompts((prev) => ({ ...prev, remove: false }));
            }}
          >
            Cancel
          </button>
          <button
            className="rounded bg-blue-200 px-4 py-1 hover:bg-blue-300 active:bg-blue-400"
            onClick={() => {
              setActivePrompts((prev) => ({ ...prev, remove: false }));
              deleteDoc();
            }}
          >
            OK
          </button>
        </span>
      </Prompt>
    </>
  );
};

export default DropdownPrompts;
