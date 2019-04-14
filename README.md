##Aplicacion clima ciudades

Permite saber el clima de las ciudades del mundo usando el API 
```https://rapidapi.com/dev132/api/city-geo-location-lookup ``` para conocer las coordenadas de una ciudad 
y la API de openweather para saber el clima con esas coordenadas

```
node app -d 'Nombre Ciudad'
```

######Ejemplos de como usarla
node app -d "Columbia, MD"
node app -d Madrid
node app -d "New York"

Instalar modulos necesarios: ```npm install```