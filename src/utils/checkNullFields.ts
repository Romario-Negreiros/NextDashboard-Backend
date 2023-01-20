const checkNullFields = (fields: Object): Array<string> | undefined => {
  const allowedFields = [
    'verifyEmailToken',
    'verifyTokenExpiration',
    'pwdResetToken',
    'pwdResetTokenExpiration'
  ]
  const nullFields: Array<string> = []
  for (const field in fields) {
    if (allowedFields.includes(field)) {
      continue
    }
    if (!fields[field]) {
      nullFields.push(
        `${
          field.charAt(0).toUpperCase() + field.substring(1)
        } field is required!`
      )
    }
  }
  if (nullFields.length) {
    return nullFields
  }
}

export default checkNullFields
