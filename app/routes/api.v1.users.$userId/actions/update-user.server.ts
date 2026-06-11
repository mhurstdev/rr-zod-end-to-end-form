import { data } from 'react-router';
import * as z from 'zod';
import { zfd } from 'zod-form-data';
import { EmailAddressAlreadyRegistered } from '@/db/errors/constraints';
import { updateUserSchema } from '@/db/schema/user/schemas';
import { makeErrorFactory } from '@/helpers/make-error-factory';
import { UserRepository } from '@/repositories/user.server';
import type { Route } from '../+types/route';

const updateUserFormSchema = zfd.formData({
	...updateUserSchema.shape,
});

const updateUserErrorFactory =
	makeErrorFactory<z.infer<typeof updateUserFormSchema>>();

export async function updateUserAction(
	{ params }: Route.ActionArgs,
	formData: FormData,
) {
	const { userId } = params;

	const result = updateUserFormSchema.safeParse(formData);

	if (!result.success) {
		return data({ errors: z.flattenError(result.error) }, 400);
	}

	const userRepository = new UserRepository();

	try {
		// prettier-ignore
		const updatedUser = await userRepository.updateUser(userId, result.data);

		if (!updatedUser) return data({ error: 'User not found' }, 404);

		return data({ ok: true, updatedUser });
	} catch (error) {
		if (error instanceof EmailAddressAlreadyRegistered) {
			return data(
				updateUserErrorFactory.fieldError(
					'emailAddress',
					error.message,
				),
				409,
			);
		}
		throw error;
	}
}
