;(function () {
  'use strict'

  const quadril = document.getElementById('quadril')
  const alturaIAC = document.getElementById('alturaIAC')
  const homem = document.getElementById('homem')
  const mulher = document.getElementById('mulher')
  const calcBtn = document.getElementById('calcIAC')
  const fBIAC = document.getElementById('fBIAC')
  let sexo = ''

  calcBtn.disabled = true

  // caso o check-box homem esteja habilitado, desabilita o check-box mulher e passa como valor para a variável,
  // e chama a função que habilita o botão
  // caso o check-box estaja desabilitado, limpa o valor da variável e chama a função que habilita o botão
  homem.addEventListener('change', desaMulher)
  function desaMulher () {
    mulher.checked = false
    sexo = 'homem'
    if (homem.checked === false) { sexo = '' }
    enableBtn()
  }

  // caso o check-box mulher esteja habilitado, desabilita o check-box homem e passa como valor para a variável,
  // e chama a função que habilita o botão
  // caso o check-box estaja desabilitado, limpa o valor da variável e chama a função que habilita o botão
  mulher.addEventListener('change', desaHomem)
  function desaHomem () {
    homem.checked = false
    sexo = 'mulher'
    if (mulher.checked === false) { sexo = '' }
    enableBtn()
  }

  // verifica se o campo quadril foi preenchido valor válido, caso o valor seja válido chama a função que habilita o botão
  // caso o valor não seja válido o botão é desabilitado
  quadril.addEventListener('input', verificaQuadril)
  function verificaQuadril () {
    if (quadril.value < 40 || quadril.value > 400) {
      calcBtn.disabled = true
    } else {
      enableBtn()
    }
    quadril.removeEventListener('input', verificaQuadril)
  }

  // verifica se o campo altura foi preenchido valor válido, caso o valor seja válido chama a função que habilita o botão
  // caso o valor não seja válido o botão é desabilitado
  alturaIAC.addEventListener('input', verificaAltura)
  function verificaAltura () {
    if (alturaIAC.value > 2.3 || alturaIAC.value < 1) {
      calcBtn.disabled = true
    } else {
      enableBtn()
    }
    alturaIAC.removeEventListener('input', verificaAltura)
  }

  // verifica se todos os campos estão preenchidos, caso esteja o botão é habilitado, caso não o botão é desabilitado
  function enableBtn () {
    if (quadril.value && alturaIAC.value && sexo) {
      calcBtn.disabled = false
    } else {
      calcBtn.disabled = true
    }
  }

  // função construtora do objeto pessoa, recebendo o dados como parâmentro, e gerendo métodos para os cálculos necessário
  function Pessoa (quadril, altura, sexo) {
    this.quadril = quadril
    this.altura = altura
    this.sexo = sexo

    // método para calcular o IAC
    this.iAC = function () {
      return ((parseFloat(this.quadril) / (parseFloat(this.altura) * (Math.sqrt(parseFloat(this.altura))))) - 18).toFixed(2)
    }

    // método que verifica a váriavel sexo que chama a função que verifica o nível
    // de acordo com o valor passando o resultado do IAC como parâmetro
    this.nivel = function () {
      if (this.sexo === 'homem') {
        return fBHomem(this.iAC())
      } else {
        return fBMulher(this.iAC())
      }
    }

    // recebe o resultado do IAC como parâmetro e retorna o nível do IAC para homem
    function fBHomem (iac) {
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

    // recebe o resultado do IAC como parâmetro e retorna o nível do IAC para mulher
    function fBMulher (iac) {
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

  // limpa o campo de feedback, constroi o objeto usuario com a função construtora Pessoa e chama
  // a função de feedback passando o resultado dos metodos como parâmetro
  calcBtn.addEventListener('click', calculaIMC)
  function calculaIMC (e) {
    e.preventDefault()

    fBIAC.textContent = ''

    const usuario = new Pessoa(quadril.value, alturaIAC.value, sexo)

    fBMessage(usuario.nivel(), usuario.iAC())
  }

  // recebe o valor do IAC e o nível como parâmetro e retorna o feedback para o usuário
  function fBMessage (nivel, iac) {
    switch (nivel) {
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
