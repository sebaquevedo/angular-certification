// src/app/services/projects.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/project.model'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private firestore: Firestore) {}

  addProject(project: Omit<Project, 'id'>): Observable<string> {
    const projectsCollection = collection(this.firestore, 'proyectos');
    return from(
      addDoc(projectsCollection, { ...project, createdAt: new Date() })
    ).pipe(map((docRef) => docRef.id));
  }

  getProjectsByOwner(ownerUid: string): Observable<Project[]> {
    const projectsCollection = collection(this.firestore, 'proyectos');
    const q = query(projectsCollection, where('ownerUid', '==', ownerUid));
    return collectionData(q, { idField: 'id' }) as Observable<Project[]>;
  }

  updateProject(project: Project): Observable<void> {
    if (!project.id) {
      return new Observable((observer) => {
        observer.error(new Error('Project ID is required for updating.'));
        observer.complete();
      });
    }
    const projectDocRef = doc(this.firestore, `proyectos/${project.id}`);
    const { id, ...dataToUpdate } = project;
    return from(updateDoc(projectDocRef, dataToUpdate));
  }

  deleteProject(projectId: string): Observable<void> {
    const projectDocRef = doc(this.firestore, `proyectos/${projectId}`);
    return from(deleteDoc(projectDocRef));
  }

  getProjectById(projectId: string): Observable<Project | undefined> {
    const projectDocRef = doc(this.firestore, `proyectos/${projectId}`);
    return from(
      getDocs(
        query(
          collection(this.firestore, 'proyectos'),
          where('id', '==', projectId)
        )
      )
    ).pipe(
      map((snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data() as Project;
          return { id: snapshot.docs[0].id, ...data };
        }
        return undefined;
      })
    );
  }
}
