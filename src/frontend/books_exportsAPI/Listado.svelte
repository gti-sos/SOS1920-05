<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";
	import {
		pop
    } from "svelte-spa-router";
    
	let books_exports = [];
	let new_books_exports = {
		"country": "",
		"year": "",
		"exp_book": "",
		"exp_editorial": "",
		"exp_graphic_sector":""
	};

	/* Select variables */
	let countries = [];
	let years = [];
	let current_country= "-";
	let current_year= "-";

	onMount(get_all_exports);

	async function get_all_exports() {
		console.log("Fetching get_all_exports...");
		const res = await fetch("/api/v1/books-exports");
		if (res.ok) {
			console.log("OK:");
			const json = await res.json();
			books_exports = json;

			countries = json.map((d) => {
				return d.country;
			});
			countries = Array.from(new Set(countries));
				
			years = json.map((d) => {
				return d.year;
			});
			years = Array.from(new Set(years));
			console.log("Received " + books_exports.length);
		}
		else {
			console.log("ERROR!");
		}
	}

	async function insert_exportation() {
		console.log("Inserting exportion...");
		if (new_books_exports.country == ""
			|| new_books_exports.country == null
			|| new_books_exports.year == ""
			|| new_books_exports.year == null) {
			alert("Es obligatorio el campo País y año");
		} else {
			const res = await fetch("/api/v1/books-exports", {
				method: "POST",
				body: JSON.stringify(new_books_exports),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				get_all_exports();
			});
		};
	}

	async function delete_exportation(country, year) {
		console.log("Deleting exportation...");
		const res = await fetch("/api/v1/books-exports" + "/" + country + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			get_all_exports();
		});
	}

	async function delete_all_exports() {
		console.log("Deleting all exports...");
		const res = await fetch("/api/v1/books-exports", {
			method: "DELETE"
		}).then(function (res) {
			get_all_exports();
		});
	}
	async function searchYears(country){
        console.log("Searching years in country...");
		const res = await fetch("/api/v1/books-exports/" + country)
		
		if (res.ok){
            const json = await res.json();
			books_exports = json;
			
			books_exports.map((d)=>{
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
		var url = "/api/v1/books-exports";
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
            books_exports = json;
            
            console.log("Found " + books_exports.length);
        }else{
            console.log("ERROR!");
        }
    }
</script>



<main>
	{#await books_exports}
		Loading books_exports...
	{:then books_exports_}
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
				<th>Exportaciones de libros</th>
				<th>Exportaciones de editoriales</th>
				<th>Exportaciones del sector gráfico</th>
				<th> Acciones </th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Input placeholder="Ex. argentina" bind:value = "{new_books_exports.country}" /></td>
				<td><Input type="number" required placeholder="Ej. 2020" bind:value = "{new_books_exports.year}" /></td>
				<td><Input type="number" placeholder="0" step="1" min="0" bind:value = "{new_books_exports['exp_book']}" /></td>
				<td><Input type="number" placeholder="0" step="1" min="0" bind:value = "{new_books_exports['exp_editorial']}" /></td>
				<td><Input type="number" placeholder="0" step="1" min="0" bind:value = "{new_books_exports['exp_graphic_sector']}" /></td>
				<td><Button outline color= "primary" on:click= {insert_exportation}>Insertar</Button></td>
			</tr>

			{#each books_exports_ as books_exports}
				<tr>

				
					<td>
						<a href="#/books-exports/{books_exports.country}/{books_exports.year}"> 
						{books_exports.country}
					</a>
					</td>
					<td>{books_exports.year}</td>
				
					<td>{books_exports['exp_book']}</td>
					<td>{books_exports['exp_editorial']}</td>
					<td>{books_exports['exp_graphic_sector']}</td>
					<td><Button outline color= "danger" on:click = "{delete_exportation(books_exports.country,books_exports.year)}">Borrar</Button></td>
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
	<Button outline color="secondary" on:click="{pop}">Atrás</Button>
	<Button outline color= "danger" on:click = {delete_all_exports}>Borrar todo</Button>
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		margin: 0 auto;
	}
</style>