import {
  Injectable,
  signal,
  computed
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  /*
    Controle interno.
  */
  private readonly _loading =
    signal(false);

  /*
    Estado readonly.
  */
  readonly loading =
    this._loading.asReadonly();

  /*
    Estado computado.
  */
  readonly isLoading =
    computed(() =>

      this._loading()

    );

  /*
    Mostrar loading.
  */
  show(): void {

    this._loading.set(
      true
    );
  }

  /*
    Ocultar loading.
  */
  hide(): void {

    this._loading.set(
      false
    );
  }

}