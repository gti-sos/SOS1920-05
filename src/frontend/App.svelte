<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import books_exports from './books_exportsAPI/App.svelte';
	import health_public from './health_publicAPI/App.svelte';
	import life_expectancies from './life_expectanciesAPI/ListTable.svelte';
	import edit_books_exports from './books_exportsAPI/Edit_books_exports.svelte';
	import edit_health_public from './health_publicAPI/Edit_health_public.svelte';
	import edit_life_expectancies from './life_expectanciesAPI/Edit_life_expectancies.svelte';
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
	<h3>SOS1920-05</h3>
	<Router {routes} />
</main>

<style>
	h3 {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		color: #1C1A67;
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