import { userTable } from '../schema/user/index';
import type { db } from '../index.server';

type TDb = typeof db;

export default async function seed(db: TDb) {
	await db
		.insert(userTable)
		.values([
			{
				name: 'Lister',
				emailAddress: 'lister@red.dwarf',
			},
			{
				name: 'Rimmer',
				emailAddress: 'rimmer@red.dwarf',
			},
			{
				name: 'Kryten',
				emailAddress: 'kryten@red.dwarf',
			},
			{
				name: 'Cat',
				emailAddress: 'cat@red.dwarf',
			},
		])
		.onConflictDoNothing({ target: userTable.emailAddress });
}
