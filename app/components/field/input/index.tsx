import { useFieldContext } from '../root';
import type * as React from 'react';

type TFieldInputProps = React.ComponentProps<'input'>;

export const FieldInput = (props: TFieldInputProps) => {
	const { inputId, errorId, errors } = useFieldContext();

	const hasErrors = Boolean(errors?.length);

	return (
		<input
			{...props}
			id={inputId}
			aria-invalid={hasErrors ? true : undefined}
			aria-describedby={hasErrors ? errorId : undefined}
		/>
	);
};
