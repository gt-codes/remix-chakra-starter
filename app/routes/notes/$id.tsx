import { Box, Heading, HStack, IconButton, Stack, Text } from '@chakra-ui/react';
import { LoaderFunction, useLoaderData } from 'remix';
import { getNote } from '~/lib';
import { Note } from '~/types';
import { MdOutlineEmail, MdPhone, MdLink } from 'react-icons/md';

export const loader: LoaderFunction = async ({ params }) => {
	const note = await getNote(params.id as string);
	return note;
};

export default function Note() {
	const data = useLoaderData<Note>();

	return (
		<Box maxW='3xl'>
			<Text fontSize={14} color='brand.text' fontWeight='light' mb={2}>
				Issue #{data.id} by {data.user?.name}
			</Text>
			<Heading as='h2' fontSize={24}>
				{data.title}
			</Heading>
			<Text color='brand.text' fontWeight='light' mt={6}>
				{data.body}
			</Text>

			<Text mt={24} mb={4} fontSize={14} color='brand.text' fontWeight='medium'>
				Contact the author
			</Text>
			<Stack spacing={1}>
				<HStack alignItems='center' fontSize={18}>
					<IconButton
						variant='ghost'
						aria-label='email'
						color='primary.600'
						_hover={{ bg: 'primary.50' }}
						icon={<MdOutlineEmail />}
					/>
					<Text color='brand.text' fontSize={14}>
						{data.user?.email}
					</Text>
				</HStack>
				<HStack alignItems='center' fontSize={18}>
					<IconButton
						variant='ghost'
						aria-label='phone number'
						color='primary.600'
						_hover={{ bg: 'primary.50' }}
						icon={<MdPhone />}
					/>
					<Text color='brand.text' fontSize={14}>
						{data.user?.phone}
					</Text>
				</HStack>
				<HStack alignItems='center' fontSize={18}>
					<IconButton
						variant='ghost'
						aria-label='website'
						color='primary.600'
						_hover={{ bg: 'primary.50' }}
						icon={<MdLink />}
					/>
					<Text color='brand.text' fontSize={14}>
						{data.user?.website}
					</Text>
				</HStack>
			</Stack>
		</Box>
	);
}
