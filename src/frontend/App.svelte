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
	import Any_Chart_life_expectancies from './life_expectanciesAPI//Any_Chart_life_expectancies.svelte';
	
	//About
	import About_Home from './about/Home.svelte';


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
	import MarioG02 from './APIS_Mario/G02.svelte';
	import MarioG04 from './APIS_Mario/G04.svelte';
	import MarioG06 from './APIS_Mario/G06.svelte';
	import MarioG07 from './APIS_Mario/G07.svelte';
	import MarioG08 from './APIS_Mario/G08.svelte';
	import MarioG09 from './APIS_Mario/G09.svelte';
	import MarioG22 from './APIS_Mario/G22.svelte';
	import MarioG24 from './APIS_Mario/G24.svelte';
	import MarioGE1 from './APIS_Mario/GE1.svelte';
	import MarioGE2 from './APIS_Mario/GE2.svelte';

	//APIs Mathias
	import Grupo_01_poverty_stats from './APIS_Mathias/Grupo_01_poverty_stats.svelte';
	import Grupo_02_rural_tourism from './APIS_Mathias/Grupo_02_rural-tourism-stats.svelte';
	import Grupo_04_vehicles from './APIS_Mathias/Grupo_04_vehicles.svelte';
	import Grupo_07_imports from './APIS_Mathias/Grupo_07_imports.svelte';
	import Grupo_09_plugin_vehicles from './APIS_Mathias/Grupo_09_plugin_vehicles.svelte';
	import Grupo_12_overdose_death from './APIS_Mathias/Grupo_12_overdose_death.svelte';
	import Grupo_23_cigarretes_sales from './APIS_Mathias/Grupo_23_cigarretes_sales.svelte';
	import Grupo_25_happiness_rate from './APIS_Mathias/Grupo_25_happiness_rate.svelte';
	import Grupo_27_life_quality from './APIS_Mathias/Grupo_27_life_quality.svelte';
	import Grupo_28_gce from './APIS_Mathias/Grupo_28_gce.svelte';
	import API_Ext1 from './APIS_Mathias/API_Ext1.svelte';
	import API_Ext2 from './APIS_Mathias/API_Ext2.svelte';

	import Integrations from './Integrations.svelte';
	import Analytics from './Analytics.svelte';
	import NotFound from './NotFound.svelte';

	const routes =  {

		"/": Home,
		"/analytics": Analytics,
		"/integrations": Integrations,

		"/books_exportsAPI": books_exports,
		"/health_publicAPI": health_public,
		"/life_expectanciesAPI": life_expectancies,

		"/books-exports/:country/:year": edit_books_exports,
		"/health_public/:country/:year": edit_health_public,
		"/life_expectancies/:country/:year": edit_life_expectancies,

		"/books-exports/graph": Graph_books_exports,
		"/books-exports/graphC3": Graph_books_exports_C3,

		"/health_public/HighChart": HighChart_health_public,
		"/health_public/ChartJS": ChartJS_health_public,

		"/Visual_life_expectancies": Visual_life_expectancies,
		"/Any_Chart_life_expectancies": Any_Chart_life_expectancies,

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
		"/Integrations/APIS_Mario/G02": MarioG02,
		"/Integrations/APIS_Mario/G04": MarioG04,
		"/Integrations/APIS_Mario/G06": MarioG06,
		"/Integrations/APIS_Mario/G07": MarioG07,
		"/Integrations/APIS_Mario/G08": MarioG08,
		"/Integrations/APIS_Mario/G09": MarioG09,
		"/Integrations/APIS_Mario/G22": MarioG22,
		"/Integrations/APIS_Mario/G24": MarioG24,
		"/Integrations/APIS_Mario/GE1": MarioGE1,
		"/Integrations/APIS_Mario/GE2": MarioGE2,

		//Ruta Mathias
		"/integrations/APIS_Mathias": Integrations_Mathias,
		"/integrations/APIS_Mathias/Grupo_01_poverty_stats": Grupo_01_poverty_stats,
		"/integrations/APIS_Mathias/Grupo_02_rural_tourism": Grupo_02_rural_tourism,
		"/integrations/APIS_Mathias/Grupo_04_vehicles": Grupo_04_vehicles,
		"/integrations/APIS_Mathias/Grupo_07_imports": Grupo_07_imports,
		"/integrations/APIS_Mathias/Grupo_09_plugin_vehicles": Grupo_09_plugin_vehicles,
		"/integrations/APIS_Mathias/Grupo_12_overdose_death": Grupo_12_overdose_death,
		"/integrations/APIS_Mathias/Grupo_23_cigarretes_sales": Grupo_23_cigarretes_sales,
		"/integrations/APIS_Mathias/Grupo_25_happiness_rate": Grupo_25_happiness_rate,
		"/integrations/APIS_Mathias/Grupo_27_life_quality": Grupo_27_life_quality,
		"/integrations/APIS_Mathias/Grupo_28_gce": Grupo_28_gce,
		
		"/integrations/APIS_Mathias/API_Ext1": API_Ext1,
		"/integrations/APIS_Mathias/API_Ext2": API_Ext2,
		"/about": About_Home,
		

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