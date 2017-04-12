export default function reducer(state={
  scheduledBy: 1
}, action) {
  switch (action.type) {
    case 'SCHEDULED_BY':
    	switch (action.payload) {
    		case 1:
	    		return {...state, scheduledBy: 1}
	    		break;
	    	case 2:
	    		return {...state, scheduledBy: 2}
	    		break;
	    	case 3:
	    		return {...state, scheduledBy: 3}
	    		break;
	    	case 4:
	    		return {...state, scheduledBy: 4}
	    		break;
	    	case 5:
	    		return {...state, scheduledBy: 5}
	    		break;
	    	case 6:
	    		return {...state, scheduledBy: 6}
	    		break;
	    	case 7:
	    		return {...state, scheduledBy: 7}
	    		break;
	    	case 8:
	    		return {...state, scheduledBy: 8}
	    		break;
	    	case 9:
	    		return {...state, scheduledBy: 9}
	    		break;
	    	case 10:
	    		return {...state, scheduledBy: 10}
	    		break;
	    	case 11:
	    		return {...state, scheduledBy: 11}
	    		break;
	    	case 12:
	    		return {...state, scheduledBy: 12}
	    		break;
	    	case 13:
	    		return {...state, scheduledBy: 13}
	    		break;
	    	case 14:
	    		return {...state, scheduledBy: 14}
	    		break;
	    	case 15:
	    		return {...state, scheduledBy: 15}
	    		break;
	    	case 16:
	    		return {...state, scheduledBy: 16}
	    		break;
    	}
    default:
        return state;  
  };
}