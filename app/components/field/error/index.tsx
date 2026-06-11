import { clsx } from 'clsx';
import { useFieldContext } from '../root';
import styles from './index.module.css';
import type * as React from 'react';

type TFieldErrorProps = React.ComponentProps<'p'>;

export const FieldError = ({
	children,
	className,
	...props
}: TFieldErrorProps) => {
	const { errorId, errors } = useFieldContext();

	if (!errors?.length) return null;

	return (
		<p
			className={clsx(styles.errorText, className)}
			{...props}
			id={errorId}
			role="alert"
		>
			{children ?? errors.join(', ')}
		</p>
	);
};
