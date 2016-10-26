import $ from 'jquery';

window.$ = $;

const proxyUrl = "https://roflzomfg.de/proxy.php";

function getProxy(url) {
	var result = $.get(proxyUrl, {url: url, secret: 'sgadfiuzasdfgiuasfgsdaukfksagfhjhsd'})
  return result;
}

export default getProxy;
