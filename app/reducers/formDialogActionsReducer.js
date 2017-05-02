export default function reducer(state={
  form_dialog_state: false
}, action) {
  switch (action.type) {
    case 'DIALOG_STATE':
            if (action.payload) {
              return {...state, form_dialog_state: true  
              } 
            } else {
              return {...state, form_dialog_state: false}
            }
    default:
        return state;  
  };
}