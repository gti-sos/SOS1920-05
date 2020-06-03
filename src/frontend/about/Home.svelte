<script> 
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
  </script>
  <center>
      <h1>ABOUT
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
  
  <table id="customers">
      <thead>
          <tr>
              <th scope="row">About</th>
          </tr>
      </thead>
  
      <tbody>
        <tr>
      
          <td><a href="enlace">Enlace Video Diego</a></td>
          <td><a href="enlace">Enlace Video Mario</a></td>
          <td><a href="enlace">Enlace Video Mathias</a></td>
      
        </tr>
      </tbody>
  </table>
  <p></p>
  <Button outline color="secondary" on:click="{pop}"> Volver</Button>