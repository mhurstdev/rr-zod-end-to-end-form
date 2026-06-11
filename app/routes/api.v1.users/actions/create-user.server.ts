import { data } from 'react-router';
import * as z from 'zod';
import { zfd } from 'zod-form-data';
import { EmailAddressAlreadyRegistered } from '@/db/errors/constraints';
import { createUserSchema } from '@/db/schema/user/schemas';
import { makeErrorFactory } from '@/helpers/make-error-factory';
import { UserRepository } from '@/repositories/user.server';
import type { Route } from '../+types/route';

const createUserFormSchema = zfd.formData(createUserSchema);

const createUserErrorFactory =
	makeErrorFactory<z.infer<typeof createUserFormSchema>>();

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
				createUserErrorFactory.fieldError(
					'emailAddress',
					error.message,
				),
				409,
			);
		}
		throw error;
	}
}
