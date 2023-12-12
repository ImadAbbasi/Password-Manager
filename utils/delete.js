export const deletePassword = async (id) => {
  const response = await fetch(`/api/passwords/delPass?id=${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete password.");
  }

  return response.json();
};
