import 'dotenv/config';
import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { db } from '../index.server';

const here = dirname(fileURLToPath(import.meta.url));

async function main() {
	/* Target only files beginning with numbers, skips index.ts. */
	const files = (await readdir(here))
		.filter((file) => /^\d+.*\.ts$/.test(file))
		.sort();

	/* Loop through files, execute default exports (seed functions) */
	for (const file of files) {
		const _module = await import(pathToFileURL(join(here, file)).href);
		if (typeof _module.default !== 'function') {
			console.warn(`⊘ ${file} has no default export, skipping`);
			continue;
		}
		console.log(`→ seeding ${file}`);
		await _module.default(db);
	}

	console.log('✓ seeding complete');
	process.exit(0);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
