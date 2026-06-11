import { FieldError } from './error';
import { FieldInput } from './input';
import { FieldLabel } from './label';
import { FieldRoot } from './root';

export const Field = Object.freeze({
	Root: FieldRoot,
	Label: FieldLabel,
	Input: FieldInput,
	Error: FieldError,
});
