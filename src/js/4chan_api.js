import getProxy from './proxy';

const boards = ["b", "s", "hr", "hc", "gif"];

const catalogBaseUrl = "https://a.4cdn.org/$BOARD$/catalog.json";
const imageBaseUrl = "//i.4cdn.org/$BOARD$/$FILENAME$";
const threadBaseUrl = "https://boards.4chan.org/b/thread/$NO$"

function getCatalog(board) {
	return getProxy(catalogBaseUrl.replace("$BOARD$", board)).then(flattenCatalog).done((threads) => enrichCatalog(board, threads));
}

function flattenCatalog(result) {
	return result.reduce((acc, page) => acc.concat(page.threads), []);
}

function enrichCatalog(board, threads) {
	const boardImageBaseUrl = imageBaseUrl.replace("$BOARD$", board);
	threads.forEach((thread) => {
		thread.previewThumbUrl = boardImageBaseUrl.replace("$FILENAME$", thread.tim + "s.jpg");
		thread.previewImageUrl = boardImageBaseUrl.replace("$FILENAME$", thread.tim + thread.ext);
		thread.url = threadBaseUrl.replace("$NO$", thread.no);
	});
}

export default {
	"boards": boards,
	"getCatalog": getCatalog
}
