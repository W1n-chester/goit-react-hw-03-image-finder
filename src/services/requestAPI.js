export const fetchGalleryImages = async (page, request) => {
  const KEY = '33042709-ff335eccdd4e8b99fec3c8b69';
  return fetch(
    `https://pixabay.com/api/?q=${request}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No results found for ${request}`));
  });
};