<script> 
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
  </script>
  <center>
      <h1>Vídeos de Presentación
      </h1>
  </center>
  
  <br>
  <br>
  
<main>
  <center>
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
  </center>
</main>