import { useEffect, useRef } from "react";
import { Tabber } from "../(utils)/renderer";

const Sheet = ({ tab }: { tab: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tabber = new Tabber(ref.current);
    tabber.load(tab);
  }, [ref, tab]);

  return <div ref={ref} className="h-screen border border-gray-400"></div>;
};

export default Sheet;
