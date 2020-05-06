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
    let updated_country;
    let updated_year;
    let updated_women_life_expectancies;
    let updated_men_life_expectancies;
    let updated_average_life_expectancies;

    onMount(get_life_expectancies);

    async function get_life_expectancies() {
        console.log("Fetching life_expectancies...");
        const res = await fetch("/api/v1/life_expectancies/" + params.country + "/" + params.year);
        console.log(res);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            life_expectancies = json;
            updated_country = life_expectancies.country;
            updated_year = life_expectancies.year;
            updated_women_life_expectancies = life_expectancies.women_life_expectancies;
            updated_men_life_expectancies = life_expectancies.men_life_expectancies;
            updated_average_life_expectancies = life_expectancies.average_life_expectancies;
            console.log("Received");
        } else {
            console.log("ERROR!");
        }
    }
    async function update_life_expectancies() {
        console.log("Updating life_expectancies...");
        if (updated_country == ""
			|| updated_country == null
			|| updated_year == ""
			|| updated_year == null
			|| updated_women_life_expectancies == ""
			|| updated_women_life_expectancies == null
			|| updated_men_life_expectancies == ""
			|| updated_men_life_expectancies == null
			|| updated_average_life_expectancies == ""
			|| updated_average_life_expectancies == null) {
			alert("Es obligatorio completar todos los recursos");
			console.log("ERROR!");
		} else {
        const res = await fetch("/api/v1/life_expectancies/" + params.country + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                year: parseInt(params.year),
                women_life_expectancies: updated_women_life_expectancies,
                men_life_expectancies: updated_men_life_expectancies,
                average_life_expectancies: updated_average_life_expectancies
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            get_life_expectancies();
            if(res.ok){
                alert("Actualizada con éxito");
            }else{
                alert("Introduce correctamente los datos");
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
					<th>Vidas de mujeres</th>
					<th>Vidas de hombres</th>
                    <th>Promedio de vidas</th>
                    <th> Acciones </th>
				</tr>
			</thead>
            <tbody>
                <tr>
                    <td>{updated_country}</td>
                    <td>{updated_year}</td>
                    <td><input bind:value="{updated_women_life_expectancies}"></td>
                    <td><input bind:value="{updated_men_life_expectancies}"></td>
                    <td><input bind:value="{updated_average_life_expectancies}"></td>
                    <td> <Button outline  color="primary" on:click={update_life_expectancies}>Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>