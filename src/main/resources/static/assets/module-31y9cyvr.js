import{$ as r}from"./index-lKMbzYlX.js";const n={hoursFormatter:function(t){return t.features?`${t.features.reduce((o,a)=>o+a.hours,0)} 小时`:`${t.hours} 小时`},getRowClassName:function({row:t}){return t.features?"module-row":""},create:async function(t,e){return e.projectId=t,(await r.post("/module/create",e)).data},modify:async function(t,e){return e.id=t,(await r.post("/module/modify",e)).data},remove:async function(t){return(await r.get("/module/remove/"+t)).data}};export{n as m};