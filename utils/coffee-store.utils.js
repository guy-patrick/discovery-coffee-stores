import { createApi } from "unsplash-js";

const serverApi = createApi({
  accessKey: "QuDhI8PhB7-m9acARd0inDWblEm5yUyrxJ_KsxES_fc",
});

async function getImageUrlsFromUnsplash() {
  const photos = await serverApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 6,
  });

  return photos.response.results.map((result) => result.urls["small"]);
}

export default async function retrieveCoffeeStores(
  latLong = "4.081701685517707%2C9.718261609903744",
  limit = 6
) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq376tpkG8oysPZzbOXy4y+c1u+CIUJp7+LQohxWP57Y24=",
    },
  };

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?query=coffee&ll=${latLong}&limit=${limit}`,
    options
  );

  const data = await response.json();
  const randomImageUrls = await getImageUrlsFromUnsplash();

  const coffeeStores = data.results.map((store, index) => {
    const { fsq_id, name, location } = store;

    return {
      id: fsq_id,
      name,
      address: location.address,
      neighbourhood: location.formatted_address,
      imgUrl: randomImageUrls[index],
    };
  });

  console.log(coffeeStores);
  return coffeeStores;
}
