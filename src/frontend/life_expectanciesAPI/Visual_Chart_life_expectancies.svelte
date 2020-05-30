
<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    import ApexCharts from 'apexcharts'

    async function loadGraph() {
  
    let MyData = [];
    const resData = await fetch("/api/v1/life_expectancies");
    MyData = await resData.json();
    let countries = Array.from(new Set(MyData.filter(d => d.year == 2016).map((d) => {return d.country;})));
    let Women = Array.from(new Set(MyData.filter(d => d.year == 2016).map((d) => {return d["Women"];})));
    
        var options = {
          series: Women,
          chart: {
          width: 600,
          type: 'cylinder',
        },
        labels: countries,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
      

  }
  
</script>




<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts" on:load={loadGraph}></script>
</svelte:head> 

<main >
    <h3>Esperanza de vida de mujeres en 2016</h3>
    <h6>Gráfica en la que se muestran la esperanza de vida de mujeres en 2016</h6>
    <div  id="chart" style="min-width: 310px; max-width: 800px; height: 400px; margin:auto"></div>
    <p></p>
    <Button outline color="secondary" on:click="{pop}"> Volver</Button>

</main>
<style>
	main {
		text-align: center;
	}
</style>