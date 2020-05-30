<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import books_exports from './books_exportsAPI/App.svelte';
	import health_public from './health_publicAPI/App.svelte';
	import life_expectancies from './life_expectanciesAPI/ListTable.svelte';
	import edit_books_exports from './books_exportsAPI/Edit_books_exports.svelte';
	import edit_health_public from './health_publicAPI/Edit_health_public.svelte';
	import edit_life_expectancies from './life_expectanciesAPI/Edit_life_expectancies.svelte';
	import Graph_books_exports from './books_exportsAPI/Graph_Books_Exports.svelte';
	import Graph_books_exports_C3 from './books_exportsAPI/Graph_Books_Exports_C3.svelte';
	import HighChart_health_public from './health_publicAPI/HighChart_health_public.svelte';
	import ChartJS_health_public from './health_publicAPI/ChartJS_health_public.svelte';
	import Visual_life_expectancies from './life_expectanciesAPI//Visual_life_expectancies.svelte';
	import Visual_Chart_life_expectancies from './life_expectanciesAPI//Visual_Chart_life_expectancies.svelte';

	import Integrations_Diego from './APIS_Diego/Home.svelte';
	import Integrations_Mario from './APIS_Mario/Home.svelte';
	import Integrations_Mathias from './APIS_Mathias/Home.svelte';

	//APIS DIEGO
	import DiegoG01 from './APIS_Diego/Grupo01.svelte';
	import DiegoG09 from './APIS_Diego/Grupo09.svelte';
	import DiegoG10 from './APIS_Diego/Grupo10.svelte';
	import DiegoG11 from './APIS_Diego/Grupo11.svelte';
	import DiegoG21 from './APIS_Diego/Grupo21.svelte';
	import DiegoG22 from './APIS_Diego/Grupo22.svelte';
	import DiegoG23 from './APIS_Diego/Grupo23.svelte';
	import DiegoG26 from './APIS_Diego/Grupo26.svelte';
	import DiegoG28 from './APIS_Diego/Grupo28.svelte';
	import DiegoG30 from './APIS_Diego/Grupo30.svelte';
	import DiegoExt1 from './APIS_Diego/GrupoExt1.svelte';
	import DiegoExt2 from './APIS_Diego/GrupoExt2.svelte';

	//APIS MARIO
	import MarioG01 from './APIS_Mario/G01.svelte';

	//APIs Mathias
	import Grupo_01_soverty_stats from './APIS_Mathias/Grupo_01_soverty_stats.svelte';
	import Grupo_12_overdose_death from './APIS_Mathias/Grupo_12_overdose_death.svelte';


	import Integrations from './Integrations.svelte';
	import Analytics from './Analytics.svelte';
	import NotFound from './NotFound.svelte';

	const routes =  {
		"/": Home,
		"/analytics": Analytics,
		"/integrations": Integrations,

		//RUTAS DIEGO
		"/integrations/APIS_Diego": Integrations_Diego,
		"/integrations/APIS_Diego/Grupo01": DiegoG01,
		"/integrations/APIS_Diego/Grupo09": DiegoG09,
		"/integrations/APIS_Diego/Grupo10": DiegoG10,
		"/integrations/APIS_Diego/Grupo11": DiegoG11,
		"/integrations/APIS_Diego/Grupo21": DiegoG21,
		"/integrations/APIS_Diego/Grupo22": DiegoG22,
		"/integrations/APIS_Diego/Grupo23": DiegoG23,
		"/integrations/APIS_Diego/Grupo26": DiegoG26,
		"/integrations/APIS_Diego/Grupo28": DiegoG28,
		"/integrations/APIS_Diego/Grupo30": DiegoG30,
		"/integrations/APIS_Diego/GrupoExt1": DiegoExt1,
		"/integrations/APIS_Diego/GrupoExt2": DiegoExt2,

		//RUTAS MARIO
		"/integrations/APIS_Mario": Integrations_Mario,
		"/integrations/APIS_Mario/G01": MarioG01,
		

		"/books_exportsAPI": books_exports,
		"/health_publicAPI": health_public,
		"/life_expectanciesAPI": life_expectancies,
		"/books-exports/:country/:year": edit_books_exports,
		"/health_public/:country/:year": edit_health_public,
		"/life_expectancies/:country/:year": edit_life_expectancies,
		"/books-exports/graph": Graph_books_exports,
		"/books-exports/graphC3": Graph_books_exports_C3,
		"/health_publicHighChart": HighChart_health_public,
		"/health_publicChartJS": ChartJS_health_public,
		"/Visual_life_expectancies": Visual_life_expectancies,
		"/Visual_Chart_life_expectancies": Visual_Chart_life_expectancies,



		//Ruta Mathias
	
		"/integrations/APIS_Mathias":Integrations_Mathias,
		"/integrations/APIS_Mathias/Grupo_01_soverty_stats": Grupo_01_soverty_stats,
		"/integrations/APIS_Mathias/Grupo_12_overdose_death": Grupo_12_overdose_death,

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