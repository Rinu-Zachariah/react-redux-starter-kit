export function createHistory(history){
  return {type: 'CREATE_HISTORY',history};
}
export function deleteHistory(history){
  return {type: 'DELETE_HISTORY',history};
}
