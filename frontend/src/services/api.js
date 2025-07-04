export const signup = async () => {
  const response = await fetch(`/api/users/`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};
