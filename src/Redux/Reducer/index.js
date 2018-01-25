const reducer = (state='aaa',action)=>{
	let {type,payload} = action;
	switch(type){
		case "CHANGE_TITLE":
			return payload
		default:
			return state;
	}
}
const reducer2=(state='',action)=>{
	let {type,payload} = action;
	switch(type){
		case "CHANGE_VALUE":
			return payload
		default:
			return state;
	}
}

export  { reducer,reducer2}