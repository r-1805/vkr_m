export const fallbackConferences = [
  {
    id: 1,
    title: "ИНТЕР ЭКСПО ГЕО-Сибирь 2025",
    description:
      "XVIII Международная выставка и научный конгресс в области геопространственной деятельности.",
    start_date: "2025-05-17",
    end_date: "2025-05-19",
    image: "https://sgugit.ru/upload/files-for-news/2025/1112/12.jpg",
    format: "Очно + онлайн",
    city: "Новосибирск",
    place: "СГУГиТ, ул. Плахотного, 10",
    tags: ["Геодезия", "Картография", "GIS", "IT"]
  },
  {
    id: 2,
    title: "Цифровые технологии в геодезии",
    description: "Студенческая конференция по итогам учебного года и проектной деятельности.",
    start_date: "2025-06-01",
    end_date: "2025-06-05",
    image: null,
    format: "Очно",
    city: "Новосибирск",
    place: "СГУГиТ, главный корпус",
    tags: ["Студенты", "Доклады", "Практика"]
  }
];

export const archiveConference = {
  id: 101,
  title: "ИНТЕР ЭКСПО ГЕО-Сибирь 2022",
  description:
    "Прошла XVII Международная выставка и научный конгресс «Интерэкспо ГЕО-Сибирь».",
  period: "17-19 мая 2022",
  place: "СГУГиТ, Новосибирск",
  files: [
    "Программа конференции.pdf",
    "Сборник тезисов.pdf",
    "Итоговый пресс-релиз.pdf"
  ],
  photos: ["/preset/image 10.png", "/preset/Rectangle 6.png", "/preset/Group 9.png"]
};

export const userProfile = {
  name: "Иванов Иван Иванович",
  email: "ivanov@sgugit.ru",
  phone: "+7 (955) 111-00-33",
  city: "Новосибирск",
  university: "СГУГиТ",
  role: "Участник",
  notifications: [
    "Вы назначены модератором на секцию истории.",
    "У вас новые заявки на участие.",
    "Сертификат станет доступен после публикации итогов."
  ]
};

export const userEvents = [
  {
    id: 1,
    title: "ИНТЕР ЭКСПО ГЕО-Сибирь 2025",
    section: "Секция истории",
    theme: "Роль цифровых карт в исследовании городской среды",
    status: "Принято",
    type: "current",
    date: "17-19 мая 2025"
  },
  {
    id: 2,
    title: "Цифровые технологии в геодезии",
    section: "Секция IT",
    theme: "Роль динозавра в IT",
    status: "Черновик",
    type: "draft",
    date: "01-05 июня 2025"
  }
];

export const userArchive = [
  {
    id: 11,
    title: "ИНТЕР ЭКСПО ГЕО-Сибирь 2022",
    section: "Секция робототехники",
    result: "Сертификат опубликован",
    date: "17-19 мая 2022"
  }
];

export const organizerProfile = {
  name: "Петрова Анна Владимировна",
  role: "Преподаватель / Организатор",
  sections: ["История", "IT", "Робототехника"],
  alerts: [
    "У вас 8 новых заявок.",
    "Вы - модератор секций истории, IT и робототехники.",
    "Нужно подтвердить список секретарей."
  ]
};

export const organizerEvents = [
  {
    id: 201,
    title: "ИНТЕР ЭКСПО ГЕО-Сибирь 2025",
    status: "Текущее мероприятие",
    participants: 128,
    sections: 6
  },
  {
    id: 202,
    title: "Цифровые технологии в геодезии",
    status: "Черновик",
    participants: 0,
    sections: 4
  }
];

export const organizerStats = [
  { label: "Новые заявки", value: 24 },
  { label: "Просмотренные", value: 18 },
  { label: "Принято", value: 12 },
  { label: "Отклонено", value: 3 }
];

export const adminUsers = [
  {
    id: 1,
    name: "Иванов И.И.",
    role: "Участник",
    email: "ivanov@sgugit.ru",
    status: "Активен"
  },
  {
    id: 2,
    name: "Петрова А.В.",
    role: "Организатор",
    email: "petrova@sgugit.ru",
    status: "Активен"
  },
  {
    id: 3,
    name: "Сидоров В.Н.",
    role: "Модератор",
    email: "sidorov@sgugit.ru",
    status: "Приглашен"
  }
];

export const adminOrganizers = [
  "Петрова Анна Владимировна",
  "Смирнов Алексей Сергеевич",
  "Воронова Елена Андреевна"
];

export const adminModerators = [
  "История",
  "IT",
  "Робототехника",
  "Геоинформатика"
];

export const adminEvents = {
  current: [
    { id: 1, title: "ИНТЕР ЭКСПО ГЕО-Сибирь 2025", state: "Опубликовано", users: 128 },
    { id: 2, title: "Цифровые технологии в геодезии", state: "Регистрация", users: 64 }
  ],
  archive: [
    { id: 101, title: "ИНТЕР ЭКСПО ГЕО-Сибирь 2022", state: "Архив", users: 210 }
  ]
};

export const registerSteps = [
  { id: "start", title: "Регистрация", caption: "Введите основные данные" },
  { id: "code", title: "Код подтверждения", caption: "Введите 4 цифры из сообщения" },
  { id: "password", title: "Создание пароля", caption: "Придумайте пароль для входа" },
  { id: "done", title: "Готово", caption: "Аккаунт создан" }
];

export const formatDateRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const dayFormat = new Intl.DateTimeFormat("ru-RU", { day: "2-digit" });
  const monthFormat = new Intl.DateTimeFormat("ru-RU", { month: "long" });
  const yearFormat = new Intl.DateTimeFormat("ru-RU", { year: "numeric" });

  return `${dayFormat.format(startDate)}-${dayFormat.format(endDate)} ${monthFormat.format(startDate)} ${yearFormat.format(startDate)}`;
};
