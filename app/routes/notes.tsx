import { HStack, Stack, Box, Flex } from '@chakra-ui/react';
import { LoaderFunction, Outlet, Link, useLoaderData, useLocation } from 'remix';
import { getAllNotes } from '~/lib';
import { Note } from '~/types';

export const loader: LoaderFunction = async () => {
	const notes = await getAllNotes();
	return notes.slice(0, 100);
};

export default function Notes() {
	const data = useLoaderData<Note[]>();
	const { pathname } = useLocation();

	return (
		<HStack spacing={0} w='full'>
			<Stack w='200px' bg='background.darker' h='full' overflowY='auto' py={3} pl={3} pr={4}>
				{data.map((note) => {
					const active = pathname.endsWith(`/${note.id.toString()}`);
					return (
						<Link key={note.id} to={`/notes/${note.id}`} prefetch='intent'>
							<Box
								w='full'
								py={1}
								px={3}
								rounded='md'
								cursor='pointer'
								bg={active ? 'primary.600' : 'transparent'}
								color={active ? 'white' : 'black'}
								_hover={{ bg: active ? '' : 'background.darkest' }}>
								Issue #{note.id}
							</Box>
						</Link>
					);
				})}
			</Stack>
			<Flex p={24} h='full' w='full'>
				<Outlet />
			</Flex>
		</HStack>
	);
}
