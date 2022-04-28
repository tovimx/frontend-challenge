export const fetchResults = async (query: string) => {
  const response = await fetch(
    `https://api.discogs.com/database/search?&per_page=10&artist=${query}&key=LBcEeQbNHFdxUgnUtuNX&secret=KiKQaTYjPyDXQpVUULntZTnPadYmSrmy`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
