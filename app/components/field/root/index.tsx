import { createContext, useContext, useId } from 'react';
import type { ReactNode } from 'react';

type TFieldContext = {
	inputId: string;
	errorId: string;
	errors: string[] | undefined;
};

const FieldContext = createContext<TFieldContext | null>(null);

export const useFieldContext = () => {
	const context = useContext(FieldContext);
	if (!context) {
		throw new Error('Field.* must be rendered inside <Field.Root>');
	}
	return context;
};

type TFieldRootProps = {
	children: ReactNode;
	errors?: string[];
	id?: string;
};

export const FieldRoot = ({ children, errors, id }: TFieldRootProps) => {
	const generatedId = useId();
	const inputId = id ?? generatedId;

	return (
		<FieldContext.Provider
			value={{ inputId, errorId: `${inputId}-error`, errors }}
		>
			{children}
		</FieldContext.Provider>
	);
};
