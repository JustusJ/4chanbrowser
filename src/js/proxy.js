import $ from 'jquery';

window.$ = $;

const proxyUrl = "http://104.236.195.107/proxy.php";

function getProxy(url) {
	var result = $.get(proxyUrl, {url: url, secret: 'sgadfiuzasdfgiuasfgsdaukfksagfhjhsd'})
	console.log(result)
  return result;
}

export default getProxy;
