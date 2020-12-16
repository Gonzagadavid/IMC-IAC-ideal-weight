;(function () {
  'use strict'

  const peso = document.getElementById('peso')
  const alutraImc = document.getElementById('alturaIMC')
  const imcBtn = document.getElementById('calcIMC')
  const grauIMC = document.getElementById('grauIMC')
  const pesoIdealIMC = document.getElementById('pesoIdeal')

  alutraImc.focus()
  imcBtn.disabled = true

  // Verifica se o campo de altura esta preenchido corretamente e habilita o botão
  alutraImc.addEventListener('input', enablebutton)
  function enablebutton () {
    imcBtn.disabled = false

    if (alutraImc.value.length === 0 || alutraImc.value > 2.3 || alutraImc.value < 1) {
      imcBtn.disabled = true
    }
  }

  // Verifica se o campo de peso esta preenchido corretamente e chama a função de verificar altura
  peso.addEventListener('input', verificaPeso)
  function verificaPeso () {
    if (peso.value.length === 0) {
      enablebutton()
    } else if (peso.value < 20 || peso.value > 400) {
      imcBtn.disabled = true
    } else {
      enablebutton()
    }
  }

  // verifica se o campo de peso esta preenchido, caso não chama a fução de peso ideal passando a altura como parâmetro
  // caso o peso esteja preenchido é calculado o IMC chama a função de feedback para o resultado como parâmetro,
  // chama a fução de peso ideal passando a altura como parâmetro
  imcBtn.addEventListener('click', calculaIMC)
  function calculaIMC (e) {
    e.preventDefault()

    if (peso.value === '') {
      grauIMC.textContent = ''
      return pesoIdeal(parseFloat(alutraImc.value))
    }

    const result = parseFloat(peso.value) / Math.pow(parseFloat(alutraImc.value), 2)

    fBGrau(result)
    pesoIdeal(parseFloat(alutraImc.value))
  }

  // calcula o peso ideal recebendo a altura como parâmetro e retorna o resultado para o usuário
  function pesoIdeal (altura) {
    const pesoMin = 18.6 * Math.pow(parseFloat(altura), 2)
    const pesoMax = 24.9 * Math.pow(parseFloat(altura), 2)
    pesoIdealIMC.innerHTML = `
    A faixa de peso ideal para a altura de ${altura} metros(m) é de
    <i> ${parseFloat(pesoMin).toFixed(1)}</i> kg a <i>${parseFloat(pesoMax).toFixed(1)}</i> kg`
    alutraImc.value = ''
    peso.value = ''
    imcBtn.disabled = true
    alutraImc.focus()
  }
  // recebe o resultado como parâmetro e retorna o nível do IMC para o usuário
  function fBGrau (resultado) {
    if (resultado < 18.5) {
      grauIMC.innerHTML = `<i> IMC de ${parseFloat(resultado).toFixed(1)} </i><br><br>
    18,5 ou menos<br>
    Abaixo do normal<br>
    Procure um médico. Algumas pessoas têm um baixo peso por características do seu organismo e tudo bem. Outras podem estar enfrentando problemas, como a desnutrição. É preciso saber qual é o caso.<br><br>`
    } else if (resultado < 25) {
      grauIMC.innerHTML = `<i> IMC de ${parseFloat(resultado).toFixed(1)} </i><br><br>
     Entre 18,6 e 24,9<br>
     Normal<br>
     Que bom que você está com o peso normal! E o melhor jeito de continuar assim é mantendo um estilo de vida ativo e uma alimentação equilibrada.<br><br>`
    } else if (resultado < 30) {
      grauIMC.innerHTML = `<i> IMC de ${parseFloat(resultado).toFixed(1)} </i><br><br>
     Entre 25,0 e 29,9<br>
     Sobrepeso<br>
     Ele é, na verdade, uma pré-obesidade e muitas pessoas nessa faixa já apresentam doenças associadas, como diabetes e hipertensão. Importante rever hábitos e buscar ajuda antes de, por uma série de fatores, entrar na faixa da obesidade pra valer.<br><br>`
    } else if (resultado < 35) {
      grauIMC.innerHTML = `<i> IMC de ${parseFloat(resultado).toFixed(1)} </i><br><br>
     Entre 30,0 e 34,9<br>
     Obesidade grau I<br> 
     Sinal de alerta! Chegou na hora de se cuidar, mesmo que seus exames sejam normais. Vamos dar início a mudanças hoje! Cuide de sua alimentação. Você precisa iniciar um acompanhamento com nutricionista e/ou endocrinologista.<br><br>`
    } else if (resultado < 40) {
      grauIMC.innerHTML = `<i> IMC de ${parseFloat(resultado).toFixed(1)} </i><br><br>
     Entre 35,0 e 39,9<br>
     Obesidade grau II<br>
     Mesmo que seus exames aparentem estar normais, é hora de se cuidar, iniciando mudanças no estilo de vida com o acompanhamento próximo de profissionais de saúde<br><br>`
    } else if (resultado > 40) {
      grauIMC.innerHTML = `<i> IMC de ${parseFloat(resultado).toFixed(1)} </i><br><br>
     Acima de 40,0<br>
     Obesidade grau III<br>
     Aqui o sinal é vermelho, com forte probabilidade de já existirem doenças muito graves associadas. O tratamento deve ser ainda mais urgente.<br><br>`
    }
  }
})()
