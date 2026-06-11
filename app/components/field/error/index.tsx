import { useFieldContext } from '../root';
import type * as React from 'react';

type TFieldErrorProps = React.ComponentProps<'p'>;

export const FieldError = ({ children, ...props }: TFieldErrorProps) => {
	const { errorId, errors } = useFieldContext();

	if (!errors?.length) return null;

	return (
		<p {...props} id={errorId} role="alert">
			{children ?? errors.join(', ')}
		</p>
	);
};
