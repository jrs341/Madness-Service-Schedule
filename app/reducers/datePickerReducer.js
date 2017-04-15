export default function reducer(state={
  serviceDate: new Date().toString().split(' ', 4).join(' ')
}, action) {
  switch (action.type) {
    case 'SERVICE_DATE':
            if (action.payload) {
              return {...state, serviceDate: action.payload  
              } 
            } else {
              var date = new Date();
              return {...state, serviceDate: new Date().toString().split(' ', 4).join(' ') }
            }
    default:
        return state;  
  };
}