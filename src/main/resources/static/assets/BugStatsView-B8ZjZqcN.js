import{y as B,I as N,J as j,K as P,r as m,a as A,N as S,_ as V,c as L,e,C as O,b as q,w as u,F as R,i as o,D as z,o as g,f as r,g as p,p as I}from"./index-lKMbzYlX.js";import{B as J}from"./BreadCrumbNav-BtYp_qB0.js";import{p as F}from"./project-CxEimw6o.js";import{m as K}from"./module-31y9cyvr.js";import{b as T}from"./bug-BKAMD9Bi.js";const i=A(!0),d=A("");let b=m(F.empty),E=m({grade:[],status:[],developers:[],reporters:[]});const G={computed:{Edit(){return B}},components:{BreadCrumbNav:J,FolderOpened:N,ArrowLeft:j,CirclePlus:P,Edit:B},setup(){return{loading:i,id:d,nowProject:b,stats:E,module:K,treeProps:m({children:"features",hasChildren:"hasChildren"})}},async mounted(){i.value=!0;let n=S();d.value=n.query.id?n.query.id.toString():"";let t=await F.get(d.value);Object.assign(b,t);let c=await T.stats(d.value);Object.assign(E,c),i.value=!1},methods:{bugFormatter:function(n){return n.features?"":n.bugs?n.bugs.length:0},handleBack:function(){this.$router.go(-1)}}},H={class:"module-card-header"},M={class:"module-card-header-left"};function Q(n,t,c,l,U,f){const x=o("BreadCrumbNav"),w=o("Edit"),_=o("el-icon"),v=o("el-text"),a=o("el-table-column"),s=o("el-table"),D=o("ArrowLeft"),C=o("el-button"),y=o("el-row"),h=o("el-card"),k=z("loading");return g(),L(R,null,[e(x,{"page-paths":["Bug 管理","项目列表","Bug 统计"]}),O((g(),q(h,{class:"info-card",shadow:"never"},{header:u(()=>[r("div",H,[r("div",M,[e(_,null,{default:u(()=>[e(w)]),_:1}),t[0]||(t[0]=p("   ")),e(v,{style:{"font-size":"20px","font-weight":"bold"}},{default:u(()=>[p(" [ "+I(l.nowProject.name)+" ] Bug 统计 ",1)]),_:1})])])]),default:u(()=>[t[3]||(t[3]=r("h1",null,"按功能统计",-1)),e(s,{data:l.nowProject.modules,"row-key":"id","empty-text":"暂无数据",border:"","default-expand-all":"","tree-props":l.treeProps,"row-class-name":l.module.getRowClassName},{default:u(()=>[e(a,{prop:"name",label:"模块名 / 功能名"}),e(a,{prop:"hours",label:"Bug 数量",formatter:f.bugFormatter},null,8,["formatter"])]),_:1},8,["data","tree-props","row-class-name"]),t[4]||(t[4]=r("h1",null,"按 Bug 等级统计",-1)),e(s,{data:l.stats.grade,"empty-text":"暂无数据",border:"","default-expand-all":""},{default:u(()=>[e(a,{prop:"name",label:"Bug 等级"}),e(a,{prop:"count",label:"Bug 数量"})]),_:1},8,["data"]),t[5]||(t[5]=r("h1",null,"按 Bug 状态统计",-1)),e(s,{data:l.stats.status,"empty-text":"暂无数据",border:"","default-expand-all":""},{default:u(()=>[e(a,{prop:"name",label:"Bug 状态"}),e(a,{prop:"count",label:"Bug 数量"})]),_:1},8,["data"]),t[6]||(t[6]=r("h1",null,"按开发人统计",-1)),e(s,{data:l.stats.developers,"empty-text":"暂无数据",border:"","default-expand-all":""},{default:u(()=>[e(a,{prop:"name",label:"开发人"}),e(a,{prop:"count",label:"Bug 数量"})]),_:1},8,["data"]),t[7]||(t[7]=r("h1",null,"按报告人统计",-1)),e(s,{data:l.stats.reporters,"empty-text":"暂无数据",border:"","default-expand-all":""},{default:u(()=>[e(a,{prop:"name",label:"报告人"}),e(a,{prop:"count",label:"Bug 数量"})]),_:1},8,["data"]),r("h1",null,[e(y,{class:"row-bg",justify:"end"},{default:u(()=>[t[2]||(t[2]=r("div",{class:"flex-grow"},null,-1)),e(C,{type:"info",onClick:f.handleBack},{default:u(()=>[e(_,null,{default:u(()=>[e(D)]),_:1}),t[1]||(t[1]=p("  返回项目列表 "))]),_:1},8,["onClick"])]),_:1})])]),_:1})),[[k,l.loading]])],64)}const ee=V(G,[["render",Q]]);export{ee as default};