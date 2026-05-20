const grupos =
['A', 'B', 'C', 'D', 'E', 'F'];

export function proximoGrupo(
  grupoAtual: string
): string {

  const indice =
    grupos.indexOf(grupoAtual);

  return grupos[
    (indice + 1) % grupos.length
  ];
}