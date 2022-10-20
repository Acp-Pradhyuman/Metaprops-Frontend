import { Helmet } from 'react-helmet';

function MetaData({ title, desc, url, image }) {
	return (
		<Helmet>
			<meta name='description' content={desc} />
			<meta name='theme-color' content='#008f68' />
			<meta property='og:title' content={title} />
			<meta property='og:url' content={url} />
			<meta property='og:image' content={image} />
			<meta property='og:description' content={desc} />
		</Helmet>
	);
}

export default MetaData;
