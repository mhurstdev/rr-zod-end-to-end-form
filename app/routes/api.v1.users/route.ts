import { data } from 'react-router';
import * as z from 'zod';
import { zfd } from 'zod-form-data';
import { createUserAction } from './actions/create-user.server';
import type { Route } from './+types/route';

const actionFormSchema = zfd.formData({
	action: z.enum(['create-user']),
});

export async function action(args: Route.ActionArgs) {
	const formData = await args.request.formData();

	const result = actionFormSchema.safeParse(formData);

	if (!result.success) {
		return data({ errors: z.flattenError(result.error) }, 400);
	}

	switch (result.data.action) {
		case 'create-user':
			return createUserAction(args, formData);
	}
}
