import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from 'remix';
import { Center, Text, ChakraProvider } from '@chakra-ui/react';
import { theme } from '~/theme';
import Layout from '~/components/Layout';
import ServerStyleContext from "~/context.server";
import ClientStyleContext from "~/context.client";
import { withEmotionCache } from "@emotion/react";
import { ReactNode, useContext, useEffect } from 'react';

export default function App() {
	return (
		<Document>
			<Layout>
				<Outlet />
			</Layout>
		</Document>
	);
}

export function ErrorBoundary({ error }: { error: Error }) {
	console.error(error);
	return (
		<Document title='Error!'>
			<Layout>
				<div>
					<h1>There was an error</h1>
					<p>{error.message}</p>
					<hr />
					<p>Hey, developer, you should replace this with what you want your users to see.</p>
				</div>
			</Layout>
		</Document>
	);
}

export function CatchBoundary() {
	let caught = useCatch();

	return (
		<Document title={`${caught.status} ${caught.statusText}`}>
				<Layout>
					<Center h='full' w='full'>
					<Text
						bgGradient='linear(to-r, brand.primary, brand.accent)'
						bgClip='text'
						fontSize='6xl'
						fontWeight='Bold'
					>
						Page Not Found
					</Text>
					</Center>
				</Layout>
		</Document>
	);
}

interface DocumentProps {
	children: ReactNode;
	title?: string;
}

const Document = withEmotionCache(
	({ children, title }: DocumentProps, emotionCache) => {
		const serverSyleData = useContext(ServerStyleContext);
	  	const clientStyleData = useContext(ClientStyleContext);
  
		// Only executed on client
		useEffect(() => {
			// re-link sheet container
			emotionCache.sheet.container = document.head;
			// re-inject tags
			const tags = emotionCache.sheet.tags;
			emotionCache.sheet.flush();
			tags.forEach((tag) => {
			(emotionCache.sheet as any)._insertTag(tag);
			});
			// reset cache to reapply global styles
			clientStyleData.reset();
		}, [])
	
		return (
			<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				{title ? <title>{title}</title> : null}
				<Meta />
				<Links />
				{serverSyleData?.map(({ key, ids, css }) => (
				<style
					key={key}
					data-emotion={`${key} ${ids.join(" ")}`}
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: css }}
				/>
				))}
			</head>
			<body>
				<ChakraProvider theme={theme}>
				{children}
				</ChakraProvider>
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
			</html>
		);
	}
)
