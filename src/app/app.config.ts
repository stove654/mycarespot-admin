export const Config = {
	url: 'http://52.224.110.147:8080', //52.224.110.147
	api: {
		user: '/api/users/',
		auth: '/auth/phone/',
		login: '/auth/local/',
		verifyEmail: '/auth/verify-email/',
		requestCode: '/auth/request-sms/',
		country: '/api/country/',
		resetPassword: '/auth/reset-password/',
		verifyResetPassword: '/auth/verify-reset-password/'
	},

	// production
	// url: 'http://52.224.110.147:8080', //52.224.110.147
	// siteKeyCapchar: '6LcoxlYUAAAAAIGVM-mVFN1OhDhmXV8ZQHchtol_'

	// develop
	// url: 'http://localhost:8080',
	siteKeyCapchar: '6Ld4tlEUAAAAADgeLMCB55Olgp-bE9cH9bokJOPa'
};
