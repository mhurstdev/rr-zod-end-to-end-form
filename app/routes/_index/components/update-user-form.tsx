import { href, useFetcher } from 'react-router';
import { Field } from '@/components/field';
import type { TUser } from '@/db/schema/user/schemas';
import type { updateUserAction } from '@/routes/api.v1.users.$userId/actions/update-user.server';

type TUpdateUserFormProps = {
	user: TUser;
};

export const UpdateUserForm = ({ user }: TUpdateUserFormProps) => {
	const updateUserFormFetcherKey = `update-user-form-${user.id}`;

	// prettier-ignore
	const fetcher = useFetcher<typeof updateUserAction>({ key: updateUserFormFetcherKey });

	const isBusy = fetcher.state !== 'idle';

	const fieldErrors =
		fetcher.data && 'errors' in fetcher.data
			? fetcher.data.errors.fieldErrors
			: {};

	return (
		<fetcher.Form
			method="post"
			action={href('/api/v1/users/:userId', { userId: user.id })}
		>
			<fieldset disabled={isBusy}>
				<legend>Update</legend>
				<input type="hidden" name="action" value="update-user" />

				<Field.Root errors={fieldErrors.name}>
					<Field.Label>Name</Field.Label>
					<Field.Input name="name" defaultValue={user.name} />
					<Field.Error />
				</Field.Root>

				<Field.Root errors={fieldErrors.emailAddress}>
					<Field.Label>Email</Field.Label>
					<Field.Input
						name="emailAddress"
						type="email"
						defaultValue={user.emailAddress}
					/>
					<Field.Error />
				</Field.Root>

				<button type="submit">Update</button>
			</fieldset>
		</fetcher.Form>
	);
};
