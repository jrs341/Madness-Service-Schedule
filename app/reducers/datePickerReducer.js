export default function reducer(state={
  serviceDate: 1
}, action) {
  switch (action.type) {
    case 'SERVICE_DATE':
            if (action.payload) {
              return {...state, serviceDate: action.payload  
              } 
            } else {
              return {...state, serviceDate: 1}
            }
    default:
        return state;  
  };
}