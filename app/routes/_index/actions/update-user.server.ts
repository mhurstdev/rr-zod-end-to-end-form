import { data } from 'react-router';
import * as z from 'zod';
import { zfd } from 'zod-form-data';
import { EmailAddressAlreadyRegistered } from '@/db/errors/constraints';
import { updateUserSchema, userSchema } from '@/db/schema/user/schemas';
import { makeErrorFactory } from '@/helpers/make-error-factory';
import { UserRepository } from '@/repositories/user.server';
import type { Route } from '../+types/route';

const updateUserFormSchema = zfd.formData({
	id: userSchema.shape.id,
	...updateUserSchema.shape,
});

const updateUserErrorFactory =
	makeErrorFactory<z.infer<typeof updateUserFormSchema>>();

export async function updateUserAction(
	_args: Route.ActionArgs,
	formData: FormData,
) {
	const result = updateUserFormSchema.safeParse(formData);

	if (!result.success) {
		return data({ errors: z.flattenError(result.error) }, 400);
	}

	const userRepository = new UserRepository();

	const { id, ...values } = result.data;

	try {
		const updatedUser = await userRepository.updateUser(id, values);

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
