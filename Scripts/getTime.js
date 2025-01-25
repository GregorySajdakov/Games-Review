const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hour = date.getHours();
let minute = date.getMinutes();

if(minute < 10) {
  minute = `0${minute}`;
}

export function getCurrentTime() {
  return `${hour}:${minute} ${day}/${month}/${year}`
}