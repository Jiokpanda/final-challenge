const clock = document.querySelector("#clock h2");


function timePrint() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    
    clock.innerText = `${(h < 10 ? `0` + h : h)}:${(m < 10 ? `0` + m : m)}:${(s < 10 ? `0` + s : s)}`
}

timePrint();
setInterval(timePrint, 1000);