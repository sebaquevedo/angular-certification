export interface Project {
  id?: string;
  name: string;
  description: string;
  ownerUid: string;
  createdAt: any;
  budget?: number; // Opcional, si quieres incluir un presupuesto
  status?: 'active' | 'completed' | 'archived'; // Opcional, si quieres incluir un estado del proyecto
}
export interface ProjectWithOwner extends Project {
  ownerName?: string; // Opcional, si quieres incluir el nombre del propietario
}
export interface ProjectWithOwnerAndId extends ProjectWithOwner {
  id: string; // Asegura que el ID siempre esté presente
}
export interface ProjectWithOwnerAndIdAndCreatedAt
  extends ProjectWithOwnerAndId {
  createdAt: Date; // Asegura que createdAt sea un objeto Date
}
export interface ProjectWithOwnerAndIdAndCreatedAtAndDescription
  extends ProjectWithOwnerAndIdAndCreatedAt {
  description: string; // Asegura que description sea un string
}
