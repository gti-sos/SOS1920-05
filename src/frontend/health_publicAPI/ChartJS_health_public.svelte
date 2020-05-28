<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    async function loadGraph() {
  
        let MyData = [];
        const resData = await fetch("/api/v1/health_public");
        MyData = await resData.json();

        let countries = Array.from(new Set(MyData.filter(d => d.year == 2015).map((d) => {return d.country;})));
        let spending = Array.from(new Set(MyData.filter(d => d.year == 2015).map((d) => {return d["total_spending"];})));

        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: countries,
                datasets: [{
                    data: spending,
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.25)',
                        'rgba(0, 180, 0, 0.25)',
                        'rgba(0, 127, 255, 0.25)',
                        'rgba(255, 255, 0, 0.25)',
                        'rgba(0, 0, 0, 0.25)',
                    ],
                    borderColor: [
                        'rgba(255, 0, 0, 0.5)',
                        'rgba(0, 180, 0, 0.5)',
                        'rgba(0, 127, 255, 0.5)',
                        'rgba(255, 255, 0, 0.5)',
                        'rgba(0, 0, 0, 0.5)',
                    ],
                    borderWidth: 2
                }]
            },
            options: {

                title: {
                    display: true,
                    text: 'Gráfica que refleja el gasto público en salud en el año 2015 (en millones €)',
                    fontSize: 20,
                    fontColor: '#000000',
                    padding: 20
                }, 
            }  
        });
    }
  
</script>

<canvas id="myChart" width="0" height="0"></canvas>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0" on:load={loadGraph}></script>
</svelte:head>

<main >
    <p></p>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
    <p></p>
    <div  id="chart"></div>

</main>
<style>
	main {
		text-align: center;
	}
</style>