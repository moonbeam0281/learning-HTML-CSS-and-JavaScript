const x = document.getElementById('canvas')

console.log(x);

function red()
{
    x.style.backgroundColor = "rgb(255,0,0)";
    x.style.borderRadius = "250px"
}

function green()
{
    let color = "rgb(0,255,0)";
    x.style.backgroundColor = color;
    x.style.border = "solid 25px rgb(255,255,0)"
}

function blue()
{
    let color = "rgb(0,0,255)";
    x.style.backgroundColor = color;
}