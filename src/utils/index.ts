export const isValidNumber = (str: string | number): boolean => {
  if (typeof str === 'number') {
    return true;
  }

  if (str.trim() === '') {
    return false;
  }

  return !Number.isNaN(Number(str));
}

export const isValidRegex = (pattern: string): boolean => {
  try {
    new RegExp(pattern);
    return true;
  }
  catch(e) {
    return false;
  }
}