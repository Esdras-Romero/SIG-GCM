export function validarLotacao(

  quantidadeAtual: number,

  quantidadeMinima: number

): boolean {

  return (
    quantidadeAtual >=
    quantidadeMinima
  );
}