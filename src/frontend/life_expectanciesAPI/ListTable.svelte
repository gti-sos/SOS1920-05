<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";
	import Pagination from "sveltestrap/src/Pagination.svelte";

	import {
		pop
    } from "svelte-spa-router";
    
	let life_expectancies = [];
	let new_life_expectancies = {
		"country": "",
		"year": 2010,
		"women_life_expectancy": 80,
		"men_life_expectancy": 70,
		"average_life_expectancy":75
	};

	/* Select variables */
	let countries = [];
	let years = [];
	let current_country= "Elige país existente";
	let current_year= "Elige año existente";
	let from= "-";
	let to= "-";
	let offset = 0;
	let limit = 10;
	let MensajeError = false;
	let MensajeCorrecto = false;

	onMount(get_all_expectancies);

	async function get_all_expectancies(offset) {
		console.log("Fetching all expectancies...");
		const res = await fetch("/api/v1/life_expectancies?limit="+limit + "&offset="+ offset);
		if (res.ok) {
			console.log("OK:");
			const json = await res.json();
			life_expectancies = json;

			countries = json.map((d) => {
				return d.country;
			});
			countries = Array.from(new Set(countries));
				
			years = json.map((d) => {
				return d.year;
			});
			years = Array.from(new Set(years));
			console.log("Received " + life_expectancies.length);
		}
		else {
			console.log("ERROR!");
		}
	}

	async function insert_expectancy() {
		console.log("Inserting expectancy...");
		if (new_life_expectancies.country == ""
			|| new_life_expectancies.country == null
			|| new_life_expectancies.year == ""
			|| new_life_expectancies.year == null
			|| new_life_expectancies.women_life_expectancy == ""
			|| new_life_expectancies.women_life_expectancy == null
			|| new_life_expectancies.men_life_expectancy == ""
			|| new_life_expectancies.men_life_expectancy == null
			|| new_life_expectancies.average_life_expectancy == ""
			|| new_life_expectancies.average_life_expectancy == null) {
			alert("Completa todos los campos");
			console.log("ERROR!");
		} else {
			const res = await fetch("/api/v1/life_expectancies", {
				method: "POST",
				body: JSON.stringify(new_life_expectancies),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				if(res.status==409){
					alert("El dato ya existente");
				}else{
				get_all_expectancies(offset);
				alert("Inserción realizado");
				}
			});
		};
	}

	async function delete_expectancy(country, year) {
		console.log("Deleting expectancy...");
		const res = await fetch("/api/v1/life_expectancies" + "/" + country + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			get_all_expectancies(offset);
			alert("dato borrado con éxito");
		});
	}

	async function delete_all_expectancies() {
		console.log("Deleting all expectancies...");
		const res = await fetch("/api/v1/life_expectancies", {
			method: "DELETE"
		}).then(function (res) {
			get_all_expectancies(offset);
			alert("Datos borrados correctamente");
		});
	}
	async function searchYears(country){
        console.log("Searching years in country...");
		const res = await fetch("/api/v1/life_expectancies/" + country)
		
		if (res.ok){
            const json = await res.json();
			life_expectancies = json;
			
			life_expectancies.map((d)=>{
			return d.year;
			});
			alert("Busqueda encontrada");
			console.log("Encontrado con éxito")
		}else {
			alert(" Busqueda inexistente")
            console.log("ERROR!");
			get_all_expectancies(offset);
		}
	}
	
	async function search(country, year){
        console.log("Searching data: " + country + "and " + year);
		/* Checking if it fields is empty */
		var url = "/api/v1/life_expectancies";
		if(country != "Elige país existente" && year != "Elige año existente") {
			url = url + "?country=" + country+ "&year=" + year;
		}else if(country != "Elige país existente" && year == "Elige año existente"){
			url = url + "?country=" + country;
		} else if(country == "Elige país existente" && year != "Elige año existente"){
			url = url + "?year=" + year;
		} 
		
		const res = await fetch(url);
        if (res.ok){
            console.log("OK:");
            const json = await res.json();
            life_expectancies = json;

            life_expectancies.map((d)=>{
			return d.year;
			});
			alert("Busqueda encontrada");
            console.log("Encontrado " + life_expectancies.length);
        }else{
			alert(" Busqueda inexistente")
            console.log("ERROR!");
			get_all_expectancies(offset);
        }
	}

async function searchRange(from, to){
        console.log("Buscando: " + from + "hasta" + to);
		
		var url = "/api/v1/life_expectancies";

		if(from != "-" && to != "-") {
			url = url + "?from=" + from+ "&to=" + to;
		}else if(from != "-" && to == "-"){
			url = url + "?from=" + from;
		} else if(from == "-" && to != "-"){
			url = url + "?to=" + to;
		} 
		
		const res = await fetch(url);
        if (res.ok && from != "-" && to != "-"){
            console.log("OK:");
            const json = await res.json();
            life_expectancies = json;
            alert("Busqueda encontrada");
            console.log("Found " + life_expectancies.length);
        }else{
			alert("Indique un rango");
			console.log("ERROR!");
			get_all_expectancies(offset);
        }
	}


	async function nextPage() {
		const res = await fetch("/api/v1/books-exports/");
		const recursos = await res.json();
		if(offset < recursos.length - 10 ){
			offset = offset + 10;
			get_all_exports(offset);
		}
	};
	async function searchLife(offset) {
		let url = "/api/v1/life_expectancies?limit=10&offset="+ offset;
		console.log("Searching life_expectancies...");
		let life = {
			country: searchLife.country,
			year: parseInt(searchLife.year),
			women_life_expectancy: parseInt(searchLife.women_life_expectancy),
			men_life_expectancy: parseInt(searchLife.men_life_expectancy),
			average_life_expectancy: parseInt(searchLife.average_life_expectancy),
	
		};
		Object.entries(life).forEach(([x,y]) => {
			if(!isNaN(y)){
				url = url + "&" + x + "=" + y;
			}
		});
		if(!life.country == ""){
			url = url +"&country=" + life.country;
		};
		console.log(url);
		const res = await fetch(url);
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			life_expectancies = json;
			console.log("Received " + life_expectancies.length + " life_expectancies.");
			if (life_expectancies.length > 0){
				alert("Resurtado Encontrado.");
				
			}else{
				alert("No hay resultado.");
			};
			
		} else {
			alert("No hay resultado.");
			console.log("ERROR!");
		};
	};

	async function loadInitialData() {
		
		console.log("Loading life_expectancies...");
		const res = await fetch("/api/v1/life_expectancies/loadInitialData").then(function (res) {
			method: "GET"
		}).then(function (res) {
			get_all_expectancies(offset);
			alert("Datos iniciados correctamente.");
		});
			
		
	};
	async function siguientePagina() {
		const res = await fetch("/api/v1/life_expectancies/");
		const json = await res.json();
		if(offset < json.length - 10 ){
			offset = offset + 10;
			get_all_expectancies(offset);
		}
	};
	async function anteriorPagina() {
		if (offset - 10 >= 0){
			offset = offset - 10;
			get_all_expectancies(offset);
		}
	};
</script>



<main>
	{#await life_expectancies}
		Loading life_expectancies...
	{:then life_expectancies_}
	<Table >
		<tr>
			<td>
	<FormGroup> 
        <Label for="selectCountry">Búsqueda por país </Label>
        <Input type="select" name="selectCountry" id="selectCountry" bind:value="{current_country}">
            {#each countries as country}
            <option>{country}</option>
			{/each}
			<option>-</option>
        </Input>
    </FormGroup>
	</td>
		<td>
	<FormGroup>
		<Label for="selectYear">Búsqueda por año</Label>
		<Input type="select" name="selectYear" id="selectYear" bind:value = "{current_year}">
			{#each years as year}
			<option>{year}</option>
			{/each}
			<option>-</option>
		</Input>
	</FormGroup>

	</td>
		<td class="align-middle" align="center">
		<Button outline color="secondary" on:click="{search(current_country, current_year)}">Buscar</Button>
	</td>	
	</tr>
		<p></p>
		<h6>Intervalo por años</h6>
		<tr>
		<td>
		<FormGroup>
			<Label for="selectFrom">Desde</Label>
			<Input type="select" name="selectFrom" id="selectFrom" bind:value = "{from}">
				{#each years as year}
				<option>{year}</option>
				{/each}
				<option>-</option>
			</Input>
		</FormGroup>
		</td>
		<td>	
		<FormGroup>
			<Label for="selectTo">Hasta</Label>
			<Input type="select" name="selectTo" id="selectTo" bind:value = "{to}">
				{#each years as year}
				<option>{year}</option>
				{/each}
				<option>-</option>
			</Input>
		</FormGroup>
	</td>	
		<td class="align-middle" align="center">
			<Button outline color="secondary" on:click="{searchRange(from, to)}">Buscar</Button>
		</td>
	</tr>
	</Table>
	<p></p>
	<Table bordered>
		<thead>
			<tr>
				<th>País</th>
				<th>Año</th>
				<th>Esperanza de vida en Mujeres</th>
				<th>Esperanza de vida en Hombres</th>
				<th>Esperanza de vida Media</th>
				<th> Acciones </th>
			</tr>
		</thead>
		<tbody>
		<tr>
				<td><Input bind:value = "{searchLife.country}" /></td>
				<td><Input bind:value = "{searchLife.year}" /></td>
				<td><Input bind:value = "{searchLife.women_life_expectancy}" /></td>
				<td><Input bind:value = "{searchLife.men_life_expectancy}" /></td>
				<td><Input bind:value = "{searchLife.average_life_expectancy}" /></td>
				<td><Button outline  color="primary" on:click={searchLife(offset)}>Búsqueda manual</Button> </td>
		</tr>
		<p></p>
		<tr>
				<td><Input placeholder="Ex. japon" bind:value = "{new_life_expectancies.country}" /></td>
				<td><Input type="number" required placeholder="Ej. 2000" bind:value = "{new_life_expectancies.year}" /></td>
				<td><Input type="number" required placeholder="70" step="61"  bind:value = "{new_life_expectancies['women_life_expectancy']}" /></td>
				<td><Input type="number" required placeholder="70" step="61"  bind:value = "{new_life_expectancies['men_life_expectancy']}" /></td>
				<td><Input type="number" required placeholder="70" step="61"  bind:value = "{new_life_expectancies['average_life_expectancy']}" /></td>
				<td><Button outline color= "primary" on:click= {insert_expectancy}>Insertar</Button></td>
		</tr>

			{#each life_expectancies_ as life_expectancies}
				<tr>

				
					<td>
						<a href="#/life_expectancies/{life_expectancies.country}/{life_expectancies.year}"> 
						{life_expectancies.country}
					</a>
					</td>
					<td>{life_expectancies.year}</td>
					<td>{life_expectancies['women_life_expectancy']}</td>
					<td>{life_expectancies['men_life_expectancy']}</td>
					<td>{life_expectancies['average_life_expectancy']}</td>
					<td><Button outline color= "danger" on:click = "{delete_expectancy(life_expectancies.country,life_expectancies.year)}">Borrar</Button></td>
				</tr>
			{/each}
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</tbody>
	</Table>
	{/await}
	<p align="right">
		<Button outline color="secondary" on:click="{anteriorPagina}">Anterior página</Button>
		<Button outline color="secondary" on:click="{siguientePagina}">Siguiente página</Button>
	</p>
		
		
	<Button outline color="secondary" on:click="{pop}">Atrás</Button>
	<Button outline color= "danger" on:click = {delete_all_expectancies}>Borrar todo</Button>
	<Button outline color="primary" on:click="{loadInitialData}">Cargar datos iniciales</Button>
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		margin: 0 auto;
	}
</style>