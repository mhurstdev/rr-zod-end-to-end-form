/*
 * I'm not sold on this, not a fan of having a different API for returning errors to the markup
 * automatically (e.g. zod schema failed validation where we use z.flattenError) versus when we
 * need manual intervention (e.g. email was already registered and we use a typed error factory).
 *
 * Possible that I could abstract them into a single function that pivots on the z.ZodError type
 * since this only comes from invalid schema. Perhaps too complex for now, sorry Andy...
 */

export type TFlatErrors = {
	formErrors: string[];
	fieldErrors: Record<string, string[] | undefined>;
};

// prettier-ignore
const toArray = (message: string | string[]) => Array.isArray(message) ? message : [message];

export const makeErrorFactory = <TFields>() => {
	const wrap = (errors: TFlatErrors) => ({ errors });

	const formError = (message: string | string[]) =>
		wrap({ formErrors: toArray(message), fieldErrors: {} });

	const fieldError = (
		field: keyof TFields & string,
		message: string | string[],
	) => wrap({ formErrors: [], fieldErrors: { [field]: toArray(message) } });

	const fieldErrors = (
		record: Partial<Record<keyof TFields & string, string | string[]>>,
	) =>
		wrap({
			formErrors: [],
			fieldErrors: Object.fromEntries(
				Object.entries(record)
					.filter(([, v]) => v !== undefined)
					.map(([k, v]) => [k, toArray(v as string | string[])]),
			),
		});

	return { formError, fieldError, fieldErrors };
};
