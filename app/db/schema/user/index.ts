import { randomUUID } from 'crypto';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
	id: text('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	name: text('name').notNull(),
	emailAddress: text('email_address').notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdate(() => new Date()),
});
