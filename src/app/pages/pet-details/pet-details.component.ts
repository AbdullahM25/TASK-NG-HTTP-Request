import { Component, effect, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PetService } from '../../shared/services/pet.service';
import { Pet } from '../../../data/pets';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css',
})
export class PetDetailsComponent {
  private id = Number(this.route.snapshot.paramMap.get('id') ?? '');

  readonly pet = toSignal<Pet | null>(this.petService.getPet(this.id), {
    initialValue: null,
  });
  readonly loading = signal(true);
  readonly notFound = computed(() => this.pet() === null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService
  ) {
    effect(() => {
      if (this.pet() !== null) {
        this.loading.set(false);
      }
    });
  }

  adopt(): void {
    const p = this.pet();
    if (!p) return;
    this.petService.deletePet(p.id).subscribe({
      next: () => this.router.navigate(['/pets']),
      error: (err: any) => console.error('Failed to adopt pet', err),
    });
  }

  deletePet(): void {
    const p = this.pet();
    if (!p) return;
    this.petService.deletePet(p.id).subscribe({
      next: () => this.router.navigate(['/pets']),
      error: (err: any) => console.error('Failed to delete pet', err),
    });
  }
}
