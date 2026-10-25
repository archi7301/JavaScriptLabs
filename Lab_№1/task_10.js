function firstFunction(str1 = 'первый параметр', str2, str3 = prompt('Введите третий параметр: '))
{
    return str1 + ' ' + str2 + ' ' + str3;
}

alert(firstFunction());