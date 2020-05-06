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
    
	let health_public = [];
	let new_health_public = {
		"country": "",
		"year": 0,
		"total_spending": 0,
		"public_spending": 0,
		"public_spending_pib":0
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

	onMount(get_all_health_public);

	async function get_all_health_public(offset) {
		console.log("Fetching all resources...");
		const res = await fetch("/api/v1/health_public?limit="+limit + "&offset="+ offset);
		if (res.ok) {
			console.log("OK:");
			const json = await res.json();
			health_public = json;

			countries = json.map((d) => {
				return d.country;
			});
			countries = Array.from(new Set(countries));
				
			years = json.map((d) => {
				return d.year;
			});
			years = Array.from(new Set(years));
			console.log("Received " + health_public.length);
		}
		else {
			console.log("ERROR!");
		}
	}

	async function insert_health_public() {
		console.log("Inserting resource...");
		if (new_health_public.country == ""
			|| new_health_public.country == null
			|| new_health_public.year == ""
			|| new_health_public.year == null
			|| new_health_public.total_spending == ""
			|| new_health_public.total_spending == null
			|| new_health_public.public_spending == ""
			|| new_health_public.public_spending == null
			|| new_health_public.public_spending_pib == ""
			|| new_health_public.public_spending_pib == null) {
			alert("Es obligatorio completar todos los recursos");
			console.log("ERROR!");
		} else {
			const res = await fetch("/api/v1/health_public", {
				method: "POST",
				body: JSON.stringify(new_health_public),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				if(res.status==409){
					alert("Ya existe ese recurso");
				}else{
				get_all_health_public(offset);
				alert("Recurso insertado con éxito");
				}
			});
		};
	}

	async function delete_health_public(country, year) {
		console.log("Deleting resource...");
		const res = await fetch("/api/v1/health_public" + "/" + country + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			get_all_health_public(offset);
			alert("Recurso borrado con éxito");
		});
	}

	async function delete_all_health_public() {
		console.log("Deleting resources...");
		const res = await fetch("/api/v1/health_public", {
			method: "DELETE"
		}).then(function (res) {
			get_all_health_public(offset);
			alert("Todos los recursos borrados con éxito");
		});
	}
	async function searchYears(country){
        console.log("Searching years in country...");
		const res = await fetch("/api/v1/health_public/" + country)
		
		if (res.ok){
            const json = await res.json();
			health_public = json;
			
			health_public.map((d)=>{
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
		var url = "/api/v1/health_public";
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
            health_public = json;
            
            console.log("Found " + health_public.length);
        }else{
            console.log("ERROR!");
        }
	}
	async function siguientePagina() {
		const res = await fetch("/api/v1/health_public/");
		const json = await res.json();
		if(offset < json.length - 10 ){
			offset = offset + 10;
			get_all_health_public(offset);
		}
	};
	async function anteriorPagina() {
		if (offset - 10 >= 0){
			offset = offset - 10;
			get_all_health_public(offset);
		}
	};
</script>



<main>
	{#await health_public}
		Loading health_public...
	{:then health_public_}
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
				<th>Gasto Total</th>
				<th>Gasto Público</th>
				<th>Gasto Público (%PIB)</th>
				<th> Acciones </th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Input placeholder="Ex. argentina" bind:value = "{new_health_public.country}" /></td>
				<td><Input type="number" required placeholder="Ej. 2020" bind:value = "{new_health_public.year}" /></td>
				<td><Input type="number" required placeholder="0" step="0.01"  bind:value = "{new_health_public['total_spending']}" /></td>
				<td><Input type="number" required placeholder="0" step="0.01"  bind:value = "{new_health_public['public_spending']}" /></td>
				<td><Input type="number" required placeholder="0" step="0.01"  bind:value = "{new_health_public['public_spending_pib']}" /></td>
				<td><Button outline color= "primary" on:click= {insert_health_public}>Insertar</Button></td>
			</tr>

			{#each health_public_ as health_public}
				<tr>

				
					<td>
						<a href="#/health_public/{health_public.country}/{health_public.year}"> 
						{health_public.country}
					</a>
					</td>
					<td>{health_public.year}</td>
				
					<td>{health_public['total_spending']}</td>
					<td>{health_public['public_spending']}</td>
					<td>{health_public['public_spending_pib']}</td>
					<td><Button outline color= "danger" on:click = "{delete_health_public(health_public.country,health_public.year)}">Borrar</Button></td>
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
	<Button outline color= "danger" on:click = {delete_all_health_public}>Borrar todo</Button>
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		margin: 0 auto;
	}
</style>