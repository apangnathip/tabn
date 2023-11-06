import React from "react";
import DocForm from "./(components)/DocForm";
import { DocCard, DocCardProps } from "./(components)/DocCard";

const getDocs = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Docs", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch document");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading documents: ", error);
  }
};

const document = async () => {
  const data = await getDocs();
  const docs = data.docs;

  return (
    <div className="flex justify-center">
      <div className="my-4 max-w-5xl grid gap-8 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <DocForm />
        {docs &&
          docs?.map((doc: DocCardProps, i: number) => (
            <DocCard
              key={i}
              title={doc.title}
              createdAt={doc.createdAt}
              updatedAt={doc.updatedAt}
            />
          ))}
      </div>
    </div>
  );
};

export default document;
