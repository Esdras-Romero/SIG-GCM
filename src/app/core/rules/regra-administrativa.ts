export function validarDiaUtil(
  data: Date,
  feriados: Date[]
): boolean {

  const diaSemana =
    data.getDay();

  const sabado =
    diaSemana === 6;

  const domingo =
    diaSemana === 0;

  const feriado =
    feriados.some(
      f =>
        f.toDateString() ===
        data.toDateString()
    );

  return !sabado &&
         !domingo &&
         !feriado;
}