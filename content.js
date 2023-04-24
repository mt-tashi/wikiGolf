const word1 = 'JavaScript';
const word2 = 'マカロン';
const url = `https://ja.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${word1}%20${word2}&utf8=1`;
// 幅優先探索でリンクをたどる
fetch(url, { mode: 'cors', headers: { 'Origin': 'https://ja.wikipedia.org' } })
	.then(response => response.json())
	.then(data => {
		const searchResults = data.query.search;
		let totalLinks = 0;
		searchResults.forEach(result => {
			const pageId = result.pageid;
			const pageTitle = result.title;
			const pageUrl = `https://ja.wikipedia.org/w/api.php?action=query&format=json&prop=links&pageids=${pageId}&plnamespace=0&pllimit=max`;
			fetch(pageUrl)
				.then(response => response.json())
				.then(data => {
					console.log(data);
					const links = data.query.pages[pageId].links;
					links.forEach(link => {
						if (link.title.includes(word1) || link.title.includes(word2)) {
							totalLinks++;
						}
					});
				})
				.catch(error => console.error(error));
		});
		setTimeout(() => {
			alert(`The number of links between '${word1}' and '${word2}' is ${totalLinks}`);
		}, 3000); // APIリクエストが完了するまで3秒待機する
	})
	.catch(error => console.error(error),
	);
