
export const transformDate = (at: Date) => {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();
  const nowHours = now.getHours();
  const nowMinutes = now.getMinutes();
  const nowSeconds = now.getSeconds();

  const date = new Date(at);
  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth() + 1;
  const dateDate = date.getDate();
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();
  const dateSeconds = date.getSeconds();

  if(
    nowYear === dateYear &&
    nowMonth === dateMonth &&
    nowDate === dateDate
  ) {
    if(nowHours > dateHours) {
      return `${nowHours - dateHours} hours ago`;
    } else if (nowMinutes > dateMinutes) {
      return `${nowMinutes - dateMinutes} minutes ago`;
    } else if (nowSeconds - dateSeconds) {
      return `${nowSeconds - dateSeconds} seconds ago`;
    } else if (
      nowHours === dateHours &&
      nowMonth === dateMonth &&
      nowSeconds === dateSeconds
    ) {
      return "Now";
    } else {
      return "Internal Error"
    }
  } else {
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`
  }
}

export const transformEmail = (email: string) => {
  const splitedEmail = email.split("@");
  const username = splitedEmail[0].replace(splitedEmail[0].substr(1, splitedEmail[0].length-2), "*".repeat(splitedEmail[0].length-2));
  return `${username}@${splitedEmail[1]}`;
}