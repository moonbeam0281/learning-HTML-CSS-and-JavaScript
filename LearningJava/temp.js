for(let i = 0; i < 100; i++)
{
    if(i > 30 && i < 50) continue;
    if(i%2 == 0) console.log("Printing (" + i + ") which is an even number");
}