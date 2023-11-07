"use client";

import React from "react";
import Ellipses from "./Ellipses";

export type DocCardProps = {
  title: string;
  createdAt: string;
  updatedAt: string;
};

export const DocCard = ({ title, createdAt, updatedAt }: DocCardProps) => {
  return (
    <div className="w-48">
      <div className="letter w-48 rounded-t bg-gray-500"></div>
      <div className="h-20 rounded-b bg-gray-300 p-4">
        <p className="text-base font-medium">{title}</p>
        <div className="flex items-center justify-between text-xs ">
          <span>Updated {updatedAt.slice(0, 10)}</span>
          <Ellipses />
        </div>
      </div>
    </div>
  );
};
