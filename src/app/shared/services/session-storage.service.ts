import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }


  getStoredData(key: string): object {
    return JSON.parse(sessionStorage.getItem(key) || "{}")
  }

  setStoredData(key: string, data: object): void {
    sessionStorage.setItem(key, JSON.stringify(data))
  }

  deleteStoredData(key: string): void {
    sessionStorage.removeItem(key)
  }

  clearSessionStorage(): void {
    sessionStorage.clear()
  }
}
