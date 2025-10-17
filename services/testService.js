// Функция для перемешивания массива
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const testQuestions = [
  {
    id: 1,
    question: "Как часто вы бываете в храме?",
    type: "single",
    options: [
      { id: 'a', text: "Практически никогда" },
      { id: 'b', text: "По большим праздникам" },
      { id: 'c', text: "Регулярно, несколько раз в месяц" },
      { id: 'd', text: "Каждую неделю" }
    ]
  },
  {
    id: 2,
    question: "Знаете ли вы наизусть молитву «Символ Веры»?",
    type: "single",
    options: [
      { id: 'a', text: "Не знаю" },
      { id: 'b', text: "Слышал(а), но не помню наизусть" },
      { id: 'c', text: "Знаю частично" },
      { id: 'd', text: "Знаю наизусть" }
    ]
  },
  {
    id: 3,
    question: "Как вы понимаете главную роль крестного?",
    type: "single",
    options: [
      { id: 'a', text: "Поддержать родителей и красиво провести обряд" },
      { id: 'b', text: "Помогать родителям в жизни, дарить подарки" },
      { id: 'c', text: "Помогать воспитывать ребенка в православной вере, молиться за него" }
    ]
  }
];

export class TestService {
  calculateLevel(answers) {
    let score = 0;
    
    answers.forEach(answer => {
      switch(answer.questionId) {
        case 1:
          if (answer.answer === 'd') score += 3;
          else if (answer.answer === 'c') score += 2;
          else if (answer.answer === 'b') score += 1;
          break;
        case 2:
          if (answer.answer === 'd') score += 3;
          else if (answer.answer === 'c') score += 2;
          else if (answer.answer === 'b') score += 1;
          break;
        case 3:
          if (answer.answer === 'c') score += 3;
          else if (answer.answer === 'b') score += 1;
          break;
      }
    });

    if (score >= 7) return 'churched';
    else if (score >= 4) return 'basic';
    else return 'beginner';
  }

  getQuestion(questionId) {
    const question = testQuestions.find(q => q.id === questionId);
    if (!question) return null;
    
    // Возвращаем копию вопроса с перемешанными вариантами
    return {
      ...question,
      options: shuffleArray([...question.options])
    };
  }

  getAllQuestions() {
    return testQuestions;
  }

  getProgress(questionId) {
    return `${questionId}/${testQuestions.length}`;
  }
}

export const testService = new TestService();