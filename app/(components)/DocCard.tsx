"use client";

import Link from "next/link";
import { DocJson } from "../(models)/Doc";
import Ellipses from "./Ellipses";

export const DocCard = ({ doc }: { doc: DocJson }) => {
  return (
    <div className="relative box-content w-48 rounded-md border-2 border-solid border-transparent hover:border-blue-300">
      <Link href={`document/${doc._id}`} draggable="false">
        <div className="h-60 rounded-t bg-gray-500"></div>
        <div className="h-20 rounded-b bg-gray-300"></div>
      </Link>
      <div className="absolute bottom-4 left-4 select-none">
        <p className="w-40 truncate text-base font-medium">{doc.title}</p>
        <div className="flex items-center justify-between text-xs ">
          <span>
            Created{" "}
            {new Date(doc.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <Ellipses doc={doc} />
        </div>
      </div>
    </div>
  );
};
