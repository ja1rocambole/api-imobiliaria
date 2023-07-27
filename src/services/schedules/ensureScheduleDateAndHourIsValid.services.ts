import { AppError } from "../../errror";

export const ensureScheduleDateAndHourIsValidServices = (
  date: string,
  hour: string
) => {
  const horaRegex = /^(0[8-9]|1[0-7]):[0-5]\d$|^18:00$/;
  const hourvalid = horaRegex.test(hour);

  if (!hourvalid) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  // Validar o dia da semana
  const [year, day, month] = date.split("/");
  const dateObj = new Date(`${year}-${month}-${day}`);
  const dayOfweek = dateObj.getUTCDay();
  const dayvalid = dayOfweek >= 1 && dayOfweek <= 5;

  if (!dayvalid) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }
};
