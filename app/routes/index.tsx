import { Center, Text, Heading, Stack, Grid } from '@chakra-ui/react';
import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, Link } from 'remix';
import { getAllNotes } from '../../lib';
import { Note } from '../../types';

export const loader: LoaderFunction = async () => {
	const notes = await getAllNotes();
	return notes.slice(0, 100);
};

export const meta: MetaFunction = () => {
	return {
		title: 'Awesome Notes',
		description: 'A bunch of notes from awesome people!',
	};
};

export default function Index() {
	const data = useLoaderData<Note[]>();

	return (
		<Center w='full'>
			<Stack spacing={16} alignItems='center' w='5xl' p={12} h='full'>
				<Heading
					as='h1'
					bgGradient='linear(to-r, brand.primary, brand.accent)'
					bgClip='text'
					fontSize='3xl'
					fontWeight='Bold'>
					A Curated List of Awesome Notes
				</Heading>
				<Grid gap={3} templateColumns='repeat(3,1fr)' w='full' pb={8}>
					{data.map((el) => (
						<Link key={el.id} to={`/notes/${el.id}`}>
							<Text
								p={3}
								rounded='md'
								border='1px'
								borderColor='gray.200'
								transition='all .2s '
								_hover={{ shadow: 'md' }}>
								Issue #{el.id}
							</Text>
						</Link>
					))}
				</Grid>
			</Stack>
		</Center>
	);
}
