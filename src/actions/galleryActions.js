export function createGallery(gallery){
  return {type: 'CREATE_GALLERY',gallery};
}
export function getGallery(gallery){
  return {type: 'GET_GALLERY',gallery};
}
export function deleteGallery(gallery){
  return {type: 'DELETE_GALLERY',gallery};
}
