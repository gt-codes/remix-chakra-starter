import { HStack, Text } from '@chakra-ui/react';
import { NavLink } from 'remix';

export default function Header() {
	return (
		<HStack as='nav' w='full' alignItems='center' justifyContent='space-between' p={4} shadow='sm'>
			<Text bgGradient='linear(to-r, brand.primary, brand.accent)' bgClip='text' fontSize='xl' fontWeight='Bold'>
				Awesome Notes
			</Text>
			<HStack>
				<NavLink to='/' end prefetch='intent'>
					<Text py={1} px={3} rounded='md' _hover={{ bg: 'primary.50' }} color='primary.600'>
						Notes
					</Text>
				</NavLink>
				<NavLink to='/notes' prefetch='intent'>
					<Text py={1} px={3} rounded='md' _hover={{ bg: 'primary.50' }} color='primary.600'>
						Create
					</Text>
				</NavLink>
			</HStack>
		</HStack>
	);
}
