// src/app/pages/pets/pets.component.ts
import { Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PetsHeaderComponent } from '../../components/pets-header/pets-header.component';
import { PetsListComponent } from '../../components/pets-list/pets-list.component';
import { PetService } from '../../shared/services/pet.service';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [PetsHeaderComponent, PetsListComponent],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css',
})
export class PetsComponent {
  readonly petsArray = toSignal(this.petService.getPets(), {
    initialValue: [],
  });

  readonly query = signal('');

  readonly filteredPets = computed(() => {
    const q = this.query().toLowerCase();
    return this.petsArray().filter((p) => p.name.toLowerCase().includes(q));
  });

  constructor(private petService: PetService) {}

  setQuery(q: string): void {
    this.query.set(q);
  }
}
