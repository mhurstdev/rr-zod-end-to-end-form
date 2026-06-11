import { useFieldContext } from '../root';
import type * as React from 'react';

type TFieldLabelProps = React.ComponentProps<'label'>;

export const FieldLabel = (props: TFieldLabelProps) => {
	const { inputId } = useFieldContext();

	return <label {...props} htmlFor={inputId} />;
};
