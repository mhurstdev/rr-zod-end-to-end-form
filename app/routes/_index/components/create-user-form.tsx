import { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router';
import { Field } from '@/components/field';
import type { createUserAction } from '../actions/create-user.server';

export const CreateUserForm = () => {
	const fetcher = useFetcher<typeof createUserAction>();
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
			: undefined;

	return (
		<fetcher.Form method="post" ref={formRef}>
			<fieldset disabled={isBusy}>
				<legend>Create user</legend>
				<input type="hidden" name="intent" value="create-user" />

				<Field.Root errors={fieldErrors?.name}>
					<Field.Label>Name</Field.Label>
					<Field.Input name="name" />
					<Field.Error />
				</Field.Root>

				<Field.Root errors={fieldErrors?.emailAddress}>
					<Field.Label>Email</Field.Label>
					<Field.Input name="emailAddress" type="email" />
					<Field.Error />
				</Field.Root>

				<button type="submit">Create</button>
			</fieldset>
		</fetcher.Form>
	);
};
