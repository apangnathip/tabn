import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import DropdownMenu from "./DropdownMenu";

const Ellipses = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="relative">
      <button
        className="h-5 w-5 rounded-full hover:bg-gray-400"
        onClick={() => setActive(!active)}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
      </button>
      {active && <DropdownMenu setActive={setActive} />}
    </div>
  );
};

export default Ellipses;
