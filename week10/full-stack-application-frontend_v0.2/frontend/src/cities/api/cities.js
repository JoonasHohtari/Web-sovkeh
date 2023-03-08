export const getCities = async () => {
  const res = await fetch(
    "http://localhost:5000/api/cities"
  );
  return await res.json();
};

export const createCity = async ({capital, country, image}) => {
  const res = await fetch(
    "http://localhost:5000/api/cities",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        capital,
        country,
        image
      })
    }
  );
  
  return await res.json();
};