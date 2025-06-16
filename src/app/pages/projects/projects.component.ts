import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProjectsService } from '../../services/projects.service'; // No necesitas Project aquí
import { AuthError, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Project } from '../../models/project.model'; // <-- Importa Project desde el modelo
import { ProjectListComponent } from '../../pages/projects/project-list/project-list.component'; // <-- Si ProjectListComponent es standalone
import { CommonModule, NgIf, NgFor } from '@angular/common'; // Importa CommonModule para directivas estructurales
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule para formularios

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true, // Si tu componente es standalone
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectListComponent, // <-- Asegúrate de importarlo aquí si es standalone
  ],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projectForm: FormGroup;

  currentUser = signal<User | null>(null);
  projects = signal<Project[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  private authSubscription: Subscription | undefined;
  private projectsSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private projectsService: ProjectsService
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.user$.subscribe((user) => {
      this.currentUser.set(user);
      if (user) {
        this.loadProjects(user.uid);
      } else {
        this.projects.set([]);
        this.isLoading.set(false);
        this.errorMessage.set(
          'Por favor, inicia sesión para ver tus proyectos.'
        );
      }
    });
  }

  loadProjects(ownerUid: string): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    if (this.projectsSubscription) {
      this.projectsSubscription.unsubscribe();
    }

    this.projectsSubscription = this.projectsService
      .getProjectsByOwner(ownerUid)
      .subscribe({
        next: (projects) => {
          this.projects.set(projects);
          this.isLoading.set(false);
        },
        error: (err: AuthError) => {
          console.error('Error al cargar proyectos:', err);
          this.errorMessage.set(
            'Error al cargar los proyectos. Inténtalo de nuevo.'
          );
          this.isLoading.set(false);
        },
      });
  }

  onSubmitProject(): void {
    if (this.projectForm.valid && this.currentUser()) {
      this.errorMessage.set(null);
      const newProject: Omit<Project, 'id'> = {
        name: this.projectForm.value.name,
        description: this.projectForm.value.description,
        ownerUid: this.currentUser()!.uid,
        createdAt: new Date(),
      };

      this.projectsService.addProject(newProject).subscribe({
        next: (projectId) => {
          console.log('Proyecto añadido con ID:', projectId);
          this.projectForm.reset();
        },
        error: (err: AuthError) => {
          console.error('Error al añadir proyecto:', err);
          this.errorMessage.set(
            'No se pudo añadir el proyecto. Inténtalo de nuevo.'
          );
        },
      });
    } else {
      this.errorMessage.set(
        'Por favor, rellena todos los campos del proyecto y asegúrate de haber iniciado sesión.'
      );
      this.projectForm.markAllAsTouched();
    }
  }

  onDeleteProject(projectId: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      this.projectsService.deleteProject(projectId).subscribe({
        next: () => {
          console.log('Proyecto eliminado:', projectId);
        },
        error: (err: AuthError) => {
          console.error('Error al eliminar proyecto:', err);
          this.errorMessage.set(
            'No se pudo eliminar el proyecto. Inténtalo de nuevo.'
          );
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.projectsSubscription?.unsubscribe();
  }
}
