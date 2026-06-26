import{L as d}from"./layer-extension-aMEhI4n_.js";import{E as h,F as l}from"./layer-CsZTuiFD.js";const c={inject:{"vs:#decl":`
in vec2 instanceDashArrays;
#ifdef HIGH_PRECISION_DASH
in float instanceDashOffsets;
#endif
out vec2 vDashArray;
out float vDashOffset;
`,"vs:#main-end":`
vDashArray = instanceDashArrays;
#ifdef HIGH_PRECISION_DASH
vDashOffset = instanceDashOffsets / width.x;
#else
vDashOffset = 0.0;
#endif
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
`}},p={inject:{"vs:#decl":`
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
`}},g={getDashArray:{type:"accessor",value:[0,0]},getOffset:{type:"accessor",value:0},dashJustified:!1,dashGapPickable:!1};class r extends d{constructor({dash:s=!1,offset:t=!1,highPrecisionDash:e=!1}={}){super({dash:s||e,offset:t,highPrecisionDash:e})}isEnabled(s){return"pathTesselator"in s.state}getShaders(s){if(!s.isEnabled(this))return null;let t={};const e={};s.opts.dash&&(t=h(t,c),s.opts.highPrecisionDash&&(e.HIGH_PRECISION_DASH=!0)),s.opts.offset&&(t=h(t,p));const{inject:f}=t;return{modules:[{name:"pathStyle",inject:f,uniformTypes:{dashAlignMode:"f32",dashGapPickable:"i32"}}],defines:e}}initializeState(s,t){const e=this.getAttributeManager();!e||!t.isEnabled(this)||(t.opts.dash&&e.addInstanced({instanceDashArrays:{size:2,accessor:"getDashArray"},...t.opts.highPrecisionDash?{instanceDashOffsets:{size:1,accessor:"getPath",transform:t.getDashOffsets.bind(this)}}:{}}),t.opts.offset&&e.addInstanced({instanceOffsets:{size:1,accessor:"getOffset"}}))}updateState(s,t){if(t.isEnabled(this)&&t.opts.dash){const e={dashAlignMode:this.props.dashJustified?1:0,dashGapPickable:!!this.props.dashGapPickable};this.setShaderModuleProps({pathStyle:e})}}getDashOffsets(s){const t=[0],e=this.props.positionFormat==="XY"?2:3,f=Array.isArray(s[0]),n=f?s.length:s.length/e;let i,o;for(let a=0;a<n-1;a++)i=f?s[a]:s.slice(a*e,a*e+e),i=this.projectPosition(i),a>0&&(t[a]=t[a-1]+l(o,i)),o=i;return t[n-1]=0,t}}r.defaultProps=g;r.extensionName="PathStyleExtension";export{r as P};
