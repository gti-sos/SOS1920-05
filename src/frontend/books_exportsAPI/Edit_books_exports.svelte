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
    let books_exports = {};
    let updated_country = "";
    let updated_year = 0.0;
    let updated_exp_book = 0.0;
    let updated_exp_editorial = 0.0;
    let updated_exp_graphic_sector = 0.0;

    onMount(get_books_exports);

    async function get_books_exports() {
        console.log("Fetching books_exports...");
        const res = await fetch("/api/v1/books-exports/" + params.country + "/" + params.year);
        
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            books_exports = json;
            updated_country = books_exports.country;
            updated_year = books_exports.year;
            updated_exp_book = books_exports["exp_book"];
            updated_exp_editorial = books_exports["exp_editorial"];
            updated_exp_graphic_sector = books_exports["exp_graphic_sector"];
            console.log("Received exportation.");
        } else {
            console.log("ERROR!");
        }
    }
    async function update_books_exports() {
        console.log("Updating books_exports...");
        const res = await fetch("/api/v1/books-exports/" + params.country + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                year: parseInt(params.year),
                "exp_book": updated_exp_book,
                "exp_editorial": updated_exp_editorial,
                "exp_graphic_sector": updated_exp_graphic_sector
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            get_books_exports();
            if(res.ok){
                alert("Exportación actualizada con éxito");
            }else{
                alert("Introduce correctamente los datos");
            }
        })
        }
</script>
<main>
    <h3>Editar datos: <strong>{params.country}</strong> <strong>{params.year}</strong> </h3>
    {#await books_exports}
        Loading books_exports...
    {:then books_exports}
        <Table bordered>
            <thead>
				<tr>
					<th>País</th>
					<th>Año</th>
					<th>Exportaciones de libros</th>
					<th>Exportaciones de editoriales</th>
                    <th>Exportaciones del sector grafico</th>
                    <th> Acciones </th>
				</tr>
			</thead>
            <tbody>
                <tr>
                    <td>{updated_country}</td>
                    <td>{updated_year}</td>
                    <td><input required type="number" step="1" min="0" bind:value="{updated_exp_book}"></td>
                    <td><input required type="number" step="1" min="0" bind:value="{updated_exp_editorial}"></td>
                    <td><input required type="number" step="1" min="0" bind:value="{updated_exp_graphic_sector}"></td>
                    <td> <Button outline  color="primary" on:click={update_books_exports}>Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>