export default function quicklinksReducer(state =[], action){
  switch(action.type){

    case 'CREATE_QUICKLINKS':{
        const newState = Object.assign([], state.reverse());
        newState.push(action.quicklinks);
        return newState.reverse();
    }

    case 'DELETE_QUICKLINKS': {

      const newState = Object.assign([], state);
      //console.log(newState);
      const indexOfEventToDelete = state.findIndex(quicklinks => {return quicklinks._id == action.quicklinks._id;});
      newState.splice(indexOfEventToDelete, 1);
      //browserHistory.push('/cats');
      return newState;
    }

    default: return state;
  }
}
