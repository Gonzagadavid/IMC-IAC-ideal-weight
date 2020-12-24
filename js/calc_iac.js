;(function () {
  'use strict'

  const hip = document.getElementById('hip')
  const heightIAC = document.getElementById('heightIAC')
  const man = document.getElementById('man')
  const woman = document.getElementById('woman')
  const calcBtn = document.getElementById('calcIAC')
  const fBIAC = document.getElementById('fBIAC')
  let gender = ''

  calcBtn.disabled = true

  // caso o check-box homem esteja habilitado, desabilita o check-box mulher, passa como valor para a variável,
  // e chama a função que habilita o botão
  // caso o check-box estaja desabilitado, limpa o valor da variável e chama a função que habilita o botão
  man.addEventListener('change', womanDesable)
  function womanDesable () {
    woman.checked = false
    gender = 'man'
    if (man.checked === false) { gender = '' }
    enableBtn()
  }

  // caso o check-box mulher esteja habilitado, desabilita o check-box homem, passa como valor para a variável,
  // e chama a função que habilita o botão
  // caso o check-box estaja desabilitado, limpa o valor da variável e chama a função que habilita o botão
  woman.addEventListener('change', manDesable)
  function manDesable () {
    man.checked = false
    gender = 'woman'
    if (woman.checked === false) { gender = '' }
    enableBtn()
  }

  // verifica se o campo quadril foi preenchido valor válido, caso o valor seja válido chama a função que habilita o botão
  // caso o valor não seja válido o botão é desabilitado
  hip.addEventListener('input', checkHip)
  function checkHip () {
    if (hip.value < 40 || hip.value > 400) {
      calcBtn.disabled = true
    } else {
      enableBtn()
    }
    hip.removeEventListener('input', checkHip)
  }

  // verifica se o campo altura foi preenchido valor válido, caso o valor seja válido chama a função que habilita o botão
  // caso o valor não seja válido o botão é desabilitado
  heightIAC.addEventListener('input', checkHeight)
  function checkHeight () {
    if (heightIAC.value > 2.3 || heightIAC.value < 1) {
      calcBtn.disabled = true
    } else {
      enableBtn()
    }
    heightIAC.removeEventListener('input', checkHeight)
  }

  // verifica se todos os campos estão preenchidos, caso esteja o botão é habilitado, caso não o botão é desabilitado
  function enableBtn () {
    if (hip.value && heightIAC.value && gender) {
      calcBtn.disabled = false
    } else {
      calcBtn.disabled = true
    }
  }

  // função construtora do objeto pessoa, recebendo o dados como parâmentro, gerando métodos para os cálculos necessário
  function Person (hip, height, gender) {
    this.hip = hip
    this.height = height
    this.gender = gender

    // método para calcular o IAC
    this.iAC = function () {
      return ((parseFloat(this.hip) / (parseFloat(this.height) * (Math.sqrt(parseFloat(this.height))))) - 18).toFixed(2)
    }

    // método que verifica a váriavel gender que chama a função que verifica o nível
    // de acordo com o valor passando o resultado do IAC como parâmetro
    this.grade = function () {
      if (this.gender === 'man') {
        return fBMan(this.iAC())
      } else {
        return fBWoman(this.iAC())
      }
    }

    // recebe o resultado do IAC como parâmetro e retorna o nível do IAC para fBMan
    function fBMan (iac) {
      if (iac < 8) {
        return 'Abaixo do peso'
      } else if (iac <= 21) {
        return 'normal'
      } else if (iac <= 25) {
        return 'sobrepeso'
      } else {
        return 'obesidade'
      }
    }

    // recebe o resultado do IAC como parâmetro e retorna o nível do IAC para FBWoman
    function fBWoman (iac) {
      if (iac < 21) {
        return 'Abaixo do peso'
      } else if (iac <= 32) {
        return 'normal'
      } else if (iac <= 38) {
        return 'sobrepeso'
      } else {
        return 'obesidade'
      }
    }
  }

  // limpa o campo de feedback, constroi o objeto user com a função construtora Person e chama
  // a função de feedback passando o resultado dos metodos como parâmetro
  calcBtn.addEventListener('click', calcIAC)
  function calcIAC (e) {
    e.preventDefault()

    fBIAC.textContent = ''

    const user = new Person(hip.value, heightIAC.value, gender)

    fBMessage(user.grade(), user.iAC())
  }

  // recebe o valor do IAC e o nível como parâmetro e retorna o feedback para o usuário
  function fBMessage (grade, iac) {
    switch (grade) {
      case 'Abaixo do peso' :
        fBIAC.innerHTML = `Cuidado!<br><br> O seu IAC é de ${iac} <br><br>
      isso significa que você pode está abaixo do peso.<br><br>Procure um médico`
        break
      case 'normal' :
        fBIAC.innerHTML = `Parabéns!<br><br> O seu IAC é de ${iac} <br><br>
      isso significa que você está no peso normal.<br><br>Procure manter uma vida saudável`
        break
      case 'sobrepeso' :
        fBIAC.innerHTML = `Cuidado!<br><br> O seu IAC é de ${iac} <br><br>
      isso significa que você está sobrepeso.<br><br>Procure um médico`
        break
      case 'obesidade' :
        fBIAC.innerHTML = `Cuidado!<br><br> O seu IAC é de ${iac} <br><br>
      isso significa que você atingiu a obesidade.<br><br>Procure um médico`
        break
      default:
        fBIAC.innerHTML = 'Os dados enviados não são validos'
    }
  }
})()
