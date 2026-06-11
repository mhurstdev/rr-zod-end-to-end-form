import { useFetcher } from 'react-router';
import { Field } from '@/components/field';
import type { TUser } from '@/db/schema/user/schemas';
import type { updateUserAction } from '../actions/update-user.server';

type TUpdateUserFormProps = {
	user: TUser;
};

export const UpdateUserForm = ({ user }: TUpdateUserFormProps) => {
	const fetcher = useFetcher<typeof updateUserAction>();

	const isBusy = fetcher.state !== 'idle';

	const fieldErrors =
		fetcher.data && 'errors' in fetcher.data
			? fetcher.data.errors.fieldErrors
			: undefined;

	return (
		<fetcher.Form method="post">
			<fieldset disabled={isBusy}>
				<legend>Update</legend>
				<input type="hidden" name="intent" value="update-user" />
				<input type="hidden" name="id" value={user.id} />

				<Field.Root errors={fieldErrors?.name}>
					<Field.Label>Name</Field.Label>
					<Field.Input name="name" defaultValue={user.name} />
					<Field.Error />
				</Field.Root>

				<Field.Root errors={fieldErrors?.emailAddress}>
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
