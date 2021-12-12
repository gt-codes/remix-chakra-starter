import {
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Stack,
	Text,
	Textarea,
	useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { ActionFunction, Form, LoaderFunction, redirect, useActionData, useLoaderData, useTransition } from 'remix';
import { createPost, getAllUsers } from '../../../lib';

interface Errors {
	title?: string;
	content?: string;
}

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData();
	const userId = parseInt(body.get('userId') as string);
	const title = body.get('title') as string;
	const content = body.get('content') as string;

	const errors: Errors = {};

	if (!title) errors.title = 'Title is required';
	if (!content) errors.content = 'Content is required';

	if (Object.keys(errors).length) return errors;
	await createPost({ title, body: content, userId });
	return redirect('/posts');
};

export const loader: LoaderFunction = async () => {
	const users = await getAllUsers();
	return users;
};

export default function Index() {
	const users = useLoaderData();
	const errors = useActionData<Errors>();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialFocus = useRef<HTMLSelectElement>(null);
	const finalFocus = useRef<HTMLButtonElement>(null);

	const { state } = useTransition();
	const loading = state === 'submitting';

	useEffect(() => {
		if (state === 'idle') isOpen && onClose();
	}, [state]);

	return (
		<Center flexDir='column' w='full'>
			<Text textAlign='center' fontWeight='bold' fontSize={32}>
				Hey there 👋
			</Text>
			<Text textAlign='center' fontSize={18} fontWeight='light'>
				Select a post on the left to view it or create one below!
			</Text>
			<Button mt={6} px={24} _hover={{}} ref={finalFocus} bg='primary.600' color='white' onClick={onOpen}>
				Create a post
			</Button>
			<Modal
				isOpen={isOpen}
				initialFocusRef={initialFocus}
				finalFocusRef={finalFocus}
				isCentered
				onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<Form action='.' method='post'>
						<ModalHeader>New Post</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Stack spacing={4}>
								<FormControl>
									<FormLabel>User</FormLabel>
									<Select ref={initialFocus} name='userId'>
										{users?.map((user: any) => (
											<option key={user.id} value={user.id}>
												{user.name}
											</option>
										))}
									</Select>
								</FormControl>
								<FormControl isInvalid={Boolean(errors?.title)}>
									<FormLabel>Title</FormLabel>
									<Input name='title' placeholder='Awesome note #1' />
									<FormErrorMessage>{errors?.title}</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={Boolean(errors?.content)}>
									<FormLabel>Content</FormLabel>
									<Textarea
										name='content'
										resize='none'
										placeholder='Blah blah awesome awesome blah blah'
									/>
									<FormErrorMessage>{errors?.content}</FormErrorMessage>
								</FormControl>
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Button type='button' colorScheme='gray' variant='ghost' mr={3} onClick={onClose}>
								Cancel
							</Button>
							<Button isLoading={loading} type='submit' colorScheme='blue'>
								Create
							</Button>
						</ModalFooter>
					</Form>
				</ModalContent>
			</Modal>
		</Center>
	);
}
