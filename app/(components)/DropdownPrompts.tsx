import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DocJson } from "../(models)/Doc";
import Prompt from "./Prompt";

const DropdownPrompts = ({
  doc,
  activePrompts,
  setActivePrompts,
}: {
  doc: DocJson;
  activePrompts: { rename: boolean; remove: boolean };
  setActivePrompts: React.Dispatch<
    React.SetStateAction<{ rename: boolean; remove: boolean }>
  >;
}) => {
  const [renameButton, setRenameButton] = useState(false);
  const router = useRouter();

  const deleteDoc = async () => {
    const res = await fetch(`http://localhost:3000/api/Docs/${doc._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  };

  const renameDoc = async (title: string) => {
    const newData = { title: title };
    const res = await fetch(
      `http://localhost:3000/api/Docs/${doc._id?.toString()}`,
      {
        method: "PUT",
        body: JSON.stringify({ newData }),
      },
    );

    if (res.ok) {
      router.refresh();
    }
  };

  const [renameButton, setRenameButton] = useState(false);

  return (
    <>
      <Prompt show={activePrompts.rename}>
        <div>Rename</div>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setActivePrompts((prev) => ({ ...prev, rename: false }));

            const input = document.getElementById("rename") as HTMLInputElement;
            if (input) {
              const title = input.value;
              renameDoc(title);
            }
          }}
        >
          <input type="submit" hidden />
          <input
            className="px-2 py-1 text-sm"
            id="rename"
            type="text"
            placeholder={doc.title ? doc.title : "Untitled"}
            onKeyUp={(e) => {
              const form = e.target as HTMLInputElement;
              setRenameButton(form.value.length > 0 ? false : true);
            }}
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
            <button
              type="submit"
              className="rounded bg-blue-200 px-4 py-1 hover:bg-blue-300 active:bg-blue-400 disabled:bg-blue-200/60"
              id="rename-submit"
              disabled={renameButton}
            >
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
