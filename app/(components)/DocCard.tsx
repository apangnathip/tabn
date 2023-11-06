import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export type DocCardProps = {
  title: string;
  createdAt: string;
  updatedAt: string;
};

export const DocCard = ({ title, createdAt, updatedAt }: DocCardProps) => {
  return (
    <div className="w-48">
      <div className="bg-gray-500 w-48 letter"></div>
      <div className="bg-gray-300 p-4">
        <p className="text-base font-medium">{title}</p>
        <div className="flex justify-between items-center text-xs ">
          <span>Updated {updatedAt.slice(0, 10)}</span>
          <button className="w-5 h-5 rounded-full hover:bg-gray-400">
            <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
          </button>
        </div>
      </div>
    </div>
  );
};
