export default function reducer(state={
  serviceTime: 1
}, action) {
  switch (action.type) {
    case 'SERVICE_TIME':
    	switch (action.payload) {
    		case 1:
	    		return {...state, serviceTime: 1}
	    		break;
	    	case 2:
	    		return {...state, serviceTime: 2}
	    		break;
	    	case 3:
	    		return {...state, serviceTime: 3}
	    		break;
	    	case 4:
	    		return {...state, serviceTime: 4}
	    		break;
	    	case 5:
	    		return {...state, serviceTime: 5}
	    		break;
	    	case 6:
	    		return {...state, serviceTime: 6}
	    		break;
	    	case 7:
	    		return {...state, serviceTime: 7}
	    		break;
	    	case 8:
	    		return {...state, serviceTime: 8}
	    		break;
	    	case 9:
	    		return {...state, serviceTime: 9}
	    		break;
	    	case 10:
	    		return {...state, serviceTime: 10}
	    		break;
	    	case 11:
	    		return {...state, serviceTime: 11}
	    		break;
	    	case 12:
	    		return {...state, serviceTime: 12}
	    		break;
	    	case 13:
	    		return {...state, serviceTime: 13}
	    		break;
	    	case 14:
	    		return {...state, serviceTime: 14}
	    		break;
	    	case 15:
	    		return {...state, serviceTime: 15}
	    		break;
	    	case 16:
	    		return {...state, serviceTime: 16}
	    		break;
    	}
    default:
        return state;  
  };
}