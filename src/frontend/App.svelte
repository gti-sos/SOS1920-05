<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import books_exports from './books_exportsAPI/App.svelte';
	import health_public from './health_publicAPI/App.svelte';
	import life_expectancies from './life_expectanciesAPI/App.svelte';
	import edit_books_exports from './books_exportsAPI/Edit_books_exports.svelte';
	import edit_health_public from './health_publicAPI/Edit_books_exports.svelte';
	import edit_life_expectancies from './life_expectanciesAPI/Edit_books_exports.svelte';
	import NotFound from './NotFound.svelte';

	const routes =  {
		"/": Home,
		"/books_exportsAPI": books_exports,
		"/health_publicAPI": health_public,
		"/life_expectanciesAPI": life_expectancies,
		"/books-exports/:country/:year": edit_books_exports,
		"/health_public/:country/:year": edit_health_public,
		"/life_expectancies/:country/:year": edit_life_expectancies,
		"*": NotFound
	};
</script>

<main>
	<h1>API Manager</h1>
	<Router {routes} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>