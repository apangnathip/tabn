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
      <div className="bg-gray-500 rounded-t w-48 letter"></div>
      <div className="bg-gray-300 rounded-b h-20 p-4">
        <p className="text-base font-medium">{title}</p>
        <div className="flex justify-between items-center text-xs ">
          <span>Updated {updatedAt.slice(0, 10)}</span>
          <Ellipses />
        </div>
      </div>
    </div>
  );
};
