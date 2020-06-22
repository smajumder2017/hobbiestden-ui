export function formatDate(date) {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}

export function getTime(date) {
  const d = new Date(date);
  let hours = d.getHours();
  let min = d.getMinutes();

  hours >= 12 ? (hours -= 12) : hours;

  min.toString().length < 2 ? (min = `0${min}`) : min;

  return `${hours}:${min} ${d.getHours() >= 12 ? 'PM' : 'AM'}`;
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];

export function getDate(date) {
  const [year, month, day] = formatDate(date).split('-');

  return `${day} ${months[parseInt(month, 10) - 1]} ${year}`;
}
