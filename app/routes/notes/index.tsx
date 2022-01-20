import { Button, Center, Text } from '@chakra-ui/react';
import { Link, LoaderFunction, Outlet, useLoaderData } from 'remix';
import { getAllUsers } from '~/lib';

export const loader: LoaderFunction = async () => {
	const users = await getAllUsers();
	return users;
};

export default function Index() {
	const users = useLoaderData();

	return (
		<Center flexDir='column' w='full'>
			<Text textAlign='center' fontWeight='bold' fontSize={32}>
				Hey there 👋
			</Text>
			<Text textAlign='center' fontSize={18} fontWeight='light'>
				Select a note on the left to view it or create one below!
			</Text>
			<Link to='/notes/create/' prefetch='intent'>
				<Button mt={6} px={24} _hover={{}} bg='primary.600' color='white'>
					Create a note
				</Button>
			</Link>
			<Outlet context={users} />
		</Center>
	);
}
