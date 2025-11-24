function saveArticleHtmlUT() {
	saveArticleHtml((new Date).getTime().toString());
}
function saveArticleHtmlLT() {
	const nowDateObject=new Date();
	const nowYear=nowDateObject.getFullYear().toString();
	const nowMonth=("00"+((nowDateObject.getMonth()+1).toString())).substr(-2);
	const nowDate=("00"+(nowDateObject.getDate().toString())).substr(-2);
	const nowHour=("00"+(nowDateObject.getHours().toString())).substr(-2);
	const nowMin=("00"+(nowDateObject.getMinutes().toString())).substr(-2);
	const nowSec=("00"+(nowDateObject.getSeconds().toString())).substr(-2);
	saveArticleHtml(nowYear+"-"+nowMonth+"-"+nowDate+"_"+nowHour+"-"+nowMin+"-"+nowSec);
}
function saveArticleHtml(timestampString) {
	const textareaElement=document.getElementById('nicopedia-article-textarea');
	const textBody=(window.getComputedStyle(textareaElement).getPropertyValue('display')==="none")?(document.getElementById("nicopedia-article-textarea_ifr").contentWindow.document.getElementById('tinymce').innerHTML):(textareaElement.value);
	if(!textBody) {
		return;
	}
	const textBlob = new Blob([textBody], { type: 'text/plain' });
	const articleMatch=window.document.location.href.match(/dic\.nicovideo\.jp\/p\/([a-z]+)\/([^?\/]+)(\/\d+)?/);
	const articleType=articleMatch[1];
	let articleName=decodeURI(articleMatch[2]);
	const articleRevision=(!articleMatch[3])?"latest":articleMatch[3].substring(1); // リビジョン番号 URLにないなら最新(latest)のリビジョンとして扱う
	const replacePattern=[
		["\\", "￥"],
		["/", "／"],
		[":", "："],
		["*", "＊"],
		["?", "？"],
		["\"", "”"],
		["<", "＜"],
		[">", "＞"],
		["|", "｜"]
	];
	replacePattern.forEach(function(e){articleName=articleName.replaceAll(e[0],e[1]);});
	const fileName="nicopedia_"+articleType+"_"+articleName+"_"+articleRevision+"_"+timestampString+".txt";
	const a=document.createElement('a');
	a.href=URL.createObjectURL(textBlob);
	a.download=fileName;
	a.click();
};
if(!document.getElementById("HtmlSaverButton0C7B11996454445A9742919299339550")) {
	document.getElementById("nicopedia-article-textarea").insertAdjacentHTML('afterend','<div id="HtmlSaverButton0C7B11996454445A9742919299339550"><button type="button" onclick="saveArticleHtmlUT();">ファイルへ保存 (UnixTimeのファイル名)</button><button type="button" onclick="saveArticleHtmlLT();" >ファイルへ保存 (ローカル時刻のファイル名)</button><br>復元: <input type="file" id="FileLoadAE8C11EF10054AE39305E6A9FAC33466"></div>');
}
document.getElementById("FileLoadAE8C11EF10054AE39305E6A9FAC33466").addEventListener("change",function(evt){
	const textareaElement=document.getElementById('nicopedia-article-textarea');
	const fileToLoad=evt.target.files[0];
	if(window.confirm("ファイル「"+fileToLoad.name+"」をロードしますか？ (編集中の内容は破棄されます)")){
		const reader = new FileReader();
		reader.readAsText(fileToLoad);
		reader.onload = function(e){
			const isTinyMceEnabled=window.getComputedStyle(textareaElement).getPropertyValue('display')==="none";
			if(isTinyMceEnabled) {window.switchTinyMCE();} // HTMLエディタが有効なら無効に
			textareaElement.value=e.target.result;
			if(isTinyMceEnabled) {window.switchTinyMCE();} // 無効にしたHTMLエディタを有効に戻す
		}
	}
	evt.target.value="";
},false);
