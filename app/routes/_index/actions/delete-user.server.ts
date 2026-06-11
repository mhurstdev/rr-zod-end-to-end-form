import { data } from 'react-router';
import * as z from 'zod';
import { zfd } from 'zod-form-data';
import { userSchema } from '@/db/schema/user/schemas';
import { UserRepository } from '@/repositories/user.server';
import type { Route } from '../+types/route';

const deleteUserSchema = zfd.formData({
	id: userSchema.shape.id,
});

export async function deleteUserAction(
	_args: Route.ActionArgs,
	formData: FormData,
) {
	const result = deleteUserSchema.safeParse(formData);

	if (!result.success) {
		return data({ errors: z.flattenError(result.error) }, 400);
	}

	const userRepository = new UserRepository();

	const deletedUser = await userRepository.deleteUser(result.data.id);

	if (!deletedUser) return data({ error: 'User not found' }, 404);

	return data({ ok: true, deletedUser });
}
