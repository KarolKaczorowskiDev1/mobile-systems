import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

export abstract class FirestoreService<T> {
  protected abstract basePath: string;

  constructor(protected firestore: AngularFirestore) {}

  getDoc(id: string): Observable<T | undefined> {
    return this.firestore.doc<T>(`${this.basePath}/${id}`).valueChanges({ idField: 'id' });
  }

  getCollection(queryFn?: QueryFn): Observable<T[]> {
    return this.firestore.collection<T>(`${this.basePath}`, queryFn).valueChanges({ idField: 'id' });
  }

  create(value: T): Observable<void> {
    const id = this.firestore.createId();

    return from(this.collection.doc(id).set(Object.assign({}, { id }, value)));
  }

  update(value: T, id: string): Observable<void> {
    return from(this.collection.doc(id).update(value));;
  }

  delete(id: string): Observable<void> {
    return from(this.collection.doc(id).delete());
  }

  protected get collection(): AngularFirestoreCollection<T> {
    return this.firestore.collection<T>(`${this.basePath}`);
  }
}
