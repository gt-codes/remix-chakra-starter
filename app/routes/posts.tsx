import { HStack, Stack, Box, Flex } from '@chakra-ui/react';
import {
	LoaderFunction,
	Outlet,
	Link,
	useLoaderData,
	useLocation,
} from 'remix';
import { getAllPosts } from '../../lib';
import { Post } from '../../types';

export const loader: LoaderFunction = async () => {
	const posts = await getAllPosts();
	return posts.slice(0, 100);
};

export default function Posts() {
	const data = useLoaderData<Post[]>();
	const { pathname } = useLocation();

	return (
		<HStack spacing={0} w="full">
			<Stack
				w="200px"
				bg="background.darker"
				h="full"
				overflowY="auto"
				py={3}
				pl={3}
				pr={4}
			>
				{data.map((post) => {
					const active = pathname.endsWith(`/${post.id.toString()}`);
					return (
						<Link key={post.id} to={`/posts/${post.id}`} prefetch="intent">
							<Box
								w="full"
								py={1}
								px={3}
								rounded="md"
								cursor="pointer"
								bg={active ? 'primary.600' : 'transparent'}
								color={active ? 'white' : 'black'}
								_hover={{ bg: active ? '' : 'background.darkest' }}
							>
								Issue #{post.id}
							</Box>
						</Link>
					);
				})}
			</Stack>
			<Flex p={24} h="full" w="full">
				<Outlet />
			</Flex>
		</HStack>
	);
}
