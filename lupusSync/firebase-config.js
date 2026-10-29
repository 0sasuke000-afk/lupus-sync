/**
 * LupusSync - Puente de Compatibilidad
 * Este archivo redirige hacia data-manager.js (Almacenamiento en Archivos .JSON locales).
 * Reemplaza la base de datos de pago Firebase por archivos .json autónomos y gratuitos.
 */

export * from './data-manager.js';
import * as DataManager from './data-manager.js';
export default DataManager;

if (typeof window !== 'undefined') {
  window.LupusDataManager = DataManager.LupusDataManager;
  window.DEFAULT_INITIAL_DATA = DataManager.DEFAULT_INITIAL_DATA;
  window.STORAGE_FILES = DataManager.STORAGE_FILES;
  window.initializeFirebaseServices = DataManager.initializeFirebaseServices;
  window.isFirebaseConfigured = DataManager.isFirebaseConfigured;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataManager;
}
