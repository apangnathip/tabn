import React from "react";
import Document from "./Document";

const getDocById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/Docs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get document");
  }

  return res.json();
};

const DocumentContainer = async ({ params }: { params: { id: string } }) => {
  const doc = await getDocById(params.id);

  return (
    <div>
      <Document doc={doc} />
    </div>
  );
};

export default DocumentContainer;
