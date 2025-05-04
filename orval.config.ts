export default {
	authService: {
		input: {target: 'swagger/auth.json'},
		output: {
			target: './api/auth/auth.ts',
			mode: 'split',
			client: 'axios',
			baseUrl: 'http://217.114.11.158:8081',
		},
	},

	userService: {
		input: {target: 'swagger/users.json'},
		output: {
			target: './api/users/users.ts',
			mode: 'split',
			client: 'axios',
			baseUrl: 'http://217.114.11.158:8080',
		},
	},
};
