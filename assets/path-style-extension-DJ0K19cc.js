import{K as e,r as t}from"./mapbox-overlay-KuXvUc6L.js";import{t as n}from"./layer-extension-B8r-f_Dl.js";var r={inject:{"vs:#decl":`
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
`}},i={inject:{"vs:#decl":`
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
`}},a={getDashArray:{type:`accessor`,value:[0,0]},getOffset:{type:`accessor`,value:0},dashJustified:!1,dashGapPickable:!1},o=class extends n{constructor({dash:e=!1,offset:t=!1,highPrecisionDash:n=!1}={}){super({dash:e||n,offset:t,highPrecisionDash:n})}isEnabled(e){return`pathTesselator`in e.state}getShaders(e){if(!e.isEnabled(this))return null;let n={},a={};e.opts.dash&&(n=t(n,r),e.opts.highPrecisionDash&&(a.HIGH_PRECISION_DASH=!0)),e.opts.offset&&(n=t(n,i));let{inject:o}=n;return{modules:[{name:`pathStyle`,inject:o,uniformTypes:{dashAlignMode:`f32`,dashGapPickable:`i32`}}],defines:a}}initializeState(e,t){let n=this.getAttributeManager();!n||!t.isEnabled(this)||(t.opts.dash&&n.addInstanced({instanceDashArrays:{size:2,accessor:`getDashArray`},...t.opts.highPrecisionDash?{instanceDashOffsets:{size:1,accessor:`getPath`,transform:t.getDashOffsets.bind(this)}}:{}}),t.opts.offset&&n.addInstanced({instanceOffsets:{size:1,accessor:`getOffset`}}))}updateState(e,t){if(t.isEnabled(this)&&t.opts.dash){let e={dashAlignMode:+!!this.props.dashJustified,dashGapPickable:!!this.props.dashGapPickable};this.setShaderModuleProps({pathStyle:e})}}getDashOffsets(t){let n=[0],r=this.props.positionFormat===`XY`?2:3,i=Array.isArray(t[0]),a=i?t.length:t.length/r,o,s;for(let c=0;c<a-1;c++)o=i?t[c]:t.slice(c*r,c*r+r),o=this.projectPosition(o),c>0&&(n[c]=n[c-1]+e(s,o)),s=o;return n[a-1]=0,n}};o.defaultProps=a,o.extensionName=`PathStyleExtension`;export{o as t};