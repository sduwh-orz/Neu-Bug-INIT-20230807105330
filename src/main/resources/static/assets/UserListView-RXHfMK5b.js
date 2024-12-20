import{d as I,a as D,r as E,x as C,y as F,z as K,A as O,u as c,P as R,E as G,_ as M,c as V,e as l,C as k,b as _,w as a,F as A,i as n,D as H,o as r,f as u,g as i,G as J,h as Q}from"./index-lKMbzYlX.js";import{B as W}from"./BreadCrumbNav-BtYp_qB0.js";import{P as X}from"./Pagination-BMhTTIco.js";const b=D(!0),y=E([]),Y=I({computed:{Delete(){return C},Edit(){return F}},components:{Pagination:X,List:K,Delete:C,Edit:F,BreadCrumbNav:W,Search:O},setup(){return{loading:b,page:D()}},data(){return{roles:y,dialogToggle:D(!1),data:E([]),query:E({username:"",realName:"",role:"",email:""}),selectedItem:{id:""}}},methods:{async updateData(){b.value=!0;let t=await c.getRoles();y.length=0,Object.assign(y,R.toOptions(t));let e=await c.search(this.query,this.page.page,this.page.size);return this.data.length=0,Object.assign(this.data,e.data),b.value=!1,e},handleSearch(){this.page.update()},handleCreate(){this.page.jump("/create")},handleEdit(t,e){this.page.jump("/edit?id="+e.id)},handleDelete(t,e){this.dialogToggle=!0,this.selectedItem=e},performDelete(){this.selectedItem&&(c.remove(this.selectedItem.id),G.success("删除成功"),this.updateData())}}}),Z={class:"card-header"},x={class:"card-header"},ee={class:"dialog-footer"};function le(t,e,ae,te,oe,ne){const q=n("BreadCrumbNav"),N=n("Search"),w=n("el-icon"),f=n("el-input"),p=n("el-form-item"),m=n("el-col"),g=n("el-row"),$=n("el-option"),j=n("el-select"),T=n("el-form"),s=n("el-button"),v=n("el-card"),S=n("List"),d=n("el-table-column"),h=n("el-tooltip"),U=n("el-table"),L=n("Pagination"),P=n("el-dialog"),B=H("loading");return r(),V(A,null,[l(q,{"page-paths":["用户管理","用户列表"]}),k((r(),_(v,{class:"info-card",shadow:"never"},{header:a(()=>[u("div",Z,[l(w,null,{default:a(()=>[l(N)]),_:1}),e[7]||(e[7]=i("   ")),e[8]||(e[8]=u("span",null,"查询信息",-1))])]),footer:a(()=>[l(g,{class:"row-bg",justify:"end"},{default:a(()=>[e[11]||(e[11]=u("div",{class:"flex-grow"},null,-1)),l(s,{type:"primary",onClick:t.handleSearch,round:""},{default:a(()=>e[9]||(e[9]=[i("查询")])),_:1},8,["onClick"]),l(s,{type:"primary",onClick:t.handleCreate,round:""},{default:a(()=>e[10]||(e[10]=[i("添加")])),_:1},8,["onClick"])]),_:1})]),default:a(()=>[l(T,{onKeyup:Q(t.handleSearch,["enter"])},{default:a(()=>[l(g,{justify:"space-between"},{default:a(()=>[l(m,{span:11},{default:a(()=>[l(p,{label:"用户名",class:"disable-select","label-width":"80"},{default:a(()=>[l(f,{modelValue:t.query.username,"onUpdate:modelValue":e[0]||(e[0]=o=>t.query.username=o)},null,8,["modelValue"])]),_:1})]),_:1}),l(m,{span:11},{default:a(()=>[l(p,{label:"真实姓名",class:"disable-select","label-width":"80"},{default:a(()=>[l(f,{modelValue:t.query.realName,"onUpdate:modelValue":e[1]||(e[1]=o=>t.query.realName=o)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),l(g,{justify:"space-between"},{default:a(()=>[l(m,{span:11},{default:a(()=>[l(p,{label:"角色",class:"disable-select","label-width":"80"},{default:a(()=>[l(j,{modelValue:t.query.role,"onUpdate:modelValue":e[2]||(e[2]=o=>t.query.role=o),class:"m-2",placeholder:"全部"},{default:a(()=>[(r(!0),V(A,null,J(t.roles,o=>(r(),_($,{key:o.name,label:o.name,value:o.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(m,{span:11},{default:a(()=>[l(p,{label:"邮箱",class:"disable-select","label-width":"80"},{default:a(()=>[l(f,{modelValue:t.query.email,"onUpdate:modelValue":e[3]||(e[3]=o=>t.query.email=o)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onKeyup"])]),_:1})),[[B,t.loading]]),l(v,{class:"info-card",shadow:"never"},{header:a(()=>[u("div",x,[l(w,null,{default:a(()=>[l(S)]),_:1}),e[12]||(e[12]=i("   ")),e[13]||(e[13]=u("span",null,"列表信息",-1))])]),footer:a(()=>[l(L,{ref:"page","update-data":t.updateData,query:t.query,module:"user_manage",path:"list"},null,8,["update-data","query"])]),default:a(()=>[k((r(),_(U,{data:t.data,style:{width:"100%"},"empty-text":"没有找到匹配的记录"},{default:a(()=>[l(d,{align:"center",type:"index",label:"序号",width:"80"}),l(d,{align:"center",prop:"username",label:"用户名"}),l(d,{align:"center",prop:"realName",label:"真实姓名"}),l(d,{align:"center",prop:"role.name",label:"角色"}),l(d,{align:"center",prop:"email",label:"邮箱"}),l(d,{align:"center",label:"操作",width:"130"},{default:a(o=>[l(h,{class:"box-item",content:"编辑",placement:"top"},{default:a(()=>[l(s,{icon:t.Edit,size:"small",type:"primary",onClick:z=>t.handleEdit(o.$index,o.row),circle:""},null,8,["icon","onClick"])]),_:2},1024),l(h,{class:"box-item",content:"删除",placement:"top"},{default:a(()=>[l(s,{icon:t.Delete,size:"small",type:"danger",onClick:z=>t.handleDelete(o.$index,o.row),circle:""},null,8,["icon","onClick"])]),_:2},1024)]),_:1})]),_:1},8,["data"])),[[B,t.loading]])]),_:1}),l(P,{modelValue:t.dialogToggle,"onUpdate:modelValue":e[6]||(e[6]=o=>t.dialogToggle=o),title:"确认删除",width:"500"},{footer:a(()=>[u("div",ee,[l(s,{onClick:e[4]||(e[4]=o=>t.dialogToggle=!1)},{default:a(()=>e[14]||(e[14]=[i("取消")])),_:1}),l(s,{type:"danger",onClick:e[5]||(e[5]=o=>{t.dialogToggle=!1,t.performDelete()})},{default:a(()=>e[15]||(e[15]=[i(" 确定 ")])),_:1})])]),default:a(()=>[e[16]||(e[16]=u("span",null,"确认删除这个项目吗？",-1))]),_:1},8,["modelValue"])],64)}const ie=M(Y,[["render",le]]);export{ie as default};