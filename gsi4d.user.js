// ==UserScript==
// @name		GSI4D - Google search improve for developers
// @description	Google search improve for developers.
// @version		0.4.1
// @include		/^https://www\.google\.co(m|\.jp)/search.+$/
// @author		yanorei32
// @supportURL	https://github.com/Yanorei32/GSI4D/issues
// @website		http://yano.teamfruit.net/~rei/
// @namespace	http://yano.teamfruit.net/~rei/
// @updateURL	https://raw.githubusercontent.com/Yanorei32/GSI4D/master/gsi4d.user.js
// @license		MIT License
// @grant		none
// ==/UserScript==

(function() {
	'use strict';

	const REFERENCE_LIST = [
		// Mozilla
		'developer.mozilla.org',

		// Microsoft
		'msdn.microsoft.com',
		'docs.microsoft.com',

		// Google
		'cloud.google.com',
		'developers.google.com',

		// RedHat
		'access.redhat.com/documentation',

		// Docker
		'hub.docker.com',

		// GitHub
		'github.com',

		// Golang
		'golang.org',
		'godoc.org',

		// Ruby
		'ruby-lang.org',
		'ruby-doc.org',

		// Ruby - Ruby on Rails
		'railsdoc.com',

		// Ruby - gem
		'rubygems.org',

		// Python - requests
		'requests-docs-ja.readthedocs.io',
		'python-requests.org',
	];

	const RECOM_LIST = [
		// Web系を調べていると行き着く。
		'tohoho-web.com',

		// VBやC#を調べていると行き着く。
		'dobon.net',

		// Python周りを調べると行き着く。
		'note.nkmk.me',
		
		// Win2Kを調べると行き着く。
		'blog.livedoor.jp/blackwingcat',
	];

	const RECOM_FORUM = [
		// FORUM
		'stackexchange.com',
		'stackoverflow.com',
		'superuser.com',
		'teratail.com',
		'askubuntu.com',
	];

	// 任意のユーザーが使えるサービス。比較的良質な物が多い。
	const PUBLIC_SERVICE = [
		'qiita.com',
	];

	const BLACK_LIST = [
		// ADBlockerが有効だとコンテンツを見せない
		'server-setting.info',

		// 侍エンジニア。画像が多くて嫌い。
		'sejuku.net',

		// 画像が多くて嫌い。
		'techacademy.jp',
		'programming-study.com',

		// Google翻訳されたかのような謎文章のサイト。
		'code.i-harness.com',

		// StackExchange等からコピーしGoogle翻訳にかけたサイト。
		'stackovernet.com',
		'stackoverrun.com',

		// AdSite
		'solvusoft.com',
		'reviversoft.com',
		'dll-files.com',
		'softonic.com',
		'softonic.jp',
		'systweak.com',
		'chip.de',
		'qpdownload.com',
		'jaleco.com',
		'findmysoft.com',
	];

	const changeColor = (link, log, isPC) => {
		const targetElem = isPC ? 
			link.parentElement.parentElement.parentElement.parentElement.parentElement :
			link.parentElement.parentElement.parentElement.parentElement;

		for(const siteDomain of RECOM_LIST)
			if(link.textContent.indexOf(siteDomain) !== -1) {
				targetElem.style.backgroundColor = '#eff';
				log.trackedCount++;
				return;
			}

		for(const siteDomain of REFERENCE_LIST)
			if(link.textContent.indexOf(siteDomain) !== -1){
				targetElem.style.backgroundColor = '#efe';
				log.trackedCount++;
				return;
			}

		for(const siteDomain of PUBLIC_SERVICE)
			if(link.textContent.indexOf(siteDomain) !== -1){
				targetElem.style.backgroundColor = '#ffe';
				log.trackedCount++;
				return;
			}

		for(const siteDomain of RECOM_FORUM)
			if(link.textContent.indexOf(siteDomain) !== -1){
				targetElem.style.backgroundColor = '#eee';
				log.trackedCount++;
				return;
			}

		for(const siteDomain of BLACK_LIST)
			if(link.textContent.indexOf(siteDomain) !== -1){
				targetElem.style.display = 'none';
				log.blockedCount++;
				return;
			}
	};

	const log = {
		blockedCount: 0,
		trackedCount: 0,
	};

	const resultStatsElem = document.getElementById('resultStats');
	const isPC = resultStatsElem != null;

	for(const link of document.getElementsByClassName(isPC ? 'TbwUpd' : 'UPmit'))
		changeColor(link, log, isPC);

	if(isPC)
		resultStatsElem.textContent += 
			`GSI4D: Blocked: ${log.blockedCount} Tracked: ${log.trackedCount}`;

})();

