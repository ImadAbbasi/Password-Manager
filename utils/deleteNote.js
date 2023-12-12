export const deleteNote = async (id) => {
  const response = await fetch(`/api/notes/delNote?id=${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete the note!");
  }

  return response.json();
};
