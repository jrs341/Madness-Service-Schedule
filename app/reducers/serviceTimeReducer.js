export default function reducer(state={
  serviceTime: 1
}, action) {
	// return {...state, serviceTime: action.payload}
  switch (action.type) {
    case 'SERVICE_TIME':
    	switch (action.payload) {
    		case '9:00':
	    		return {...state, serviceTime: '9:00'}
	    		break;
	    	case '9:30':
	    		return {...state, serviceTime: '9:30'}
	    		break;
	    	case '10:00':
	    		return {...state, serviceTime: '10:00'}
	    		break;
	    	case '10:30':
	    		return {...state, serviceTime: '10:30'}
	    		break;
	    	case '11:00':
	    		return {...state, serviceTime: '11:00'}
	    		break;
	    	case '11:30':
	    		return {...state, serviceTime: '11:30'}
	    		break;
	    	case '12:00':
	    		return {...state, serviceTime: '12:00'}
	    		break;
	    	case '12:30':
	    		return {...state, serviceTime: '12:30'}
	    		break;
	    	case '1:00':
	    		return {...state, serviceTime: '1:00'}
	    		break;
	    	case '1:30':
	    		return {...state, serviceTime: '1:30'}
	    		break;
	    	case '2:00':
	    		return {...state, serviceTime: '2:00'}
	    		break;
	    	case '2:30':
	    		return {...state, serviceTime: '2:30'}
	    		break;
	    	case '3:00':
	    		return {...state, serviceTime: '3:00'}
	    		break;
	    	case '3:30':
	    		return {...state, serviceTime: '3:30'}
	    		break;
	    	case '4:00':
	    		return {...state, serviceTime: '4:00'}
	    		break;
	    	case '4:30':
	    		return {...state, serviceTime: '4:30'}
	    		break;
    	}
    default:
        return state;  
  };
}