import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [],
	test: {
		include: ['./**/*.{test,spec}.{js,ts}']
	}
});