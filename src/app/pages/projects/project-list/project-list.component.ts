import { Component, input, output, OnInit } from '@angular/core'; // Importa 'input' y 'output' de @angular/core
import { Project } from '../../../models/project.model'; // Asegúrate de que la ruta a tu modelo Project sea correcta
import { CommonModule } from '@angular/common'; // Necesario si es un componente standalone para directivas como *ngIf, *ngFor

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  standalone: true, // ¡Importante! Marca el componente como standalone si aún no lo está
  imports: [
    CommonModule, // Incluye CommonModule para las directivas estructurales y pipes
  ],
})
export class ProjectListComponent implements OnInit {
  // Declara tus inputs como signals.
  // El valor inicial (entre paréntesis) es opcional, pero buena práctica si el input
  // no está marcado como requerido (no lo haremos aquí para flexibilidad).
  readonly projects = input<Project[]>([]); // La lista de proyectos, inicializada como array vacío
  readonly isLoading = input<boolean>(false); // El estado de carga, inicializado a false
  readonly errorMessage = input<string | null>(null); // Mensaje de error, inicializado a null

  // El output para emitir eventos (no es una signal, es un EventEmitter funcional)
  readonly deleteProject = output<string>(); // Emite el ID de un proyecto a eliminar

  constructor() {}

  ngOnInit(): void {
    // Para depuración, puedes ver los valores de las signals.
    // Observa que necesitas llamarlas como funciones para acceder a su valor actual.
    // console.log('ProjectListComponent init - isLoading:', this.isLoading());
    // console.log('ProjectListComponent init - errorMessage:', this.errorMessage());
    // La lógica aquí es típicamente para efectos secundarios que dependen de inputs,
    // o inicialización que no dependa directamente de los inputs si estos se cargan asíncronamente.
  }

  // Método que será llamado por el botón de eliminar en la plantilla.
  // Emite el ID del proyecto que debe ser eliminado al componente padre.
  onDelete(projectId: string): void {
    this.deleteProject.emit(projectId);
  }
}
