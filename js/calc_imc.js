;(function () {
  'use strict'

  const Weight = document.getElementById('Weight')
  const heightImc = document.getElementById('heightIMC')
  const imcBtn = document.getElementById('calcIMC')
  const gradeIMC = document.getElementById('gradeIMC')
  const idealWeightIMC = document.getElementById('idealWeight')

  heightImc.focus()
  imcBtn.disabled = true

  // Verifica se o campo de altura esta preenchido corretamente e habilita o botão
  heightImc.addEventListener('input', enablebutton)
  function enablebutton () {
    imcBtn.disabled = false

    if (heightImc.value.length === 0 || heightImc.value > 2.3 || heightImc.value < 1) {
      imcBtn.disabled = true
    }
  }

  // Verifica se o campo de peso esta preenchido corretamente e chama a função de verificar altura
  Weight.addEventListener('input', checkWeight)
  function checkWeight () {
    if (Weight.value.length === 0) {
      enablebutton()
    } else if (Weight.value < 20 || Weight.value > 400) {
      imcBtn.disabled = true
    } else {
      enablebutton()
    }
  }

  // verifica se o campo de peso esta preenchido, caso não chama a fução de peso ideal passando a altura como parâmetro
  // caso o peso esteja preenchido é calculado o IMC chama a função de feedback passando o resultado como parâmetro,
  // chama a fução de peso ideal passando a altura como parâmetro
  imcBtn.addEventListener('click', calcIMC)
  function calcIMC (e) {
    e.preventDefault()

    if (Weight.value === '') {
      gradeIMC.textContent = ''
      return idealWeight(parseFloat(heightImc.value))
    }

    const result = parseFloat(Weight.value) / Math.pow(parseFloat(heightImc.value), 2)

    fBGrade(result)
    idealWeight(parseFloat(heightImc.value))
  }

  // calcula o peso ideal recebendo a altura como parâmetro e retorna o resultado para o usuário
  function idealWeight (height) {
    const weightMin = 18.6 * Math.pow(parseFloat(height), 2)
    const weightMax = 24.9 * Math.pow(parseFloat(height), 2)
    idealWeightIMC.innerHTML = `
    A faixa de peso ideal para a altura de ${height} metros(m) é de
    <i> ${parseFloat(weightMin).toFixed(1)}</i> kg a <i>${parseFloat(weightMax).toFixed(1)}</i> kg`
    heightImc.value = ''
    Weight.value = ''
    imcBtn.disabled = true
    heightImc.focus()
  }
  // recebe o resultado como parâmetro e retorna o nível do IMC para o usuário
  function fBGrade (result) {
    if (result < 18.5) {
      gradeIMC.innerHTML = `<i> IMC de ${parseFloat(result).toFixed(1)} </i><br><br>
    18,5 ou menos<br>
    Abaixo do normal<br>
    Procure um médico. Algumas pessoas têm um baixo peso por características do seu organismo e tudo bem. Outras podem estar enfrentando problemas, como a desnutrição. É preciso saber qual é o caso.<br><br>`
    } else if (result < 25) {
      gradeIMC.innerHTML = `<i> IMC de ${parseFloat(result).toFixed(1)} </i><br><br>
     Entre 18,6 e 24,9<br>
     Normal<br>
     Que bom que você está com o peso normal! E o melhor jeito de continuar assim é mantendo um estilo de vida ativo e uma alimentação equilibrada.<br><br>`
    } else if (result < 30) {
      gradeIMC.innerHTML = `<i> IMC de ${parseFloat(result).toFixed(1)} </i><br><br>
     Entre 25,0 e 29,9<br>
     Sobrepeso<br>
     Ele é, na verdade, uma pré-obesidade e muitas pessoas nessa faixa já apresentam doenças associadas, como diabetes e hipertensão. Importante rever hábitos e buscar ajuda antes de, por uma série de fatores, entrar na faixa da obesidade pra valer.<br><br>`
    } else if (result < 35) {
      gradeIMC.innerHTML = `<i> IMC de ${parseFloat(result).toFixed(1)} </i><br><br>
     Entre 30,0 e 34,9<br>
     Obesidade grau I<br> 
     Sinal de alerta! Chegou na hora de se cuidar, mesmo que seus exames sejam normais. Vamos dar início a mudanças hoje! Cuide de sua alimentação. Você precisa iniciar um acompanhamento com nutricionista e/ou endocrinologista.<br><br>`
    } else if (result < 40) {
      gradeIMC.innerHTML = `<i> IMC de ${parseFloat(result).toFixed(1)} </i><br><br>
     Entre 35,0 e 39,9<br>
     Obesidade grau II<br>
     Mesmo que seus exames aparentem estar normais, é hora de se cuidar, iniciando mudanças no estilo de vida com o acompanhamento próximo de profissionais de saúde<br><br>`
    } else if (result > 40) {
      gradeIMC.innerHTML = `<i> IMC de ${parseFloat(result).toFixed(1)} </i><br><br>
     Acima de 40,0<br>
     Obesidade grau III<br>
     Aqui o sinal é vermelho, com forte probabilidade de já existirem doenças muito graves associadas. O tratamento deve ser ainda mais urgente.<br><br>`
    }
  }
})()
