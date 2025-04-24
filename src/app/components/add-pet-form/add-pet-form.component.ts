import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../shared/services/modal.service';
import { PetService } from '../../shared/services/pet.service';

@Component({
  selector: 'app-add-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-pet-form.component.html',
  styleUrl: './add-pet-form.component.css',
})
export class AddPetFormComponent {
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private petService = inject(PetService);

  petForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    image: ['', Validators.required],
  });

  handleSubmit(): void {
    if (this.petForm.invalid) {
      return;
    }

    const payload = this.petForm.getRawValue();
    this.petService.addPet(payload).subscribe({
      next: (created) => {
        console.log('Pet added:', created);
        this.modalService.close();
      },
      error: (err) => console.error('Add pet failed', err),
    });
  }
}
