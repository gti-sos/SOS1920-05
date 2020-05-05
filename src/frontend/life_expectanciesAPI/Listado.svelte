<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";
	import Pagination from "sveltestrap/src/Pagination.svelte";
	import PaginationItem from "sveltestrap/src/PaginationItem.svelte";
	import PaginationLink from "sveltestrap/src/PaginationLink.svelte"
	import {
		pop
    } from "svelte-spa-router";
    
	let life_expectancies = [];
	let new_life_expectancies = {
		"country": "",
		"year": 0,
		"women_life_expectancies": 0,
		"men_life_expectancies": 0,
		"average_life_expectancies":0
	};

	/* Select variables */
	let countries = [];
	let years = [];
	let current_country= "-";
	let current_year= "-";
	let offset = 0;
	let limit = 10;
	let MensajeError = false;
	let MensajeCorrecto = false;

	onMount(getLife_expectancies);

	async function getLife_expectancies(offset) {
		console.log("Fetching getLife_expectancies...");
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

	async function insert_life() {
		console.log("Inserting life...");
		if (new_life_expectancies.country == ""
			|| new_life_expectancies.country == null
			|| new_life_expectancies.year == ""
			|| new_life_expectancies.year == null
			|| new_life_expectancies.women_life_expectancies == ""
			|| new_life_expectancies.women_life_expectancies == null
			|| new_life_expectancies.men_life_expectancies == ""
			|| new_life_expectancies.men_life_expectancies == null
			|| new_life_expectancies.average_life_expectancies == ""
			|| new_life_expectancies.average_life_expectancies == null) {
			alert("Es obligatorio completar todos los recursos");
			console.log("ERROR!");
		} else {
			const res = await fetch("/api/v1/life_expectancies", {
				method: "POST",
				body: JSON.stringify(new_life_expectancies),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				get_all_life_expectancies(offset);
				alert("life insertada con éxito");
			});
		};
	}

	async function delete_life(country, year) {
		console.log("Deleting life...");
		const res = await fetch("/api/v1/life_expectancies" + "/" + country + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			get_all_life_expectancies(offset);
			alert("Life borrada con éxito");
		});
	}

	async function delete_all_life_expectancies() {
		console.log("Deleting all lives...");
		const res = await fetch("/api/v1/life_expectancies", {
			method: "DELETE"
		}).then(function (res) {
			get_all_life_expectancies(offset);
			alert("Todas los datos borrados con éxito");
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
			console.log("Update years")
		}else {
			console.log("ERROR!")
		}
	}
	
	async function search(country, year){
        console.log("Searching data: " + country + "and " + year);
		/* Checking if it fields is empty */
		var url = "/api/v1/life_expectancies";
		if(country != "-" && year != "-") {
			url = url + "?country=" + country+ "&year=" + year;
		}else if(country != "-" && year == "-"){
			url = url + "?country=" + country;
		} else if(country == "-" && year != "-"){
			url = url + "?year=" + year;
		} 
		
		const res = await fetch(url);
        if (res.ok){
            console.log("OK:");
            const json = await res.json();
            life_expectancies = json;
            
            console.log("Found " + life_expectancies.length);
        }else{
            console.log("ERROR!");
        }
	}

	async function loadInitialData() {
		
		console.log("Loading life_expectancies...");
		const res = await fetch("/api/v1/life_expectancies/loadInitialData").then(function (res) {
			getLife_expectancies(offset);
		});;
		successMsg = "Se han cargado los datos iniciales correctamente.";
		errorMsg = false;
	};
	async function siguientePagina() {
		const res = await fetch("/api/v1/life_expectancies/");
		const json = await res.json();
		if(offset < json.length - 10 ){
			offset = offset + 10;
			get_all_life_expectancies(offset);
		}
	};
	async function anteriorPagina() {
		if (offset - 10 >= 0){
			offset = offset - 10;
			get_all_life_expectancies(offset);
		}
	};
</script>



<main>
	{#await life_expectancies}
		Loading life_expectancies...
	{:then life_expectancies_}
	<FormGroup> 
        <Label for="selectCountry">Búsqueda por país </Label>
        <Input type="select" name="selectCountry" id="selectCountry" bind:value="{current_country}">
            {#each countries as country}
            <option>{country}</option>
			{/each}
			<option>-</option>
        </Input>
    </FormGroup>
	
	<FormGroup>
		<Label for="selectYear">Búsqueda por año</Label>
		<Input type="select" name="selectYear" id="selectYear" bind:value = "{current_year}">
			{#each years as year}
			<option>{year}</option>
			{/each}
			<option>-</option>
		</Input>
	</FormGroup>

	<Button outline color="secondary" on:click="{search(current_country, current_year)}">Buscar</Button>
	<p></p>
	<Table bordered>
		<thead>
			<tr>
				<th>País</th>
				<th>Año</th>
				<th>Esperanza de vida de mujeres</th>
				<th>Esperanza de vida de hombres</th>
				<th>Promedio de esperanza de vida</th>
				<th> Acciones </th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Input placeholder="Ex. japon" bind:value = "{new_life_expectancies.country}" /></td>
				<td><Input type="number" required placeholder="Ej. 2020" bind:value = "{new_life_expectancies.year}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{new_life_expectancies['women_life_expectancies']}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{new_life_expectancies['men_life_expectancies']}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{new_life_expectancies['average_life_expectancies']}" /></td>
				<td><Button outline color= "primary" on:click= {insert_life}>Insertar</Button></td>
			</tr>

			{#each life_expectancies as life_expectancies}
				<tr>

				
					<td>
						<a href="#/life_expectancies/{life_expectancies.country}/{life_expectancies.year}"> 
						{life_expectancies.country}
					</a>
					</td>
					<td>{life_expectancies.year}</td>
				
					<td>{life_expectancies['women_life_expectancies']}</td>
					<td>{life_expectancies['men_life_expectancies']}</td>
					<td>{life_expectancies['average_life_expectancies']}</td>
					<td><Button outline color= "danger" on:click = "{delete_life(life_expectancies.country,life_expectancies.year)}">Borrar</Button></td>
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
	<Button outline color= "danger" on:click = {delete_all_life_expectancies}>Borrar todo</Button>
	<Button outline color="primary" on:click="{loadInitialData}">Cargar datos iniciales</Button>

</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		margin: 0 auto;
	}
</style>