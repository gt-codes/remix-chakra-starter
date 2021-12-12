import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
	colors: {
		background: {
			main: '#fafafa',
			darker: '#f5f5f5',
			darkest: '#e0e0e0',
		},
		primary: {
			50: '#ede7f6',
			600: '#5b37b3',
		},
		brand: {
			primary: '#0070f3',
			accent: '#5E35B1',
			text: '#222',
		},
	},
});
