const list = document.querySelector('#side');  
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        // labels: [],
        datasets: [
            {
                label:"Confirmed",
                data: [],
                borderColor:"rgb(31, 97, 141)",
                borderwidth: 1
            },
            {
                label:"Recovred",
                data: [],
                borderColor:"rgb(39, 174, 96)",
                borderwidth: 1
            },
            {
                label:"Death",
                data: [],
                borderColor:"rgb(241, 196, 15)",
                borderwidth: 1
            },
            {
                label:"Active",
                data:[],
                borderColor:"yellow",
                borderwidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
function divClecked(e){
    let code=e.target.getAttribute("id")
    let httpReq=new XMLHttpRequest();
    httpReq.open("GET", "https://api.covid19api.com/dayone/country/"+code,true);
    httpReq.onreadystatechange=function(){
        if(httpReq.readyState==4 && httpReq.status==200){
        let raw=JSON.parse(httpReq.response)
        let confirmed=raw.map(e=>e.Confirmed)
        let recovred=raw.map(e=>e.Recovered)
        let active=raw.map(e=>e.Active)
        let death=raw.map(e=>e.Deaths)
        let labels=raw.map(e=>e.Date)
        let datasets=[
            {
                label:"Confirmed",
                data: confirmed,
                borderColor:"rgb(31, 97, 141)",
                borderwidth: 1
            },
            {
                label:"Recovred",
                data:recovred,
                borderColor:"rgb(39, 174, 96)",
                borderwidth: 1
            },
            {
                label:"Death",
                data:death,
                borderColor:"rgb(241, 196, 15)",
                borderwidth: 1
            },
            {
                label:"Active",
                data:active,
                borderColor:"yellow",
                borderwidth: 1
            }
        ]
         myChart.data.labels=labels
         myChart.data.datasets=datasets;
         myChart.update()
    }
}
        httpReq.send();
}
let httpReq=new XMLHttpRequest();
httpReq.open("GET", "https://api.covid19api.com/countries",true);
httpReq.onreadystatechange=function(){
    //console.log(httpReq.readyState);
    if(httpReq.readyState==4 && httpReq.status==200){
        let raw=JSON.parse(httpReq.response)
        resp=raw.sort((a,b)=>a.Country<b.Country?-1:1) 
        resp.forEach(e => {
            let d=document.createElement('div')
            d.setAttribute('id',e.ISO2)
            d.setAttribute('class',"listitem")
            d.innerHTML=e.Country
            d.addEventListener("click",divClecked);
            list.appendChild(d);
            
        });

    }
}

httpReq.send();










