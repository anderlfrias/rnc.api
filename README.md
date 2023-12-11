# API para Obtener Datos de Contribuyente por RNC (DGII Scraper)

## Descripción

Esta API proporciona un servicio para obtener información de contribuyentes en la República Dominicana a partir de su RNC (Registro Nacional de Contribuyentes). Utiliza técnicas de scraping para extraer datos de la página web oficial de la DGII (Dirección General de Impuestos Internos).

**Importante:** Ten en cuenta las políticas de uso de la DGII y asegúrate de cumplir con todas las regulaciones y términos de servicio al utilizar esta API.

## Instalación

1. Clona el repositorio:
    ```
    git clone https://github.com/anderlfrias/rnc.api
    ```js

2. Instala las dependencias:
    ```
    cd rnc.api
    npm install
    ```js

## Uso

1. Inicia la API:
    ```
    npm run dev
    ```js
    **Nota**: Asegurate de tener `mongodb` installado

2. Realiza una solicitud HTTP GET a la siguiente ruta:
    ```
    GET /scraping?rnc={rnc_que_desea_consultar}
    ```js
    
