import { uploadBuffer, deleteObject } from '../../services/spaces.service.js';
import StorageStrategy from './StorageStrategy.js';
export class SpacesStrategy extends StorageStrategy {
  async upload(buffer, key, mime) { return uploadBuffer(buffer, key, mime); }
  async delete(key) { return deleteObject(key); }
}