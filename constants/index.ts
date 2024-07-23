export const dataToInsert = {
  languages: [
    {
      title: "Hindi",
      imgSrc: "/hindi.svg",
    },
    {
      title: "Spanish",
      imgSrc: "/es.svg",
    },
    {
      title: "Japanese",
      imgSrc: "/jp.svg",
    },
    {
      title: "French",
      imgSrc: "/fr.svg",
    },
    {
      title: "Croatian",
      imgSrc: "/hr.svg",
    },
    {
      title: "Italian",
      imgSrc: "/it.svg",
    },
  ],
  units: [
    {
      id: 1,
      courseId: 2, // Spanish
      title: "Unit 1",
      description: "Learn the basics of Spanish",
      order: 1,
    },
    {
      id: 2,
      courseId: 1, // Hindi
      title: "Unit 1",
      description: "Learn the basics of Hindi",
      order: 1,
    },
  ],
  lessons: [
    {
      id: 1,
      unitId: 1, // Unit 1 (Learn the basics...)
      order: 1,
      title: "Nouns",
    },
    {
      id: 2,
      unitId: 1, // Unit 1 (Learn the basics...)
      order: 2,
      title: "Verbs",
    },
    {
      id: 3,
      unitId: 2, // Unit 1 (Learn the basics of Hindi)
      order: 1,
      title: "Nouns",
    },
    {
      id: 4,
      unitId: 2, // Unit 1 (Learn the basics of Hindi)
      order: 2,
      title: "Verbs",
    },
  ],
  challenges: [
    {
      id: 1,
      lessonId: 1, // Nouns
      type: "SELECT",
      order: 1,
      question: 'Which one of these is the "the man"?',
    },
    {
      id: 2,
      lessonId: 1, // Nouns
      type: "ASSIST",
      order: 2,
      question: '"the man"',
    },
    {
      id: 3,
      lessonId: 1, // Nouns
      type: "SELECT",
      order: 3,
      question: 'Which one of these is the "the robot"?',
    },
    {
      id: 4,
      lessonId: 2, // Verbs
      type: "SELECT",
      order: 1,
      question: 'Which one of these is the "the man"?',
    },
    {
      id: 5,
      lessonId: 2, // Verbs
      type: "ASSIST",
      order: 2,
      question: '"the robot"',
    },
    {
      id: 6,
      lessonId: 2, // Verbs
      type: "SELECT",
      order: 3,
      question: 'Which one of these is the "the woman"?',
    },
    {
      id: 7,
      lessonId: 3, // Nouns (Hindi)
      type: "SELECT",
      order: 1,
      question: 'Which one of these is the "the man"?',
    },
    {
      id: 8,
      lessonId: 3, // Nouns (Hindi)
      type: "ASSIST",
      order: 2,
      question: '"the man"',
    },
    {
      id: 9,
      lessonId: 3, // Nouns (Hindi)
      type: "SELECT",
      order: 3,
      question: 'Which one of these is the "the robot"?',
    },
    {
      id: 10,
      lessonId: 4, // Verbs (Hindi)
      type: "SELECT",
      order: 1,
      question: 'Which one of these is the "the man"?',
    },
    {
      id: 11,
      lessonId: 4, // Verbs (Hindi)
      type: "ASSIST",
      order: 2,
      question: '"the robot"',
    },
    {
      id: 12,
      lessonId: 4, // Verbs (Hindi)
      type: "SELECT",
      order: 3,
      question: 'Which one of these is the "the woman"?',
    },
  ],
  challengeOptions: [
    {
      challengeId: 1, // Which one of these is "the man"?
      imgSrc: "/man.svg",
      correct: true,
      text: "el hombre",
      audioSrc: "/es_man.mp3",
    },
    {
      challengeId: 1,
      imgSrc: "/woman.svg",
      correct: false,
      text: "la mujer",
      audioSrc: "/es_woman.mp3",
    },
    {
      challengeId: 1,
      imgSrc: "/robot.svg",
      correct: false,
      text: "el robot",
      audioSrc: "/es_robot.mp3",
    },
    {
      challengeId: 2, // "the man"?
      correct: true,
      text: "el hombre",
      audioSrc: "/es_man.mp3",
    },
    {
      challengeId: 2,
      correct: false,
      text: "la mujer",
      audioSrc: "/es_woman.mp3",
    },
    {
      challengeId: 2,
      correct: false,
      text: "el robot",
      audioSrc: "/es_robot.mp3",
    },
    {
      challengeId: 3, // Which one of these is the "the robot"?
      imgSrc: "/man.svg",
      correct: false,
      text: "el hombre",
      audioSrc: "/es_man.mp3",
    },
    {
      challengeId: 3,
      imgSrc: "/woman.svg",
      correct: false,
      text: "la mujer",
      audioSrc: "/es_woman.mp3",
    },
    {
      challengeId: 3,
      imgSrc: "/robot.svg",
      correct: true,
      text: "el robot",
      audioSrc: "/es_robot.mp3",
    },
    {
      challengeId: 4, // Which one of these is "the man"?
      imgSrc: "/man.svg",
      correct: true,
      text: "el hombre",
      audioSrc: "/es_man.mp3",
    },
    {
      challengeId: 4,
      imgSrc: "/woman.svg",
      correct: false,
      text: "la mujer",
      audioSrc: "/es_woman.mp3",
    },
    {
      challengeId: 4,
      imgSrc: "/robot.svg",
      correct: false,
      text: "el robot",
      audioSrc: "/es_robot.mp3",
    },
    {
      challengeId: 5, // "the robot"?
      correct: false,
      text: "el hombre",
      audioSrc: "/es_man.mp3",
    },
    {
      challengeId: 5,
      correct: false,
      text: "la mujer",
      audioSrc: "/es_woman.mp3",
    },
    {
      challengeId: 5,
      correct: true,
      text: "el robot",
      audioSrc: "/es_robot.mp3",
    },
    {
      challengeId: 6, // Which one of these is the "the woman"?
      imgSrc: "/man.svg",
      correct: false,
      text: "el hombre",
      audioSrc: "/es_man.mp3",
    },
    {
      challengeId: 6,
      imgSrc: "/woman.svg",
      correct: true,
      text: "la mujer",
      audioSrc: "/es_woman.mp3",
    },
    {
      challengeId: 6,
      imgSrc: "/robot.svg",
      correct: false,
      text: "el robot",
      audioSrc: "/es_robot.mp3",
    },
    {
      challengeId: 7, // Which one of these is "the man" (Hindi)?
      imgSrc: "/man.svg",
      correct: true,
      text: "आदमी",
      audioSrc: "/hindi_man.mp3",
    },
    {
      challengeId: 7,
      imgSrc: "/woman.svg",
      correct: false,
      text: "महिला",
      audioSrc: "/hindi_woman.mp3",
    },
    {
      challengeId: 7,
      imgSrc: "/robot.svg",
      correct: false,
      text: "रोबोट",
      audioSrc: "/hindi_robot.mp3",
    },
    {
      challengeId: 8, // "the man" (Hindi)?
      correct: true,
      text: "आदमी",
      audioSrc: "/hindi_man.mp3",
    },
    {
      challengeId: 8,
      correct: false,
      text: "महिला",
      audioSrc: "/hindi_woman.mp3",
    },
    {
      challengeId: 8,
      correct: false,
      text: "रोबोट",
      audioSrc: "/hindi_robot.mp3",
    },
    {
      challengeId: 9, // Which one of these is the "the robot" (Hindi)?
      imgSrc: "/man.svg",
      correct: false,
      text: "आदमी",
      audioSrc: "/hindi_man.mp3",
    },
    {
      challengeId: 9,
      imgSrc: "/woman.svg",
      correct: false,
      text: "महिला",
      audioSrc: "/hindi_woman.mp3",
    },
    {
      challengeId: 9,
      imgSrc: "/robot.svg",
      correct: true,
      text: "रोबोट",
      audioSrc: "/hindi_robot.mp3",
    },
    {
      challengeId: 10, // Which one of these is "the man" (Hindi)?
      imgSrc: "/man.svg",
      correct: true,
      text: "आदमी",
      audioSrc: "/hindi_man.mp3",
    },
    {
      challengeId: 10,
      imgSrc: "/woman.svg",
      correct: false,
      text: "महिला",
      audioSrc: "/hindi_woman.mp3",
    },
    {
      challengeId: 10,
      imgSrc: "/robot.svg",
      correct: false,
      text: "रोबोट",
      audioSrc: "/hindi_robot.mp3",
    },
    {
      challengeId: 11, // "the robot" (Hindi)?
      correct: false,
      text: "आदमी",
      audioSrc: "/hindi_man.mp3",
    },
    {
      challengeId: 11,
      correct: false,
      text: "महिला",
      audioSrc: "/hindi_woman.mp3",
    },
    {
      challengeId: 11,
      correct: true,
      text: "रोबोट",
      audioSrc: "/hindi_robot.mp3",
    },
    {
      challengeId: 12, // Which one of these is the "the woman" (Hindi)?
      imgSrc: "/man.svg",
      correct: false,
      text: "आदमी",
      audioSrc: "/hindi_man.mp3",
    },
    {
      challengeId: 12,
      imgSrc: "/woman.svg",
      correct: true,
      text: "महिला",
      audioSrc: "/hindi_woman.mp3",
    },
    {
      challengeId: 12,
      imgSrc: "/robot.svg",
      correct: false,
      text: "रोबोट",
      audioSrc: "/hindi_robot.mp3",
    },
  ],
};
