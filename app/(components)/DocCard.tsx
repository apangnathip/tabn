"use client";

import React from "react";
import Ellipses from "./Ellipses";
import { DocType } from "../(models)/Doc";

export const DocCard = ({ doc }: { doc: DocType }) => {
  return (
    <div className="w-48">
      <div className="letter w-48 rounded-t bg-gray-500"></div>
      <div className="h-20 rounded-b bg-gray-300 p-4">
        <p className="text-base font-medium">{doc.title}</p>
        <div className="flex items-center justify-between text-xs ">
          <span>Updated {doc.updatedAt.toString().slice(0, 10)}</span>
          <Ellipses id={doc._id} />
        </div>
      </div>
    </div>
  );
};
