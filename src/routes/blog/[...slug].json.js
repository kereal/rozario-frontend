import posts from './_posts.js';

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const params = req.params;
	const group = params.slug[0];
	const slug = params.slug[1];

	try {
		const post = posts[0][group].find(post => post.slug === slug);
		if (!post) {
			throw new Error('404');
		}
/*		res.writeHead(200, {
			'Content-Type': 'application/json'
		});*/

		res.end(JSON.stringify(post));
	} catch(e) {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
