# Implementación: Selección Múltiple y Botón Deshacer (Undo)

## Descripción General
Esta implementación permitirá al usuario seleccionar múltiples facturas en los paneles de Compras y Ventas, eliminarlas en bloque usando un solo botón, y ofrecerá un mecanismo estilo Gmail para "Deshacer" la eliminación durante un período de tiempo (10 segundos) antes de que sea permanente.

## Proposed Changes

### [MODIFY] public/js/state.js
- Agregar `sriSelectedIds: new Set()`: Rastrea las facturas seleccionadas en la tabla activa.
- Agregar `sriUndoCache: []`: Almacena la copia temporal de los registros eliminados.
- Agregar `sriUndoTimeout: null`: Referencia al temporizador de eliminación definitiva.

### [MODIFY] public/js/views.js
- En `sri-ventas-body` y `sri-compras-body`: 
  - Añadir una nueva columna inicial `<th style="width:40px"><input type="checkbox" onchange="App.toggleAllSRIRows(this.checked)"></th>`.
- En `renderVentasBody()` y `renderComprasBody()`:
  - Añadir en cada fila un `<td><input type="checkbox" onchange="App.toggleSRIRow('${r.id}', this.checked)" ${State.sriSelectedIds.has(r.id)?'checked':''}></td>`.
- Añadir un panel de acción flotante (action bar) que se muestra si `State.sriSelectedIds.size > 0`:
  - Contendrá un texto: `X seleccionadas` y un botón rojo: `🗑️ Eliminar`.

### [MODIFY] public/js/app.js
- Añadir `toggleSRIRow(id, checked)` y `toggleAllSRIRows(checked)`.
- Añadir `deleteSelectedSRIRows()`:
  - Guarda los objetos completos de `Store.sriRegistros` que coinciden con los IDs en `sriUndoCache`.
  - Oculta los registros (los borra de Firebase *inmediatamente* usando un Batch).
  - Limpia la selección de IDs.
  - Llama a `showUndoToast()`.
- Añadir `undoSRIDelete()`:
  - Si se hace clic en deshacer, lee `sriUndoCache` y restaura los registros en Firebase usando `batch.set(docRef, record)` para mantener el mismo ID.
  - Limpia la caché y notifica éxito.
- Añadir `showUndoToast(msg)`:
  - Un Toast especializado de mayor duración (10 segundos) con un botón explícito `[DESHACER]`.

## User Review Required
> [!IMPORTANT]
> - **Estrategia A (Memoria Activa):** Al hacer clic en eliminar, los registros se eliminan *físicamente* de Firestore al instante, pero el Frontend retiene una copia. Si se hace clic en "Deshacer", se reescriben en Firestore. 
> - Si el usuario cierra el navegador antes de darle a "Deshacer", los datos quedan eliminados definitivamente. Esto es exactamente como funciona Gmail.

## Verification Plan
1. Seleccionar múltiples filas en Ventas o Compras.
2. Hacer clic en "Eliminar".
3. Validar que desaparecen y aparece el Toast flotante.
4. Hacer clic en "Deshacer" antes de 10 segundos.
5. Validar que reaparecen en la tabla sin errores.
