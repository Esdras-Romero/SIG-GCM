// src/app/core/interceptors/loading.interceptor.ts

import {
  HttpInterceptorFn
} from '@angular/common/http';

import { finalize }
from 'rxjs';

import { inject }
from '@angular/core';

import { LoadingService }
from '../services/loading.service';

export const loadingInterceptor:
  HttpInterceptorFn = (

    req,

    next

  ) => {

    const loadingService =
      inject(LoadingService);

    /*
      Ativa loading.
    */
    loadingService.show();

    return next(req).pipe(

      finalize(() => {

        /*
          Finaliza loading.
        */
        loadingService.hide();

      })

    );

};