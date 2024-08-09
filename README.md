# ATProject-Fabrizzio-Villanueva

Ante todo buenas tardes, escribo este Readme para que quede como constancia de las justificaciones de este proyecto.

1. Utilización de buenas prácticas: Se han usado este proyecto la aplicación de patrones de diseño en la experiencia UI/UX, agrupando la gran mayoría de clases reutilizables de acuerdo a su función. De igual forma se aplicaron los principios SOLID que en conjunto con el framework de Angular permite su aplicación de forma correcta y casi intuitiva.

2. Arquitectura de frontend: Para la arquitectura de frontend, se uso Agular 18, debido a la modularidad del proyecto y que permita más adelante una mejor escalibidad. En especial, considerando que aumente la complejidad del proyecto de lo que tal vez se pide en le documento.

3. Manejo de transacciones: Se aplicó de manera parcial la lógica de SAGA de tratado de manejo de transacciones ya sea para el manejo de pagos como de otras comunicaciones en un orquestado general.
  
4. Modelo de datos utilizado: Para las casuisticas financieras o de pago, he manejado POSTGRE SQL, por lo que aplique la misma lógica en este pequeño proyecto, donde he usado la lógica de normalización de base de datos para poder contener la gran mayoria de datos en la menor cantidad de tablas posibles.

5. Observaciones:
      - Han habido funcionalidades cortadas, debido a que mi estimación inicial fue bastante optimista y no considere la complejidad que de por si tenía pensado para este proyecto.
      - Respecto al último punto, como ya explique también mediante el chat de WhatsApp, considero que acompleje la casuistica mostrada, más de la que tal vez debió ser, por lo que tuve que cortar ciertos detalles.



