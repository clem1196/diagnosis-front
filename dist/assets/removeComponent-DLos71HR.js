import{d as g}from"./diagnosis-Ca66f_EQ.js";import{d as f,r as m,j as v,o as k,k as l,l as e,y as u,m as n,z as y,A as x,B as d,g as _,u as C,G as M,b as N,e as c}from"./index-DAoysVQW.js";const D=e("button",{id:"delete",type:"button","data-bs-toggle":"modal","data-bs-target":"#deleteModal","data-bs-whatever":"@mdo",hidden:""},null,-1),B={class:"modal fade",id:"deleteModal",tabindex:"-1","aria-labelledby":"deleteModalLabel","aria-hidden":"true"},w={class:"modal-dialog"},V={class:"modal-content"},L={class:"modal-header"},R=e("h5",{class:"modal-title"},"Delete",-1),E={class:"modal-body"},T={class:"modal-footer"},j={key:0,class:"alert alert-success mt-2",role:"alert"},z=e("i",{class:"bi-check-circle-fill m-1"},null,-1),A={key:1,class:"alert alert-danger mt-2"},G=e("i",{class:"bi-exclamation-triangle-fill m-1"},null,-1),S=f({__name:"removeComponent",setup(I){const a=C(),h=m("Do you really want to delete this?");let i=m("");const s=v({success:"",err:""});k(()=>{b();const t=a.path.split("/delete");i.value=t[0],console.log(a),console.log(a.params.id)});const b=()=>{const t=document.getElementById("delete");t!==null&&t.click()},p=async()=>{try{if(a.name==="diagnosisDelete"){let o=await g(a.params.id);(o==null?void 0:o.statusText)=="OK"&&(s.success=o.data.Message,s.err="",M.back())}}catch(t){s.err=t.response.data.Message,s.success="",console.log(t.response.data.Message)}};return(t,o)=>{const r=N("RouterLink");return c(),l("div",null,[D,e("div",B,[e("div",w,[e("div",V,[e("div",L,[R,u(r,{to:"/diagnosis",class:"btn btn-close"})]),e("div",E,n(h.value),1),e("div",T,[e("button",{class:"btn btn-danger btn-sm",onClick:p},"Yes"),u(r,{to:x(i),class:"btn btn-light btn-sm"},{default:y(()=>[d("No")]),_:1},8,["to"])])]),s.success?(c(),l("p",j,[z,d(n(s.success),1)])):_("",!0),s.err?(c(),l("p",A,[G,d(n(s.err),1)])):_("",!0)])])])}}});export{S as default};
