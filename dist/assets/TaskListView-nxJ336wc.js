import{d as A,a as i,L as _,z as q,A as S,r as f,_ as V,c as N,e,w as a,F as $,i as n,o as h,f as u,g as r,B as x,h as L,C as P,b as z,D as K}from"./index-lKMbzYlX.js";import{B as T}from"./BreadCrumbNav-BtYp_qB0.js";import{P as j}from"./Pagination-BMhTTIco.js";import{t as I}from"./task-BCXGmbxq.js";const d=i(!0),M=A({computed:{FolderChecked(){return _}},components:{Pagination:j,List:q,FolderChecked:_,BreadCrumbNav:T,Search:S},mounted(){this.updateData()},setup(){return{loading:d,page:i()}},data(){return{dialogToggle:i(!1),data:f([]),query:f({name:""}),selectedItem:void 0}},methods:{async updateData(){d.value=!0;let o=await I.search(this.query.name,this.page.page,this.page.size);return this.data=o.data,d.value=!1,o},handleSearch(){this.page.update()},handleEdit(o,t){this.page.jump("/edit?id="+t.id)}}}),U={class:"card-header"},G={class:"card-header"};function H(o,t,J,O,Q,R){const g=n("BreadCrumbNav"),E=n("Search"),p=n("el-icon"),b=n("el-input"),F=n("el-form-item"),w=n("el-form"),c=n("el-button"),v=n("el-row"),m=n("el-card"),y=n("List"),l=n("el-table-column"),B=n("el-tooltip"),C=n("el-table"),D=n("Pagination"),k=K("loading");return h(),N($,null,[e(g,{"page-paths":["任务分配","项目列表"]}),e(m,{class:"info-card",shadow:"never"},{header:a(()=>[u("div",U,[e(p,null,{default:a(()=>[e(E)]),_:1}),t[2]||(t[2]=r("   ")),t[3]||(t[3]=u("span",null,"查询信息",-1))])]),footer:a(()=>[e(v,{class:"row-bg",justify:"end"},{default:a(()=>[t[5]||(t[5]=u("div",{class:"flex-grow"},null,-1)),e(c,{type:"primary",onClick:o.handleSearch,round:""},{default:a(()=>t[4]||(t[4]=[r("查询")])),_:1},8,["onClick"])]),_:1})]),default:a(()=>[e(w,{"label-width":"auto",onSubmit:t[1]||(t[1]=x(()=>{},["prevent"])),onKeyup:L(o.handleSearch,["enter"])},{default:a(()=>[e(F,{label:"项目名称",style:{"max-width":"60%"},"label-width":"100"},{default:a(()=>[e(b,{modelValue:o.query.name,"onUpdate:modelValue":t[0]||(t[0]=s=>o.query.name=s)},null,8,["modelValue"])]),_:1})]),_:1},8,["onKeyup"])]),_:1}),e(m,{class:"info-card",shadow:"never"},{header:a(()=>[u("div",G,[e(p,null,{default:a(()=>[e(y)]),_:1}),t[6]||(t[6]=r("   ")),t[7]||(t[7]=u("span",null,"列表信息",-1))])]),footer:a(()=>[e(D,{ref:"page","update-data":o.updateData,query:o.query,module:"task",path:"list"},null,8,["update-data","query"])]),default:a(()=>[P((h(),z(C,{data:o.data,style:{width:"100%"},"empty-text":"没有找到匹配的记录"},{default:a(()=>[e(l,{align:"center",type:"index",label:"序号",width:"80"}),e(l,{align:"center",prop:"name",label:"项目名称"}),e(l,{align:"center",prop:"owner",label:"项目负责人"}),e(l,{align:"center",prop:"totalFeatures",label:"功能数"}),e(l,{align:"center",prop:"totalDevelopers",label:"开发人数"}),e(l,{align:"center",label:"操作",width:"80"},{default:a(s=>[e(B,{class:"box-item",content:"任务分配",placement:"top"},{default:a(()=>[e(c,{icon:o.FolderChecked,size:"small",type:"success",onClick:W=>o.handleEdit(s.$index,s.row),circle:""},null,8,["icon","onClick"])]),_:2},1024)]),_:1})]),_:1},8,["data"])),[[k,o.loading]])]),_:1})],64)}const te=V(M,[["render",H]]);export{te as default};
