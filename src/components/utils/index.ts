export function verifyPassword(password: string) {
  let validate = 0

  const regexSize = /[a-zA-Z0-9]{6,}/;
  const regexUpperCase = /[A-Z]/;
  const regexLowerCase = /[a-z]/;
  const regexEspecial = /[!@#$%^&*]/;
  const regexNumbers = /\d/;
  const regexSequence = /^(?!.*(.)\1{2,}).*$/;

  // if(regexSize.test(password)){
  //   validate=validate+1
  // }
  if(password===""){
    return 0
  }

  {regexSize.test(password)?validate++:{}}
  {regexUpperCase.test(password)?validate++:{}}
  {regexLowerCase.test(password)?validate++:{}}
  {regexEspecial.test(password)?validate++:{}}
  {regexNumbers.test(password)?validate++:{}}
  if(password.length>=3){
    {regexSequence.test(password)?validate++:{}}
  }
  
  return validate
}