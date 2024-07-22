import { registerAs } from '@nestjs/config';

export default registerAs(
	'email',
	(): Record<string, string | number> => ({
		name: process.env.MAILER_EMAIL,
		pass: process.env.MAILER_PASSWORD,
	}),
);
