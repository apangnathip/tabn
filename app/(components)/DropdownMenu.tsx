import React, { SetStateAction, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faFont,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Prompt from "./Prompt";

const DropdownItem = ({
  set,
  icon,
  children,
}: {
  set: React.Dispatch<SetStateAction<boolean>>;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <a
        href="#"
        className="flex gap-2 px-2 py-1 text-base hover:bg-gray-300 active:bg-gray-400"
        onClick={() => set(true)}
      >
        <span>{icon}</span>
        {children}
      </a>
    </div>
  );
};

const DropdownMenu = ({
  setActive,
  setActivePrompts,
}: {
  setActive: React.Dispatch<SetStateAction<boolean>>;
  setActivePrompts: React.Dispatch<
    SetStateAction<{ rename: boolean; remove: boolean }>
  >;
}) => {
  useEffect(() => {
    const onClick = () => setActive(false);
    const addEvent = setTimeout(() => {
      window.addEventListener("click", onClick);
    }, 10);

    return () => {
      clearTimeout(addEvent);
      window.removeEventListener("click", onClick);
    };
  });

  return (
    <div className="dropdown-menu absolute left-[-5rem] top-8 z-20 flex w-44 flex-col rounded-lg bg-gray-200 py-2">
      <DropdownItem
        set={() => {
          setActive(false);
          setActivePrompts((prev) => ({ ...prev, rename: true }));
        }}
        icon={<FontAwesomeIcon icon={faFont} />}
      >
        Rename
      </DropdownItem>
      <DropdownItem
        set={() => {
          setActive(false);
          setActivePrompts((prev) => ({ ...prev, remove: true }));
        }}
        icon={<FontAwesomeIcon icon={faTrashCan} />}
      >
        Remove
      </DropdownItem>
      <DropdownItem
        set={() => {}}
        icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
      >
        Open in new tab
      </DropdownItem>
    </div>
  );
};

export default DropdownMenu;
