<script>
  import Button from "sveltestrap/src/Button.svelte";
  import {pop} from "svelte-spa-router";
</script> 

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

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
            <th scope="row">APIs integradas por Mario</th>
        </tr>
    </thead>

    <tbody>
      <tr>
        <td><a href="/#/integrations/APIS_Mario/G01">Grupo 01</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mario/G02">Grupo 02</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mario/G04">Grupo 04</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mario/G06">Grupo 06</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mario/G07">Grupo 07</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mario/G08">Grupo 08</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mario/G09">Grupo 09</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mario/G22">Grupo 22</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mario/G24">Grupo 24 (proxy)</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mario/GE1">API Externa 1</a></td>
      </tr>
      <tr>
        <td><a href="/#/integrations/APIS_Mario/GE2">API Externa 2</a></td>
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
