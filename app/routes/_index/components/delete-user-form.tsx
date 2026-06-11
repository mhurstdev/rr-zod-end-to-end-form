import { useFetcher } from 'react-router';
import type { TUser } from '@/db/schema/user/schemas';
import type { deleteUserAction } from '../actions/delete-user.server';

type TDeleteUserFormProps = {
	user: TUser;
};

export const DeleteUserForm = ({ user }: TDeleteUserFormProps) => {
	const fetcher = useFetcher<typeof deleteUserAction>();

	const isBusy = fetcher.state !== 'idle';

	return (
		<fetcher.Form method="post">
			<fieldset disabled={isBusy}>
				<legend>Delete</legend>
				<input type="hidden" name="intent" value="delete-user" />
				<input type="hidden" name="id" value={user.id} />
				<button type="submit">Delete</button>
			</fieldset>
		</fetcher.Form>
	);
};
