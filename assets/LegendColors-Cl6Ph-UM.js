import{L as d}from"./layer-extension-LbH36Bf-.js";import{Q as r,R as c}from"./layer-T9N9JmIf.js";import{d as p,n as g}from"./index-D_sw2g-2.js";const u={inject:{"vs:#decl":`
in vec2 instanceDashArrays;
in float instanceDashOffsets;
out vec2 vDashArray;
out float vDashOffset;
`,"vs:#main-end":`
vDashArray = instanceDashArrays;
vDashOffset = instanceDashOffsets / width.x;
`,"fs:#decl":`
uniform pathStyleUniforms {
float dashAlignMode;
bool dashGapPickable;
} pathStyle;
in vec2 vDashArray;
in float vDashOffset;
`,"fs:#main-start":`
float solidLength = vDashArray.x;
float gapLength = vDashArray.y;
float unitLength = solidLength + gapLength;
float offset;
if (unitLength > 0.0) {
if (pathStyle.dashAlignMode == 0.0) {
offset = vDashOffset;
} else {
unitLength = vPathLength / round(vPathLength / unitLength);
offset = solidLength / 2.0;
}
float unitOffset = mod(vPathPosition.y + offset, unitLength);
if (gapLength > 0.0 && unitOffset > solidLength) {
if (path.capType <= 0.5) {
if (!(pathStyle.dashGapPickable && bool(picking.isActive))) {
discard;
}
} else {
float distToEnd = length(vec2(
min(unitOffset - solidLength, unitLength - unitOffset),
vPathPosition.x
));
if (distToEnd > 1.0) {
if (!(pathStyle.dashGapPickable && bool(picking.isActive))) {
discard;
}
}
}
}
}
`}},v={inject:{"vs:#decl":`
in float instanceOffsets;
`,"vs:DECKGL_FILTER_SIZE":`
float offsetWidth = abs(instanceOffsets * 2.0) + 1.0;
size *= offsetWidth;
`,"vs:#main-end":`
float offsetWidth = abs(instanceOffsets * 2.0) + 1.0;
float offsetDir = sign(instanceOffsets);
vPathPosition.x = (vPathPosition.x + offsetDir) * offsetWidth - offsetDir;
vPathPosition.y *= offsetWidth;
vPathLength *= offsetWidth;
`,"fs:#main-start":`
float isInside;
isInside = step(-1.0, vPathPosition.x) * step(vPathPosition.x, 1.0);
if (isInside == 0.0) {
discard;
}
`}},y={getDashArray:{type:"accessor",value:[0,0]},getOffset:{type:"accessor",value:0},dashJustified:!1,dashGapPickable:!1};class l extends d{constructor({dash:t=!1,offset:s=!1,highPrecisionDash:e=!1}={}){super({dash:t||e,offset:s,highPrecisionDash:e})}isEnabled(t){return"pathTesselator"in t.state}getShaders(t){if(!t.isEnabled(this))return null;let s={};t.opts.dash&&(s=r(s,u)),t.opts.offset&&(s=r(s,v));const{inject:e}=s;return{modules:[{name:"pathStyle",inject:e,uniformTypes:{dashAlignMode:"f32",dashGapPickable:"i32"}}]}}initializeState(t,s){const e=this.getAttributeManager();!e||!s.isEnabled(this)||(s.opts.dash&&e.addInstanced({instanceDashArrays:{size:2,accessor:"getDashArray"},instanceDashOffsets:s.opts.highPrecisionDash?{size:1,accessor:"getPath",transform:s.getDashOffsets.bind(this)}:{size:1,update:i=>{i.constant=!0,i.value=[0]}}}),s.opts.offset&&e.addInstanced({instanceOffsets:{size:1,accessor:"getOffset"}}))}updateState(t,s){if(s.isEnabled(this)&&s.opts.dash){const e={dashAlignMode:this.props.dashJustified?1:0,dashGapPickable:!!this.props.dashGapPickable};this.setShaderModuleProps({pathStyle:e})}}getDashOffsets(t){const s=[0],e=this.props.positionFormat==="XY"?2:3,i=Array.isArray(t[0]),o=i?t.length:t.length/e;let n,f;for(let a=0;a<o-1;a++)n=i?t[a]:t.slice(a*e,a*e+e),n=this.projectPosition(n),a>0&&(s[a]=s[a-1]+c(f,n)),f=n;return s[o-1]=0,s}}l.defaultProps=y;l.extensionName="PathStyleExtension";const P=p({name:"LegendColors",props:{title:String,description:String,values:{type:Array},items:{type:Array}}});var m=function(){var t=this,s=t._self._c;return t._self._setupProxy,s("div",{staticClass:"legend-colors flex-col"},[s("h4",[t._v(t._s(t.title))]),s("p",[t._v(t._s(t.description))]),s("ul",{staticClass:"list-items"},t._l(t.items,function(e){return s("li",{key:e.value+e.value[0],staticClass:"legend-row"},[e.label?s("div",{staticClass:"item-label"},[t._v(t._s(e.label))]):t._e(),s("div",{staticClass:"item-swatch",style:`backgroundColor: rgb(${e.color})`})])}),0)])},L=[],S=g(P,m,L,!1,null,null);const A=S.exports;export{A as L,l as P};
