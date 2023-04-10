//image sizes for imbd
export const imgOneNineTwo = (imageUrl) => {
  return `https://imdb-api.com/API/ResizeImage?apikey=${process.env.REACT_APP_IMDB_API_KEY}&url=${imageUrl}`;
};


// contentModal and singleContent
export const unavailable =
  "https://www.movienewz.com/img/films/poster-holder.jpg";

// contentModal
export const unavailableLandscape =
  "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg";

// For Carousel
export const noPicture =
  "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
