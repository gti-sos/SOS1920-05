<script> 
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>
<center>
    <h1>Integraciones
    </h1>
</center>

<head>

</head>

<br>
<br>

<table id="customers">
    <thead>
        <tr>
            <td scope="row">APIs integradas por Diego</td>
        </tr>
    </thead>

    <tbody>
      <tr>
        <td><a href="/#/integrations/APIS_Diego/Grupo01">Grupo 01</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Diego/Grupo09">Grupo 09</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Diego/Grupo10">Grupo 10</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Diego/Grupo11">Grupo 11</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Diego/Grupo21">Grupo 21</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Diego/Grupo22">Grupo 22</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Diego/Grupo23">Grupo 23</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Diego/Grupo26">Grupo 26</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Diego/Grupo28">Grupo 28</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Diego/Grupo30">Grupo 30</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Diego/GrupoExt1">API Externa 1</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Diego/GrupoExt2">API Externa 2</a></td>
      </tr>

    </tbody>
</table>

<Button outline color="secondary" on:click="{pop}"> Volver</Button>

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