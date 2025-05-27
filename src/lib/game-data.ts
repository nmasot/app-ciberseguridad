export interface PhishingEmail {
  id: string;
  subject: string;
  sender: string;
  body: string;
  isPhishing: boolean;
  indicators: string[];
  difficulty: "easy" | "medium" | "hard";
}

export interface GameQuestion {
  id: string;
  email: PhishingEmail;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export const phishingEmails: PhishingEmail[] = [
  {
    id: "email-1",
    subject: "Verificación urgente de tu cuenta bancaria",
    sender: "seguridad@bancoxyz.com",
    body: `Estimado cliente,

Hemos detectado actividad sospechosa en su cuenta. Para mantener la seguridad de sus fondos, necesitamos que verifique su información inmediatamente.

Haga clic aquí para verificar: http://verificacion-banco-xyz.co/login

ATENCIÓN: Su cuenta será suspendida en 24 horas si no completa la verificación.

Gracias por su cooperación.
Equipo de Seguridad`,
    isPhishing: true,
    indicators: [
      "Dominio sospechoso (.co en lugar de .com)",
      "Urgencia excesiva y amenazas",
      "Solicita información personal por email",
      "URL que no coincide con el banco oficial",
    ],
    difficulty: "easy",
  },
  {
    id: "email-2",
    subject: "Factura de compra - Pedido #12345",
    sender: "ventas@tiendaonline.es",
    body: `Hola,

Gracias por tu compra en nuestra tienda online.

Detalles del pedido:
- Producto: Laptop HP
- Precio: €899.99
- Fecha: 15/12/2023

Para descargar la factura, haz clic en el siguiente enlace:
https://tiendaonline.es/facturas/download/12345

Si tienes alguna pregunta, no dudes en contactarnos.

Saludos,
Equipo de Ventas`,
    isPhishing: false,
    indicators: [
      "Dominio legítimo",
      "Información específica del pedido",
      "Tono profesional sin urgencia",
      "URL coincide con el dominio del remitente",
    ],
    difficulty: "medium",
  },
  {
    id: "email-3",
    subject: "Tu paquete no pudo ser entregado",
    sender: "info@correos-express.com",
    body: `Estimado cliente,

Su paquete con número de seguimiento EX123456789 no pudo ser entregado en la dirección proporcionada.

Para reprogramar la entrega, por favor proporcione los siguientes datos:
- Nombre completo
- Dirección actualizada
- Número de teléfono
- Copia de su DNI

Envíe esta información a: reentrega@correos-express.com

Importante: Responda en las próximas 48 horas o el paquete será devuelto al remitente.

Atentamente,
Servicio de Paquetería`,
    isPhishing: true,
    indicators: [
      "Solicita información personal sensible (DNI)",
      "Dominio que imita a una empresa conocida",
      "Presión temporal injustificada",
      "Solicita respuesta por email con datos personales",
    ],
    difficulty: "medium",
  },
  {
    id: "email-4",
    subject: "Reunión de equipo - Viernes 10:00 AM",
    sender: "maria.garcia@empresa.com",
    body: `Hola equipo,

Espero que estén bien. Quería recordarles sobre nuestra reunión semanal programada para este viernes a las 10:00 AM en la sala de conferencias B.

Agenda:
1. Revisión de proyectos actuales
2. Planificación del próximo trimestre
3. Feedback del cliente ABC

Por favor, traigan sus informes de progreso actualizados.

Si no pueden asistir, avísenme con anticipación.

Saludos,
María García
Gerente de Proyectos`,
    isPhishing: false,
    indicators: [
      "Remitente conocido dentro de la empresa",
      "Contenido coherente con actividades laborales",
      "No solicita información sensible",
      "Tono profesional apropiado",
    ],
    difficulty: "easy",
  },
  {
    id: "email-5",
    subject: "Confirmación de transferencia bancaria",
    sender: "notificaciones@banco-nacional.es",
    body: `Estimado titular de cuenta,

Le informamos que se ha procesado una transferencia desde su cuenta:

Fecha: 20/12/2023
Importe: €2,500.00
Destinatario: SERVICIOS INTERNACIONALES S.L.
Concepto: Pago de servicios

Si usted no autorizó esta transacción, haga clic inmediatamente en el siguiente enlace para bloquear su cuenta:

http://banco-nacional-seguro.net/bloquear

Código de verificación: BN7823456

Departamento de Seguridad Bancaria`,
    isPhishing: true,
    indicators: [
      "Notificación de transacción no autorizada (táctica de alarma)",
      "Dominio sospechoso (.net en lugar de .es)",
      "Solicita acción inmediata mediante enlace",
      "Información alarmante sin contexto previo",
    ],
    difficulty: "hard",
  },
];

export const gameQuestions: GameQuestion[] = [
  {
    id: "q1",
    email: phishingEmails[0],
    question: "¿Es este email un intento de phishing?",
    options: [
      "Sí, es phishing",
      "No, es legítimo",
      "No estoy seguro",
      "Necesito más información",
    ],
    correctAnswer: 0,
    explanation:
      "Este es un claro ejemplo de phishing. El dominio falso (.co), la urgencia excesiva y la solicitud de información personal son señales de alarma.",
    points: 100,
  },
  {
    id: "q2",
    email: phishingEmails[1],
    question: "¿Qué indica que este email es legítimo?",
    options: [
      "El dominio coincide con el remitente",
      "No hay urgencia excesiva",
      "Contiene información específica",
      "Todas las anteriores",
    ],
    correctAnswer: 3,
    explanation:
      "Este email es legítimo porque el dominio es consistente, no presiona al usuario y contiene información específica del pedido.",
    points: 150,
  },
  {
    id: "q3",
    email: phishingEmails[2],
    question: "¿Cuál es la principal señal de alarma en este email?",
    options: [
      "Solicita información personal por email",
      "El tono es muy formal",
      "Menciona un número de seguimiento",
      "Viene de una empresa de paquetería",
    ],
    correctAnswer: 0,
    explanation:
      "La principal señal de alarma es que solicita información personal sensible (incluyendo DNI) por email, lo cual nunca haría una empresa legítima.",
    points: 150,
  },
  {
    id: "q4",
    email: phishingEmails[3],
    question: "¿Por qué este email es seguro?",
    options: [
      "Viene de un compañero de trabajo",
      "El contenido es coherente con el trabajo",
      "No solicita información sensible",
      "Todas las anteriores",
    ],
    correctAnswer: 3,
    explanation:
      "Este email es seguro porque viene de un remitente conocido, tiene contenido laboral coherente y no solicita información sensible.",
    points: 100,
  },
  {
    id: "q5",
    email: phishingEmails[4],
    question: "¿Qué hace que este email sea especialmente peligroso?",
    options: [
      "Simula una emergencia bancaria",
      "Usa un dominio casi idéntico al real",
      "Presiona para actuar rápidamente",
      "Todas las anteriores",
    ],
    correctAnswer: 3,
    explanation:
      "Este email es muy peligroso porque combina varias técnicas: simula una emergencia, usa un dominio engañoso y presiona para actuar sin pensar.",
    points: 200,
  },
];

export const getRandomQuestions = (count: number = 3): GameQuestion[] => {
  const shuffled = [...gameQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const calculateScore = (
  correctAnswers: number,
  totalQuestions: number,
): number => {
  return Math.round((correctAnswers / totalQuestions) * 100);
};

export const getBadgeForScore = (
  score: number,
): { type: "bronze" | "silver" | "gold"; name: string; icon: string } => {
  if (score >= 90) {
    return { type: "gold", name: "Experto en Seguridad", icon: "🥇" };
  } else if (score >= 70) {
    return { type: "silver", name: "Guardián Digital", icon: "🥈" };
  } else {
    return { type: "bronze", name: "Aprendiz de Seguridad", icon: "🥉" };
  }
};
