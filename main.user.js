// ==UserScript==
// @name         ニコニコ大百科 編集中の記事をファイルへ保存
// @namespace    https://grj1234.web.fc2.com/
// @description  ニコニコ大百科の記事編集ページに「ファイルへ保存」ボタンを追加します。このユーザースクリプトはぎみっくさん(Twitter @gimmickgang)のアイデアをもとに作成しました。この場を借りて御礼申し上げます。
// @version      1.0
// @match        *://dic.nicovideo.jp/p/a/*
// @match        *://dic.nicovideo.jp/p/c/*
// @match        *://dic.nicovideo.jp/p/i/*
// @match        *://dic.nicovideo.jp/p/l/*
// @match        *://dic.nicovideo.jp/p/u/*
// @match        *://dic.nicovideo.jp/p/v/*
// @grant        none
// ==/UserScript==

(function(){
	if(!document.getElementById("HtmlSaverScript88A042C75A9B4ED99FFDFFD32ED33C38")) {
		const p='https://cdn.jsdelivr.net/gh/grj1234/nicopedia-editing-article-saver@master/saver.min.js'; // ここにsaver.jsへのURLを指定。
		var a=document.createElement('script');
		a.setAttribute('type','text/javascript');
		a.setAttribute('src',p+'?'+parseInt(Date.parse(new Date())/600000));
		a.setAttribute('id','HtmlSaverScript88A042C75A9B4ED99FFDFFD32ED33C38');
		document.head.appendChild(a);
	}
})();
