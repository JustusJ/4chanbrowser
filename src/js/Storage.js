function set(key, value) {
	localStorage[key] = JSON.stringify(value);
}

function get(key) {
	return localStorage[key] && JSON.parse(localStorage[key]);
}
/*
function cleanThreads(board, threads) {
	var hiddenThreads = getHiddenThreads(board);
	Object.keys(hiddenThreads).forEach((hiddenThreadNo) => {
		let dead = !threads.find((thread) => thread.no.toString() === hiddenThreadNo);
		if(dead) {
			delete hiddenThreads[hiddenThreadNo];
		}
	});
}
*/
export default {
	set: set,
	get: get
};
