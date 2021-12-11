import { Box } from '@chakra-ui/react';
import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';

export let loader: LoaderFunction = () => {
	return null;
};

export let meta: MetaFunction = () => {
	return {
		title: 'Remix Starter',
		description: 'Welcome to remix!',
	};
};

export default function Index() {
	return <Box color="white">hi</Box>;
}
