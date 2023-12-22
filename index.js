document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var birthday = new Date(document.getElementById('birthday').value);
    var category = document.getElementById('category').value;
    var interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(i => i.value);
    var photo = document.getElementById('photo').files[0];
    var sum = document.getElementById('Summa').value;
    var proc = document.getElementById('Stavka').value*1;
    var srok = document.getElementById('Srok').value;
    var vznos = document.getElementById('Fvznos').value*1;
    var sbor = document.getElementById('Sbor').value;
    


    function monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }
    function calculateAnnuityPayment(K, p, n) {
        p = p / 100 / 12; // Перевод процентной ставки в месячную
        let A = K * p / (1 - Math.pow((1 + p), -n));
        return A.toFixed(2);
    }

    function calculateDifferentialPayment(S, p, n) {
        p = p / 100 / 12; // Перевод процентной ставки в месячную
        let Dm = S * p / (1 - Math.pow((1 + p), -n));
        return Dm;
    }
    function bigsumD (S, p, n, vznos){
        var k = S ;
        let i ;
        sum1=1;
        for (i=1; i<n; i++){
            var kk = calculateDifferentialPayment(k, p, n);
            sum1 = sum1 + kk;
            k -= kk;
        }
        return (sum1+vznos)*1.4;
    }

    
    var a =calculateAnnuityPayment(sum, proc, srok);
    var today = new Date();
    var first = new Date(document.getElementById('DatePlat').value);
    var dif = monthDiff(first, today);
    var si = sum/srok;
    var sumost = (srok-dif)*si;
 

    var dp = calculateDifferentialPayment(sumost, proc, srok);

    var bigsumA = srok*a;
    var bigsumDd = bigsumD(sum, proc, srok, vznos);
    if(bigsumA>bigsumDd){
        var res = 'Дифференциальны платежи выгоднее';
    }
    else {
        var res = 'Аннуитетные платежи выгоднее';
    }
    
    var output = 'Расчет выплат по кредиту </br>А) аннуитентный платеж А =  '+ a + ', Обшая сумма = ' + bigsumA
    + '</br>' + 'Б) Дифференциальный платеж ДП = '+dp.toFixed(2) + ', общая сумма = ' +  bigsumDd.toFixed(2) + '</br> '+ res;

    output += '</br>ФИО:'+ name + '</br> Дата рождения ' + birthday.toDateString() +
    '</br>Категория (уровень заработка) ' + '</br>Фото <img src="'+URL.createObjectURL(photo)+'" alt="Photo"/></br>' +
    'Сферы деятельности' + interests.join(', ')+'</br>';
    document.getElementById('output').innerHTML = output;
});
