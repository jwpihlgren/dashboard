import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  MAX_STORAGE_SIZE = 5242880

  constructor() { }


  getStoredData(key: string): object {
    return JSON.parse(sessionStorage.getItem(key) || "{}")
  }

  setStoredData(key: string, data: object): void {
    const serializedData = JSON.stringify(data)
    if(serializedData.length >= this.MAX_STORAGE_SIZE) {
      console.log(`Object was too large to store in session storage ${serializedData.length}/${this.MAX_STORAGE_SIZE} characters  `);
      return
    }
    sessionStorage.setItem(key, serializedData)
  }

  deleteStoredData(key: string): void {
    sessionStorage.removeItem(key)
  }

  clearSessionStorage(): void {
    sessionStorage.clear()
  }
}
