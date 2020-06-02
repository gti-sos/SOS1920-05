
<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    import anychart from "anychart";
    
    async function loadGraph() {
      
    let MyData = [];
    const resData = await fetch("/api/v1/life_expectancies");
    MyData = await resData.json();
    
    let countries = Array.from(new Set(MyData.filter(d => d.year == 2015).map((d) => {return d.country;})));
    let women_life_expectancy = Array.from(new Set(MyData.map((d) => {return d["women_life_expectancy"];})));
    

    // create data
    var data = [countries, women_life_expectancy];
      
    
    // create a chart
    var chart = anychart.pie();

    // create an area series and set the data
    var series = chart.data(data);

    // set the chart title
    chart.title("Radar Area Chart");

    // set the container id
    chart.container("container");

    // initiate drawing the chart
    chart.draw(true);
//});
        
    }
 
</script>


<svelte:head>
<script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-base.min.js?hcode=a0c21fc77e1449cc86299c5faa067dc4" on:load={loadGraph}></script>
</svelte:head> 

<main >
    <p></p>
    <Button outline color="secondary" on:click="{pop}"> Volver</Button>
      <p></p>
    <div id="container"></div>

</main>

<style>

html, body, #container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>