import { UserRepository } from '@/repositories/user.server';
import { CreateUserForm } from './components/create-user-form';
import { DeleteUserForm } from './components/delete-user-form';
import { UpdateUserForm } from './components/update-user-form';
import { UserList } from './components/user-list';
import type { Route } from './+types/route';

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
