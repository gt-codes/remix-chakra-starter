import { HStack, Text } from '@chakra-ui/react';
import { NavLink } from 'remix';

export default function Header() {
	return (
		<HStack
			as="nav"
			w="full"
			alignItems="center"
			justifyContent="space-between"
			p={4}
			shadow="sm"
		>
			<Text
				bgGradient="linear(to-r, brand.primary, brand.accent)"
				bgClip="text"
				fontSize="xl"
				fontWeight="Bold"
			>
				Awesome Blog
			</Text>
			<HStack>
				<NavLink to="/" end prefetch="intent">
					<Text
						py={1}
						px={3}
						rounded="md"
						_hover={{ bg: '#eee' }}
						fontWeight="light"
						color="brand.text"
					>
						Blogs
					</Text>
				</NavLink>
			</HStack>
		</HStack>
	);
}
