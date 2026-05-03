export const colors = {
  azul: '#0A2472',
  azul2: '#1565C0',
  verde: '#2E7D32',
  verde2: '#43A047',
  naranja: '#F57C00',
  oro: '#FFC107',
  morado: '#7B1FA2',
  fondo: '#050D2E',
  fondo2: '#071A40',
  texto: '#E8F0FE',
} as const;

export type ColorKey = keyof typeof colors;
