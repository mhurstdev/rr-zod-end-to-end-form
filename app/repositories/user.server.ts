import { and, eq, ne } from 'drizzle-orm';
import { EmailAddressAlreadyRegistered } from '@/db/errors/constraints';
import { db } from '@/db/index.server';
import { userTable } from '@/db/schema';
import type { TCreateUser, TUpdateUser, TUser } from '@/db/schema/user/schemas';

export class UserRepository {
	private async checkIfEmailAddressAlreadyRegistered(
		emailAddress: TUser['emailAddress'],
		excludeUserId?: TUser['id'],
	) {
		const filters = [eq(userTable.emailAddress, emailAddress)];

		if (excludeUserId !== undefined) {
			filters.push(ne(userTable.id, excludeUserId));
		}

		const existing = await db.$count(userTable, and(...filters));

		return existing > 0;
	}

	async listUsers() {
		const users = await db.select().from(userTable);

		return users;
	}

	async createUser(newUser: TCreateUser) {
		const { emailAddress } = newUser;

		const isEmailAddressAlreadyRegistered =
			await this.checkIfEmailAddressAlreadyRegistered(emailAddress);

		if (isEmailAddressAlreadyRegistered) {
			throw new EmailAddressAlreadyRegistered(emailAddress);
		}

		const [user] = await db.insert(userTable).values(newUser).returning();

		if (!user) {
			throw new Error('UserRepository.createUser returned undefined');
		}

		return user;
	}

	async updateUser(userId: TUser['id'], partialUser: Partial<TUpdateUser>) {
		if (partialUser.emailAddress !== undefined) {
			const { emailAddress } = partialUser;

			const isEmailAddressAlreadyRegistered =
				await this.checkIfEmailAddressAlreadyRegistered(
					emailAddress,
					userId,
				);

			if (isEmailAddressAlreadyRegistered) {
				throw new EmailAddressAlreadyRegistered(emailAddress);
			}
		}

		const [user] = await db
			.update(userTable)
			.set(partialUser)
			.where(eq(userTable.id, userId))
			.returning();

		return user;
	}

	async deleteUser(userId: TUser['id']) {
		const [user] = await db
			.delete(userTable)
			.where(eq(userTable.id, userId))
			.returning();

		return user;
	}
}
