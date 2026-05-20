export function validar24x120(

  fimUltimoPlantao: Date,

  inicioNovoPlantao: Date

): boolean {

  const HORAS_DESCANSO = 120;

  const MILISSEGUNDOS_POR_HORA =
    60 * 60 * 1000;

  const descansoMinimo =
    HORAS_DESCANSO *
    MILISSEGUNDOS_POR_HORA;

  const tempoDescanso =

    inicioNovoPlantao.getTime() -

    fimUltimoPlantao.getTime();

  return tempoDescanso >= descansoMinimo;
}