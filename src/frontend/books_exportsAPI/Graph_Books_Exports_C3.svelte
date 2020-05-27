
<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    import ApexCharts from 'apexcharts'

    async function loadGraph() {
  
    let MyData = [];
    const resData = await fetch("/api/v1/books-exports");
    MyData = await resData.json();
    let countries = Array.from(new Set(MyData.filter(d => d.year == 2015).map((d) => {return d.country;})));
    let books = Array.from(new Set(MyData.filter(d => d.year == 2015).map((d) => {return d["exp_book"];})));
    
        var options = {
          series: books,
          chart: {
          width: 600,
          type: 'donut',
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
    <h3>Exportaciones de libros 2016</h3>
    <h6>Gráfica en la que se muestran las exportaciones de libros del año 2016</h6>
    <div  id="chart" style="min-width: 310px; max-width: 800px; height: 400px; margin:auto"></div>
    <p></p>
    <Button outline color="secondary" on:click="{pop}"> Volver</Button>

</main>
<style>
	main {
		text-align: center;
	}
</style>