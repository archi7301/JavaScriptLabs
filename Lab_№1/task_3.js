let i = 2;
let a = ++i;
let b = i++;

if (a > b)
{
    console.log('a больше, чем b');
}

else if (a < b)
{
    console.log('a меньше, чем b');
}

else if (a == b)
{
    console.log('a == b');
}