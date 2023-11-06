import React from "react";
import Doc from "./(components)/Doc";

const document = () => {
  return (
    <div className="flex justify-center">
      <div className="my-4 max-w-5xl grid gap-8 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Doc />
        <Doc />
        <Doc />
        <Doc />
        <Doc />
      </div>
    </div>
  );
};

export default document;
