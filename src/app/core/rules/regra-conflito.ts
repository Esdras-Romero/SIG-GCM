export function validarConflito(

  inicioA: Date,
  fimA: Date,

  inicioB: Date,
  fimB: Date

): boolean {

  return (
    inicioA < fimB &&
    inicioB < fimA
  );
}