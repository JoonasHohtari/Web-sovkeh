export const getCities = async () => {
  const res = await fetch("http://localhost:5000/api/cities");
  return await res.json();
};

export const createCity = async ({ capital, country, image, token }) => {
  const res = await fetch("http://localhost:5000/api/cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      capital,
      country,
      image,
    }),
  });

  return await res.json();
};

export const deleteCity = async ({ id, token }) => {
  const res = await fetch("http://localhost:5000/api/cities" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};
