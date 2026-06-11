import { useEffect, useRef } from 'react';
import { href, useFetcher } from 'react-router';
import { Field } from '@/components/field';
import type { createUserAction } from '@/routes/api.v1.users/actions/create-user.server';

const CREATE_USER_FORM_FETCHER_KEY = 'create-user-form';

export const CreateUserForm = () => {
	// prettier-ignore
	const fetcher = useFetcher<typeof createUserAction>({ key: CREATE_USER_FORM_FETCHER_KEY });
	const formRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		if (fetcher.state === 'idle' && fetcher.data && 'ok' in fetcher.data) {
			formRef.current?.reset();
		}
	}, [fetcher.state, fetcher.data]);

	const isBusy = fetcher.state !== 'idle';

	const fieldErrors =
		fetcher.data && 'errors' in fetcher.data
			? fetcher.data.errors.fieldErrors
			: {};

	return (
		<fetcher.Form
			method="post"
			ref={formRef}
			action={href('/api/v1/users')}
		>
			<fieldset disabled={isBusy}>
				<legend>Create user</legend>
				<input type="hidden" name="action" value="create-user" />

				<Field.Root errors={fieldErrors.name}>
					<Field.Label>Name</Field.Label>
					<Field.Input name="name" />
					<Field.Error />
				</Field.Root>

				<Field.Root errors={fieldErrors.emailAddress}>
					<Field.Label>Email</Field.Label>
					<Field.Input name="emailAddress" type="email" />
					<Field.Error />
				</Field.Root>

				<button type="submit">Create</button>
			</fieldset>
		</fetcher.Form>
	);
};
