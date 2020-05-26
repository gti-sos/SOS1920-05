<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    let life_expectancies = {};
    let updated_country = "";
    let updated_year = "";
    let updated_women_life_expectancy = "";
    let updated_men_life_expectancy = "";
    let updated_average_life_expectancy = "";

    onMount(get_life_expectancies);

    async function get_life_expectancies() {
        console.log("Fetching life expectancies...");
        const res = await fetch("/api/v1/life_expectancies/" + params.country + "/" + params.year);
        
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            life_expectancies = json;
            updated_country = life_expectancies.country;
            updated_year = life_expectancies.year;
            updated_women_life_expectancy = life_expectancies["women_life_expectancy"];
            updated_men_life_expectancy = life_expectancies["men_life_expectancy"];
            updated_average_life_expectancy = life_expectancies["average_life_expectancy"];
            console.log("life expectancies recibidos.");
        } else {
            console.log("ERROR!");
        }
    }
    async function update_life_expectancies() {
        console.log("Updating life expectancies...");
        if (updated_country == ""
			|| updated_country == null
			|| updated_year == ""
			|| updated_year == null
			|| updated_women_life_expectancy == ""
			|| updated_women_life_expectancy == null
			|| updated_men_life_expectancy == ""
			|| updated_men_life_expectancy == null
			|| updated_average_life_expectancy == ""
			|| updated_average_life_expectancy == null) {
			alert("Es obligatorio completar todos los recursos");
			console.log("ERROR!");
		} else {
        const res = await fetch("/api/v1/life_expectancies/" + params.country + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                year: parseInt(params.year),
                "women_life_expectancy": updated_women_life_expectancy,
                "men_life_expectancy": updated_men_life_expectancy,
                "average_life_expectancy": updated_average_life_expectancy
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            get_life_expectancies();
            if(res.ok){
                alert("Recurso actualizado con éxito");
            }else{
                alert("Introduce los datos correctamente ");
            }
        })
        }}
</script>
<main>
    <h3>Editar datos: <strong>{params.country}</strong> <strong>{params.year}</strong> </h3>
    {#await life_expectancies}
        Loading life_expectancies...
    {:then life_expectancies}
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
                    <td>{updated_country}</td>
                    <td>{updated_year}</td>
                    <td><input required type="number" step="1" min="0" bind:value="{updated_women_life_expectancy}"></td>
                    <td><input required type="number" step="1" min="0" bind:value="{updated_men_life_expectancy}"></td>
                    <td><input required type="number" step="1" min="0" bind:value="{updated_average_life_expectancy}"></td>
                    <td> <Button outline  color="primary" on:click={update_life_expectancies}>Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>