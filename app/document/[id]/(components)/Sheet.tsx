"use client";

import { useEffect, useRef } from "react";
import { Compiler } from "../(utils)/compiler";

const Sheet = ({ title, tab }: { title: string; tab: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const compiler = new Compiler(ref.current);
    compiler.setTitle(title);
    compiler.parse(tab);
  }, [ref, title, tab]);

  return (
    <div className="mt-16 flex justify-center">
      <div
        ref={ref}
        className="h-screen w-[72rem] border border-gray-400"
      ></div>
    </div>
  );
};

export default Sheet;
