import{d as q,a as b,v as C,x as F,y,z as S,A as T,r as d,u as V,P as $,_ as k,c as I,e,C as E,b as v,w as t,F as L,i as r,D as O,o as f,f as g,g as u,p as l}from"./index-lKMbzYlX.js";import{B as z}from"./BreadCrumbNav-BtYp_qB0.js";import{P as W}from"./Pagination-BMhTTIco.js";import{b as m}from"./bug-BKAMD9Bi.js";const c=b(!0),G=q({computed:{Operation(){return C},Delete(){return F},Edit(){return y}},components:{Pagination:W,List:S,Delete:F,Edit:y,Operation:C,BreadCrumbNav:z,Search:T},mounted(){this.page.update()},setup(){return{loading:c,page:b()}},data(){return{gradeColor:m.gradeColor,statusColor:m.statusColor,dialogToggle:b(!1),data:d([]),bug:d(m.empty),project:d({name:""}),module:d({name:""}),feature:d({name:"",owner:V.empty}),query:d({id:""}),selectedItem:void 0}},methods:{async updateData(){c.value=!0;let a=await m.get(this.query.id);console.log(a),this.bug=a,this.project=a.feature.module.project,this.module=a.feature.module,this.feature=a.feature;let o=$.getDataWithPageInfo(this.bug.records,this.page.page,this.page.size);return console.log(o),this.data.length=0,Object.assign(this.data,o.data),c.value=!1,{total:o.total,start:o.start,end:o.end}}}}),H={class:"card-header"},J={class:"card-header"};function K(a,o,M,Q,R,U){const w=r("BreadCrumbNav"),D=r("Search"),_=r("el-icon"),n=r("el-descriptions-item"),p=r("el-tag"),A=r("el-descriptions"),B=r("el-card"),N=r("List"),s=r("el-table-column"),P=r("el-table"),j=r("Pagination"),h=O("loading");return f(),I(L,null,[e(w,{"page-paths":["Bug 管理","项目列表","Bug 列表","Bug 信息"]}),E((f(),v(B,{class:"info-card",shadow:"never"},{header:t(()=>[g("div",H,[e(_,null,{default:t(()=>[e(D)]),_:1}),o[0]||(o[0]=u("   ")),g("span",null,"[ "+l(a.project.name)+" ] Bug 信息",1)])]),default:t(()=>[e(A,{column:3,border:""},{default:t(()=>[e(n,{label:"Bug 标题",span:3},{default:t(()=>[u(l(a.bug.name),1)]),_:1}),e(n,{label:"Bug 详情",span:3},{default:t(()=>[u(l(a.bug.description),1)]),_:1}),e(n,{label:"Bug 等级"},{default:t(()=>[e(p,{type:a.gradeColor[a.bug.grade.name],effect:"light"},{default:t(()=>[u(l(a.bug.grade.name),1)]),_:1},8,["type"])]),_:1}),e(n,{label:"所属模块"},{default:t(()=>[u(l(a.module.name),1)]),_:1}),e(n,{label:"所属功能"},{default:t(()=>[u(l(a.feature.name),1)]),_:1}),e(n,{label:"Bug 状态"},{default:t(()=>[e(p,{type:a.statusColor[a.bug.status.name],effect:"light"},{default:t(()=>[u(l(a.bug.status.name),1)]),_:1},8,["type"])]),_:1}),e(n,{label:"解决形式"},{default:t(()=>[u(l(a.bug.solveType.name),1)]),_:1}),e(n,{label:"开发人"},{default:t(()=>[u(l(a.feature.owner.realName),1)]),_:1}),e(n,{label:"报告人"},{default:t(()=>[u(l(a.bug.reporter.realName),1)]),_:1}),e(n,{label:"创建日期"},{default:t(()=>[u(l(a.bug.created),1)]),_:1}),e(n,{label:"最后处理日期"},{default:t(()=>[u(l(a.bug.modified),1)]),_:1})]),_:1})]),_:1})),[[h,a.loading]]),E((f(),v(B,{class:"info-card",shadow:"never"},{header:t(()=>[g("div",J,[e(_,null,{default:t(()=>[e(N)]),_:1}),o[1]||(o[1]=u("   ")),o[2]||(o[2]=g("span",null,"Bug 处理记录列表",-1))])]),footer:t(()=>[e(j,{ref:"page","update-data":a.updateData,query:a.query,module:"bug",path:"info"},null,8,["update-data","query"])]),default:t(()=>[e(P,{data:a.data,style:{width:"100%"},"empty-text":"没有找到匹配的记录"},{default:t(()=>[e(s,{align:"center",type:"index",label:"序号",width:"80"}),e(s,{align:"center",prop:"type.name",label:"操作类型"}),e(s,{align:"center",prop:"before",label:"处理前状态"},{default:t(i=>[e(p,{type:a.statusColor[i.row.previous.name],effect:"light"},{default:t(()=>[u(l(i.row.previous.name),1)]),_:2},1032,["type"])]),_:1}),e(s,{align:"center",prop:"after",label:"处理后状态"},{default:t(i=>[e(p,{type:a.statusColor[i.row.after.name],effect:"light"},{default:t(()=>[u(l(i.row.after.name),1)]),_:2},1032,["type"])]),_:1}),e(s,{align:"center",prop:"solveType.name",label:"解决形式"}),e(s,{align:"center",prop:"comment",label:"备注"}),e(s,{align:"center",prop:"user.realName",label:"操作人"}),e(s,{align:"center",prop:"time",label:"操作时间"})]),_:1},8,["data"])]),_:1})),[[h,a.loading]])],64)}const ee=k(G,[["render",K]]);export{ee as default};
