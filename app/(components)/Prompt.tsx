import React from "react";

const Prompt = ({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 bg-black/25">
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-lg bg-gray-200 p-4 text-lg">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Prompt;
