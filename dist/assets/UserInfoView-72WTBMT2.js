import{m as C,j as A,k as B,l as b,t as U,_ as k,c as F,e,b as N,w as t,n as I,F as v,i as a,o as d,f as w,g as l,p as u}from"./index-lKMbzYlX.js";import{B as D}from"./BreadCrumbNav-BtYp_qB0.js";const E={components:{Message:C,Guide:A,CreditCard:B,User:b,Tickets:U,BreadCrumbNav:D},computed:{loggedInUser(){return this.$store.state.user}}},V={class:"card-header"};function T(y,s,G,M,j,n){const _=a("BreadCrumbNav"),c=a("Tickets"),o=a("el-icon"),i=a("User"),r=a("el-descriptions-item"),m=a("CreditCard"),p=a("Guide"),f=a("Message"),g=a("el-descriptions"),x=a("el-card");return d(),F(v,null,[e(_,{"page-paths":["我的面板","用户信息"]}),n.loggedInUser?(d(),N(x,{key:0,class:"info-card",shadow:"never"},{header:t(()=>[w("div",V,[e(o,null,{default:t(()=>[e(c)]),_:1}),s[0]||(s[0]=l("  用户信息 "))])]),default:t(()=>[e(g,{border:"",column:1,"label-width":"20%",style:{"margin-top":"10px"}},{default:t(()=>[e(r,null,{label:t(()=>[e(o,null,{default:t(()=>[e(i)]),_:1}),s[1]||(s[1]=l("  用户名 "))]),default:t(()=>[l(" "+u(n.loggedInUser.username),1)]),_:1}),e(r,null,{label:t(()=>[e(o,null,{default:t(()=>[e(m)]),_:1}),s[2]||(s[2]=l("  真实姓名 "))]),default:t(()=>[l(" "+u(n.loggedInUser.realName),1)]),_:1}),e(r,null,{label:t(()=>[e(o,null,{default:t(()=>[e(p)]),_:1}),s[3]||(s[3]=l("  角色 "))]),default:t(()=>[l(" "+u(n.loggedInUser.role.name),1)]),_:1}),e(r,null,{label:t(()=>[e(o,null,{default:t(()=>[e(f)]),_:1}),s[4]||(s[4]=l("  邮箱 "))]),default:t(()=>[l(" "+u(n.loggedInUser.email),1)]),_:1})]),_:1})]),_:1})):I("",!0)],64)}const z=k(E,[["render",T]]);export{z as default};
