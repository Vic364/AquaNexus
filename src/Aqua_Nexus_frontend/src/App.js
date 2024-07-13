import { html, render } from 'lit-html';
import { Aqua_Nexus_backend } from 'declarations/Aqua_Nexus_backend';
import logo from './logo2.svg';

class App {
  greeting = '';
  cultivos = [];
  logs = [];

  constructor() {
    this.#render();
  }

  // Método para manejar la adición de un cultivo
  #handleAddCultivo = async (e) => {
    e.preventDefault();
    const idCultivo = BigInt(document.getElementById('idCultivo').value);
    const humedad = BigInt(document.getElementById('humedad').value);
    const presion = BigInt(document.getElementById('presion').value);
    const estado = document.getElementById('estado').value;

    await custom_greeting2_backend.agregarCultivo({
      idCultivo,
      humedad,
      presion,
      estado
    });

    this.cultivos = await custom_greeting2_backend.obtenerCultivos();
    this.#render();
  };

  // Método para manejar la obtención de cultivos
  #handleGetCultivos = async () => {
    this.cultivos = await custom_greeting2_backend.obtenerCultivos();
    this.#render();
  };

  // Método para manejar la actualización de un cultivo
  #handleUpdateCultivo = async (e) => {
    e.preventDefault();
    const idCultivo = BigInt(document.getElementById('updateIdCultivo').value);
    const humedad = BigInt(document.getElementById('updateHumedad').value);
    const presion = BigInt(document.getElementById('updatePresion').value);
    const estado = document.getElementById('updateEstado').value;

    const success = await custom_greeting2_backend.actualizarCultivo({
      idCultivo,
      humedad,
      presion,
      estado
    });

    alert(success ? 'Cultivo actualizado' : 'Error al actualizar cultivo');
    this.cultivos = await custom_greeting2_backend.obtenerCultivos();
    this.#render();
  };

  // Método para manejar la eliminación de un cultivo
  #handleDeleteCultivo = async (e) => {
    e.preventDefault();
    const idCultivo = BigInt(document.getElementById('deleteIdCultivo').value);
    const result = await custom_greeting2_backend.eliminarCultivo(idCultivo);

    alert(result);
    this.cultivos = await custom_greeting2_backend.obtenerCultivos();
    this.#render();
  };

  // Método para manejar la adición de un log
  #handleAddLog = async (e) => {
    e.preventDefault();
    const idCultivo = BigInt(document.getElementById('logIdCultivo').value);
    const fechaRiego = document.getElementById('fechaRiego').value;
    const surco = BigInt(document.getElementById('surco').value);
    const detalles = document.getElementById('detalles').value;

    await custom_greeting2_backend.agregarLog(idCultivo, {
      fechaRiego,
      surco,
      detalles
    });

    this.logs = await custom_greeting2_backend.obtenerLogsPorCultivo(idCultivo);
    this.#render();
  };

  // Método para manejar la obtención de logs
  #handleGetLogs = async (e) => {
    e.preventDefault();
    const idCultivo = BigInt(document.getElementById('logIdCultivo').value);
    this.logs = await custom_greeting2_backend.obtenerLogsPorCultivo(idCultivo);
    this.#render();
  };

  // Método para manejar la eliminación de un log
  #handleDeleteLog = async (e) => {
    e.preventDefault();
    const idCultivo = BigInt(document.getElementById('deleteLogIdCultivo').value);
    const fechaRiego = document.getElementById('deleteFechaRiego').value;

    const success = await custom_greeting2_backend.eliminarLog(idCultivo, fechaRiego);
    alert(success ? 'Log eliminado' : 'Error al eliminar log');

    this.logs = await custom_greeting2_backend.obtenerLogsPorCultivo(idCultivo);
    this.#render();
  };

  // Renderizado del formulario
  #render() {
    let body = html`
      <main>
        <img src="${logo}" alt="DFINITY logo" />
        <br /><br />

        <!-- Formulario para agregar cultivo -->
        <form id="addCultivoForm" action="#">
          <h3>Agregar Cultivo</h3>
          <label for="idCultivo">ID Cultivo: </label><br>
          <input id="idCultivo" type="text" /><br>
          <label for="humedad">Humedad: </label>
          <input id="humedad" type="text" /><br />
          <label for="presion">Presion: </label>
          <input id="presion" type="text" /><br />
          <label for="estado">Estado: </label>
          <input id="estado" type="text" /><br />
          <button type="submit">Agregar</button>
        </form>

        <!-- Botón para obtener cultivos -->
        <button id="getCultivosBtn">Obtener Cultivos</button>
        <ul>
          ${this.cultivos.map(
            cultivo => html`<li>ID: ${cultivo.idCultivo}, Humedad: ${cultivo.humedad}, Presión: ${cultivo.presion}, Estado: ${cultivo.estado}</li>`
          )}
        </ul>

        <!-- Formulario para actualizar cultivo -->
        <form id="updateCultivoForm" action="#">
          <h3>Actualizar Cultivo</h3>
          <label for="updateIdCultivo">ID Cultivo: </label>
          <input id="updateIdCultivo" type="text" /><br />
          <label for="updateHumedad">Humedad: </label>
          <input id="updateHumedad" type="text" /><br />
          <label for="updatePresion">Presion: </label>
          <input id="updatePresion" type="text" /><br />
          <label for="updateEstado">Estado: </label>
          <input id="updateEstado" type="text" /><br />
          <button type="submit">Actualizar</button>
        </form>

        <!-- Formulario para eliminar cultivo -->
        <form id="deleteCultivoForm" action="#">
          <h3>Eliminar Cultivo</h3>
          <label for="deleteIdCultivo">ID Cultivo: </label>
          <input id="deleteIdCultivo" type="text" /><br />
          <button type="submit">Eliminar</button>
        </form>

        <section id="greeting">${this.greeting}</section>
      </main>
    `;
    render(body, document.getElementById('root'));

    // Asignar manejadores de eventos a cada formulario y botón
    document.getElementById('addCultivoForm').addEventListener('submit', this.#handleAddCultivo);
    document.getElementById('getCultivosBtn').addEventListener('click', this.#handleGetCultivos);
    document.getElementById('updateCultivoForm').addEventListener('submit', this.#handleUpdateCultivo);
    document.getElementById('deleteCultivoForm').addEventListener('submit', this.#handleDeleteCultivo);
  }
}

export default App;
