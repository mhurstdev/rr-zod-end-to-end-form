import { href, useFetcher } from 'react-router';
import type { TUser } from '@/db/schema/user/schemas';
import type { deleteUserAction } from '@/routes/api.v1.users.$userId/actions/delete-user.server';

type TDeleteUserFormProps = {
	user: TUser;
};

export const DeleteUserForm = ({ user }: TDeleteUserFormProps) => {
	const deleteUserFormFetcherKey = `delete-user-form-${user.id}`;

	// prettier-ignore
	const fetcher = useFetcher<typeof deleteUserAction>({ key: deleteUserFormFetcherKey });

	const isBusy = fetcher.state !== 'idle';

	return (
		<fetcher.Form
			method="post"
			action={href('/api/v1/users/:userId', { userId: user.id })}
		>
			<fieldset disabled={isBusy}>
				<legend>Delete</legend>
				<input type="hidden" name="action" value="delete-user" />
				<button type="submit">Delete</button>
			</fieldset>
		</fetcher.Form>
	);
};
