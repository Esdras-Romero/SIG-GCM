export interface Posto { 
 
   id: string; 
   nome: string; 
   local: string
   tipoEscala: 
      '24x120' | 
      'ADMINISTRATIVO'; 
   quantidadeMinima: number; 
}
