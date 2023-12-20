import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function createDoc(router: AppRouterInstance) {
  const res = await fetch("../api/Docs", {
    method: "POST",
    body: JSON.stringify({
      docData: {
        title: "Untitled",
        offset: new Date().getTimezoneOffset(),
        notation: "Example blah blah",
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create document");
  }

  router.refresh();
}

export async function deleteDoc(router: AppRouterInstance, docID: string) {
  const res = await fetch(`http://localhost:3000/api/Docs/${docID}`, {
    method: "DELETE",
  });

  if (res.ok) {
    router.refresh();
  }
}

export async function renameDoc(
  title: string,
  router: AppRouterInstance,
  docID: string,
) {
  const newData = { title: title };
  const res = await fetch(`http://localhost:3000/api/Docs/${docID}`, {
    method: "PUT",
    body: JSON.stringify({ newData }),
  });

  if (res.ok) {
    router.refresh();
  }
}
