export default function reducer(state={
  location: 1
}, action) {
  switch (action.type) {
    case 'LOCATION':
            if (action.payload) {
              return {...state, location: action.payload  
              } 
            } else {
              return {...state, location: 1}
            }
    default:
        return state;  
  };
}