function validaFormatacao(string) {
  const aberturas = [];

  for (let caracter of string) {
    
    if (caracter === '(' || caracter === '{' || caracter === '[') {
      aberturas.push(caracter);
    } else {
      const ultimo = aberturas.pop();

      if (
        (caracter === ')' && ultimo !== '(') ||
        (caracter === '}' && ultimo !== '{') ||
        (caracter === ']' && ultimo !== '[')
      ) {
        return false;
      }
    }
  }

   return aberturas.length === 0;
}

console.log(validaFormatacao("(){}[]"));
console.log(validaFormatacao("[{()}](){}"));
console.log(validaFormatacao("[]{()}"));
console.log(validaFormatacao("[{)]")); 
