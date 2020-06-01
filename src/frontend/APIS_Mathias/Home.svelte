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
            <th scope="row">Integraciones de APIs Mathias</th>
        </tr>
    </thead>

    <tbody>
      <tr>
        <td><a href="/#/integrations/APIS_Mathias/Grupo_01_poverty_stats">Grupo_01_poverty_stats</a></td>
      </tr>
     <tr>
        <td><a href="/#/integrations/APIS_Mathias/Grupo_02_rural_tourism">Grupo_02_rural_tourism</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mathias/Grupo_04_vehicles">Grupo_04_vehicles</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mathias/Grupo_07_imports">Grupo_07_imports</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mathias/Grupo_09_plugin_vehicles">Grupo_09_plugin_vehicles</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mathias/Grupo_12_overdose_death">Grupo_12_overdose_death</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mathias/Grupo_23_cigarretes_sales">Grupo_23_cigarretes_sales</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mathias/Grupo_25_happiness_rate">Grupo_25_happiness_rate</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mathias/Grupo_27_life_quality">Grupo_27_life_quality</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mathias/Grupo_28_gce">Grupo_28_gce</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mathias/API_externa_01">API_externa_01</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mathias/API_externa_02">API_externa_02</a></td>
      </tr>
     
     

    </tbody>
</table>

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

<p></p>
 <p align="center">
        <Button outline color="secondary" on:click="{pop}">Atrás</Button>
  </p>