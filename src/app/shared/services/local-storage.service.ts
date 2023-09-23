import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  MAX_STORAGE_SIZE = 5242880

  constructor() { }

  getStoredData(key: string): object {
    return JSON.parse(localStorage.getItem(key) || "{}")
  }

   setStoredData(key: string, data: object): void {
    console.log(JSON.stringify(data).length);
    if(JSON.stringify(data).length >= this.MAX_STORAGE_SIZE) return

    localStorage.setItem(key, JSON.stringify(data))

    
  }

  deleteStoredData(key: string): void {
    localStorage.removeItem(key)
  }

  clearlocalStorage(): void {
    localStorage.clear()
  }
}
