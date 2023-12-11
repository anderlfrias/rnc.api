# API para Obtener Datos de Contribuyente por RNC (DGII Scraper)

## Descripción

Esta API proporciona un servicio para obtener información de contribuyentes en la República Dominicana a partir de su RNC (Registro Nacional de Contribuyentes). Utiliza técnicas de scraping para extraer datos de la página web oficial de la DGII (Dirección General de Impuestos Internos).

**Importante:** Ten en cuenta las políticas de uso de la DGII y asegúrate de cumplir con todas las regulaciones y términos de servicio al utilizar esta API.

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/anderlfrias/rnc.api
    ```

2. Instala las dependencias:
    ```bash
    cd rnc.api
    npm install
    ```

## Uso

1. Inicia la API:
    ```bash
    npm run dev
    ```
    **Nota**: Asegurate de tener `mongodb` installado

2. Realiza una solicitud HTTP GET a la siguiente ruta:
    ```bash
    GET /scraping?rnc={rnc_que_desea_consultar}
    ```
    
