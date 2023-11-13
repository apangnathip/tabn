import { DocCard } from "./(components)/DocCard";
import DocForm from "./(components)/DocForm";
import { DocJson } from "./(models)/Doc";

const getDocs = async (): Promise<{ docs: DocJson[] } | undefined> => {
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

const dashboard = async () => {
  const data = await getDocs();
  const docs = data ? data.docs : null;

  return (
    <div className="flex justify-center">
      <div className="my-4 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <DocForm />
        {docs && docs?.map((doc, i) => <DocCard key={i} doc={doc} />)}
      </div>
    </div>
  );
};

export default dashboard;
