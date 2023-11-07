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
      className="flex gap-2 text-base px-2 hover:bg-gray-300 active:bg-gray-400"
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
    <div className="dropdown-menu bg-gray-200 absolute z-20 top-8 left-[-5rem] flex flex-col gap-1 py-2 w-44 rounded-lg">
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
