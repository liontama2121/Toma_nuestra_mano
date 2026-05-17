import { Quiz } from '@/domain/entities/Quiz';

export const quizzesBySectionId: Record<string, Quiz> = {
  'dd-s1': {
    sectionId: 'dd-s1',
    title: '¿Qué tanto aprendiste?',
    passingScore: 60,
    questions: [
      {
        id: 'q1',
        question: '¿Qué es el código en programación?',
        options: [
          { id: 'a', text: 'Un mensaje secreto solo para humanos expertos' },
          { id: 'b', text: 'Un conjunto de instrucciones que las computadoras pueden entender y ejecutar' },
          { id: 'c', text: 'Un tipo de contraseña para proteger archivos' },
          { id: 'd', text: 'Un cable que conecta computadoras entre sí' },
        ],
        correctId: 'b',
        explanation: 'El código es un conjunto de instrucciones escritas en un lenguaje que la computadora puede interpretar y ejecutar para realizar tareas.',
      },
      {
        id: 'q2',
        question: '¿Con qué procesan la información las computadoras internamente?',
        options: [
          { id: 'a', text: 'Con palabras del idioma español o inglés' },
          { id: 'b', text: 'Con imágenes y colores que reconocen' },
          { id: 'c', text: 'Con señales de encendido (1) y apagado (0) llamadas código binario' },
          { id: 'd', text: 'Con sonidos de alta frecuencia' },
        ],
        correctId: 'c',
        explanation: 'Las computadoras trabajan con electricidad: una señal encendida representa el 1 y una apagada el 0. Todo dentro de una computadora se reduce a combinaciones de estos dos estados.',
      },
      {
        id: 'q3',
        question: '¿Qué significa el sistema "binario"?',
        options: [
          { id: 'a', text: 'Un sistema numérico que usa solo los dígitos 0 y 1' },
          { id: 'b', text: 'Un sistema que usa los números del 0 al 9' },
          { id: 'c', text: 'Un tipo especial de computadora muy rápida' },
          { id: 'd', text: 'Un lenguaje de programación moderno' },
        ],
        correctId: 'a',
        explanation: 'Binario viene de "bi" (dos). Es un sistema numérico de base 2 que solo usa 0 y 1, a diferencia del decimal que usamos los humanos con 10 dígitos.',
      },
      {
        id: 'q4',
        question: '¿Para qué sirve un lenguaje de programación como Python o JavaScript?',
        options: [
          { id: 'a', text: 'Para chatear con otras personas en internet' },
          { id: 'b', text: 'Para traducir instrucciones humanas a algo que la computadora pueda ejecutar' },
          { id: 'c', text: 'Para diseñar el aspecto físico de una computadora' },
          { id: 'd', text: 'Para conectar cables entre dispositivos de red' },
        ],
        correctId: 'b',
        explanation: 'Los lenguajes de programación son un puente entre el pensamiento humano y el lenguaje binario de la máquina. Nos permiten dar instrucciones de forma más natural.',
      },
      {
        id: 'q5',
        question: '¿Cómo se comunican las computadoras entre sí a través de internet?',
        options: [
          { id: 'a', text: 'Usando el mismo idioma hablado que los humanos' },
          { id: 'b', text: 'Enviando paquetes de datos en forma de señales eléctricas o de luz' },
          { id: 'c', text: 'A través de ondas de sonido especiales' },
          { id: 'd', text: 'Usando memorias USB que viajan entre ellas' },
        ],
        correctId: 'b',
        explanation: 'Las computadoras se comunican enviando "paquetes" de datos —pequeños bloques de información en binario— a través de cables de cobre (señales eléctricas) o fibra óptica (pulsos de luz).',
      },
    ],
  },
};
