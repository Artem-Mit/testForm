// Функция ковертирует время из строки формата "чч:мм" в кол-во миллисекунд

export const timeConverter = (time: string) => {
  const [hrs, min, sec] = time.split(":");
  const timerTime =
    (Number(hrs) * 60 * 60 + Number(min) * 60 + Number(sec)) * 1000;

  return timerTime;
}