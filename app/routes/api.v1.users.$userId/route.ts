import { data } from 'react-router';
import * as z from 'zod';
import { zfd } from 'zod-form-data';
import { deleteUserAction } from './actions/delete-user.server';
import { updateUserAction } from './actions/update-user.server';
import type { Route } from './+types/route';

const actionFormSchema = zfd.formData({
	action: z.enum(['update-user', 'delete-user']),
});

export async function action(args: Route.ActionArgs) {
	const formData = await args.request.formData();

	const result = actionFormSchema.safeParse(formData);

	if (!result.success) {
		return data({ errors: z.flattenError(result.error) }, 400);
	}

	switch (result.data.action) {
		case 'update-user':
			return updateUserAction(args, formData);
		case 'delete-user':
			return deleteUserAction(args);
	}
}
