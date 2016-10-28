import axios from 'jquery';
import querystring from 'querystring';

const proxyUrl = "https://roflzomfg.de/proxy.php?";

function getProxy(url) {
	var requestUrl = proxyUrl + querystring.stringify({url: url, secret: 'sgadfiuzasdfgiuasfgsdaukfksagfhjhsd'});
  return axios.get(requestUrl);
}

export default getProxy;
