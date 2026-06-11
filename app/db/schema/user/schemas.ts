import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from 'drizzle-orm/zod';
import * as z from 'zod';
import { userTable } from './index';

export const userSchema = createSelectSchema(userTable);
export type TUser = z.infer<typeof userSchema>;

export const createUserSchema = createInsertSchema(userTable)
	.omit({
		id: true,
		emailAddress: true,
		createdAt: true,
		updatedAt: true,
	})
	.extend({
		emailAddress: z.email(),
	});
export type TCreateUser = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUpdateSchema(userTable)
	.omit({
		id: true,
		emailAddress: true,
		createdAt: true,
		updatedAt: true,
	})
	.extend({
		emailAddress: z.email().optional(),
	});
export type TUpdateUser = z.infer<typeof createUserSchema>;
