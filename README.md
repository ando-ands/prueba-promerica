# Prueba Técnica: Landing Page de Ventas Digitales
Candidato: Andrés Alvarado  
Producto: Tarjetas de Crédito — Banco Promerica Guatemala  

---

## 1. Planteamiento de la solución (Cómo lo pensé antes de construir)

¿Cuál es el objetivo principal de la página?  
Convencer a personas interesadas en una tarjeta de crédito mostrándoles beneficios claros, y lograr que dejen sus datos en el formulario para que un asesor las contacte y cierre la entrega.

¿Cuál es la conversión principal?  
El envío del formulario con los datos completos del cliente. Como apoyo secundario, dejé el botón directo a WhatsApp para quienes tengan dudas antes de llenar el formulario.

¿A qué tipo de usuario va dirigida?  
Tanto a clientes actuales de Promerica como a personas nuevas en Guatemala (de 21 a 65 años) con ingresos desde Q 3,500, que prefieren hacer trámites desde su celular en lugar de ir a hacer filas a una agencia.

¿Qué información prioricé?  
1. El titular con el beneficio principal al entrar.  
2. La comparación de las 3 tarjetas más atractivas con la opción de ver detalles sin saturar la pantalla.  
3. Requisitos mínimos claros para que la gente sepa si aplica antes de escribir.  
4. El formulario de solicitud directo y visible.

¿Qué elementos evité para no generar abandono?  
Evité pedir fotos de DPI o recibos de luz en el primer contacto (eso asusta o da pereza). También quité menús y enlaces que saquen al usuario de la página.

¿Cómo planteé la experiencia desde la publicidad digital?  
Si la persona ve un anuncio en redes sobre cuotas o puntos, al entrar a la página debe ver ese mismo mensaje en el título para no confundirse. Además, capturo los códigos del anuncio para saber de qué red social vino cada persona.

---

## 2. Medición y analítica

Eventos que decidí medir:  
- Cuando el usuario empieza a escribir en el primer campo (para saber cuántos lo intentan).  
- Cuando el formulario se envía con éxito (mi meta principal).  
- Si alguien intenta enviar y le faltó llenar algo.  
- Qué tarjeta le llamó más la atención al hacer clic en el botón de solicitar.

Cómo conservo los parámetros de campaña (UTMs):  
Con JavaScript leo si el enlace trae etiquetas de campaña (por ejemplo, si vino de Facebook o Google). Las guardo en la memoria temporal del navegador para que no se borren si el usuario recarga la página, y las coloco en casillas ocultas del formulario para que el dato llegue al equipo de ventas junto con el nombre y teléfono del cliente.

3 métricas clave para saber si la página funciona:  
1. Tasa de conversión: Cuántas personas de las que entraron llenaron el formulario.  
2. Costo por cliente interesado: Cuánto dinero de publicidad nos costó conseguir cada contacto.  
3. Tasa de abandono: Cuántas personas tocaron el formulario pero se salieron sin enviar.

Qué haría si hay mucho tráfico pero pocas solicitudes:  
1. Revisar con herramientas de mapas de calor (como Clarity o Hotjar) en qué casilla específica se está trabando la gente.  
2. Cambiar el título del inicio o el texto del botón verde para que coincida mejor con el anuncio.  
3. Si pedir el DPI de entrada causa desconfianza, dividir el formulario en dos pasos cortos.

Ejemplo técnico de medición implementado:  
Configuré el envío de datos al sistema de analítica para registrar la tarjeta elegida, el rango de sueldo y la campaña de origen cada vez que se envía un formulario exitoso.

---

## 3. Ejercicio SEO

1. Palabra clave principal:  
Elegí "tarjetas de crédito en Guatemala". La elegí porque quien busca eso en Google ya tiene la necesidad de sacar una tarjeta y busca opciones reales en el país.

2. Propuesta de etiquetas:  
- Dirección (URL): bancopromerica.com.gt/tarjetas-de-credito/solicitud-en-linea  
- Título en Google: Tarjetas de Crédito en Guatemala | Solicita en Línea | Promerica  
- Descripción: Solicita tu tarjeta de crédito Banco Promerica 100% en línea. Disfruta de Puntos Promerica, compras en cuotas sin recargo y aprobación digital rápida en Guatemala.  
- Título principal (H1): Tenemos una tarjeta de crédito para ti

3. Estructura de títulos en la página:  
- Título principal: Tenemos una tarjeta de crédito para ti  
  - Subtítulo: Quiero mi tarjeta para (filtro)  
  - Subtítulo: Nuestras Tarjetas Destacadas (Jade Metálica, Ysi y Jade Mastercard)  
  - Subtítulo: Mucho más que una tarjeta (Beneficios)  
  - Subtítulo: Inicia tu Solicitud Digital  
  - Subtítulo: Preguntas Frecuentes

4. Oportunidades de enlaces internos:  
- Un enlace desde el menú principal de tarjetas del banco hacia esta página.  
- Un enlace dentro de la página hacia el tarifario oficial de comisiones de la Superintendencia de Bancos para dar confianza.

5. Optimización de imágenes:  
Coloqué medidas fijas de ancho y alto a las imágenes para que la pantalla no dé brincos molestos al abrir, y configuré carga diferida en las tarjetas para que la web abra rápido aunque el usuario tenga pocos datos en el celular.

6. Técnica para indexación:  
Agregué la etiqueta de dirección original para no tener problemas de páginas duplicadas con los enlaces de anuncios, y datos estructurados de preguntas frecuentes para que las respuestas sobre requisitos puedan salir directamente en los resultados de Google.

7. 3 Oportunidades SEO que priorizaría:  
1. Aprovechar las preguntas frecuentes para aparecer con respuestas directas en Google cuando la gente busque requisitos.  
2. Posicionar palabras clave sobre cuotas sin intereses y devolución de dinero (cash back) en Guatemala.  
3. Enlazar esta página desde artículos del blog de educación financiera del banco.

---

## 4. Herramientas y uso de Inteligencia Artificial

Código:  
Desarrollé la página con HTML, CSS puro y JavaScript normal, sin librerías pesadas para asegurar que cargue al instante y sea fácil de mantener. Usé el verde oficial y los estilos reales de Banco Promerica.

Uso de IA:  
Utilicé herramientas de IA para entender conceptos con los cuales no estaba familiarizado y tener una base.

Criterio propio:  
Revisé y corregí el código manualmente para que tuviera validaciones reales de Guatemala (DPI de 13 números y teléfonos de 8 dígitos), adapté las tarjetas para que se puedan abrir y cerrar con el botón de "Ver más" de forma limpia, cuidé que los botones tuvieran el mismo ancho y ajusté el diseño en celulares para que nada se corte ni se desborde.

---

## 5. Entregables

Propuesta visual en Figma:
https://www.figma.com/design/xPV3sRPSBD7dKzyshKnIBT/Sin-t%C3%ADtulo?node-id=2-570&t=hovv12E4xbBdfMVW-0

Landing publicada (prueba funcional en línea):
https://ando-ands.github.io/prueba-promerica/

Código fuente y prueba local:
Todos los archivos están en esta carpeta (index.html, styles.css y app.js). No se requiere instalar nada; para probar la página también se puede abrir directamente index.html en cualquier navegador.
