function saveArticleHtmlUT() {
	var nowDateObject=new Date();
	saveArticleHtml(nowDateObject.getTime().toString());
}
function saveArticleHtmlLT() {
	var nowDateObject=new Date();
	var nowYear=nowDateObject.getFullYear().toString();
	var nowMonth=("00"+((nowDateObject.getMonth()+1).toString())).substr(-2);
	var nowDate=("00"+(nowDateObject.getDate().toString())).substr(-2);
	var nowHour=("00"+(nowDateObject.getHours().toString())).substr(-2);
	var nowMin=("00"+(nowDateObject.getMinutes().toString())).substr(-2);
	var nowSec=("00"+(nowDateObject.getSeconds().toString())).substr(-2);
	var tsString=nowYear+"-"+nowMonth+"-"+nowDate+"_"+nowHour+"-"+nowMin+"-"+nowSec;
	saveArticleHtml(tsString);
}
function saveArticleHtml(timestampString) {
	var textareaElement=document.getElementById('nicopedia-article-textarea');
	var textareaStyle=window.getComputedStyle(textareaElement);
	var textBody=(textareaStyle.getPropertyValue('display')==="none")?(document.getElementById("nicopedia-article-textarea_ifr").contentWindow.document.getElementById('tinymce').innerHTML):(textareaElement.value);
	if(!textBody) {
		return;
	}
	const textBlob = new Blob([textBody], { type: 'text/plain' });
	var articleMatch=window.document.location.href.match(/dic\.nicovideo\.jp\/p\/([a-z]+)\/([^?]+)/);
	var articleType=articleMatch[1];
	var articleName=decodeURI(articleMatch[2]);
	var replaceFrom=["\\","/",":","*","?","\"","<",">","|"];
	var replaceTo=["￥","／","：","＊","？","”","＜","＞","｜"];
	for(var i=0, len=replaceFrom.length; i<len; i++) { 
		articleName=articleName.replaceAll(replaceFrom[i],replaceTo[i]);
	}
	var fileName="nicopedia_"+articleType+"_"+articleName+"_"+timestampString+".txt";
	const a=document.createElement('a');
	a.href=URL.createObjectURL(textBlob);
	a.download=fileName;
	a.click();
};
if(!document.getElementById("HtmlSaverButton0C7B11996454445A9742919299339550")) {
	document.getElementById("nicopedia-article-textarea").insertAdjacentHTML('afterend','<div id="HtmlSaverButton0C7B11996454445A9742919299339550"><button type="button" onclick="saveArticleHtmlUT();">ファイルへ保存 (UnixTimeのファイル名)</button><button type="button" onclick="saveArticleHtmlLT();" >ファイルへ保存 (ローカル時刻のファイル名)</button><br>復元: <input type="file" id="FileLoadAE8C11EF10054AE39305E6A9FAC33466"></div>');
}
document.getElementById("FileLoadAE8C11EF10054AE39305E6A9FAC33466").addEventListener("change",function(evt){
	var textareaElement=document.getElementById('nicopedia-article-textarea');
	if(window.getComputedStyle(textareaElement).getPropertyValue('display')!=="none") {
		var fileToLoad=evt.target.files[0];
		if(window.confirm("ファイル「"+fileToLoad.name+"」をロードしますか？ (編集中の内容は破棄されます)")){
			var reader = new FileReader();
			reader.readAsText(fileToLoad);
			reader.onload = function(e){
				textareaElement.value=reader.result;
			}
		}
	} else {
		window.alert('この機能はHTMLエディタを無効にしたうえで使う必要があります。');
	}
	evt.target.value="";
},false);
