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
    let health_public = {};
    let updated_country = "";
    let updated_year = "";
    let updated_total_spending = "";
    let updated_public_spending = "";
    let updated_public_spending_pib = "";

    onMount(get_health_public);

    async function get_health_public() {
        console.log("Fetching health_public...");
        const res = await fetch("/api/v1/health_public/" + params.country + "/" + params.year);
        
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            health_public = json;
            updated_country = health_public.country;
            updated_year = health_public.year;
            updated_total_spending = health_public["total_spending"];
            updated_public_spending = health_public["public_spending"];
            updated_public_spending_pib = health_public["public_spending_pib"];
            console.log("Received resource.");
        } else {
            console.log("ERROR!");
        }
    }
    async function update_health_public() {
        console.log("Updating public health...");
        if (updated_country == ""
			|| updated_country == null
			|| updated_year == ""
			|| updated_year == null
			|| updated_total_spending == ""
			|| updated_total_spending == null
			|| updated_public_spending == ""
			|| updated_public_spending == null
			|| updated_public_spending_pib == ""
			|| updated_public_spending_pib == null) {
			alert("Es obligatorio completar todos los recursos");
			console.log("ERROR!");
		} else {
        const res = await fetch("/api/v1/health_public/" + params.country + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                year: parseInt(params.year),
                "total_spending": updated_total_spending,
                "public_spending": updated_public_spending,
                "public_spending_pib": updated_public_spending_pib
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            get_health_public();
            if(res.ok){
                alert("Datos actualizados");
            }else{
                alert("Introduce correctamente los datos");
            }
        })
        }}
</script>
<main>
    <h3>Editar datos: <strong>{params.country}</strong> <strong>{params.year}</strong> </h3>
    {#await health_public}
        Loading health_public...
    {:then health_public}
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
                    <td>{updated_country}</td>
                    <td>{updated_year}</td>
                    <td><input required type="number" step="0.01" min="0" bind:value="{updated_total_spending}"></td>
                    <td><input required type="number" step="0.01" min="0" bind:value="{updated_public_spending}"></td>
                    <td><input required type="number" step="0.01" min="0" bind:value="{updated_public_spending_pib}"></td>
                    <td> <Button outline  color="primary" on:click={update_health_public}>Editar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>