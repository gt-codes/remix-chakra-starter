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
	Stack,
	Text,
	Textarea,
	useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { ActionFunction, Form, redirect, useActionData } from 'remix';

interface Errors {
	title?: string;
	content?: string;
}

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData();
	const title = body.get('title');
	const content = body.get('content');

	const errors: Errors = {};

	if (!title) errors.title = 'Title is required';
	if (!content) errors.content = 'Content is required';

	console.log({ errors });

	if (Object.keys(errors).length) return errors;

	return redirect('/posts');
};

export default function Index() {
	const errors = useActionData<Errors>();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialFocus = useRef<HTMLInputElement>(null);
	const finalFocus = useRef<HTMLButtonElement>(null);

	return (
		<Center flexDir="column" w="full">
			<Text textAlign="center" fontWeight="bold" fontSize={32}>
				Hey there 👋
			</Text>
			<Text textAlign="center" fontSize={18} fontWeight="light">
				Select a post on the left to view it or create one below!
			</Text>
			<Button
				mt={6}
				px={24}
				_hover={{}}
				ref={finalFocus}
				bg="primary.600"
				color="white"
				onClick={onOpen}
			>
				Create a post
			</Button>
			<Modal
				isOpen={isOpen}
				initialFocusRef={initialFocus}
				finalFocusRef={finalFocus}
				isCentered
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<Form action="." method="post">
						<ModalHeader>New Post</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Stack spacing={4}>
								<FormControl id="first-name">
									<FormLabel>Title</FormLabel>
									<Input
										name="title"
										ref={initialFocus}
										placeholder="Awesome note #1"
									/>
									<FormErrorMessage>{errors?.title}</FormErrorMessage>
								</FormControl>
								<FormControl id="first-name">
									<FormLabel>Content</FormLabel>
									<Textarea
										name="content"
										resize="none"
										placeholder="Blah blah awesome awesome blah blah"
									/>
									<FormErrorMessage>{errors?.content}</FormErrorMessage>
								</FormControl>
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Button
								type="button"
								colorScheme="gray"
								variant="ghost"
								mr={3}
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button type="submit" colorScheme="blue">
								Create
							</Button>
						</ModalFooter>
					</Form>
				</ModalContent>
			</Modal>
		</Center>
	);
}
