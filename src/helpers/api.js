export const IMG_SIZE = 384;
export const apiUrl = (id, width = IMG_SIZE, height = IMG_SIZE) =>
  `https://picsum.photos/id/${id}/${width}/${height}`;
