import { Center, Text, Box, Heading, Flex, Stack } from '@chakra-ui/react';
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
	return (
		<Center w="full">
			<Stack spacing={16} alignItems="center" w="5xl" p={12} h="full">
				<Heading
					as="h1"
					bgGradient="linear(to-r, brand.primary, brand.accent)"
					bgClip="text"
					fontSize="3xl"
					fontWeight="Bold"
				>
					Welcome to my Awesome Blog
				</Heading>
				<Box>hi</Box>
			</Stack>
		</Center>
	);
}
