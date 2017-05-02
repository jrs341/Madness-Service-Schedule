export default function reducer(state={
  vehicle_year: 2015
}, action) {
  switch (action.type) {
    case 'VEHICLE_YEAR':
            if (action.payload) {
              return {...state, vehicle_year: action.payload  
              } 
            } else {
              return {...state, vehicle_year: 2015}
            }
    default:
        return state;  
  };
}