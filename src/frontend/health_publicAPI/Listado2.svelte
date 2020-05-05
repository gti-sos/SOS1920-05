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
    
	let health_public = [];
	let new_health_public = {
		"country": "",
		"year": "",
		"total_spending": "",
		"public_spending": "",
		"public_spending_pib": ""
	};
	/* Select variables */
	let countries = [];
	let years = [];
	let current_country= "-";
	let current_year= "-";

	onMount(get_all_health);
	
	async function get_all_health() {
		console.log("Fetching get_all_health...");
		const res = await fetch("/api/v1/health_public");
		if (res.ok) {
			console.log("OK:");
			const json = await res.json();
			health_public = json;
			 
			/* getting countries */
			countries = json.map((d) => {
				return d.country;
			});
			countries = Array.from(new Set(countries));
				/* getting years */
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
	async function insert_health() {
		console.log("Inserting public health ...");
		if (new_health_public.country == ""
			|| new_health_public.country == null
			|| new_health_public.year == ""
			|| new_health_public.year == null
			|| new_health_public.total_spending == ""
			|| new_health_public.total_spending == null
			|| new_health_public.public_spending == ""
			|| new_health_public.public_spending == null
			|| new_health_public.public_spending_pib === ""
			|| new_health_public.public_spending_pib == null) {
			alert("Es obligatorio rellenar todos los campos");
			console.log("ERROR");
		} else {
			const res = await fetch("/api/v1/health_public", {
				method: "POST",
				body: JSON.stringify(new_health_public),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				get_all_health();
				alert("Datos insertados con éxito");
			});
		};
	}
	async function delete_one_health(country, year) {
		console.log("Deleting one public health...");
		const res = await fetch("/api/v1/health_public" + "/" + country + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			get_all_health();
			alert("Datos borrados correctamente");
		});
	}
	async function delete_all_health() {
		console.log("Deleting all public healths...");
		const res = await fetch("/api/v1/health_public", {
			method: "DELETE"
		}).then(function (res) {
			get_all_health();
			alert("Todos los datos borrados con éxito");
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
			<Label for="selectYear">Año</Label>
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
					<th>Gasto total</th>
					<th>Gasto público</th>
                    <th>Gasto público (PIB)</th>
					<th> Acciones </th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><Input placeholder="Ej. España" bind:value = "{new_health_public.country}" /></td>
					<td><Input type="number" required placeholder="Ej. 2020" bind:value = "{new_health_public.year}" /></td>
					<td><Input type="number" required placeholder="0.0" step="0.01" min="0" bind:value = "{new_health_public['total_spending']}" /></td>
					<td><Input type="number" required placeholder="0.0" step="0.01" min="0" bind:value = "{new_health_public['public_spending']}" /></td>
					<td><Input type="number" required placeholder="0.0" step="0.01" min="0" bind:value = "{new_health_public['public_spending_pib']}" /></td>
					<td><Button outline color= "primary" on:click= {insert_health}>Insertar</Button></td>
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
						<td><Button outline color= "danger" on:click = "{delete_one_health(health_public.country,health_public.year)}">Borrar</Button></td>
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
	<Button outline color= "danger" on:click = {delete_all_health}>Borrar todo</Button>

</main>