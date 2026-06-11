import { data } from 'react-router';
import * as z from 'zod';
import { zfd } from 'zod-form-data';
import { EmailAddressAlreadyRegistered } from '@/db/errors/constraints';
import { createUserSchema } from '@/db/schema/user/schemas';
import { UserRepository } from '@/repositories/user.server';
import type { Route } from '../+types/route';

const createUserFormSchema = zfd.formData(createUserSchema);

export async function createUserAction(
	_args: Route.ActionArgs,
	formData: FormData,
) {
	const result = createUserFormSchema.safeParse(formData);

	if (!result.success) {
		return data({ errors: z.flattenError(result.error) }, 400);
	}

	const userRepository = new UserRepository();

	try {
		const createdUser = await userRepository.createUser(result.data);

		return data({ ok: true, createdUser }, 201);
	} catch (error) {
		if (error instanceof EmailAddressAlreadyRegistered) {
			return data(
				{
					errors: {
						formErrors: [],
						fieldErrors: {
							emailAddress: [error.message],
							name: [],
						},
					},
				},
				409,
			);
		}
		throw error;
	}
}
