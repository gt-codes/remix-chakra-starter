import { Box } from '@chakra-ui/react';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Box bg="brand.primary" w="100vw" h="100vh">
			{children}
		</Box>
	);
}
