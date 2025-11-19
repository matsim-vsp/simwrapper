import{d as H,m as Q,g as b,n as B,S as v,V as _,C as J}from"./index-BUoHzg5-.js";import{d as tt}from"./index-CVL_6l40.js";import{Y as et}from"./index-DFKcNkqO.js";import{H as it}from"./HTTPFileSystem-CEWI2Uan.js";import{C as st}from"./CollapsiblePanel-Bc2Y_VBI.js";import{D as ot}from"./DrawingTool-CoakIV7V.js";import{Z as nt}from"./ZoomButtons-CgY25aik.js";import{c as at}from"./index-DURfk1ml.js";import{M as rt}from"./mapbox-overlay-HS93bZkL.js";import{A as lt}from"./arc-layer-utQsdbjp.js";import{C as ut}from"./geojson-layer-CAva7aju.js";import{O as A,I as ct,X as ht,p as k,Y as gt,G as dt,B as mt,V as ft}from"./layer-T9N9JmIf.js";import{C as pt}from"./column-layer-BPkrf_CZ.js";import{W as bt}from"./NewXmlFetcher.worker-DdEXgVTv.js";import{B as vt}from"./BackgroundLayers-CRFOdrhY.js";import"./fxp-DjoqftHf.js";import"./Coords-C-Mhj230.js";import"./turf.es-BzqbG201.js";import"./ColorsAndWidths-CpwGiNkZ.js";import"./cubehelix-BzW-tINw.js";import"./threshold-CrWFx_nu.js";import"./index-_doEQLKC.js";import"./rainbow-DNS2KC2A.js";import"./geo-utils-DSSOzu30.js";import"./sequential-pySAYR1V.js";import"./pow-RbZoge3Z.js";import"./precisionRound-CRsIqO1V.js";function yt(o){return new Worker("/simwrapper/assets/CsvGzipParser.worker-YUNyvKMO.js",{name:o?.name})}function xt({pointCount:o,getBinId:t}){const e=new Map;for(let i=0;i<o;i++){const s=t(i);if(s===null)continue;let n=e.get(String(s));n?n.points.push(i):(n={id:s,index:e.size,points:[i]},e.set(String(s),n))}return Array.from(e.values())}function Ct({bins:o,dimensions:t,target:e}){const i=o.length*t;(!e||e.length<i)&&(e=new Float32Array(i));for(let s=0;s<o.length;s++){const{id:n}=o[s];Array.isArray(n)?e.set(n,s*t):e[s]=n}return e}const St=o=>o.length,V=(o,t)=>{let e=0;for(const i of o)e+=t(i);return e},wt=(o,t)=>o.length===0?NaN:V(o,t)/o.length,At=(o,t)=>{let e=1/0;for(const i of o){const s=t(i);s<e&&(e=s)}return e},Mt=(o,t)=>{let e=-1/0;for(const i of o){const s=t(i);s>e&&(e=s)}return e},It={COUNT:St,SUM:V,MEAN:wt,MIN:At,MAX:Mt};function _t({bins:o,getValue:t,operation:e,target:i}){(!i||i.length<o.length)&&(i=new Float32Array(o.length));let s=1/0,n=-1/0;for(let a=0;a<o.length;a++){const{points:r}=o[a];i[a]=e(r,t),i[a]<s&&(s=i[a]),i[a]>n&&(n=i[a])}return{value:i,domain:[s,n]}}function D(o,t,e){const i={};for(const n of o.sources||[]){const a=t[n];if(a)i[n]=Dt(a);else throw new Error(`Cannot find attribute ${n}`)}const s={};return n=>{for(const a in i)s[a]=i[a](n);return o.getValue(s,n,e)}}function Dt(o){const t=o.value,{offset:e=0,stride:i,size:s}=o.getAccessor(),n=t.BYTES_PER_ELEMENT,a=e/n,r=i?i/n:s;if(s===1)return o.isConstant?()=>t[0]:c=>{const u=a+r*c;return t[u]};let l;return o.isConstant?(l=Array.from(t),()=>l):(l=new Array(s),c=>{const u=a+r*c;for(let h=0;h<s;h++)l[h]=t[u+h];return l})}class Tt{constructor(t){this.bins=[],this.binIds=null,this.results=[],this.dimensions=t.dimensions,this.channelCount=t.getValue.length,this.props={...t,binOptions:{},pointCount:0,operations:[],customOperations:[],attributes:{}},this.needsUpdate=!0,this.setProps(t)}destroy(){}get binCount(){return this.bins.length}setProps(t){const e=this.props;if(t.binOptions&&(A(t.binOptions,e.binOptions,2)||this.setNeedsUpdate()),t.operations)for(let i=0;i<this.channelCount;i++)t.operations[i]!==e.operations[i]&&this.setNeedsUpdate(i);if(t.customOperations)for(let i=0;i<this.channelCount;i++)!!t.customOperations[i]!=!!e.customOperations[i]&&this.setNeedsUpdate(i);t.pointCount!==void 0&&t.pointCount!==e.pointCount&&this.setNeedsUpdate(),t.attributes&&(t.attributes={...e.attributes,...t.attributes}),Object.assign(this.props,t)}setNeedsUpdate(t){t===void 0?this.needsUpdate=!0:this.needsUpdate!==!0&&(this.needsUpdate=this.needsUpdate||[],this.needsUpdate[t]=!0)}update(){if(this.needsUpdate===!0){this.bins=xt({pointCount:this.props.pointCount,getBinId:D(this.props.getBin,this.props.attributes,this.props.binOptions)});const t=Ct({bins:this.bins,dimensions:this.dimensions,target:this.binIds?.value});this.binIds={value:t,type:"float32",size:this.dimensions}}for(let t=0;t<this.channelCount;t++)if(this.needsUpdate===!0||this.needsUpdate[t]){const e=this.props.customOperations[t]||It[this.props.operations[t]],{value:i,domain:s}=_t({bins:this.bins,getValue:D(this.props.getValue[t],this.props.attributes,void 0),operation:e,target:this.results[t]?.value});this.results[t]={value:i,domain:s,type:"float32",size:1},this.props.onUpdate?.({channel:t})}this.needsUpdate=!1}preDraw(){}getBins(){return this.binIds}getResult(t){return this.results[t]}getResultDomain(t){return this.results[t]?.domain??[1/0,-1/0]}getBin(t){const e=this.bins[t];if(!e)return null;const i=new Array(this.channelCount);for(let s=0;s<i.length;s++){const n=this.results[s];i[s]=n?.value[t]}return{id:e.id,value:i,count:e.points.length,pointIndices:e.points}}}function E(o,t,e){return o.createFramebuffer({width:t,height:e,colorAttachments:[o.createTexture({width:t,height:e,format:"rgba32float",mipmaps:!1,sampler:{minFilter:"nearest",magFilter:"nearest"}})]})}const Ot=`uniform binSorterUniforms {
  ivec4 binIdRange;
  ivec2 targetSize;
} binSorter;
`,Pt={name:"binSorter",vs:Ot,uniformTypes:{binIdRange:"vec4<i32>",targetSize:"vec2<i32>"}},F=[1,2,4,8],T=3e38,Nt={SUM:0,MEAN:0,MIN:0,MAX:0,COUNT:0},y=1024;class zt{constructor(t,e){this.binsFBO=null,this.device=t,this.model=Rt(t,e)}get texture(){return this.binsFBO?this.binsFBO.colorAttachments[0].texture:null}destroy(){this.model.destroy(),this.binsFBO?.colorAttachments[0].texture.destroy(),this.binsFBO?.destroy()}getBinValues(t){if(!this.binsFBO)return null;const e=t%y,i=Math.floor(t/y),s=this.device.readPixelsToArrayWebGL(this.binsFBO,{sourceX:e,sourceY:i,sourceWidth:1,sourceHeight:1}).buffer;return new Float32Array(s)}setDimensions(t,e){const i=y,s=Math.ceil(t/i);this.binsFBO?this.binsFBO.height<s&&this.binsFBO.resize({width:i,height:s}):this.binsFBO=E(this.device,i,s);const n={binIdRange:[e[0][0],e[0][1],e[1]?.[0]||0,e[1]?.[1]||0],targetSize:[this.binsFBO.width,this.binsFBO.height]};this.model.shaderInputs.setProps({binSorter:n})}setModelProps(t){const e=this.model;t.attributes&&e.setAttributes(t.attributes),t.constantAttributes&&e.setConstantAttributes(t.constantAttributes),t.vertexCount!==void 0&&e.setVertexCount(t.vertexCount),t.shaderModuleProps&&e.shaderInputs.setProps(t.shaderModuleProps)}update(t){if(!this.binsFBO)return;const e=Lt(t);this._updateBins("SUM",e.SUM+e.MEAN),this._updateBins("MIN",e.MIN),this._updateBins("MAX",e.MAX)}_updateBins(t,e){if(e===0)return;e|=F[3];const i=this.model,s=this.binsFBO,n=t==="MAX"?-T:t==="MIN"?T:0,a=this.device.beginRenderPass({id:`gpu-aggregation-${t}`,framebuffer:s,parameters:{viewport:[0,0,s.width,s.height],colorMask:e},clearColor:[n,n,n,0],clearDepth:!1,clearStencil:!1});i.setParameters({blend:!0,blendColorSrcFactor:"one",blendColorDstFactor:"one",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one",blendColorOperation:t==="MAX"?"max":t==="MIN"?"min":"add",blendAlphaOperation:"add"}),i.draw(a),a.end()}}function Lt(o){const t={...Nt};for(let e=0;e<o.length;e++){const i=o[e];i&&(t[i]+=F[e])}return t}function Rt(o,t){let e=t.vs;t.dimensions===2&&(e+=`
void getBin(out int binId) {
  ivec2 binId2;
  getBin(binId2);
  if (binId2.x < binSorter.binIdRange.x || binId2.x >= binSorter.binIdRange.y) {
    binId = -1;
  } else {
    binId = (binId2.y - binSorter.binIdRange.z) * (binSorter.binIdRange.y - binSorter.binIdRange.x) + binId2.x;
  }
}
`);const i=`#version 300 es
#define SHADER_NAME gpu-aggregation-sort-bins-vertex

${e}

out vec3 v_Value;

void main() {
  int binIndex;
  getBin(binIndex);
  binIndex = binIndex - binSorter.binIdRange.x;
  if (binIndex < 0) {
    gl_Position = vec4(0.);
    return;
  }
  int row = binIndex / binSorter.targetSize.x;
  int col = binIndex - row * binSorter.targetSize.x;
  vec2 position = (vec2(col, row) + 0.5) / vec2(binSorter.targetSize) * 2.0 - 1.0;
  gl_Position = vec4(position, 0.0, 1.0);
  gl_PointSize = 1.0;

#if NUM_CHANNELS == 3
  getValue(v_Value);
#elif NUM_CHANNELS == 2
  getValue(v_Value.xy);
#else
  getValue(v_Value.x);
#endif
}
`,s=`#version 300 es
#define SHADER_NAME gpu-aggregation-sort-bins-fragment

precision highp float;

in vec3 v_Value;
out vec4 fragColor;

void main() {
  fragColor.xyz = v_Value;

  #ifdef MODULE_GEOMETRY
  geometry.uv = vec2(0.);
  DECKGL_FILTER_COLOR(fragColor, geometry);
  #endif

  fragColor.w = 1.0;
}
`;return new ct(o,{bufferLayout:t.bufferLayout,modules:[...t.modules||[],Pt],defines:{...t.defines,NON_INSTANCED_MODEL:1,NUM_CHANNELS:t.channelCount},isInstanced:!1,vs:i,fs:s,topology:"point-list",disableWarnings:!0})}const Ht=`uniform aggregatorTransformUniforms {
  ivec4 binIdRange;
  bvec3 isCount;
  bvec3 isMean;
  float naN;
} aggregatorTransform;
`,Bt={name:"aggregatorTransform",vs:Ht,uniformTypes:{binIdRange:"vec4<i32>",isCount:"vec3<f32>",isMean:"vec3<f32>"}};class kt{constructor(t,e){this.binBuffer=null,this.valueBuffer=null,this._domains=null,this.device=t,this.channelCount=e.channelCount,this.transform=Vt(t,e),this.domainFBO=E(t,2,1)}destroy(){this.transform.destroy(),this.binBuffer?.destroy(),this.valueBuffer?.destroy(),this.domainFBO.colorAttachments[0].texture.destroy(),this.domainFBO.destroy()}get domains(){if(!this._domains){const t=this.device.readPixelsToArrayWebGL(this.domainFBO).buffer,e=new Float32Array(t);this._domains=[[-e[4],e[0]],[-e[5],e[1]],[-e[6],e[2]]].slice(0,this.channelCount)}return this._domains}setDimensions(t,e){const{model:i,transformFeedback:s}=this.transform;i.setVertexCount(t);const n={binIdRange:[e[0][0],e[0][1],e[1]?.[0]||0,e[1]?.[1]||0]};i.shaderInputs.setProps({aggregatorTransform:n});const a=t*e.length*4;(!this.binBuffer||this.binBuffer.byteLength<a)&&(this.binBuffer?.destroy(),this.binBuffer=this.device.createBuffer({byteLength:a}),s.setBuffer("binIds",this.binBuffer));const r=t*this.channelCount*4;(!this.valueBuffer||this.valueBuffer.byteLength<r)&&(this.valueBuffer?.destroy(),this.valueBuffer=this.device.createBuffer({byteLength:r}),s.setBuffer("values",this.valueBuffer))}update(t,e){if(!t)return;const i=this.transform,s=this.domainFBO,n=[0,1,2].map(l=>e[l]==="COUNT"?1:0),a=[0,1,2].map(l=>e[l]==="MEAN"?1:0),r={isCount:n,isMean:a,bins:t};i.model.shaderInputs.setProps({aggregatorTransform:r}),i.run({id:"gpu-aggregation-domain",framebuffer:s,parameters:{viewport:[0,0,2,1]},clearColor:[-3e38,-3e38,-3e38,0],clearDepth:!1,clearStencil:!1}),this._domains=null}}function Vt(o,t){const e=`#version 300 es
#define SHADER_NAME gpu-aggregation-domain-vertex

uniform sampler2D bins;

#if NUM_DIMS == 1
out float binIds;
#else
out vec2 binIds;
#endif

#if NUM_CHANNELS == 1
flat out float values;
#elif NUM_CHANNELS == 2
flat out vec2 values;
#else
flat out vec3 values;
#endif

const float NAN = intBitsToFloat(-1);

void main() {
  int row = gl_VertexID / SAMPLER_WIDTH;
  int col = gl_VertexID - row * SAMPLER_WIDTH;
  vec4 weights = texelFetch(bins, ivec2(col, row), 0);
  vec3 value3 = mix(
    mix(weights.rgb, vec3(weights.a), aggregatorTransform.isCount),
    weights.rgb / max(weights.a, 1.0),
    aggregatorTransform.isMean
  );
  if (weights.a == 0.0) {
    value3 = vec3(NAN);
  }

#if NUM_DIMS == 1
  binIds = float(gl_VertexID + aggregatorTransform.binIdRange.x);
#else
  int y = gl_VertexID / (aggregatorTransform.binIdRange.y - aggregatorTransform.binIdRange.x);
  int x = gl_VertexID - y * (aggregatorTransform.binIdRange.y - aggregatorTransform.binIdRange.x);
  binIds.y = float(y + aggregatorTransform.binIdRange.z);
  binIds.x = float(x + aggregatorTransform.binIdRange.x);
#endif

#if NUM_CHANNELS == 3
  values = value3;
#elif NUM_CHANNELS == 2
  values = value3.xy;
#else
  values = value3.x;
#endif

  gl_Position = vec4(0., 0., 0., 1.);
  // This model renders into a 2x1 texture to obtain min and max simultaneously.
  // See comments in fragment shader
  gl_PointSize = 2.0;
}
`,i=`#version 300 es
#define SHADER_NAME gpu-aggregation-domain-fragment

precision highp float;

#if NUM_CHANNELS == 1
flat in float values;
#elif NUM_CHANNELS == 2
flat in vec2 values;
#else
flat in vec3 values;
#endif

out vec4 fragColor;

void main() {
  vec3 value3;
#if NUM_CHANNELS == 3
  value3 = values;
#elif NUM_CHANNELS == 2
  value3.xy = values;
#else
  value3.x = values;
#endif
  if (isnan(value3.x)) discard;
  // This shader renders into a 2x1 texture with blending=max
  // The left pixel yields the max value of each channel
  // The right pixel yields the min value of each channel
  if (gl_FragCoord.x < 1.0) {
    fragColor = vec4(value3, 1.0);
  } else {
    fragColor = vec4(-value3, 1.0);
  }
}
`;return new ht(o,{vs:e,fs:i,topology:"point-list",modules:[Bt],parameters:{blend:!0,blendColorSrcFactor:"one",blendColorDstFactor:"one",blendColorOperation:"max",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one",blendAlphaOperation:"max"},defines:{NUM_DIMS:t.dimensions,NUM_CHANNELS:t.channelCount,SAMPLER_WIDTH:y},varyings:["binIds","values"],disableWarnings:!0})}class O{static isSupported(t){return t.features.has("float32-renderable-webgl")&&t.features.has("texture-blend-float-webgl")}constructor(t,e){this.binCount=0,this.binIds=null,this.results=[],this.device=t,this.dimensions=e.dimensions,this.channelCount=e.channelCount,this.props={...e,pointCount:0,binIdRange:[[0,0]],operations:[],attributes:{},binOptions:{}},this.needsUpdate=new Array(this.channelCount).fill(!0),this.binSorter=new zt(t,e),this.aggregationTransform=new kt(t,e),this.setProps(e)}getBins(){const t=this.aggregationTransform.binBuffer;return t?(this.binIds?.buffer!==t&&(this.binIds={buffer:t,type:"float32",size:this.dimensions}),this.binIds):null}getResult(t){const e=this.aggregationTransform.valueBuffer;return!e||t>=this.channelCount?null:(this.results[t]?.buffer!==e&&(this.results[t]={buffer:e,type:"float32",size:1,stride:this.channelCount*4,offset:t*4}),this.results[t])}getResultDomain(t){return this.aggregationTransform.domains[t]}getBin(t){if(t<0||t>=this.binCount)return null;const{binIdRange:e}=this.props;let i;if(this.dimensions===1)i=[t+e[0][0]];else{const[[r,l],[c]]=e,u=l-r;i=[t%u+r,Math.floor(t/u)+c]}const s=this.binSorter.getBinValues(t);if(!s)return null;const n=s[3],a=[];for(let r=0;r<this.channelCount;r++){const l=this.props.operations[r];l==="COUNT"?a[r]=n:n===0?a[r]=NaN:a[r]=l==="MEAN"?s[r]/n:s[r]}return{id:i,value:a,count:n}}destroy(){this.binSorter.destroy(),this.aggregationTransform.destroy()}setProps(t){const e=this.props;if("binIdRange"in t&&!A(t.binIdRange,e.binIdRange,2)){const i=t.binIdRange;if(k.assert(i.length===this.dimensions),this.dimensions===1){const[[s,n]]=i;this.binCount=n-s}else{const[[s,n],[a,r]]=i;this.binCount=(n-s)*(r-a)}this.binSorter.setDimensions(this.binCount,i),this.aggregationTransform.setDimensions(this.binCount,i),this.setNeedsUpdate()}if(t.operations)for(let i=0;i<this.channelCount;i++)t.operations[i]!==e.operations[i]&&this.setNeedsUpdate(i);if(t.pointCount!==void 0&&t.pointCount!==e.pointCount&&(this.binSorter.setModelProps({vertexCount:t.pointCount}),this.setNeedsUpdate()),t.binOptions&&(A(t.binOptions,e.binOptions,2)||this.setNeedsUpdate(),this.binSorter.model.shaderInputs.setProps({binOptions:t.binOptions})),t.attributes){const i={},s={};for(const n of Object.values(t.attributes))for(const[a,r]of Object.entries(n.getValue()))ArrayBuffer.isView(r)?s[a]=r:r&&(i[a]=r);this.binSorter.setModelProps({attributes:i,constantAttributes:s})}t.shaderModuleProps&&this.binSorter.setModelProps({shaderModuleProps:t.shaderModuleProps}),Object.assign(this.props,t)}setNeedsUpdate(t){t===void 0?this.needsUpdate.fill(!0):this.needsUpdate[t]=!0}update(){}preDraw(){if(!this.needsUpdate.some(Boolean))return;const{operations:t}=this.props,e=this.needsUpdate.map((i,s)=>i?t[s]:null);this.binSorter.update(e),this.aggregationTransform.update(this.binSorter.texture,t);for(let i=0;i<this.channelCount;i++)this.needsUpdate[i]&&(this.needsUpdate[i]=!1,this.props.onUpdate?.({channel:i}))}}class U extends ut{get isDrawable(){return!0}initializeState(){this.getAttributeManager().remove(["instancePickingColors"])}updateState(t){super.updateState(t);const e=this.getAggregatorType();if(t.changeFlags.extensionsChanged||this.state.aggregatorType!==e){this.state.aggregator?.destroy();const i=this.createAggregator(e);return i.setProps({attributes:this.getAttributeManager()?.attributes}),this.setState({aggregator:i,aggregatorType:e}),!0}return!1}finalizeState(t){super.finalizeState(t),this.state.aggregator.destroy()}updateAttributes(t){const{aggregator:e}=this.state;e.setProps({attributes:t});for(const i in t)this.onAttributeChange(i);e.update()}draw({shaderModuleProps:t}){const{aggregator:e}=this.state;e.setProps({shaderModuleProps:t}),e.preDraw()}_getAttributeManager(){return new gt(this.context.device,{id:this.props.id,stats:this.context.stats})}}U.layerName="AggregationLayer";const Et=[[255,255,178],[254,217,118],[254,178,76],[253,141,60],[240,59,32],[189,0,38]];function Ft(o,t=!1,e=Float32Array){let i;if(Number.isFinite(o[0]))i=new e(o);else{i=new e(o.length*4);let s=0;for(let n=0;n<o.length;n++){const a=o[n];i[s++]=a[0],i[s++]=a[1],i[s++]=a[2],i[s++]=Number.isFinite(a[3])?a[3]:255}}if(t)for(let s=0;s<i.length;s++)i[s]/=255;return i}const x={linear:"linear",quantile:"nearest",quantize:"nearest",ordinal:"nearest"};function Ut(o,t){o.setSampler({minFilter:x[t],magFilter:x[t]})}function $t(o,t,e="linear"){const i=Ft(t,!1,Uint8Array);return o.createTexture({format:"rgba8unorm",mipmaps:!1,sampler:{minFilter:x[e],magFilter:x[e],addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"},data:i,width:i.length/4,height:1})}class P{constructor(t,e){this.props={scaleType:"linear",lowerPercentile:0,upperPercentile:100},this.domain=null,this.cutoff=null,this.input=t,this.inputLength=e,this.attribute=t}getScalePercentile(){if(!this._percentile){const t=N(this.input,this.inputLength);this._percentile=Wt(t)}return this._percentile}getScaleOrdinal(){if(!this._ordinal){const t=N(this.input,this.inputLength);this._ordinal=jt(t)}return this._ordinal}getCutoff({scaleType:t,lowerPercentile:e,upperPercentile:i}){if(t==="quantile")return[e,i-1];if(e>0||i<100){const{domain:s}=this.getScalePercentile();let n=s[Math.floor(e)-1]??-1/0,a=s[Math.floor(i)-1]??1/0;if(t==="ordinal"){const{domain:r}=this.getScaleOrdinal();n=r.findIndex(l=>l>=n),a=r.findIndex(l=>l>a)-1,a===-2&&(a=r.length-1)}return[n,a]}return null}update(t){const e=this.props;if(t.scaleType!==e.scaleType)switch(t.scaleType){case"quantile":{const{attribute:i}=this.getScalePercentile();this.attribute=i,this.domain=[0,99];break}case"ordinal":{const{attribute:i,domain:s}=this.getScaleOrdinal();this.attribute=i,this.domain=[0,s.length-1];break}default:this.attribute=this.input,this.domain=null}return(t.scaleType!==e.scaleType||t.lowerPercentile!==e.lowerPercentile||t.upperPercentile!==e.upperPercentile)&&(this.cutoff=this.getCutoff(t)),this.props=t,this}}function jt(o){const t=new Set;for(const s of o)Number.isFinite(s)&&t.add(s);const e=Array.from(t).sort(),i=new Map;for(let s=0;s<e.length;s++)i.set(e[s],s);return{attribute:{value:o.map(s=>Number.isFinite(s)?i.get(s):NaN),type:"float32",size:1},domain:e}}function Wt(o,t=100){const e=Array.from(o).filter(Number.isFinite).sort(qt);let i=0;const s=Math.max(1,t),n=new Array(s-1);for(;++i<s;)n[i-1]=Yt(e,i/s);return{attribute:{value:o.map(a=>Number.isFinite(a)?Gt(n,a):NaN),type:"float32",size:1},domain:n}}function N(o,t){const e=(o.stride??4)/4,i=(o.offset??0)/4;let s=o.value;if(!s){const a=o.buffer?.readSyncWebGL(0,e*4*t);a&&(s=new Float32Array(a.buffer),o.value=s)}if(e===1)return s.subarray(0,t);const n=new Float32Array(t);for(let a=0;a<t;a++)n[a]=s[a*e+i];return n}function qt(o,t){return o-t}function Yt(o,t){const e=o.length;if(t<=0||e<2)return o[0];if(t>=1)return o[e-1];const i=(e-1)*t,s=Math.floor(i),n=o[s],a=o[s+1];return n+(a-n)*(i-s)}function Gt(o,t){let e=0,i=o.length;for(;e<i;){const s=e+i>>>1;o[s]>t?i=s:e=s+1}return e}function Xt({dataBounds:o,getBinId:t,padding:e=0}){const i=[o[0],o[1],[o[0][0],o[1][1]],[o[1][0],o[0][1]]].map(l=>t(l)),s=Math.min(...i.map(l=>l[0]))-e,n=Math.min(...i.map(l=>l[1]))-e,a=Math.max(...i.map(l=>l[0]))+e+1,r=Math.max(...i.map(l=>l[1]))+e+1;return[[s,a],[n,r]]}const $=Math.PI/3,C=2*Math.sin($),S=1.5,Zt=Array.from({length:6},(o,t)=>{const e=t*$;return[Math.sin(e),-Math.cos(e)]});function w([o,t],e){let i=Math.round(t=t/e/S),s=Math.round(o=o/e/C-(i&1)/2);const n=t-i;if(Math.abs(n)*3>1){const a=o-s,r=s+(o<s?-1:1)/2,l=i+(t<i?-1:1),c=o-r,u=t-l;a*a+n*n>c*c+u*u&&(s=r+(i&1?1:-1)/2,i=l)}return[s,i]}const Kt=`
const vec2 DIST = vec2(${C}, ${S});

ivec2 pointToHexbin(vec2 p, float radius) {
  p /= radius * DIST;
  float pj = round(p.y);
  float pjm2 = mod(pj, 2.0);
  p.x -= pjm2 * 0.5;
  float pi = round(p.x);
  vec2 d1 = p - vec2(pi, pj);

  if (abs(d1.y) * 3. > 1.) {
    vec2 v2 = step(0.0, d1) - 0.5;
    v2.y *= 2.0;
    vec2 d2 = d1 - v2;
    if (dot(d1, d1) > dot(d2, d2)) {
      pi += v2.x + pjm2 - 0.5;
      pj += v2.y;
    }
  }
  return ivec2(pi, pj);
}
`;function z([o,t],e){return[(o+(t&1)/2)*e*C,t*e*S]}const Qt=`
const vec2 DIST = vec2(${C}, ${S});

vec2 hexbinCentroid(vec2 binId, float radius) {
  binId.x += fract(binId.y * 0.5);
  return binId * DIST * radius;
}
`,Jt=`#version 300 es
#define SHADER_NAME hexagon-cell-layer-vertex-shader
in vec3 positions;
in vec3 normals;
in vec2 instancePositions;
in float instanceElevationValues;
in float instanceColorValues;
in vec3 instancePickingColors;
uniform sampler2D colorRange;
out vec4 vColor;
${Qt}
float interp(float value, vec2 domain, vec2 range) {
float r = min(max((value - domain.x) / (domain.y - domain.x), 0.), 1.);
return mix(range.x, range.y, r);
}
vec4 interp(float value, vec2 domain, sampler2D range) {
float r = (value - domain.x) / (domain.y - domain.x);
return texture(range, vec2(r, 0.5));
}
void main(void) {
geometry.pickingColor = instancePickingColors;
if (isnan(instanceColorValues) ||
instanceColorValues < hexagon.colorDomain.z ||
instanceColorValues > hexagon.colorDomain.w ||
instanceElevationValues < hexagon.elevationDomain.z ||
instanceElevationValues > hexagon.elevationDomain.w
) {
gl_Position = vec4(0.);
return;
}
vec2 commonPosition = hexbinCentroid(instancePositions, column.radius) + (hexagon.originCommon - project.commonOrigin.xy);
commonPosition += positions.xy * column.radius * column.coverage;
geometry.position = vec4(commonPosition, 0.0, 1.0);
geometry.normal = project_normal(normals);
float elevation = 0.0;
if (column.extruded) {
elevation = interp(instanceElevationValues, hexagon.elevationDomain.xy, hexagon.elevationRange);
elevation = project_size(elevation);
geometry.position.z = (positions.z + 1.0) / 2.0 * elevation;
}
gl_Position = project_common_position_to_clipspace(geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vColor = interp(instanceColorValues, hexagon.colorDomain.xy, colorRange);
vColor.a *= layer.opacity;
if (column.extruded) {
vColor.rgb = lighting_getLightColor(vColor.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,te=`uniform hexagonUniforms {
  vec4 colorDomain;
  vec4 elevationDomain;
  vec2 elevationRange;
  vec2 originCommon;
} hexagon;
`,ee={name:"hexagon",vs:te,uniformTypes:{colorDomain:"vec4<f32>",elevationDomain:"vec4<f32>",elevationRange:"vec2<f32>",originCommon:"vec2<f32>"}};class j extends pt{getShaders(){const t=super.getShaders();return t.modules.push(ee),{...t,vs:Jt}}initializeState(){super.initializeState();const t=this.getAttributeManager();t.remove(["instanceElevations","instanceFillColors","instanceLineColors","instanceStrokeWidths"]),t.addInstanced({instancePositions:{size:2,type:"float32",accessor:"getBin"},instanceColorValues:{size:1,type:"float32",accessor:"getColorValue"},instanceElevationValues:{size:1,type:"float32",accessor:"getElevationValue"}})}updateState(t){super.updateState(t);const{props:e,oldProps:i}=t,s=this.state.fillModel;if(i.colorRange!==e.colorRange){this.state.colorTexture?.destroy(),this.state.colorTexture=$t(this.context.device,e.colorRange,e.colorScaleType);const n={colorRange:this.state.colorTexture};s.shaderInputs.setProps({hexagon:n})}else i.colorScaleType!==e.colorScaleType&&Ut(this.state.colorTexture,e.colorScaleType)}finalizeState(t){super.finalizeState(t),this.state.colorTexture?.destroy()}draw({uniforms:t}){const{radius:e,hexOriginCommon:i,elevationRange:s,elevationScale:n,extruded:a,coverage:r,colorDomain:l,elevationDomain:c}=this.props,u=this.props.colorCutoff||[-1/0,1/0],h=this.props.elevationCutoff||[-1/0,1/0],g=this.state.fillModel;g.vertexArray.indexBuffer&&g.setIndexBuffer(null),g.setVertexCount(this.state.fillVertexCount);const d={colorDomain:[Math.max(l[0],u[0]),Math.min(l[1],u[1]),Math.max(l[0]-1,u[0]),Math.min(l[1]+1,u[1])],elevationDomain:[Math.max(c[0],h[0]),Math.min(c[1],h[1]),Math.max(c[0]-1,h[0]),Math.min(c[1]+1,h[1])],elevationRange:[s[0]*n,s[1]*n],originCommon:i};g.shaderInputs.setProps({column:{extruded:a,coverage:r,radius:e},hexagon:d}),g.draw(this.context.renderPass)}}j.layerName="HexagonCellLayer";const ie=`uniform binOptionsUniforms {
  vec2 hexOriginCommon;
  float radiusCommon;
} binOptions;
`,se={name:"binOptions",vs:ie,uniformTypes:{hexOriginCommon:"vec2<f32>",radiusCommon:"f32"}};function L(){}const oe={gpuAggregation:!0,colorDomain:null,colorRange:Et,getColorValue:{type:"accessor",value:null},getColorWeight:{type:"accessor",value:1},colorAggregation:"SUM",lowerPercentile:{type:"number",min:0,max:100,value:0},upperPercentile:{type:"number",min:0,max:100,value:100},colorScaleType:"quantize",onSetColorDomain:L,elevationDomain:null,elevationRange:[0,1e3],getElevationValue:{type:"accessor",value:null},getElevationWeight:{type:"accessor",value:1},elevationAggregation:"SUM",elevationScale:{type:"number",min:0,value:1},elevationLowerPercentile:{type:"number",min:0,max:100,value:0},elevationUpperPercentile:{type:"number",min:0,max:100,value:100},elevationScaleType:"linear",onSetElevationDomain:L,radius:{type:"number",min:1,value:1e3},coverage:{type:"number",min:0,max:1,value:1},getPosition:{type:"accessor",value:o=>o.position},hexagonAggregator:{type:"function",optional:!0,value:null},extruded:!1,material:!0};class M extends U{getAggregatorType(){const{gpuAggregation:t,hexagonAggregator:e,getColorValue:i,getElevationValue:s}=this.props;return t&&(e||i||s)?(k.warn("Features not supported by GPU aggregation, falling back to CPU")(),"cpu"):t&&O.isSupported(this.context.device)?"gpu":"cpu"}createAggregator(t){if(t==="cpu"){const{hexagonAggregator:e,radius:i}=this.props;return new Tt({dimensions:2,getBin:{sources:["positions"],getValue:({positions:s},n,a)=>{if(e)return e(s,i);const l=this.state.aggregatorViewport.projectPosition(s),{radiusCommon:c,hexOriginCommon:u}=a;return w([l[0]-u[0],l[1]-u[1]],c)}},getValue:[{sources:["colorWeights"],getValue:({colorWeights:s})=>s},{sources:["elevationWeights"],getValue:({elevationWeights:s})=>s}]})}return new O(this.context.device,{dimensions:2,channelCount:2,bufferLayout:this.getAttributeManager().getBufferLayouts({isInstanced:!1}),...super.getShaders({modules:[dt,se],vs:`
  in vec3 positions;
  in vec3 positions64Low;
  in float colorWeights;
  in float elevationWeights;
  
  ${Kt}

  void getBin(out ivec2 binId) {
    vec3 positionCommon = project_position(positions, positions64Low);
    binId = pointToHexbin(positionCommon.xy, binOptions.radiusCommon);
  }
  void getValue(out vec2 value) {
    value = vec2(colorWeights, elevationWeights);
  }
  `})})}initializeState(){super.initializeState(),this.getAttributeManager().add({positions:{size:3,accessor:"getPosition",type:"float64",fp64:this.use64bitPositions()},colorWeights:{size:1,accessor:"getColorWeight"},elevationWeights:{size:1,accessor:"getElevationWeight"}})}updateState(t){const e=super.updateState(t),{props:i,oldProps:s,changeFlags:n}=t,{aggregator:a}=this.state;if((n.dataChanged||!this.state.dataAsArray)&&(i.getColorValue||i.getElevationValue)&&(this.state.dataAsArray=Array.from(mt(i.data).iterable)),e||n.dataChanged||i.radius!==s.radius||i.getColorValue!==s.getColorValue||i.getElevationValue!==s.getElevationValue||i.colorAggregation!==s.colorAggregation||i.elevationAggregation!==s.elevationAggregation){this._updateBinOptions();const{radiusCommon:r,hexOriginCommon:l,binIdRange:c,dataAsArray:u}=this.state;if(a.setProps({binIdRange:c,pointCount:this.getNumInstances(),operations:[i.colorAggregation,i.elevationAggregation],binOptions:{radiusCommon:r,hexOriginCommon:l},onUpdate:this._onAggregationUpdate.bind(this)}),u){const{getColorValue:h,getElevationValue:g}=this.props;a.setProps({customOperations:[h&&(d=>h(d.map(m=>u[m]),{indices:d,data:i.data})),g&&(d=>g(d.map(m=>u[m]),{indices:d,data:i.data}))]})}}return n.updateTriggersChanged&&n.updateTriggersChanged.getColorValue&&a.setNeedsUpdate(0),n.updateTriggersChanged&&n.updateTriggersChanged.getElevationValue&&a.setNeedsUpdate(1),e}_updateBinOptions(){const t=this.getBounds();let e=1,i=[0,0],s=[[0,1],[0,1]],n=this.context.viewport;if(t&&Number.isFinite(t[0][0])){let a=[(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2];const{radius:r}=this.props,{unitsPerMeter:l}=n.getDistanceScales(a);e=l[0]*r;const c=w(n.projectFlat(a),e);a=n.unprojectFlat(z(c,e));const u=n.constructor;n=n.isGeospatial?new u({longitude:a[0],latitude:a[1],zoom:12}):new ft({position:[a[0],a[1],0],zoom:12}),i=[Math.fround(n.center[0]),Math.fround(n.center[1])],s=Xt({dataBounds:t,getBinId:h=>{const g=n.projectFlat(h);return g[0]-=i[0],g[1]-=i[1],w(g,e)},padding:1})}this.setState({radiusCommon:e,hexOriginCommon:i,binIdRange:s,aggregatorViewport:n})}draw(t){t.shaderModuleProps.project&&(t.shaderModuleProps.project.viewport=this.state.aggregatorViewport),super.draw(t)}_onAggregationUpdate({channel:t}){const e=this.getCurrentLayer().props,{aggregator:i}=this.state;if(t===0){const s=i.getResult(0);this.setState({colors:new P(s,i.binCount)}),e.onSetColorDomain(i.getResultDomain(0))}else if(t===1){const s=i.getResult(1);this.setState({elevations:new P(s,i.binCount)}),e.onSetElevationDomain(i.getResultDomain(1))}}onAttributeChange(t){const{aggregator:e}=this.state;switch(t){case"positions":e.setNeedsUpdate(),this._updateBinOptions();const{radiusCommon:i,hexOriginCommon:s,binIdRange:n}=this.state;e.setProps({binIdRange:n,binOptions:{radiusCommon:i,hexOriginCommon:s}});break;case"colorWeights":e.setNeedsUpdate(0);break;case"elevationWeights":e.setNeedsUpdate(1);break}}renderLayers(){const{aggregator:t,radiusCommon:e,hexOriginCommon:i}=this.state,{elevationScale:s,colorRange:n,elevationRange:a,extruded:r,coverage:l,material:c,transitions:u,colorScaleType:h,lowerPercentile:g,upperPercentile:d,colorDomain:m,elevationScaleType:W,elevationLowerPercentile:q,elevationUpperPercentile:Y,elevationDomain:G}=this.props,X=this.getSubLayerClass("cells",j),I=t.getBins(),f=this.state.colors?.update({scaleType:h,lowerPercentile:g,upperPercentile:d}),p=this.state.elevations?.update({scaleType:W,lowerPercentile:q,upperPercentile:Y});return!f||!p?null:new X(this.getSubLayerProps({id:"cells"}),{data:{length:t.binCount,attributes:{getBin:I,getColorValue:f.attribute,getElevationValue:p.attribute}},dataComparator:(Z,K)=>Z.length===K.length,updateTriggers:{getBin:[I],getColorValue:[f.attribute],getElevationValue:[p.attribute]},diskResolution:6,vertices:Zt,radius:e,hexOriginCommon:i,elevationScale:s,colorRange:n,colorScaleType:h,elevationRange:a,extruded:r,coverage:l,material:c,colorDomain:f.domain||m||t.getResultDomain(0),elevationDomain:p.domain||G||t.getResultDomain(1),colorCutoff:f.cutoff,elevationCutoff:p.cutoff,transitions:u&&{getFillColor:u.getColorValue||u.getColorWeight,getElevation:u.getElevationValue||u.getElevationWeight},extensions:[]})}getPickingInfo(t){const e=t.info,{index:i}=e;if(i>=0){const s=this.state.aggregator.getBin(i);let n;if(s){const a=z(s.id,this.state.radiusCommon),r=this.context.viewport.unprojectFlat(a);n={col:s.id[0],row:s.id[1],position:r,colorValue:s.value[0],elevationValue:s.value[1],count:s.count},s.pointIndices&&(n.pointIndices=s.pointIndices,n.points=Array.isArray(this.props.data)?s.pointIndices.map(l=>this.props.data[l]):[])}e.object=n}return e}}M.layerName="HexagonLayer";M.defaultProps=oe;const R="/simwrapper/",ne={ambient:.64,diffuse:.6,shininess:32,specularColor:[51,51,51]},ae=H({name:"XYHexMapComponent",props:{viewId:{type:Number,required:!0},colorRamp:{type:String,required:!0},coverage:{type:Number,required:!0},dark:{type:Boolean,required:!0},data:{type:Object,required:!0},extrude:{type:Boolean,required:!0},highlights:{type:Array,required:!0},mapIsIndependent:{type:Boolean,required:!0},maxHeight:{type:Number,required:!0},metric:{type:String,required:!0},radius:{type:Number,required:!0},selectedHexStats:{type:Object,required:!1},upperPercentile:{type:Number,required:!0},onClick:{type:Function,required:!0},agg:{type:Number,required:!0},group:{type:String,required:!0},bgLayers:{type:Object}},data(){return{mymap:null,deckOverlay:null,globalState:b.state,tooltipHTML:"",tooltipStyle:{position:"absolute",padding:"4px 8px",display:"block",top:0,left:0,color:this.dark?"#ccc":"#223",backgroundColor:this.dark?"#2a3c4f":"white",zIndex:2e4}}},watch:{layers(){this.deckOverlay?.setProps({layers:this.layers})},dark(){const o=`${R}map-styles/${this.dark?"dark":"positron"}.json`;this.mymap?.setStyle(o)},"globalState.viewState"(){if(this.mapIsIndependent||!this.mymap)return;const o=this.globalState.viewState,t=this.mymap?.getCenter();if(o.longitude!==t.lng||o.latitude!==t.lat||o.zoom!==this.mymap?.getZoom()||o.pitch!==this.mymap?.getPitch()||o.bearing!==this.mymap?.getBearing())try{this.mymap?.jumpTo(o)}catch(e){console.warn(""+e)}}},computed:{weightedRowData(){let o=[];return this.highlights.length?this.highlights.map(t=>t[0]):!this.data||!Object.keys(this.data).length?o:{length:this.data[this.group].positions[this.agg].length/2}},colors(){const o=at({colormap:this.colorRamp,nshades:10,format:"rba",alpha:1}).map(t=>[t[0],t[1],t[2]]);return this.dark||o.reverse(),o.slice(1)},layers(){const o=this.data[this.group],t=this.highlights.length?{getPosition:r=>r}:{getPosition:(r,l)=>o.positions[this.agg].slice(l.index*2,l.index*2+2)},e=o?.positions[this.agg].length/2||0;let i=null;e<10&&(i=this.colors.slice(4,5));const s=[],n=this.bgLayers?.layers();n&&s.push(...n.layersBelow),s.push(new lt({id:"arc-layer",data:this.highlights,getSourcePosition:r=>r[0],getTargetPosition:r=>r[1],pickable:!1,opacity:.4,getHeight:0,getWidth:1,getSourceColor:this.dark?[144,96,128]:[192,192,240],getTargetColor:this.dark?[144,96,128]:[192,192,240]}));const a=Object.assign(t,{id:"hexlayer",data:this.weightedRowData,colorRange:i||this.colors,coverage:.98,autoHighlight:!0,elevationRange:[0,this.maxHeight],elevationScale:25,extruded:this.extrude,gpuAggregation:!1,selectedHexStats:this.selectedHexStats,material:ne,opacity:this.dark&&this.highlights.length?.6:.8,pickable:!0,pickingRadius:2,positionFormat:"XY",radius:this.radius,upperPercentile:this.upperPercentile,updateTriggers:{},transitions:{elevationScale:{type:"interpolation",duration:1e3},opacity:{type:"interpolation",duration:200}},onHover:this.getTooltip});return s.push(new M(a)),n&&s.push(...n.layersOnTop),s}},mounted(){const o=`${R}map-styles/${this.dark?"dark":"positron"}.json`,t=`map-${this.viewId}`,e=this.globalState.viewState;this.mymap=new Q.Map({container:t,style:o,...e}),this.mymap.on("style.load",()=>{this.deckOverlay=new rt({interleaved:!0,layers:this.layers,onClick:this.handleClick}),this.mymap?.addControl(this.deckOverlay)}),this.mymap?.on("move",()=>{const i=this.mymap?.getCenter(),s={latitude:i.lat,longitude:i.lng,zoom:this.mymap?.getZoom(),bearing:this.mymap?.getBearing(),pitch:this.mymap?.getPitch(),jump:!0};b.commit("setMapCamera",s)})},beforeDestroy(){this.deckOverlay&&this.mymap?.removeControl(this.deckOverlay),this.mymap?.remove()},methods:{getTooltip(o){const{x:t,y:e,object:i}=o;if(!i||!i.position||!i.position.length){this.tooltipStyle.display="none";return}const s=i.position[1],n=i.position[0],a=i.pointIndices.length,r=`        <b>${this.highlights.length?"Count":this.metric}: ${a} </b><br/>
        ${Number.isFinite(s)?s.toFixed(4):""} / ${Number.isFinite(n)?n.toFixed(4):""}
      `;this.tooltipStyle.display="block",this.tooltipStyle.top=`${e+12}px`,this.tooltipStyle.left=`${t+12}px`,this.tooltipHTML=r},handleClick(o,t){this.tooltipStyle.display="none",this.onClick&&this.onClick(o,t)}}});var re=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"hex-map flex-col"},[e("div",{staticClass:"map-container",attrs:{id:`map-${t.viewId}`}}),e("div",{directives:[{name:"show",rawName:"v-show",value:t.tooltipHTML,expression:"tooltipHTML"}],staticClass:"deck-tooltip",style:t.tooltipStyle,domProps:{innerHTML:t._s(t.tooltipHTML)}})])},le=[],ue=B(ae,re,le,!1,null,null);const ce=ue.exports,he={messages:{en:{loading:"Loading data...",sorting:"Sorting into bins...",aggregate:"Summary",maxHeight:"3D Height",showDetails:"Show Details",selection:"Selection",areas:"Areas",count:"Count"},de:{loading:"Dateien laden...",sorting:"Sortieren...",aggregate:"Daten",maxHeight:"3-D Höhe",showDetails:"Details anzeigen",selection:"Ausgewählt",areas:"Orte",count:"Anzahl"}}},ge=H({name:"XyHexagonsPlugin",i18n:he,components:{CollapsiblePanel:st,DrawingTool:ot,XyHexDeckMap:ce,ToggleButton:tt.ToggleButton,ZoomButtons:nt},props:{root:{type:String,required:!0},subfolder:{type:String,required:!0},yamlConfig:String,config:Object,thumbnail:Boolean},data:()=>{const o=["par","bathymetry","magma","chlorophyll"];return{id:Math.floor(1e12*Math.random()),resolvers:{},resolverId:0,_xmlConfigFetcher:{},standaloneYAMLconfig:{title:"",description:"",file:"",projection:"",thumbnail:"",aggregations:{},radius:250,maxHeight:0,center:null,zoom:9,mapIsIndependent:!1},YAMLrequirementsXY:{file:"",aggregations:{}},colorRamps:o,buttonColors:["#BF7230","#5E8AAE","#9C439C","#269367"],aggregations:{},aggNumber:0,gzipWorker:null,colorRamp:o[0],globalState:b.state,currentGroup:"",backgroundLayers:null,vizDetails:{title:"",description:"",file:"",projection:"",thumbnail:"",aggregations:{},radius:250,maxHeight:0,center:null,zoom:9},myState:{statusMessage:"",subfolder:"",yamlConfig:"",thumbnail:!1},requests:{},highlightedTrips:[],searchTerm:"",searchEnabled:!1,isLoaded:!1,activeAggregation:"",isHighlightingZone:!1,multiSelectedHexagons:{},thumbnailUrl:"url('assets/thumbnail.jpg') no-repeat;",hexStats:null,resizer:null}},computed:{fileApi(){return new it(this.fileSystem,b)},fileSystem(){const o=this.$store.state.svnProjects.filter(t=>t.slug===this.root);if(o.length===0)throw console.log("no such project"),Error;return o[0]},urlThumbnail(){return this.thumbnailUrl},buttonLabel(){const[o,t]=this.activeAggregation.split("~");return this.aggregations[o][t].title},extrudeTowers(){return this.vizDetails.maxHeight>0},mapProps(){return{viewId:this.id,group:this.currentGroup,agg:this.aggNumber,colorRamp:this.colorRamp,coverage:.7,dark:this.$store.state.isDarkMode,data:this.requests,extrude:this.extrudeTowers,highlights:this.highlightedTrips,mapIsIndependent:this.vizDetails.mapIsIndependent||!1,maxHeight:this.vizDetails.maxHeight,metric:this.buttonLabel,radius:this.vizDetails.radius,selectedHexStats:this.hexStats,upperPercentile:100,bgLayers:this.backgroundLayers,onClick:this.handleClick}},textColor(){const o={text:"#3498db",bg:"#eeeef480"},t={text:"white",bg:"#181518aa"};return this.$store.state.colorScheme===J.DarkMode?t:o}},watch:{extrudeTowers(){this.extrudeTowers&&this.globalState.viewState.pitch==0&&b.commit("setMapCamera",Object.assign({},this.globalState.viewState,{pitch:10}))}},methods:{handleClick(o,t){o.layer?this.handleHexClick(o,t):this.handleEmptyClick()},handleEmptyClick(){this.flipViewToShowInvertedData({})},handleHexClick(o,t){if(!t.srcEvent.shiftKey){this.multiSelectedHexagons={},this.hexStats=null,this.flipViewToShowInvertedData(o);return}const e=o?.object?.index;e!==void 0&&(e in this.multiSelectedHexagons?delete this.multiSelectedHexagons[e]:this.multiSelectedHexagons[e]=o.object.points,this.hexStats=this.selectedHexagonStatistics())},flipViewToShowInvertedData(o){this.isHighlightingZone?this.isHighlightingZone=!1:this.isHighlightingZone=!!o.object;const t=this.activeAggregation.split("~");if(!this.isHighlightingZone){this.hexStats=null,this.multiSelectedHexagons={},this.handleOrigDest(t[0],parseInt(t[1])),this.highlightedTrips=[];return}let e=this.aggNumber+(this.aggNumber%2?-1:1);const i=[];for(const s of o.object.pointIndices){const n=s*2,a=[this.requests[this.currentGroup].positions[e][n],this.requests[this.currentGroup].positions[e][n+1]],r=[this.requests[this.currentGroup].positions[this.aggNumber][n],this.requests[this.currentGroup].positions[this.aggNumber][n+1]];i.push([a,r]),this.highlightedTrips=i}this.hexStats&&(this.hexStats.selectedHexagonIds=[]),this.multiSelectedHexagons={},this.colorRamp=this.colorRamps[e]},handleOrigDest(o,t){this.currentGroup=o,this.aggNumber=t,this.hexStats=null,this.multiSelectedHexagons={},this.highlightedTrips=[],this.activeAggregation=`${o}~${t}`,this.colorRamp=this.colorRamps[t]},async getVizDetails(){if(this.config){this.validateYAML(),this.vizDetails=Object.assign({},this.config),this.setRadiusAndHeight();return}new RegExp(".*(yml|yaml)$").test(this.myState.yamlConfig)?await this.loadStandaloneYAMLConfig():await this.loadOutputTripsConfig()},fetchXML(o){let t=o.worker;t.onmessage=s=>{const{resolve:n,reject:a}=this.resolvers[s.data.id];t.terminate(),s.data.error&&a(s.data.error),n(s.data.xml)};const e=this.resolverId++;return t.postMessage({id:e,fileSystem:this.fileSystem,filePath:o.filePath,options:o.options}),new Promise((s,n)=>{this.resolvers[e]={resolve:s,reject:n}})},async figureOutProjection(){const{files:o}=await this.fileApi.getDirectory(this.myState.subfolder),t=o.filter(e=>e.indexOf(".output_config.xml")>-1||e.indexOf(".output_config_reduced.xml")>-1);if(t.length&&this.fileSystem)for(const e of t)try{return(await this.fetchXML({worker:this._xmlConfigFetcher,slug:this.fileSystem.slug,filePath:this.myState.subfolder+"/"+e})).config.module.filter(r=>r.$name==="global")[0].param.filter(r=>r.$name==="coordinateSystem")[0].$value}catch{console.warn("Failed parsing",e)}},async loadOutputTripsConfig(){let o=await this.figureOutProjection();!this.myState.thumbnail&&!o&&(o=prompt('Enter projection: e.g. "EPSG:31468"')||"EPSG:31468",parseInt(o,10)&&(o="EPSG:"+o)),this.vizDetails={title:"Output Trips",description:this.myState.yamlConfig,file:this.myState.yamlConfig,projection:o,aggregations:{"Trip Summary":[{title:"Origins",x:"start_x",y:"start_y"},{title:"Destinations",x:"end_x",y:"end_y"}]},radius:this.vizDetails.radius,maxHeight:this.vizDetails.maxHeight,center:this.vizDetails.center,zoom:this.vizDetails.zoom},this.$emit("title",this.vizDetails.title)},setRadiusAndHeight(){this.vizDetails.radius||_.set(this.vizDetails,"radius",250),this.vizDetails.maxHeight||_.set(this.vizDetails,"maxHeight",0)},async loadStandaloneYAMLConfig(){try{const o=this.myState.yamlConfig.indexOf("/")>-1?this.myState.yamlConfig:this.myState.subfolder+"/"+this.myState.yamlConfig,t=await this.fileApi.getFileText(o);this.standaloneYAMLconfig=Object.assign({},et.parse(t)),this.validateYAML(),this.setVizDetails()}catch(o){console.error("failed",""+o),this.$emit("error",`File not found: ${this.myState.subfolder}/${this.myState.yamlConfig}`)}},validateYAML(){const o=new RegExp(".*(yml|yaml)$").test(this.myState.yamlConfig);let t={};o?(console.log("has yaml"),t=this.standaloneYAMLconfig):(console.log("no yaml"),t=this.config);for(const e in this.YAMLrequirementsXY)e in t||this.$emit("error",{type:v.ERROR,msg:`XYHexagon: ${this.yamlConfig}: missing required key: ${e}`,desc:`XYHexagon requires ${Object.keys(this.YAMLrequirementsXY)}`});t.radius==0&&this.$emit("error",{type:v.WARNING,msg:"Radius set to zero",desc:"Radius can not be zero, preset value used instead. "}),(t.zoom<5||t.zoom>20)&&this.$emit("error",{type:v.WARNING,msg:"Zoom is out of the recommended range ",desc:"Zoom levels should be between 5 and 20. "})},setVizDetails(){this.vizDetails=Object.assign({},this.vizDetails,this.standaloneYAMLconfig),this.setRadiusAndHeight();const o=this.vizDetails.title?this.vizDetails.title:"Hex Aggregation";this.$emit("title",o)},handleShowSelectionButton(){const o=Object.values(this.multiSelectedHexagons);let t=[];o.map(i=>t=t.concat(i));const e={object:{points:t}};this.flipViewToShowInvertedData(e)},selectedHexagonStatistics(){const o=Object.keys(this.multiSelectedHexagons).map(i=>parseInt(i));return o.length?{rows:Object.values(this.multiSelectedHexagons).reduce((i,s)=>i+s.length,0),numHexagons:o.length,selectedHexagonIds:o}:null},setMapCenter(){if(this.vizDetails.center){typeof this.vizDetails.center=="string"&&(this.vizDetails.center=this.vizDetails.center.split(",").map(Number));const l={center:this.vizDetails.center,zoom:this.vizDetails.zoom||10,bearing:0,pitch:0};this.$store.commit("setMapCamera",Object.assign({},l));return}const o=Object.keys(this.requests);if(!o.length)return;const t=this.requests[o[0]].positions[0];let e=0,i=0,s=0;const n=t.length/2,a=512;for(let l=0;l<n;l+=a)i+=t[l*2],s+=t[l*2+1],e++;i=i/e,s=s/e;const r=this.$store.state.viewState;i&&s&&this.$store.commit("setMapCamera",{longitude:i,latitude:s,bearing:r.bearing,pitch:r.pitch,zoom:this.vizDetails.zoom||r.zoom,jump:!1})},async parseCSVFile(o){this.myState.statusMessage="Loading file...";let t=new yt;t.onmessage=async e=>{if(e.data.ready){t.postMessage({filepath:o,fileSystem:this.fileSystem,aggregations:this.vizDetails.aggregations,projection:this.vizDetails.projection});return}if(e.data.status)this.myState.statusMessage=e.data.status;else if(e.data.projection)console.log("dataset has a #EPSG:projection, using it",e.data.projection),this.vizDetails.projection=e.data.projection;else if(e.data.error)this.myState.statusMessage=e.data.error,this.$emit("error",{type:v.ERROR,msg:`Error loading: ${this.myState.subfolder}/${this.vizDetails.file}`});else{const{fullRowCache:i}=e.data;this.gzipWorker?.terminate(),this.dataIsLoaded({fullRowCache:i})}},this.gzipWorker=t},dataIsLoaded({fullRowCache:o}){this.requests=o,this.setMapCenter(),this.myState.statusMessage="",this.isLoaded=!0},async loadFiles(){let o=[];if(!this.fileApi)return{dataArray:o};try{let t=`${this.myState.subfolder}/${this.vizDetails.file}`;await this.parseCSVFile(t)}catch(t){console.error(t),this.myState.statusMessage=""+t,this.$emit("error",`Loading/parsing: ${this.myState.subfolder}/${this.vizDetails.file}`)}}},async mounted(){this.$store.commit("setFullScreen",!this.thumbnail),this.myState.thumbnail=this.thumbnail,this.myState.yamlConfig=this.yamlConfig||"",this.myState.subfolder=this.subfolder,this._xmlConfigFetcher=new bt,await this.getVizDetails(),this.myState.statusMessage=`${this.$i18n.t("loading")}`,this.aggregations=this.vizDetails.aggregations,await this.loadFiles();try{this.backgroundLayers=new vt({vizDetails:this.vizDetails,fileApi:this.fileApi,subfolder:this.subfolder}),await this.backgroundLayers.initialLoad()}catch{this.$emit("error","Error loading background layers")}this.handleOrigDest(Object.keys(this.aggregations)[0],0)},beforeDestroy(){this._xmlConfigFetcher&&this._xmlConfigFetcher.terminate(),this.resizer?.disconnect();try{this.gzipWorker&&this.gzipWorker.terminate()}catch(o){console.warn(o)}this.$store.commit("setFullScreen",!1)}});var de=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"xy-hexagons",attrs:{oncontextmenu:"return false",id:`id-${t.id}`}},[t.isLoaded?e("xy-hex-deck-map",t._b({staticClass:"hex-layer"},"xy-hex-deck-map",t.mapProps,!1)):t._e(),t.thumbnail?t._e():e("zoom-buttons"),t.isLoaded&&!t.thumbnail&&t.vizDetails.title?e("div",{staticClass:"left-side"},[e("collapsible-panel",{attrs:{direction:"left",locked:!0}},[t.hexStats?e("div",{staticClass:"panel-items",staticStyle:{color:"#c0f"}},[e("p",{staticClass:"big",staticStyle:{"margin-top":"2rem"}},[t._v(t._s(t.$t("selection"))+":")]),e("h3",{staticStyle:{"margin-top":"-1rem"}},[t._v(t._s(t.$t("areas"))+": "+t._s(t.hexStats.numHexagons)+", "+t._s(t.$t("count"))+": "+t._s(t.hexStats.rows))]),e("button",{staticClass:"button",staticStyle:{color:"#c0f","border-color":"#c0f"},on:{click:t.handleShowSelectionButton}},[t._v(t._s(t.$t("showDetails")))])]):t._e()])],1):t._e(),t.isLoaded&&!t.thumbnail&&!t.myState.statusMessage?e("div",{staticClass:"control-panel",attrs:{"data-testid":"xy-hexagons-control-panel"}},[t._l(Object.keys(t.aggregations),function(i){return e("div",{key:i,staticClass:"panel-item"},[e("p",{staticClass:"ui-label"},[t._v(t._s(i))]),t._l(t.aggregations[i],function(s,n){return e("button",{key:n,staticClass:"button is-small aggregation-button",style:{"margin-bottom":"0.25rem",color:t.activeAggregation===`${i}~${n}`?"white":t.buttonColors[n],border:`1px solid ${t.buttonColors[n]}`,"border-right":`0.4rem solid ${t.buttonColors[n]}`,"border-radius":"4px","background-color":t.activeAggregation===`${i}~${n}`?t.buttonColors[n]:t.$store.state.isDarkMode?"#333":"white"},on:{click:function(a){return t.handleOrigDest(i,n)}}},[t._v(t._s(s.title))])})],2)}),e("div",{staticClass:"panel-item"},[e("p",{staticClass:"ui-label"},[t._v(t._s(t.$t("maxHeight"))+": "+t._s(t.vizDetails.maxHeight))]),e("b-slider",{staticClass:"ui-slider",attrs:{size:"is-small",min:0,max:250,step:5,duration:0,dotSize:12,tooltip:!1},model:{value:t.vizDetails.maxHeight,callback:function(i){t.$set(t.vizDetails,"maxHeight",i)},expression:"vizDetails.maxHeight"}}),e("p",{staticClass:"ui-label"},[t._v("Hex Radius: "+t._s(t.vizDetails.radius))]),e("b-slider",{staticClass:"ui-slider",attrs:{size:"is-small",min:50,max:1e3,step:5,duration:0,dotSize:12,tooltip:!1},model:{value:t.vizDetails.radius,callback:function(i){t.$set(t.vizDetails,"radius",i)},expression:"vizDetails.radius"}})],1)],2):t._e(),!t.thumbnail&&t.myState.statusMessage?e("div",{staticClass:"message"},[e("p",{staticClass:"status-message"},[t._v(t._s(t.myState.statusMessage))])]):t._e()],1)},me=[],fe=B(ge,de,me,!1,null,"0d8d2074");const $e=fe.exports;export{$e as default};
