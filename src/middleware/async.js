export default function({ dispatch }) {
	return next => action => {
		//If action does not have a payload or payload does not have .then property we don't care about it... Send it on
		if(!action.payload || !action.payload.then){
			return next(action);
		}

		//Make sure actions promise resolves
		action.payload
			.then(function(response) {
				// Create a new action with old type + replacing payload with response data
				const newAction = {...action, payload: response }
				dispatch(newAction);
			});
	};
}
