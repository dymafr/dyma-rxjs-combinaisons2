screenLog.init(); // affiche le log de la console
// Cliquez sur la flèche de rafraichissement dans la fenêtre de droite, juste à gauche de l'url pour relancer.

import { Observable, of, interval, combineLatest } from 'rxjs';
import { take, tap } from 'rxjs/operators';

// Création de streams
function createStream(
  name: string,
  iterations: number,
  intervalle: number
): Observable<any> {
  return interval(intervalle).pipe(
    take(iterations),
    tap((val) => console.log(`[ Stream ${name} ] : ${val}`))
  );
}

const streamA = createStream('A', 2, 100);
const streamB = createStream('B', 3, 200);
const streamC = createStream('B', 0, 50);

const example2 = combineLatest([streamA, streamB, streamC])
  .pipe(tap((val) => console.log(`COMBINE_LATEST : ${val}`)))
  .subscribe();

// Aucune émission de combineLatest ! Pourquoi ? Parce que streamC n'émet aucune valeur à cause de take(0).
// Retirez streamC ligne 23 et réessayez.
// Vous avez maintenant des valeurs à chaque fois que stream A ou streamB émettent, dès que les 2 ont émis au moins une valeur !
