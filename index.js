document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var birthday = new Date(document.getElementById('birthday').value);
    var category = document.getElementById('category').value;
    var interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(i => i.value);
    var photo = document.getElementById('photo').files[0];

    var today = new Date();
    var age = today.getFullYear() - birthday.getFullYear();
    var m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }

    var days = Math.floor((today - birthday) / (1000 * 60 * 60 * 24));
    const b = days.toString();
    var next3zadanie = (Number(b[0]) + 1) * Math.pow(10, b.length - 1);
    var next4zadanie = (Number(b[0] + b[1]) + 1) * Math.pow(10, b.length - 2);
    var nextPowerOfTen = Math.pow(10, Math.ceil(Math.log10(days)));
    var nextZeroes = Math.pow(10, days.toString().length);
    var nextTwoZeroes = Math.pow(10, days.toString().length - 2);

    var nextSameDigits = parseInt(days.toString().charAt(0).repeat(days.toString().length));

    if (Number(b[0]) < Number(b[1])) {
        nextSameDigits = parseInt(nextSameDigits.toString().split('').map(Number).map(n => n + 1).join(''));
    }

    console.log(Number(b[0]));

    var nextPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(days)));

    var anniversary10000 = new Date(birthday);
    anniversary10000.setFullYear(birthday.getFullYear() + Math.ceil(10000 / 365));

    var anniversary5555 = new Date(birthday);
    anniversary5555.setFullYear(birthday.getFullYear() + Math.ceil(5555 / 365));

    var daysUntil10000 = Math.ceil((anniversary10000 - today) / (1000 * 60 * 60 * 24));
    var daysUntil5555 = Math.ceil((anniversary5555 - today) / (1000 * 60 * 60 * 24));

    var output = 'Дата рождения: ' + birthday.toDateString() + '<br>' +
        'Текущая дата: ' + today.toDateString() + '<br>';

    output += 'ФИО: ' + name + '<br>' +
        'Возраст: ' + age + '<br>' +
        'Категория: ' + category + '<br>' +
        'Интересы: ' + interests.join(', ') + '<br>' +
        'Фото: <img src="' + URL.createObjectURL(photo) + '" alt="Photo" /><br>' +
        'Количество дней: ' + days + '<br>';
    if (daysUntil10000 >= 0) {
        output += 'Ближайший юбилей 10000 дней: ' + anniversary10000.toDateString() + ' (' + (10000 - days) + ' дней до)' + '<br>';
    }

    if (daysUntil5555 >= 0) {
        output += 'Ближайший юбилей 5555 дней: ' + anniversary5555.toDateString() + ' (' + (5555 - days) + ' дней до)';
    }
    output += 'Следующее число дней в следующую степень 10: ' + nextPowerOfTen + ', еще осталось дней: ' + (nextPowerOfTen - days) + '<br>' +
        'Следующее число дней с нулями везде кроме последней цифры: ' + next3zadanie + ', еще осталось дней: ' + (next3zadanie - days) + '<br>' +
        'Следующее число дней с нулями везде кроме двух последних цифр: ' + next4zadanie + ', еще осталось дней: ' + (next4zadanie - days) + '<br>' +
        'Следующее число дней со всеми одинаковыми цифрами: ' + nextSameDigits + ', еще осталось дней: ' + (nextSameDigits - days) + '<br>' +
        'Следующее число дней в следующую степень двойки: ' + nextPowerOfTwo + ', еще осталось дней: ' + (nextPowerOfTwo - days);

    document.getElementById('output').innerHTML = output;
});
