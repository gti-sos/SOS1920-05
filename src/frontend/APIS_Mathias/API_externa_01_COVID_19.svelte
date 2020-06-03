<script>
  import { onMount } from "svelte";
  import { pop } from "svelte-spa-router";
  import Table from "sveltestrap/src/Table.svelte";
  import Button from "sveltestrap/src/Button.svelte";

  async function loadGraph() {
    let MyData = [];
    let OtherData = [];
    const url = "https://coronavirus-tracker-api.herokuapp.com/v2/locations";

    const resData = await fetch("/api/v1/life_expectancies");
    MyData = await resData.json();

    console.log("Fetching url...");
    const res = await fetch(url);
    if (res.ok) {
      console.log("Ok");
      OtherData = await res.json();
    } else {
      console.log("Error al cargar API externa");
    }

    let MyDataGraph = MyData.map(x => {
      let res = {
        name: x.country + " " + x.year,
        value: x["average_life_expectancy"]
      };
      return res;
    });
    // 		let reformattedArray = OtherData;
    // 		 reformattedArray.forEach((obj)=>{
    //   			 let rObj = {name: obj.country + " " + obj.id, value: obj["deaths"]};
    //    					//rObj[obj.country] = obj.deaths;
    //    				return rObj;
    //    });
    //         let OtherDataGraph = OtherData.(x => {
    // 			let res = {name: x.country + " " + x.id, value: x["deaths"]};
    // 			return res;
    //         });
    //         let utilData = OtherData.data;
    let OtherDataGraph = OtherData.filter(y => {
      return y.position == "G";
    }).map(x => {
      let res = { name: x.country + " " + x.id, value: x.deaths };
      return res;
    });

    let datosConjuntos = [
      { name: "Esperanza de vida media", data: MyDataGraph },
      { name: "Casos de muertes por COVID 19", data: reformattedArray }
    ];

    anychart.onDocumentReady(function() {
      // create data
      var data = [reformattedArray];

      // create a chart
      var chart = anychart.polar();

      // create a polygon series and set the data
      var series = chart.polygon(data);

      // set the type of the x-scale
      chart.xScale("ordinal");

      // enable sorting points by x
      chart.sortPointsByX(true);

      // set the inner radius
      chart.innerRadius(50);

      // set the chart title
      chart.title("Polygon Chart: Basic Sample");

      // set the container id
      chart.container("container");

      // initiate drawing the chart
      chart.draw();
    });
    series: datosConjuntos;
  }
</script>

<style>
  html,
  body,
  #container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>

<svelte:head>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js">

  </script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-ui.min.js">

  </script>
  <script
    src="https://cdn.anychart.com/releases/v8/js/anychart-exports.min.js"
    on:load={loadGraph}>

  </script>

</svelte:head>
<main>
  <h3>Grafica esperanza de vida en media con casos de muertes por COVID 19</h3>

  <div id="container" />

  <Button outline color="secondary" on:click={pop}>Volver</Button>

</main>
