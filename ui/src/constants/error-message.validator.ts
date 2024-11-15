export const ErrorMessages = {
  required: 'This is a required field',
  email: 'Enter a valid Email Address',
  password: "Password criteria doesn't match. Please check hint for more details",
  sameAsPassword: 'Password does not match',
}

export const ValidationRegex = {
  password: /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/
}


export const CustomValidators = {
  password: {
    $validator: (value: string) => !!value.match(ValidationRegex.password),
    $message: ErrorMessages.password
  }
}
