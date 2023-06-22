const parseQuery = <T>(params: URLSearchParams) => {
  const finalResult: Record<string, string | number | string[]> = {};
  params.forEach((value, param) => {
    try {
      let x = Number(value)
      if (value.length && !Number.isNaN(x)) {
        finalResult[param] = x
      } else {
        const arrayOfString = value.split(',');
        if (arrayOfString.length <= 1) {
          finalResult[param] = value;
        } else {
          finalResult[param] = arrayOfString
        }
      }
    } catch (error) {
      const arrayOfString = value.split(',');
      if (arrayOfString.length <= 1) {
        finalResult[param] = value;
      } else {
        finalResult[param] = arrayOfString
      }
    }
  })

  return finalResult as Partial<T>
}

export default parseQuery;