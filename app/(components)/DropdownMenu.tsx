import { SetStateAction, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faFont,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const DropdownItem = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <a
      href="#"
      className="flex gap-2 px-2 text-base hover:bg-gray-300 active:bg-gray-400"
    >
      <span>{icon}</span>
      {children}
    </a>
  );
};

const DropdownMenu = ({
  setActive,
}: {
  setActive: React.Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const onClick = () => setActive(false);

    const addEvent = setTimeout(() => {
      window.addEventListener("click", onClick);
    }, 50);

    return () => {
      clearTimeout(addEvent);
      window.removeEventListener("click", onClick);
    };
  });

  return (
    <div className="dropdown-menu absolute left-[-5rem] top-8 z-20 flex w-44 flex-col gap-1 rounded-lg bg-gray-200 py-2">
      <DropdownItem icon={<FontAwesomeIcon icon={faFont} />}>
        Rename
      </DropdownItem>
      <DropdownItem icon={<FontAwesomeIcon icon={faTrashCan} />}>
        Remove
      </DropdownItem>
      <DropdownItem icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}>
        Open in new tab
      </DropdownItem>
    </div>
  );
};

export default DropdownMenu;
