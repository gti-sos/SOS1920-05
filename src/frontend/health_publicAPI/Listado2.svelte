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
	let from= "-";
	let to= "-";
	let offset = 0;
	let limit = 10;
	let MensajeError = false;
	let MensajeCorrecto = false;

	onMount(get_all_spending);

	async function get_all_spending(offset) {
		console.log("Fetching all spendings...");
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
			console.log("Recibido " + health_public.length);
		}
		else {
			console.log("ERROR!");
		}
	}

	async function insert_spending() {
		console.log("Inserting spending...");
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
					alert("Gasto ya existente");
				}else{
				get_all_spending(offset);
				alert("Gasto insertado con éxito");
				}
			});
		};
	}

	async function delete_spending(country, year) {
		console.log("Borrando gasto...");
		const res = await fetch("/api/v1/health_public" + "/" + country + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			get_all_spending(offset);
			alert("Gasto borrado con éxito");
		});
	}

	async function delete_all_spending() {
		console.log("Borrando todas los gastos...");
		const res = await fetch("/api/v1/health_public", {
			method: "DELETE"
		}).then(function (res) {
			get_all_spending(offset);
			alert("Todas los gastos borrados con éxito");
		});
	}
	async function searchYears(country){
        console.log("Buscando por año...");
		const res = await fetch("/api/v1/health_public/" + country)
		
		if (res.ok){
            const json = await res.json();
			health_public = json;
			
			health_public.map((d)=>{
			return d.year;
			});
			alert("Búsqueda encontrada");
			console.log("Años actualizados")
		}else {
			alert("No existe");
			console.log("ERROR!")
			get_all_spending(offset);
		}
	}
	
	async function search(country, year){
        console.log("Buscando: " + country + "y " + year);
		
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
            alert("Busqueda encontrada");
            console.log("Found " + health_public.length);
        }else{
			alert("No existe");
			console.log("ERROR!");
			get_all_spending(offset);
        }
	}
	
	async function searchRange(from, to){
        console.log("Buscando: " + from + "hasta" + to);
		
		var url = "/api/v1/health_public";

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
            health_public = json;
            alert("Búsqueda encontrada");
            console.log("Found " + health_public.length);
        }else{
			alert("Introduzca el rango");
			console.log("ERROR!");
			get_all_spending(offset);
        }
	}


	async function nextPage() {
		const res = await fetch("/api/v1/health_public/");
		const recursos = await res.json();
		if(offset < recursos.length - 10 ){
			offset = offset + 10;
			get_all_spending(offset);
		}
	};
	async function previousPage() {
		if ( 0 <= offset - 10){
			offset = offset - 10;
			get_all_spending(offset);
		}
	};
</script>



<main>
	{#await health_public}
		Loading health_public...
	{:then health_public_}
	<Table>
		<tr>
			<td>
		<FormGroup> 
			
			<b><Label for="selectCountry">Búsqueda por país </Label></b>
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
				<b><Label for="selectYear">Búsqueda por año</Label></b>
				
					<Input type="select" name="selectYear" id="selectYear" bind:value = "{current_year}">
					{#each years as year}
					<option>{year}</option>
					{/each}
					<option>-</option>
					</Input>
		</FormGroup>
		</td>
		</tr>
		<Button outline color="secondary" on:click="{search(current_country, current_year)}">Buscar</Button>
		<p></p>
		<h6>Búsqueda por rango de años</h6>
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
</tr>
		<Button outline color="secondary" on:click="{searchRange(from, to)}">Buscar</Button>
	
	</Table>
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
				<td><Input placeholder="Ej. argentina" bind:value = "{new_health_public.country}" /></td>
				<td><Input type="number" required placeholder="Ej. 2020" bind:value = "{new_health_public.year}" /></td>
				<td><Input type="number" required placeholder="0" step="0.01"  bind:value = "{new_health_public['total_spending']}" /></td>
				<td><Input type="number" required placeholder="0" step="0.01"  bind:value = "{new_health_public['public_spending']}" /></td>
				<td><Input type="number" required placeholder="0" step="0.01"  bind:value = "{new_health_public['public_spending_pib']}" /></td>
				<td><Button outline color= "primary" on:click= {insert_spending}>Insertar</Button></td>
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
					<td><Button outline color= "danger" on:click = "{delete_spending(health_public.country,health_public.year)}">Borrar</Button></td>
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
		<Button outline color="secondary" on:click="{previousPage}"> <b><strong><h4> &lt;</h4></strong></b></Button>
		<Button outline color="secondary" on:click="{nextPage}"><b><strong><h4> &gt;</h4> </strong></b></Button>
	</p>
		
		
	<Button outline color="secondary" on:click="{pop}">Atrás</Button>
	<Button outline color= "danger" on:click = {delete_all_spending}>Borrar todo</Button>
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		margin: 0 auto;
	}
</style>