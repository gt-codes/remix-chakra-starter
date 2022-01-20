import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Stack,
	FormControl,
	FormLabel,
	Select,
	Input,
	FormErrorMessage,
	Textarea,
	ModalFooter,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router';
import { ActionFunction, Form, Link, redirect, useActionData, useNavigate, useTransition } from 'remix';
import { createNote } from '~/lib';

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
	await createNote({ title, body: content, userId });
	return redirect('/notes');
};

export default function create() {
	const [isOpen, setIsOpen] = useState(true);
	const { onClose } = useDisclosure();
	const initialFocus = useRef<HTMLSelectElement>(null);
	const navigate = useNavigate();

	const errors = useActionData<Errors>();
	const users = useOutletContext();
	const { state } = useTransition();

	const loading = state === 'submitting';

	useEffect(() => {
		if (state === 'idle' && !errors) isOpen && onClose();
	}, [state]);

	const handleClose = () => {
		setIsOpen(false);
		navigate('..');
	};

	return (
		<Modal isOpen={isOpen} initialFocusRef={initialFocus} isCentered onClose={onClose} closeOnOverlayClick={false}>
			<ModalOverlay />
			<ModalContent>
				<Form action='.' method='post'>
					<ModalHeader>New Note</ModalHeader>
					<Link to='..'>
						<ModalCloseButton onClick={handleClose} />
					</Link>
					<ModalBody>
						<Stack spacing={4}>
							<FormControl>
								<FormLabel>User</FormLabel>
								<Select ref={initialFocus} name='userId'>
									{(users as any[])?.map((user: any) => (
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
	);
}
