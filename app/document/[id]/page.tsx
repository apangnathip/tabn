import React from "react";

const document = ({ params }: { params: { id: string } }) => {
  return <div>{params.id}</div>;
};

export default document;
