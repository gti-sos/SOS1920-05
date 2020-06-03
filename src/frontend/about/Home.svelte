<script> 
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
  </script>
  <center>
      <h1>Vídeos de Presentación
      </h1>
  </center>
  
  <head>
  <style>
  #customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  }
  
  #customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
  }
  
  #customers tr:nth-child(even){background-color: #f2f2f2;}
  
  #customers tr:hover {background-color: #ddd;}
  
  #customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
  }
  </style>
  </head>
  
  <br>
  <br>
  
<main><center>

  <h4>API de Libros</h4>
  <p>
  <iframe width="480" height="270" src="https://www.youtube.com/embed/GdlT1KT-oPo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </p>
  <h4>API de Gastos</h4>
  <p>
  <iframe width="480" height="270" src="https://www.youtube.com/embed/GdlT1KT-oPo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </p>
  <h4>API de Esperanza de vida</h4>
  <p>
  <iframe width="480" height="270" src="https://www.youtube.com/embed/GdlT1KT-oPo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </p>

  <p><Button outline color="secondary" on:click="{pop}"> Volver</Button></p>
  
</center></main>