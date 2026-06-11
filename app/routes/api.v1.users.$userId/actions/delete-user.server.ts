import { data } from 'react-router';
import { UserRepository } from '@/repositories/user.server';
import type { Route } from '../+types/route';

export async function deleteUserAction({ params }: Route.ActionArgs) {
	const { userId } = params;

	const userRepository = new UserRepository();

	const deletedUser = await userRepository.deleteUser(userId);

	if (!deletedUser) return data({ error: 'User not found' }, 404);

	return data({ ok: true, deletedUser });
}
