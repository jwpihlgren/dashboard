import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getStoredData(key: string): object {
    return JSON.parse(localStorage.getItem(key) || "{}")
  }

  setStoredData(key: string, data: object): void {
    localStorage.setItem(key, JSON.stringify(data))
  }

  deleteStoredData(key: string): void {
    localStorage.removeItem(key)
  }

  clearlocalStorage(): void {
    localStorage.clear()
  }
}
