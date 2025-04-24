// src/app/shared/services/pet.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../../../data/pets';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PetService {
  private baseUrl = 'https://pets-react-query-backend.eapi.joincoded.com/pets';

  constructor(private http: HttpClient) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.baseUrl);
  }

  getPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.baseUrl}/${id}`);
  }

  addPet(pet: Pick<Pet, 'name' | 'type' | 'image'>): Observable<Pet> {
    return this.http.post<Pet>(this.baseUrl, { ...pet, adopted: 0 });
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
