import{q as z,r as D,u as f,P as S,E as g,a as y,_ as U,c as E,e as a,C as Z,b as V,w as r,F as h,i as u,D as P,o as m,f as N,g as c,G as K,h as j}from"./index-lKMbzYlX.js";import{B as O}from"./BreadCrumbNav-BtYp_qB0.js";const G="user_manage",n=D({id:"",username:"",realName:"",role:"",email:""}),_=D([]),p=y(!0),b=y(),L={components:{EditPen:z,BreadCrumbNav:O},setup(){return{loading:p,roles:_,formData:n,formDataRef:b,formRules:D({username:[{required:!0,message:"请输入用户名",trigger:"blur"},{max:30,message:"用户名长度最多为30位",trigger:"blur"},{min:6,message:"用户名长度至少为6位",trigger:"blur"},{pattern:/^[a-zA-Z0-9]+$/,message:"用户名仅能包含字母和数字",trigger:"blur"}],realName:[{required:!0,message:"请选择真实姓名",trigger:"blur"},{max:30,message:"真实姓名长度不能超过30个字",trigger:"blur"}],role:[{required:!0,message:"请选择角色",trigger:"blur"}],email:[{max:50,message:"邮箱长度不能超过50个字符",trigger:"blur"},{pattern:/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/,message:"邮箱格式错误",trigger:"blur"}]})}},mounted(){p.value=!0,f.getRoles().then(l=>{_.length=0,Object.assign(_,S.toOptions(l,!0))}),n.id=this.$route.query.id?this.$route.query.id.toString():"",f.get(n.id).then(l=>{l&&(n.username=l.username,n.realName=l.realName,n.role=String(l.role.id),n.email=l.email),p.value=!1})},methods:{handleSubmit(){try{b.value.validate().then(()=>{f.modify(n).then(l=>{l.success?(g.success("修改成功"),b.value.resetFields(),this.$router.push("/"+G+"/list")):g.error(l.message?l.message:"添加失败")})})}catch{g.error("请检查输入内容")}},handleReturn(){this.$router.go(-1)}}},M={class:"card-header"};function T(l,e,H,t,J,d){const B=u("BreadCrumbNav"),w=u("EditPen"),x=u("el-icon"),i=u("el-input"),s=u("el-form-item"),A=u("el-option"),C=u("el-select"),k=u("el-form"),v=u("el-button"),F=u("el-row"),R=u("el-card"),q=P("loading");return m(),E(h,null,[a(B,{"page-paths":["用户管理","用户列表","用户修改"]}),Z((m(),V(R,{class:"info-card",shadow:"never"},{header:r(()=>[N("div",M,[a(x,null,{default:r(()=>[a(w)]),_:1}),e[4]||(e[4]=c("  用户修改 "))])]),footer:r(()=>[a(F,{class:"row-bg",justify:"end"},{default:r(()=>[e[7]||(e[7]=N("div",{class:"flex-grow"},null,-1)),a(v,{type:"info",onClick:d.handleReturn,round:""},{default:r(()=>e[5]||(e[5]=[c("返回用户列表")])),_:1},8,["onClick"]),a(v,{type:"primary",onClick:d.handleSubmit,round:""},{default:r(()=>e[6]||(e[6]=[c("提交")])),_:1},8,["onClick"])]),_:1})]),default:r(()=>[a(k,{ref:"formDataRef",model:t.formData,rules:t.formRules,"label-width":"30%",style:{width:"60%"},onKeyup:j(d.handleSubmit,["enter"])},{default:r(()=>[a(s,{label:"用户名",prop:"username"},{default:r(()=>[a(i,{modelValue:t.formData.username,"onUpdate:modelValue":e[0]||(e[0]=o=>t.formData.username=o)},null,8,["modelValue"])]),_:1}),a(s,{label:"真实姓名",prop:"realName"},{default:r(()=>[a(i,{modelValue:t.formData.realName,"onUpdate:modelValue":e[1]||(e[1]=o=>t.formData.realName=o)},null,8,["modelValue"])]),_:1}),a(s,{label:"角色",prop:"role"},{default:r(()=>[a(C,{modelValue:t.formData.role,"onUpdate:modelValue":e[2]||(e[2]=o=>t.formData.role=o),placeholder:"请选择...","no-data-text":"暂无角色"},{default:r(()=>[(m(!0),E(h,null,K(t.roles,o=>(m(),V(A,{key:o.value,label:o.name,value:o.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(s,{label:"邮箱",prop:"email"},{default:r(()=>[a(i,{modelValue:t.formData.email,"onUpdate:modelValue":e[3]||(e[3]=o=>t.formData.email=o)},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules","onKeyup"])]),_:1})),[[q,t.loading]])],64)}const X=U(L,[["render",T]]);export{X as default};