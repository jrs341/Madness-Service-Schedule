export default function reducer(state={
  location: 'Austin'
}, action) {
  switch (action.type) {
    case 'LOCATION':
            if (action.payload) {
              return {...state, location: action.payload  
              } 
            } else {
              return {...state, location: 'Austin'}
            }
    default:
        return state;  
  };
}