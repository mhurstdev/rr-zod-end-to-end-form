import { data } from 'react-router';
import * as z from 'zod';
import { zfd } from 'zod-form-data';
import { UserRepository } from '@/repositories/user.server';
import { createUserAction } from './actions/create-user.server';
import { deleteUserAction } from './actions/delete-user.server';
import { updateUserAction } from './actions/update-user.server';
import { CreateUserForm } from './components/create-user-form';
import { DeleteUserForm } from './components/delete-user-form';
import { UpdateUserForm } from './components/update-user-form';
import { UserList } from './components/user-list';
import type { Route } from './+types/route';

const actionIntentFormSchema = zfd.formData({
	intent: z.enum(['create-user', 'update-user', 'delete-user']),
});

export async function action(args: Route.ActionArgs) {
	const formData = await args.request.formData();

	const result = actionIntentFormSchema.safeParse(formData);

	if (!result.success)
		return data({ errors: z.flattenError(result.error) }, 400);

	switch (result.data.intent) {
		case 'create-user':
			return createUserAction(args, formData);
		case 'delete-user':
			return deleteUserAction(args, formData);
		case 'update-user':
			return updateUserAction(args, formData);
	}
}

// eslint-disable-next-line no-empty-pattern
export async function loader({}: Route.LoaderArgs) {
	const userRepository = new UserRepository();

	const users = await userRepository.listUsers();

	return { users };
}

export default function ({ loaderData }: Route.ComponentProps) {
	const { users } = loaderData;

	return (
		<div>
			<CreateUserForm />
			<UserList users={users}>
				{(user) => (
					<li key={user.id}>
						<p>
							<strong>{user.name}</strong> — {user.emailAddress}
						</p>
						<UpdateUserForm user={user} />
						<DeleteUserForm user={user} />
					</li>
				)}
			</UserList>
		</div>
	);
}
