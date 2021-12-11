import { Stack, Flex } from '@chakra-ui/react';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Stack spacing={0} bg="brand.bg" w="100vw" h="100vh">
			<Header />
			<Flex flexGrow={1}>{children}</Flex>
		</Stack>
	);
}
