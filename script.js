document.addEventListener('DOMContentLoaded', () => {
    // Elementos selecionados pelo ID
    const submit = document.getElementById('submit');
    const year = document.getElementById('year');
    const month = document.getElementById('month');
    const day = document.getElementById('day');
    const resultYears = document.getElementById('result-years');
    const resultMonths = document.getElementById('result-months');
    const resultDays = document.getElementById('result-days');
    const label1 = document.getElementById('label1');
    const label2 = document.getElementById('label2');
    const label3 = document.getElementById('label3');
    const span1 = document.getElementById('span1');
    const span2 = document.getElementById('span2');
    const span3 = document.getElementById('span3');

    // Um evento adicionado para o input day
    day.addEventListener('input', () => {
        // Erro se for maior que 31 dias
        if (day.value > 31) {
            label1.style.color = 'hsl(0, 100%, 67%)';
            day.style.borderColor = 'hsl(0, 100%, 67%)';
            span1.textContent = 'Must be a valid day';
        } else {
            label1.style.color = 'hsl(0, 1%, 44%)';
            day.style.borderColor = 'hsl(0, 0%, 86%)';
            span1.textContent = '';
        }
    })

    // Um evento adicionado para o input month
    month.addEventListener('input', () => {
        // Erro se for maior que 12 meses
        if (month.value > 12) {
            label2.style.color = 'hsl(0, 100%, 67%)';
            month.style.borderColor = 'hsl(0, 100%, 67%)';
            span2.textContent = 'Must be a valid month';
        } else {
            label2.style.color = 'hsl(0, 1%, 44%)';
            month.style.borderColor = 'hsl(0, 0%, 86%)';
            span2.textContent = '';
        }
    })

    // Um evento adicionado para o input year
    year.addEventListener('input', () => {
        // Erro se o ano estiver no futuro
        let data = new Date();

        if (year.value > data.getFullYear()) {
            label3.style.color = 'hsl(0, 100%, 67%)';
            year.style.borderColor = 'hsl(0, 100%, 67%)';
            span3.textContent = 'Must be in the past';
        } else {
            label3.style.color = 'hsl(0, 1%, 44%)';
            year.style.borderColor = 'hsl(0, 0%, 86%)';
            span3.textContent = '';
        }
    })

    // Evento de mudança
    year.addEventListener('change', () => {
        // Se colocar um ano negativo, pega o valor do ano atual e diminui pelo valor negativo, dando um valor positivo de ano
        let data = new Date();

        if (year.value < 0) {
            year.value = -year.value;
            year.value = data.getFullYear() - year.value;
        }
    })

    // Evento de clique no botão
    submit.addEventListener('click', function click(e) {
        e.preventDefault();

        // Verificação de campos vazios
        if (!year.value) {
            label3.style.color = 'hsl(0, 100%, 67%)';
            year.style.borderColor = 'hsl(0, 100%, 67%)';
            span3.textContent = 'This field is required';
        }
        if (!month.value) {
            label2.style.color = 'hsl(0, 100%, 67%)';
            month.style.borderColor = 'hsl(0, 100%, 67%)';
            span2.textContent = 'This field is required';
        }
        if (!day.value) {
            label1.style.color = 'hsl(0, 100%, 67%)';
            day.style.borderColor = 'hsl(0, 100%, 67%)';
            span1.textContent = 'This field is required';
        }
        if (!day.value || !month.value || !year.value) {
            return;
        }

        //Verificando se a data está correta
        let date = new Date(year.value, month.value - 1, day.value);
        let currentData = new Date();

        if (!(date.getFullYear() == year.value && date.getMonth() == month.value - 1 && date.getDate() == day.value) || date > currentData || year.value < 0) {
            label1.style.color = 'hsl(0, 100%, 67%)';
            day.style.borderColor = 'hsl(0, 100%, 67%)';
            span1.textContent = 'Must be a valid date';
            label2.style.color = 'hsl(0, 100%, 67%)';
            month.style.borderColor = 'hsl(0, 100%, 67%)';
            span2.textContent = '';
            label3.style.color = 'hsl(0, 100%, 67%)';
            year.style.borderColor = 'hsl(0, 100%, 67%)';
            span3.textContent = '';
            return;
        }

        //Calculo da idade 
        let ageYear = currentData.getFullYear() - date.getFullYear();
        let ageMonth = 0;
        let ageDay = 0;

        if (currentData < new Date(currentData.getFullYear(), month.value - 1, day.value)) {
            ageYear = ageYear - 1;
            ageMonth = currentData.getMonth() + 1;
            ageDay = currentData.getDate();
        } else {
            if (currentData.getMonth() + 1 === month.value) {
                ageMonth = 0;
                ageDay = currentData.getDate() - day.value;
                console.log(ageDay);
            } else {
                ageMonth = currentData.getMonth() + 1 - month.value;

                if (currentData.getDate() < day.value) {
                    ageMonth = ageMonth - 1;
                    ageDay = currentData.getDate() + new Date(currentData.getFullYear(), currentData.getMonth(), 0).getDate() - day.value;
                } else {
                    ageDay = currentData.getDate() - day.value;
                }
            }
        }

        //Exibição dos dados calculados nos campos de resultado
        OutputNumber(resultYears, ageYear);
        OutputNumber(resultMonths, ageMonth);
        OutputNumber(resultDays, ageDay);
    })

    //Função de saída da animaçao dos valores, a velocidade de saída dos valores é calculada com base na magnitude dos valores
    function OutputNumber(el, num) {
        let step = 50;
        num > 25 && (step = 35);
        num > 50 && (step = 25);
        num > 75 && (step = 20);
        num > 100 && (step = 10);
        num > 200 && (step = 1);

        let n = 0;
        if (num === 0) {
            el.innerHTML = n;
        } else {
            let interval = setInterval(() => {
                n = n + 1;
                if (n === num) {
                    clearInterval(interval);
                }
                el.innerHTML = n;
            }, step);
        }
    }
})

