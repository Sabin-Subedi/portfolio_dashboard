export const getNameFromEmail = (email) => {
  return email ? email.split("@")[0] : email;
};
