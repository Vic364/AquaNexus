import { html, render } from 'lit-html';
import { Aqua_Nexus_backend } from 'declarations/Aqua_Nexus_backend';
import logo from './logo2.svg';

class App {
  cultivos = [];
  logs = [];
  alertas = [];

  constructor() {
    this.#render();
  }

  // Método para manejar la obtención de cultivos
  #handleGetCultivos = async () => {
    this.cultivos = await Aqua_Nexus_backend.obtenerCultivos();
    this.#render();
  };

  // Método para manejar la obtención de logs con detalles
  #handleGetLogsConDetalles = async () => {
    this.logs = await Aqua_Nexus_backend.obtenerLogsConDetalles();
    this.#render();
  };

  // Método para manejar la obtención de alertas con detalles
  #handleGetAlertasConDetalles = async () => {
    this.alertas = await Aqua_Nexus_backend.obtenerAlertasConDetalles();
    this.#render();
  };

  // Renderizado del formulario
  #render() {
    let body = html`
      <main>
        <img src="${logo}" alt="DFINITY logo" />
        <br /><br />

        <!-- Botón para obtener cultivos -->
        <button id="getCultivosBtn">Obtener Cultivos</button>
        <ul>
          ${this.cultivos.map(
            cultivo => html`<li>ID: ${cultivo.idCultivo}, Humedad: ${cultivo.humedad}, Presión: ${cultivo.presion}, Estado: ${cultivo.estado}</li>`
          )}
        </ul>

        <!-- Botón para obtener logs con detalles -->
        <button id="getLogsBtn">Obtener Logs con Detalles</button>
        <ul>
          ${this.logs.map(
            log => html`<li>ID Log: ${log.idLog}, ID Cultivo: ${log.idCultivo}, Fecha Riego: ${log.fechaRiego}, Surco: ${log.surco}, Detalles: ${log.detalles}</li>`
          )}
        </ul>

        <!-- Botón para obtener alertas con detalles -->
        <button id="getAlertasBtn">Obtener Alertas con Detalles</button>
        <ul>
          ${this.alertas.map(
            alerta => html`<li>${alerta}</li>`
          )}
        </ul>
      </main>
    `;
    render(body, document.getElementById('root'));

    // Asignar manejadores de eventos a cada formulario y botón
    document.getElementById('getCultivosBtn').addEventListener('click', this.#handleGetCultivos);
    document.getElementById('getLogsBtn').addEventListener('click', this.#handleGetLogsConDetalles);
    document.getElementById('getAlertasBtn').addEventListener('click', this.#handleGetAlertasConDetalles);
  }
}

export default App;
