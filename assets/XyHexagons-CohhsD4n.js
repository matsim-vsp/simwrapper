import{o as e,r as t}from"./rolldown-runtime-DAXXjFlN.js";import{A as n,At as r,B as i,Dt as a,J as o,L as s,M as c,N as l,O as u,T as d,V as f,X as p,_ as m,b as h,et as g,f as _,j as v,n as y,o as b,pt as x,q as S,r as ee,tt as te,z as C}from"./index-CXcVv0t8.js";import{D as ne,a as re,h as ie,i as ae,m as oe,mt as w,t as T,u as E,y as se}from"./mapbox-overlay-KuXvUc6L.js";import{d as D,t as ce}from"./HTTPFileSystem-zt3PPoH7.js";import{t as le}from"./browser-b9A4JHjE.js";import{u as ue}from"./geojson-layer-D3rMABvN.js";import{t as de}from"./column-layer-D7JPHKmp.js";import{t as fe}from"./arc-layer-Da0479gJ.js";import{n as O,t as pe}from"./threeDBuildings-D1kB-uGK.js";import{t as me}from"./ZoomButtons-4dmUkLMi.js";import{t as he}from"./BackgroundLayers-CZOYhB2j.js";import{t as ge}from"./DrawingTool-CwvZ91GA.js";import{t as _e}from"./colormap-yLbo6zHs.js";import{t as ve}from"./NewXmlFetcher.worker-CdzcoOnA.js";import{t as ye}from"./CollapsiblePanel-DBd8C8AS.js";function be(e){return new Worker(`/simwrapper/assets/CsvGzipParser.worker-Dcb8Yp_r.js`,{name:e?.name})}function k({pointCount:e,getBinId:t}){let n=new Map;for(let r=0;r<e;r++){let e=t(r);if(e===null)continue;let i=n.get(String(e));i?i.points.push(r):(i={id:e,index:n.size,points:[r]},n.set(String(e),i))}return Array.from(n.values())}function A({bins:e,dimensions:t,target:n}){let r=e.length*t;(!n||n.length<r)&&(n=new Float32Array(r));for(let r=0;r<e.length;r++){let{id:i}=e[r];Array.isArray(i)?n.set(i,r*t):n[r]=i}return n}var j=e=>e.length,M=(e,t)=>{let n=0;for(let r of e)n+=t(r);return n},N={COUNT:j,SUM:M,MEAN:(e,t)=>e.length===0?NaN:M(e,t)/e.length,MIN:(e,t)=>{let n=1/0;for(let r of e){let e=t(r);e<n&&(n=e)}return n},MAX:(e,t)=>{let n=-1/0;for(let r of e){let e=t(r);e>n&&(n=e)}return n}};function xe({bins:e,getValue:t,operation:n,target:r}){(!r||r.length<e.length)&&(r=new Float32Array(e.length));let i=1/0,a=-1/0;for(let o=0;o<e.length;o++){let{points:s}=e[o];r[o]=n(s,t),r[o]<i&&(i=r[o]),r[o]>a&&(a=r[o])}return{value:r,domain:[i,a]}}function P(e,t,n){let r={};for(let n of e.sources||[]){let e=t[n];if(e)r[n]=Se(e);else throw Error(`Cannot find attribute ${n}`)}let i={};return t=>{for(let e in r)i[e]=r[e](t);return e.getValue(i,t,n)}}function Se(e){let t=e.value,{offset:n=0,stride:r,size:i}=e.getAccessor(),a=t.BYTES_PER_ELEMENT,o=n/a,s=r?r/a:i;if(i===1)return e.isConstant?()=>t[0]:e=>{let n=o+s*e;return t[n]};let c;return e.isConstant?(c=Array.from(t),()=>c):(c=Array(i),e=>{let n=o+s*e;for(let e=0;e<i;e++)c[e]=t[n+e];return c})}var Ce=class{constructor(e){this.bins=[],this.binIds=null,this.results=[],this.dimensions=e.dimensions,this.channelCount=e.getValue.length,this.props={...e,binOptions:{},pointCount:0,operations:[],customOperations:[],attributes:{}},this.needsUpdate=!0,this.setProps(e)}destroy(){}get binCount(){return this.bins.length}setProps(e){let t=this.props;if(e.binOptions&&(E(e.binOptions,t.binOptions,2)||this.setNeedsUpdate()),e.operations)for(let n=0;n<this.channelCount;n++)e.operations[n]!==t.operations[n]&&this.setNeedsUpdate(n);if(e.customOperations)for(let n=0;n<this.channelCount;n++)!!e.customOperations[n]!=!!t.customOperations[n]&&this.setNeedsUpdate(n);e.pointCount!==void 0&&e.pointCount!==t.pointCount&&this.setNeedsUpdate(),e.attributes&&={...t.attributes,...e.attributes},Object.assign(this.props,e)}setNeedsUpdate(e){e===void 0?this.needsUpdate=!0:this.needsUpdate!==!0&&(this.needsUpdate=this.needsUpdate||[],this.needsUpdate[e]=!0)}update(){if(this.needsUpdate===!0){this.bins=k({pointCount:this.props.pointCount,getBinId:P(this.props.getBin,this.props.attributes,this.props.binOptions)});let e=A({bins:this.bins,dimensions:this.dimensions,target:this.binIds?.value});this.binIds={value:e,type:`float32`,size:this.dimensions}}for(let e=0;e<this.channelCount;e++)if(this.needsUpdate===!0||this.needsUpdate[e]){let t=this.props.customOperations[e]||N[this.props.operations[e]],{value:n,domain:r}=xe({bins:this.bins,getValue:P(this.props.getValue[e],this.props.attributes,void 0),operation:t,target:this.results[e]?.value});this.results[e]={value:n,domain:r,type:`float32`,size:1},this.props.onUpdate?.({channel:e})}this.needsUpdate=!1}preDraw(){}getBins(){return this.binIds}getResult(e){return this.results[e]}getResultDomain(e){return this.results[e]?.domain??[1/0,-1/0]}getBin(e){let t=this.bins[e];if(!t)return null;let n=Array(this.channelCount);for(let t=0;t<n.length;t++)n[t]=this.results[t]?.value[e];return{id:t.id,value:n,count:t.points.length,pointIndices:t.points}}};function F(e,t,n){return e.createFramebuffer({width:t,height:n,colorAttachments:[e.createTexture({width:t,height:n,format:`rgba32float`,sampler:{minFilter:`nearest`,magFilter:`nearest`}})]})}var we={name:`binSorter`,vs:`uniform binSorterUniforms {
  ivec4 binIdRange;
  ivec2 targetSize;
} binSorter;
`,uniformTypes:{binIdRange:`vec4<i32>`,targetSize:`vec2<i32>`}},I=[1,2,4,8],Te=3e38,Ee={SUM:0,MEAN:0,MIN:0,MAX:0,COUNT:0},L=1024,De=class{constructor(e,t){this.binsFBO=null,this.device=e,this.model=ke(e,t)}get texture(){return this.binsFBO?this.binsFBO.colorAttachments[0].texture:null}destroy(){this.model.destroy(),this.binsFBO?.colorAttachments[0].texture.destroy(),this.binsFBO?.destroy()}getBinValues(e){if(!this.binsFBO)return null;let t=e%L,n=Math.floor(e/L),r=this.device.readPixelsToArrayWebGL(this.binsFBO,{sourceX:t,sourceY:n,sourceWidth:1,sourceHeight:1}).buffer;return new Float32Array(r)}setDimensions(e,t){let n=L,r=Math.ceil(e/n);this.binsFBO?this.binsFBO.height<r&&this.binsFBO.resize({width:n,height:r}):this.binsFBO=F(this.device,n,r);let i={binIdRange:[t[0][0],t[0][1],t[1]?.[0]||0,t[1]?.[1]||0],targetSize:[this.binsFBO.width,this.binsFBO.height]};this.model.shaderInputs.setProps({binSorter:i})}setModelProps(e){let t=this.model;e.attributes&&t.setAttributes(e.attributes),e.constantAttributes&&t.setConstantAttributes(e.constantAttributes),e.vertexCount!==void 0&&t.setVertexCount(e.vertexCount),e.shaderModuleProps&&t.shaderInputs.setProps(e.shaderModuleProps)}update(e){if(!this.binsFBO)return;let t=Oe(e);this._updateBins(`SUM`,t.SUM+t.MEAN),this._updateBins(`MIN`,t.MIN),this._updateBins(`MAX`,t.MAX)}_updateBins(e,t){if(t===0)return;t|=I[3];let n=this.model,r=this.binsFBO,i=e===`MAX`?-3e38:e===`MIN`?Te:0,a=this.device.beginRenderPass({id:`gpu-aggregation-${e}`,framebuffer:r,parameters:{viewport:[0,0,r.width,r.height],colorMask:t},clearColor:[i,i,i,0],clearDepth:!1,clearStencil:!1});n.setParameters({blend:!0,blendColorSrcFactor:`one`,blendColorDstFactor:`one`,blendAlphaSrcFactor:`one`,blendAlphaDstFactor:`one`,blendColorOperation:e===`MAX`?`max`:e===`MIN`?`min`:`add`,blendAlphaOperation:`add`}),n.draw(a),a.end()}};function Oe(e){let t={...Ee};for(let n=0;n<e.length;n++){let r=e[n];r&&(t[r]+=I[n])}return t}function ke(e,t){let n=t.vs;t.dimensions===2&&(n+=`
void getBin(out int binId) {
  ivec2 binId2;
  getBin(binId2);
  if (binId2.x < binSorter.binIdRange.x || binId2.x >= binSorter.binIdRange.y) {
    binId = -1;
  } else {
    binId = (binId2.y - binSorter.binIdRange.z) * (binSorter.binIdRange.y - binSorter.binIdRange.x) + binId2.x;
  }
}
`);let r=`\
#version 300 es
#define SHADER_NAME gpu-aggregation-sort-bins-vertex

${n}

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
`;return new ie(e,{bufferLayout:t.bufferLayout,modules:[...t.modules||[],we],defines:{...t.defines,NON_INSTANCED_MODEL:1,NUM_CHANNELS:t.channelCount},isInstanced:!1,vs:r,fs:`#version 300 es
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
`,topology:`point-list`,disableWarnings:!0})}var Ae={name:`aggregatorTransform`,vs:`uniform aggregatorTransformUniforms {
  ivec4 binIdRange;
  bvec3 isCount;
  bvec3 isMean;
  float naN;
} aggregatorTransform;
`,uniformTypes:{binIdRange:`vec4<i32>`,isCount:`vec3<f32>`,isMean:`vec3<f32>`}},je=class{constructor(e,t){this.binBuffer=null,this.valueBuffer=null,this._domains=null,this.device=e,this.channelCount=t.channelCount,this.transform=Me(e,t),this.domainFBO=F(e,2,1)}destroy(){this.transform.destroy(),this.binBuffer?.destroy(),this.valueBuffer?.destroy(),this.domainFBO.colorAttachments[0].texture.destroy(),this.domainFBO.destroy()}get domains(){if(!this._domains){let e=this.device.readPixelsToArrayWebGL(this.domainFBO).buffer,t=new Float32Array(e);this._domains=[[-t[4],t[0]],[-t[5],t[1]],[-t[6],t[2]]].slice(0,this.channelCount)}return this._domains}setDimensions(e,t){let{model:n,transformFeedback:r}=this.transform;n.setVertexCount(e);let i={binIdRange:[t[0][0],t[0][1],t[1]?.[0]||0,t[1]?.[1]||0]};n.shaderInputs.setProps({aggregatorTransform:i});let a=e*t.length*4;(!this.binBuffer||this.binBuffer.byteLength<a)&&(this.binBuffer?.destroy(),this.binBuffer=this.device.createBuffer({byteLength:a}),r.setBuffer(`binIds`,this.binBuffer));let o=e*this.channelCount*4;(!this.valueBuffer||this.valueBuffer.byteLength<o)&&(this.valueBuffer?.destroy(),this.valueBuffer=this.device.createBuffer({byteLength:o}),r.setBuffer(`values`,this.valueBuffer))}update(e,t){if(!e)return;let n=this.transform,r=this.domainFBO,i={isCount:[0,1,2].map(e=>+(t[e]===`COUNT`)),isMean:[0,1,2].map(e=>+(t[e]===`MEAN`)),bins:e};n.model.shaderInputs.setProps({aggregatorTransform:i}),n.run({id:`gpu-aggregation-domain`,framebuffer:r,parameters:{viewport:[0,0,2,1]},clearColor:[-3e38,-3e38,-3e38,0],clearDepth:!1,clearStencil:!1}),this._domains=null}};function Me(e,t){return new oe(e,{vs:`#version 300 es
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
`,fs:`#version 300 es
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
`,topology:`point-list`,modules:[Ae],parameters:{blend:!0,blendColorSrcFactor:`one`,blendColorDstFactor:`one`,blendColorOperation:`max`,blendAlphaSrcFactor:`one`,blendAlphaDstFactor:`one`,blendAlphaOperation:`max`},defines:{NUM_DIMS:t.dimensions,NUM_CHANNELS:t.channelCount,SAMPLER_WIDTH:L},varyings:[`binIds`,`values`],disableWarnings:!0})}var R=class{static isSupported(e){return e.features.has(`float32-renderable-webgl`)&&e.features.has(`texture-blend-float-webgl`)}constructor(e,t){this.binCount=0,this.binIds=null,this.results=[],this.device=e,this.dimensions=t.dimensions,this.channelCount=t.channelCount,this.props={...t,pointCount:0,binIdRange:[[0,0]],operations:[],attributes:{},binOptions:{}},this.needsUpdate=Array(this.channelCount).fill(!0),this.binSorter=new De(e,t),this.aggregationTransform=new je(e,t),this.setProps(t)}getBins(){let e=this.aggregationTransform.binBuffer;return e?(this.binIds?.buffer!==e&&(this.binIds={buffer:e,type:`float32`,size:this.dimensions}),this.binIds):null}getResult(e){let t=this.aggregationTransform.valueBuffer;return!t||e>=this.channelCount?null:(this.results[e]?.buffer!==t&&(this.results[e]={buffer:t,type:`float32`,size:1,stride:this.channelCount*4,offset:e*4}),this.results[e])}getResultDomain(e){return this.aggregationTransform.domains[e]}getBin(e){if(e<0||e>=this.binCount)return null;let{binIdRange:t}=this.props,n;if(this.dimensions===1)n=[e+t[0][0]];else{let[[r,i],[a]]=t,o=i-r;n=[e%o+r,Math.floor(e/o)+a]}let r=this.binSorter.getBinValues(e);if(!r)return null;let i=r[3],a=[];for(let e=0;e<this.channelCount;e++){let t=this.props.operations[e];t===`COUNT`?a[e]=i:i===0?a[e]=NaN:a[e]=t===`MEAN`?r[e]/i:r[e]}return{id:n,value:a,count:i}}destroy(){this.binSorter.destroy(),this.aggregationTransform.destroy()}setProps(e){let t=this.props;if(`binIdRange`in e&&!E(e.binIdRange,t.binIdRange,2)){let t=e.binIdRange;if(w.assert(t.length===this.dimensions),this.dimensions===1){let[[e,n]]=t;this.binCount=n-e}else{let[[e,n],[r,i]]=t;this.binCount=(n-e)*(i-r)}this.binSorter.setDimensions(this.binCount,t),this.aggregationTransform.setDimensions(this.binCount,t),this.setNeedsUpdate()}if(e.operations)for(let n=0;n<this.channelCount;n++)e.operations[n]!==t.operations[n]&&this.setNeedsUpdate(n);if(e.pointCount!==void 0&&e.pointCount!==t.pointCount&&(this.binSorter.setModelProps({vertexCount:e.pointCount}),this.setNeedsUpdate()),e.binOptions&&(E(e.binOptions,t.binOptions,2)||this.setNeedsUpdate(),this.binSorter.model.shaderInputs.setProps({binOptions:e.binOptions})),e.attributes){let t={},n={};for(let r of Object.values(e.attributes))for(let[e,i]of Object.entries(r.getValue()))ArrayBuffer.isView(i)?n[e]=i:i&&(t[e]=i);this.binSorter.setModelProps({attributes:t,constantAttributes:n})}e.shaderModuleProps&&this.binSorter.setModelProps({shaderModuleProps:e.shaderModuleProps}),Object.assign(this.props,e)}setNeedsUpdate(e){e===void 0?this.needsUpdate.fill(!0):this.needsUpdate[e]=!0}update(){}preDraw(){if(!this.needsUpdate.some(Boolean))return;let{operations:e}=this.props,t=this.needsUpdate.map((t,n)=>t?e[n]:null);this.binSorter.update(t),this.aggregationTransform.update(this.binSorter.texture,e);for(let e=0;e<this.channelCount;e++)this.needsUpdate[e]&&(this.needsUpdate[e]=!1,this.props.onUpdate?.({channel:e}))}},z=class extends ue{get isDrawable(){return!0}initializeState(){this.getAttributeManager().remove([`instancePickingColors`])}updateState(e){super.updateState(e);let t=this.getAggregatorType();if(e.changeFlags.extensionsChanged||this.state.aggregatorType!==t){this.state.aggregator?.destroy();let e=this.createAggregator(t);return e.setProps({attributes:this.getAttributeManager()?.attributes}),this.setState({aggregator:e,aggregatorType:t}),!0}return!1}finalizeState(e){super.finalizeState(e),this.state.aggregator.destroy()}updateAttributes(e){let{aggregator:t}=this.state;t.setProps({attributes:e});for(let t in e)this.onAttributeChange(t);t.update()}draw({shaderModuleProps:e}){let{aggregator:t}=this.state;t.setProps({shaderModuleProps:e}),t.preDraw()}_getAttributeManager(){return new ae(this.context.device,{id:this.props.id,stats:this.context.stats})}};z.layerName=`AggregationLayer`;var Ne=[[255,255,178],[254,217,118],[254,178,76],[253,141,60],[240,59,32],[189,0,38]];function Pe(e,t=!1,n=Float32Array){let r;if(Number.isFinite(e[0]))r=new n(e);else{r=new n(e.length*4);let t=0;for(let n=0;n<e.length;n++){let i=e[n];r[t++]=i[0],r[t++]=i[1],r[t++]=i[2],r[t++]=Number.isFinite(i[3])?i[3]:255}}if(t)for(let e=0;e<r.length;e++)r[e]/=255;return r}var B={linear:`linear`,quantile:`nearest`,quantize:`nearest`,ordinal:`nearest`};function Fe(e,t){e.setSampler({minFilter:B[t],magFilter:B[t]})}function Ie(e,t,n=`linear`){let r=Pe(t,!1,Uint8Array);return e.createTexture({format:`rgba8unorm`,sampler:{minFilter:B[n],magFilter:B[n],addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`},data:r,width:r.length/4,height:1})}var V=class{constructor(e,t){this.props={scaleType:`linear`,lowerPercentile:0,upperPercentile:100},this.domain=null,this.cutoff=null,this.input=e,this.inputLength=t,this.attribute=e}getScalePercentile(){if(!this._percentile){let e=H(this.input,this.inputLength);this._percentile=Re(e)}return this._percentile}getScaleOrdinal(){if(!this._ordinal){let e=H(this.input,this.inputLength);this._ordinal=Le(e)}return this._ordinal}getCutoff({scaleType:e,lowerPercentile:t,upperPercentile:n}){if(e===`quantile`)return[t,n-1];if(t>0||n<100){let{domain:r}=this.getScalePercentile(),i=r[Math.floor(t)-1]??-1/0,a=r[Math.floor(n)-1]??1/0;if(e===`ordinal`){let{domain:e}=this.getScaleOrdinal();i=e.findIndex(e=>e>=i),a=e.findIndex(e=>e>a)-1,a===-2&&(a=e.length-1)}return[i,a]}return null}update(e){let t=this.props;if(e.scaleType!==t.scaleType)switch(e.scaleType){case`quantile`:{let{attribute:e}=this.getScalePercentile();this.attribute=e,this.domain=[0,99];break}case`ordinal`:{let{attribute:e,domain:t}=this.getScaleOrdinal();this.attribute=e,this.domain=[0,t.length-1];break}default:this.attribute=this.input,this.domain=null}return(e.scaleType!==t.scaleType||e.lowerPercentile!==t.lowerPercentile||e.upperPercentile!==t.upperPercentile)&&(this.cutoff=this.getCutoff(e)),this.props=e,this}};function Le(e){let t=new Set;for(let n of e)Number.isFinite(n)&&t.add(n);let n=Array.from(t).sort(),r=new Map;for(let e=0;e<n.length;e++)r.set(n[e],e);return{attribute:{value:e.map(e=>Number.isFinite(e)?r.get(e):NaN),type:`float32`,size:1},domain:n}}function Re(e,t=100){let n=Array.from(e).filter(Number.isFinite).sort(ze),r=0,i=Math.max(1,t),a=Array(i-1);for(;++r<i;)a[r-1]=Be(n,r/i);return{attribute:{value:e.map(e=>Number.isFinite(e)?U(a,e):NaN),type:`float32`,size:1},domain:a}}function H(e,t){let n=(e.stride??4)/4,r=(e.offset??0)/4,i=e.value;if(!i){let r=e.buffer?.readSyncWebGL(0,n*4*t);r&&(i=new Float32Array(r.buffer),e.value=i)}if(n===1)return i.subarray(0,t);let a=new Float32Array(t);for(let e=0;e<t;e++)a[e]=i[e*n+r];return a}function ze(e,t){return e-t}function Be(e,t){let n=e.length;if(t<=0||n<2)return e[0];if(t>=1)return e[n-1];let r=(n-1)*t,i=Math.floor(r),a=e[i];return a+(e[i+1]-a)*(r-i)}function U(e,t){let n=0,r=e.length;for(;n<r;){let i=n+r>>>1;e[i]>t?r=i:n=i+1}return n}function Ve({dataBounds:e,getBinId:t,padding:n=0}){let r=[e[0],e[1],[e[0][0],e[1][1]],[e[1][0],e[0][1]]].map(e=>t(e)),i=Math.min(...r.map(e=>e[0]))-n,a=Math.min(...r.map(e=>e[1]))-n,o=Math.max(...r.map(e=>e[0]))+n+1,s=Math.max(...r.map(e=>e[1]))+n+1;return[[i,o],[a,s]]}var W=Math.PI/3,G=2*Math.sin(W),K=1.5,He=Array.from({length:6},(e,t)=>{let n=t*W;return[Math.sin(n),-Math.cos(n)]});function q([e,t],n){let r=Math.round(t=t/n/K),i=Math.round(e=e/n/G-(r&1)/2),a=t-r;if(Math.abs(a)*3>1){let n=e-i,o=i+(e<i?-1:1)/2,s=r+(t<r?-1:1),c=e-o,l=t-s;n*n+a*a>c*c+l*l&&(i=o+(r&1?1:-1)/2,r=s)}return[i,r]}var Ue=`
const vec2 DIST = vec2(${G}, ${K});

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
`;function J([e,t],n){return[(e+(t&1)/2)*n*G,t*n*K]}var We=`\
#version 300 es
#define SHADER_NAME hexagon-cell-layer-vertex-shader
in vec3 positions;
in vec3 normals;
in vec2 instancePositions;
in float instanceElevationValues;
in float instanceColorValues;
in vec3 instancePickingColors;
uniform sampler2D colorRange;
out vec4 vColor;
${`
const vec2 DIST = vec2(${G}, ${K});

vec2 hexbinCentroid(vec2 binId, float radius) {
  binId.x += fract(binId.y * 0.5);
  return binId * DIST * radius;
}
`}
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
`,Ge={name:`hexagon`,vs:`uniform hexagonUniforms {
  vec4 colorDomain;
  vec4 elevationDomain;
  vec2 elevationRange;
  vec2 originCommon;
} hexagon;
`,uniformTypes:{colorDomain:`vec4<f32>`,elevationDomain:`vec4<f32>`,elevationRange:`vec2<f32>`,originCommon:`vec2<f32>`}},Y=class extends de{getShaders(){let e=super.getShaders();return e.modules.push(Ge),{...e,vs:We}}initializeState(){super.initializeState();let e=this.getAttributeManager();e.remove([`instanceElevations`,`instanceFillColors`,`instanceLineColors`,`instanceStrokeWidths`]),e.addInstanced({instancePositions:{size:2,type:`float32`,accessor:`getBin`},instanceColorValues:{size:1,type:`float32`,accessor:`getColorValue`},instanceElevationValues:{size:1,type:`float32`,accessor:`getElevationValue`}})}updateState(e){super.updateState(e);let{props:t,oldProps:n}=e,r=this.state.fillModel;if(n.colorRange!==t.colorRange){this.state.colorTexture?.destroy(),this.state.colorTexture=Ie(this.context.device,t.colorRange,t.colorScaleType);let e={colorRange:this.state.colorTexture};r.shaderInputs.setProps({hexagon:e})}else n.colorScaleType!==t.colorScaleType&&Fe(this.state.colorTexture,t.colorScaleType)}finalizeState(e){super.finalizeState(e),this.state.colorTexture?.destroy()}draw({uniforms:e}){let{radius:t,hexOriginCommon:n,elevationRange:r,elevationScale:i,extruded:a,coverage:o,colorDomain:s,elevationDomain:c}=this.props,l=this.props.colorCutoff||[-1/0,1/0],u=this.props.elevationCutoff||[-1/0,1/0],d=this.state.fillModel;d.vertexArray.indexBuffer&&d.setIndexBuffer(null),d.setVertexCount(this.state.fillVertexCount);let f={colorDomain:[Math.max(s[0],l[0]),Math.min(s[1],l[1]),Math.max(s[0]-1,l[0]),Math.min(s[1]+1,l[1])],elevationDomain:[Math.max(c[0],u[0]),Math.min(c[1],u[1]),Math.max(c[0]-1,u[0]),Math.min(c[1]+1,u[1])],elevationRange:[r[0]*i,r[1]*i],originCommon:n};d.shaderInputs.setProps({column:{extruded:a,coverage:o,radius:t},hexagon:f}),d.draw(this.context.renderPass)}};Y.layerName=`HexagonCellLayer`;var Ke={name:`binOptions`,vs:`uniform binOptionsUniforms {
  vec2 hexOriginCommon;
  float radiusCommon;
} binOptions;
`,uniformTypes:{hexOriginCommon:`vec2<f32>`,radiusCommon:`f32`}};function X(){}var qe={gpuAggregation:!0,colorDomain:null,colorRange:Ne,getColorValue:{type:`accessor`,value:null},getColorWeight:{type:`accessor`,value:1},colorAggregation:`SUM`,lowerPercentile:{type:`number`,min:0,max:100,value:0},upperPercentile:{type:`number`,min:0,max:100,value:100},colorScaleType:`quantize`,onSetColorDomain:X,elevationDomain:null,elevationRange:[0,1e3],getElevationValue:{type:`accessor`,value:null},getElevationWeight:{type:`accessor`,value:1},elevationAggregation:`SUM`,elevationScale:{type:`number`,min:0,value:1},elevationLowerPercentile:{type:`number`,min:0,max:100,value:0},elevationUpperPercentile:{type:`number`,min:0,max:100,value:100},elevationScaleType:`linear`,onSetElevationDomain:X,radius:{type:`number`,min:1,value:1e3},coverage:{type:`number`,min:0,max:1,value:1},getPosition:{type:`accessor`,value:e=>e.position},hexagonAggregator:{type:`function`,optional:!0,value:null},extruded:!1,material:!0},Z=class extends z{getAggregatorType(){let{gpuAggregation:e,hexagonAggregator:t,getColorValue:n,getElevationValue:r}=this.props;return e&&(t||n||r)?(w.warn(`Features not supported by GPU aggregation, falling back to CPU`)(),`cpu`):e&&R.isSupported(this.context.device)?`gpu`:`cpu`}createAggregator(e){if(e===`cpu`){let{hexagonAggregator:e,radius:t}=this.props;return new Ce({dimensions:2,getBin:{sources:[`positions`],getValue:({positions:n},r,i)=>{if(e)return e(n,t);let a=this.state.aggregatorViewport.projectPosition(n),{radiusCommon:o,hexOriginCommon:s}=i;return q([a[0]-s[0],a[1]-s[1]],o)}},getValue:[{sources:[`colorWeights`],getValue:({colorWeights:e})=>e},{sources:[`elevationWeights`],getValue:({elevationWeights:e})=>e}]})}return new R(this.context.device,{dimensions:2,channelCount:2,bufferLayout:this.getAttributeManager().getBufferLayouts({isInstanced:!1}),...super.getShaders({modules:[ne,Ke],vs:`
  in vec3 positions;
  in vec3 positions64Low;
  in float colorWeights;
  in float elevationWeights;
  
  ${Ue}

  void getBin(out ivec2 binId) {
    vec3 positionCommon = project_position(positions, positions64Low);
    binId = pointToHexbin(positionCommon.xy, binOptions.radiusCommon);
  }
  void getValue(out vec2 value) {
    value = vec2(colorWeights, elevationWeights);
  }
  `})})}initializeState(){super.initializeState(),this.getAttributeManager().add({positions:{size:3,accessor:`getPosition`,type:`float64`,fp64:this.use64bitPositions()},colorWeights:{size:1,accessor:`getColorWeight`},elevationWeights:{size:1,accessor:`getElevationWeight`}})}updateState(e){let t=super.updateState(e),{props:n,oldProps:r,changeFlags:i}=e,{aggregator:a}=this.state;if((i.dataChanged||!this.state.dataAsArray)&&(n.getColorValue||n.getElevationValue)&&(this.state.dataAsArray=Array.from(re(n.data).iterable)),t||i.dataChanged||n.radius!==r.radius||n.getColorValue!==r.getColorValue||n.getElevationValue!==r.getElevationValue||n.colorAggregation!==r.colorAggregation||n.elevationAggregation!==r.elevationAggregation){this._updateBinOptions();let{radiusCommon:e,hexOriginCommon:t,binIdRange:r,dataAsArray:i}=this.state;if(a.setProps({binIdRange:r,pointCount:this.getNumInstances(),operations:[n.colorAggregation,n.elevationAggregation],binOptions:{radiusCommon:e,hexOriginCommon:t},onUpdate:this._onAggregationUpdate.bind(this)}),i){let{getColorValue:e,getElevationValue:t}=this.props;a.setProps({customOperations:[e&&(t=>e(t.map(e=>i[e]),{indices:t,data:n.data})),t&&(e=>t(e.map(e=>i[e]),{indices:e,data:n.data}))]})}}return i.updateTriggersChanged&&i.updateTriggersChanged.getColorValue&&a.setNeedsUpdate(0),i.updateTriggersChanged&&i.updateTriggersChanged.getElevationValue&&a.setNeedsUpdate(1),t}_updateBinOptions(){let e=this.getBounds(),t=1,n=[0,0],r=[[0,1],[0,1]],i=this.context.viewport;if(e&&Number.isFinite(e[0][0])){let a=[(e[0][0]+e[1][0])/2,(e[0][1]+e[1][1])/2],{radius:o}=this.props,{unitsPerMeter:s}=i.getDistanceScales(a);t=s[0]*o;let c=q(i.projectFlat(a),t);a=i.unprojectFlat(J(c,t));let l=i.constructor;i=i.isGeospatial?new l({longitude:a[0],latitude:a[1],zoom:12}):new se({position:[a[0],a[1],0],zoom:12}),n=[Math.fround(i.center[0]),Math.fround(i.center[1])],r=Ve({dataBounds:e,getBinId:e=>{let r=i.projectFlat(e);return r[0]-=n[0],r[1]-=n[1],q(r,t)},padding:1})}this.setState({radiusCommon:t,hexOriginCommon:n,binIdRange:r,aggregatorViewport:i})}draw(e){e.shaderModuleProps.project&&(e.shaderModuleProps.project.viewport=this.state.aggregatorViewport),super.draw(e)}_onAggregationUpdate({channel:e}){let t=this.getCurrentLayer().props,{aggregator:n}=this.state;if(e===0){let e=n.getResult(0);this.setState({colors:new V(e,n.binCount)}),t.onSetColorDomain(n.getResultDomain(0))}else if(e===1){let e=n.getResult(1);this.setState({elevations:new V(e,n.binCount)}),t.onSetElevationDomain(n.getResultDomain(1))}}onAttributeChange(e){let{aggregator:t}=this.state;switch(e){case`positions`:t.setNeedsUpdate(),this._updateBinOptions();let{radiusCommon:e,hexOriginCommon:n,binIdRange:r}=this.state;t.setProps({binIdRange:r,binOptions:{radiusCommon:e,hexOriginCommon:n}});break;case`colorWeights`:t.setNeedsUpdate(0);break;case`elevationWeights`:t.setNeedsUpdate(1);break;default:}}renderLayers(){let{aggregator:e,radiusCommon:t,hexOriginCommon:n}=this.state,{elevationScale:r,colorRange:i,elevationRange:a,extruded:o,coverage:s,material:c,transitions:l,colorScaleType:u,lowerPercentile:d,upperPercentile:f,colorDomain:p,elevationScaleType:m,elevationLowerPercentile:h,elevationUpperPercentile:g,elevationDomain:_}=this.props,v=this.getSubLayerClass(`cells`,Y),y=e.getBins(),b=this.state.colors?.update({scaleType:u,lowerPercentile:d,upperPercentile:f}),x=this.state.elevations?.update({scaleType:m,lowerPercentile:h,upperPercentile:g});return!b||!x?null:new v(this.getSubLayerProps({id:`cells`}),{data:{length:e.binCount,attributes:{getBin:y,getColorValue:b.attribute,getElevationValue:x.attribute}},dataComparator:(e,t)=>e.length===t.length,updateTriggers:{getBin:[y],getColorValue:[b.attribute],getElevationValue:[x.attribute]},diskResolution:6,vertices:He,radius:t,hexOriginCommon:n,elevationScale:r,colorRange:i,colorScaleType:u,elevationRange:a,extruded:o,coverage:s,material:c,colorDomain:b.domain||p||e.getResultDomain(0),elevationDomain:x.domain||_||e.getResultDomain(1),colorCutoff:b.cutoff,elevationCutoff:x.cutoff,transitions:l&&{getFillColor:l.getColorValue||l.getColorWeight,getElevation:l.getElevationValue||l.getElevationWeight},extensions:[]})}getPickingInfo(e){let t=e.info,{index:n}=t;if(n>=0){let e=this.state.aggregator.getBin(n),r;if(e){let t=J(e.id,this.state.radiusCommon),n=this.context.viewport.unprojectFlat(t);r={col:e.id[0],row:e.id[1],position:n,colorValue:e.value[0],elevationValue:e.value[1],count:e.count},e.pointIndices&&(r.pointIndices=e.pointIndices,r.points=Array.isArray(this.props.data)?e.pointIndices.map(e=>this.props.data[e]):[])}t.object=r}return t}};Z.layerName=`HexagonLayer`,Z.defaultProps=qe,i();var Je=e(_e(),1),Ye=e(ee(),1),Q=`/simwrapper/`,Xe={ambient:.64,diffuse:.6,shininess:32,specularColor:[51,51,51]},Ze=C({name:`XYHexMapComponent`,props:{viewId:{type:Number,required:!0},colorRamp:{type:String,required:!0},coverage:{type:Number,required:!0},dark:{type:Boolean,required:!0},data:{type:Object,required:!0},extrude:{type:Boolean,required:!0},highlights:{type:Array,required:!0},mapIsIndependent:{type:Boolean,required:!0},maxHeight:{type:Number,required:!0},metric:{type:String,required:!0},radius:{type:Number,required:!0},selectedHexStats:{type:Object,required:!1},upperPercentile:{type:Number,required:!0},onClick:{type:Function,required:!0},agg:{type:Number,required:!0},group:{type:String,required:!0},bgLayers:{type:Object},show3dBuildings:{type:Boolean,required:!1,default:!1}},data(){return{mymap:null,deckOverlay:null,globalState:b.state,tooltipHTML:``,tooltipStyle:{position:`absolute`,padding:`4px 8px`,display:`block`,top:0,left:0,color:this.dark?`#ccc`:`#223`,backgroundColor:this.dark?`#2a3c4f`:`white`,zIndex:2}}},watch:{layers(){this.deckOverlay?.setProps({layers:this.layers})},dark(){let e=`${Q}map-styles/${this.dark?`dark`:`positron`}.json`;this.mymap?.setStyle(e)},show3dBuildings(){this.mymap&&(this.show3dBuildings?O(this.mymap):pe(this.mymap))},"globalState.viewState"(){if(this.mapIsIndependent||!this.mymap)return;let e=this.globalState.viewState,t=this.mymap?.getCenter();if(e.longitude!==t.lng||e.latitude!==t.lat||e.zoom!==this.mymap?.getZoom()||e.pitch!==this.mymap?.getPitch()||e.bearing!==this.mymap?.getBearing())try{this.mymap?.jumpTo(e)}catch(e){console.warn(``+e)}}},computed:{weightedRowData(){return this.highlights.length?this.highlights.map(e=>e[0]):!this.data||!Object.keys(this.data).length?[]:{length:this.data[this.group].positions[this.agg].length/2}},colors(){let e=(0,Je.default)({colormap:this.colorRamp,nshades:10,format:`rba`,alpha:1}).map(e=>[e[0],e[1],e[2]]);return this.dark||e.reverse(),e.slice(1)},layers(){let e=this.data[this.group],t=this.highlights.length?{getPosition:e=>e}:{getPosition:(t,n)=>e.positions[this.agg].slice(n.index*2,n.index*2+2)},n=e?.positions[this.agg].length/2||0,r=null;n<10&&(r=this.colors.slice(4,5));let i=[],a=this.bgLayers?.layers();a&&i.push(...a.layersBelow),i.push(new fe({id:`arc-layer`,data:this.highlights,getSourcePosition:e=>e[0],getTargetPosition:e=>e[1],pickable:!1,opacity:.4,getHeight:0,getWidth:1,getSourceColor:this.dark?[144,96,128]:[192,192,240],getTargetColor:this.dark?[144,96,128]:[192,192,240]}));let o=Object.assign(t,{id:`hexlayer`,data:this.weightedRowData,colorRange:r||this.colors,coverage:.98,autoHighlight:!0,elevationRange:[0,this.maxHeight],elevationScale:25,extruded:this.extrude,gpuAggregation:!1,selectedHexStats:this.selectedHexStats,material:Xe,opacity:this.dark&&this.highlights.length?.6:.8,pickable:!0,pickingRadius:2,positionFormat:`XY`,radius:this.radius,upperPercentile:this.upperPercentile,updateTriggers:{},transitions:{elevationScale:{type:`interpolation`,duration:1e3},opacity:{type:`interpolation`,duration:200}},onHover:this.getTooltip});return i.push(new Z(o)),a&&i.push(...a.layersOnTop),i}},mounted(){let e=`${Q}map-styles/${this.dark?`dark`:`positron`}.json`,t=`map-${this.viewId}`,n=this.globalState.viewState;this.mymap=new Ye.default.Map({container:t,style:e,...n}),this.mymap.on(`style.load`,()=>{this.show3dBuildings&&this.mymap&&O(this.mymap),this.deckOverlay=new T({interleaved:!0,layers:this.layers,onClick:this.handleClick}),this.mymap?.addControl(this.deckOverlay)}),this.mymap?.on(`move`,()=>{let e=this.mymap?.getCenter(),t={latitude:e.lat,longitude:e.lng,zoom:this.mymap?.getZoom(),bearing:this.mymap?.getBearing(),pitch:this.mymap?.getPitch(),jump:!0};b.commit(`setMapCamera`,t)})},beforeUnmount(){this.deckOverlay&&this.mymap?.removeControl(this.deckOverlay),this.mymap?.remove()},methods:{getTooltip(e){let{x:t,y:n,object:r}=e;if(!r||!r.position||!r.position.length){this.tooltipStyle.display=`none`;return}let i=r.position[1],a=r.position[0],o=r.pointIndices.length,s=`\
        <b>${this.highlights.length?`Count`:this.metric}: ${o} </b><br/>
        ${Number.isFinite(i)?i.toFixed(4):``} / ${Number.isFinite(a)?a.toFixed(4):``}
      `;this.tooltipStyle.display=`block`,this.tooltipStyle.top=`${n+12}px`,this.tooltipStyle.left=`${t+12}px`,this.tooltipHTML=s},handleClick(e,t){this.tooltipStyle.display=`none`,this.onClick&&this.onClick(e,t)}}});i(),h(),x();var Qe={class:`hex-map flex-col`},$e=[`id`],et=[`innerHTML`];function tt(e,t,r,i,o,s){return S(),l(`div`,Qe,[n(`div`,{class:`map-container`,id:`map-${e.viewId}`},null,8,$e),te(n(`div`,{class:`deck-tooltip`,innerHTML:e.tooltipHTML,style:a(e.tooltipStyle)},null,12,et),[[d,e.tooltipHTML]])])}var nt=y(Ze,[[`render`,tt]]);i();var rt=C({name:`XyHexagonsPlugin`,i18n:{messages:{en:{loading:`Loading data...`,sorting:`Sorting into bins...`,aggregate:`Summary`,maxHeight:`3D Height`,showDetails:`Show Details`,selection:`Selection`,areas:`Areas`,count:`Count`,buildings3d:`3D buildings`},de:{loading:`Dateien laden...`,sorting:`Sortieren...`,aggregate:`Daten`,maxHeight:`3-D Höhe`,showDetails:`Details anzeigen`,selection:`Ausgewählt`,areas:`Orte`,count:`Anzahl`,buildings3d:`3D Gebäude`}}},components:{CollapsiblePanel:ye,DrawingTool:ge,XyHexDeckMap:nt,ZoomButtons:me},props:{root:{type:String,required:!0},subfolder:{type:String,required:!0},yamlConfig:String,config:Object,thumbnail:Boolean},data:()=>{let e=[`par`,`bathymetry`,`magma`,`chlorophyll`];return{id:Math.floor(0xe8d4a51000*Math.random()),resolvers:{},resolverId:0,_xmlConfigFetcher:{},standaloneYAMLconfig:{title:``,description:``,file:``,projection:``,thumbnail:``,aggregations:{},radius:250,maxHeight:0,center:null,zoom:9,mapIsIndependent:!1},YAMLrequirementsXY:{file:``,aggregations:{}},colorRamps:e,buttonColors:[`#BF7230`,`#5E8AAE`,`#9C439C`,`#269367`],aggregations:{},aggNumber:0,gzipWorker:null,colorRamp:e[0],globalState:b.state,currentGroup:``,backgroundLayers:null,show3dBuildings:!1,vizDetails:{title:``,description:``,file:``,projection:``,thumbnail:``,aggregations:{},radius:250,maxHeight:0,center:null,zoom:9},myState:{statusMessage:``,subfolder:``,yamlConfig:``,thumbnail:!1},requests:{},highlightedTrips:[],searchTerm:``,searchEnabled:!1,isLoaded:!1,activeAggregation:``,isHighlightingZone:!1,multiSelectedHexagons:{},thumbnailUrl:`url('assets/thumbnail.jpg') no-repeat`,hexStats:null,resizer:null}},computed:{fileApi(){return new ce(this.fileSystem,b)},fileSystem(){let e=this.$store.state.svnProjects.filter(e=>e.slug===this.root);if(e.length===0)throw console.log(`no such project`),Error;return e[0]},urlThumbnail(){return this.thumbnailUrl},buttonLabel(){let[e,t]=this.activeAggregation.split(`~`);return this.aggregations[e][t].title},extrudeTowers(){return this.vizDetails.maxHeight>0},mapProps(){return{viewId:this.id,group:this.currentGroup,agg:this.aggNumber,colorRamp:this.colorRamp,coverage:.7,dark:this.$store.state.isDarkMode,data:this.requests,extrude:this.extrudeTowers,highlights:this.highlightedTrips,mapIsIndependent:this.vizDetails.mapIsIndependent||!1,maxHeight:this.vizDetails.maxHeight,metric:this.buttonLabel,radius:this.vizDetails.radius,selectedHexStats:this.hexStats,upperPercentile:100,bgLayers:this.backgroundLayers,onClick:this.handleClick,show3dBuildings:this.show3dBuildings}},textColor(){return this.$store.state.colorScheme===_.DarkMode?{text:`white`,bg:`#181518aa`}:{text:`#3498db`,bg:`#eeeef480`}}},watch:{extrudeTowers(){this.extrudeTowers&&this.globalState.viewState.pitch==0&&b.commit(`setMapCamera`,Object.assign({},this.globalState.viewState,{pitch:10}))}},methods:{toggle3dBuildings(){this.show3dBuildings=!this.show3dBuildings},handleClick(e,t){e.layer?this.handleHexClick(e,t):this.handleEmptyClick()},handleEmptyClick(){this.flipViewToShowInvertedData({})},handleHexClick(e,t){if(!t.srcEvent.shiftKey){this.multiSelectedHexagons={},this.hexStats=null,this.flipViewToShowInvertedData(e);return}let n=e?.object?.index;n!==void 0&&(n in this.multiSelectedHexagons?delete this.multiSelectedHexagons[n]:this.multiSelectedHexagons[n]=e.object.points,this.hexStats=this.selectedHexagonStatistics())},flipViewToShowInvertedData(e){this.isHighlightingZone?this.isHighlightingZone=!1:this.isHighlightingZone=!!e.object;let t=this.activeAggregation.split(`~`);if(!this.isHighlightingZone){this.hexStats=null,this.multiSelectedHexagons={},this.handleOrigDest(t[0],parseInt(t[1])),this.highlightedTrips=[];return}let n=this.aggNumber+(this.aggNumber%2?-1:1),r=[];for(let t of e.object.pointIndices){let e=t*2,i=[this.requests[this.currentGroup].positions[n][e],this.requests[this.currentGroup].positions[n][e+1]],a=[this.requests[this.currentGroup].positions[this.aggNumber][e],this.requests[this.currentGroup].positions[this.aggNumber][e+1]];r.push([i,a]),this.highlightedTrips=r}this.hexStats&&(this.hexStats.selectedHexagonIds=[]),this.multiSelectedHexagons={},this.colorRamp=this.colorRamps[n]},handleOrigDest(e,t){this.currentGroup=e,this.aggNumber=t,this.hexStats=null,this.multiSelectedHexagons={},this.highlightedTrips=[],this.activeAggregation=`${e}~${t}`,this.colorRamp=this.colorRamps[t]},sync3dBuildingsSetting(){this.show3dBuildings=!!(this.vizDetails.buildings3d??this.vizDetails.show3dBuildings)},async getVizDetails(){if(this.config){this.validateYAML(),this.vizDetails=Object.assign({},this.config),this.setRadiusAndHeight(),this.sync3dBuildingsSetting();return}RegExp(`.*(yml|yaml)$`).test(this.myState.yamlConfig)?await this.loadStandaloneYAMLConfig():await this.loadOutputTripsConfig(),this.sync3dBuildingsSetting()},fetchXML(e){let t=e.worker;t.onmessage=e=>{let{resolve:n,reject:r}=this.resolvers[e.data.id];t.terminate(),e.data.error&&r(e.data.error),n(e.data.xml)};let n=this.resolverId++;return t.postMessage(D({id:n,fileSystem:this.fileSystem,filePath:e.filePath,options:e.options})),new Promise((e,t)=>{this.resolvers[n]={resolve:e,reject:t}})},async figureOutProjection(){let{files:e}=await this.fileApi.getDirectory(this.myState.subfolder),t=e.filter(e=>e.indexOf(`.output_config.xml`)>-1||e.indexOf(`.output_config_reduced.xml`)>-1);if(t.length&&this.fileSystem)for(let e of t)try{return(await this.fetchXML({worker:this._xmlConfigFetcher,slug:this.fileSystem.slug,filePath:this.myState.subfolder+`/`+e})).config.module.filter(e=>e.$name===`global`)[0].param.filter(e=>e.$name===`coordinateSystem`)[0].$value}catch{console.warn(`Failed parsing`,e)}},async loadOutputTripsConfig(){let e=await this.figureOutProjection();!this.myState.thumbnail&&!e&&(e=prompt(`Enter projection: e.g. "EPSG:31468"`)||`EPSG:31468`,parseInt(e,10)&&(e=`EPSG:`+e)),this.vizDetails={title:`Output Trips`,description:this.myState.yamlConfig,file:this.myState.yamlConfig,projection:e,aggregations:{"Trip Summary":[{title:`Origins`,x:`start_x`,y:`start_y`},{title:`Destinations`,x:`end_x`,y:`end_y`}]},radius:this.vizDetails.radius,maxHeight:this.vizDetails.maxHeight,center:this.vizDetails.center,zoom:this.vizDetails.zoom},this.$emit(`title`,this.vizDetails.title)},setRadiusAndHeight(){this.vizDetails.radius||(this.vizDetails.radius=250),this.vizDetails.maxHeight||(this.vizDetails.maxHeight=0)},async loadStandaloneYAMLConfig(){try{let e=this.myState.yamlConfig.indexOf(`/`)>-1?this.myState.yamlConfig:this.myState.subfolder+`/`+this.myState.yamlConfig,t=await this.fileApi.getFileText(e);this.standaloneYAMLconfig=Object.assign({},le.parse(t)),this.validateYAML(),this.setVizDetails()}catch(e){console.error(`failed`,``+e),this.$emit(`error`,`File not found: ${this.myState.subfolder}/${this.myState.yamlConfig}`)}},validateYAML(){let e=RegExp(`.*(yml|yaml)$`).test(this.myState.yamlConfig),t={};e?(console.log(`has yaml`),t=this.standaloneYAMLconfig):(console.log(`no yaml`),t=this.config);for(let e in this.YAMLrequirementsXY)e in t||this.$emit(`error`,{type:m.ERROR,msg:`XYHexagon: ${this.yamlConfig}: missing required key: ${e}`,desc:`XYHexagon requires ${Object.keys(this.YAMLrequirementsXY)}`});t.radius==0&&this.$emit(`error`,{type:m.WARNING,msg:`Radius set to zero`,desc:`Radius can not be zero, preset value used instead. `}),(t.zoom<5||t.zoom>20)&&this.$emit(`error`,{type:m.WARNING,msg:`Zoom is out of the recommended range `,desc:`Zoom levels should be between 5 and 20. `})},setVizDetails(){this.vizDetails=Object.assign({},this.vizDetails,this.standaloneYAMLconfig),this.setRadiusAndHeight();let e=this.vizDetails.title?this.vizDetails.title:`Hex Aggregation`;this.$emit(`title`,e)},handleShowSelectionButton(){let e=Object.values(this.multiSelectedHexagons),t=[];e.map(e=>t=t.concat(e));let n={object:{points:t}};this.flipViewToShowInvertedData(n)},selectedHexagonStatistics(){let e=Object.keys(this.multiSelectedHexagons).map(e=>parseInt(e));return e.length?{rows:Object.values(this.multiSelectedHexagons).reduce((e,t)=>e+t.length,0),numHexagons:e.length,selectedHexagonIds:e}:null},setMapCenter(){if(this.vizDetails.center){typeof this.vizDetails.center==`string`&&(this.vizDetails.center=this.vizDetails.center.split(`,`).map(Number));let e={center:this.vizDetails.center,zoom:this.vizDetails.zoom||10,bearing:0,pitch:0};this.$store.commit(`setMapCamera`,Object.assign({},e));return}let e=Object.keys(this.requests);if(!e.length)return;let t=this.requests[e[0]].positions[0],n=0,r=0,i=0,a=t.length/2;for(let e=0;e<a;e+=512)r+=t[e*2],i+=t[e*2+1],n++;r/=n,i/=n;let o=this.$store.state.viewState;r&&i&&this.$store.commit(`setMapCamera`,{longitude:r,latitude:i,bearing:o.bearing,pitch:o.pitch,zoom:this.vizDetails.zoom||o.zoom,jump:!1})},async parseCSVFile(e){this.myState.statusMessage=`Loading file...`;let t=new be;t.onmessage=async n=>{if(n.data.ready){t.postMessage(D({filepath:e,fileSystem:this.fileSystem,aggregations:this.vizDetails.aggregations,projection:this.vizDetails.projection}));return}if(n.data.status)this.myState.statusMessage=n.data.status;else if(n.data.projection)console.log(`dataset has a #EPSG:projection, using it`,n.data.projection),this.vizDetails.projection=n.data.projection;else if(n.data.error)this.myState.statusMessage=n.data.error,this.$emit(`error`,{type:m.ERROR,msg:`Error loading: ${this.myState.subfolder}/${this.vizDetails.file}`});else{let{fullRowCache:e}=n.data;this.gzipWorker?.terminate(),this.dataIsLoaded({fullRowCache:e})}},this.gzipWorker=t},dataIsLoaded({fullRowCache:e}){this.requests=e,this.setMapCenter(),this.myState.statusMessage=``,this.isLoaded=!0},async loadFiles(){let e=[];if(!this.fileApi)return{dataArray:e};try{let e=`${this.myState.subfolder}/${this.vizDetails.file}`;await this.parseCSVFile(e)}catch(e){console.error(e),this.myState.statusMessage=``+e,this.$emit(`error`,`Loading/parsing: ${this.myState.subfolder}/${this.vizDetails.file}`)}}},async mounted(){this.$store.commit(`setFullScreen`,!this.thumbnail),this.myState.thumbnail=this.thumbnail,this.myState.yamlConfig=this.yamlConfig||``,this.myState.subfolder=this.subfolder,this._xmlConfigFetcher=new ve,await this.getVizDetails(),this.myState.statusMessage=`${this.$i18n.t(`loading`)}`,this.aggregations=this.vizDetails.aggregations,await this.loadFiles();try{this.backgroundLayers=new he({vizDetails:this.vizDetails,fileApi:this.fileApi,subfolder:this.subfolder}),await this.backgroundLayers.initialLoad()}catch{this.$emit(`error`,`Error loading background layers`)}this.handleOrigDest(Object.keys(this.aggregations)[0],0)},beforeUnmount(){this._xmlConfigFetcher&&this._xmlConfigFetcher.terminate(),this.resizer?.disconnect();try{this.gzipWorker&&this.gzipWorker.terminate()}catch(e){console.warn(e)}this.$store.commit(`setFullScreen`,!1)}});i(),x();var it=[`id`],at={key:2,class:`left-side`},ot={key:0,class:`panel-items`,style:{color:`#c0f`}},st={class:`big`,style:{"margin-top":`2rem`}},ct={style:{"margin-top":`-1rem`}},lt={key:3,class:`control-panel`,"data-testid":`xy-hexagons-control-panel`},ut={class:`ui-label`},dt=[`onClick`],ft={class:`panel-item`},pt={class:`ui-label`},mt={class:`panel-item`},ht={class:`ui-label`},gt={key:4,class:`message`},_t={class:`status-message`};function vt(e,t,i,d,m,h){let _=p(`xy-hex-deck-map`),y=p(`zoom-buttons`),b=p(`collapsible-panel`),x=p(`o-slider`);return S(),l(`div`,{class:`xy-hexagons`,oncontextmenu:`return false`,id:`id-${e.id}`},[e.isLoaded?(S(),v(_,f({key:0,class:`hex-layer`},e.mapProps),null,16)):c(``,!0),e.thumbnail?c(``,!0):(S(),v(y,{key:1,show3dToggle:!0,is3dBuildings:e.show3dBuildings,onToggle3dBuildings:e.toggle3dBuildings},null,8,[`is3dBuildings`,`onToggle3dBuildings`])),e.isLoaded&&!e.thumbnail&&e.vizDetails.title?(S(),l(`div`,at,[s(b,{direction:`left`,locked:!0},{default:g(()=>[e.hexStats?(S(),l(`div`,ot,[n(`p`,st,r(e.$t(`selection`))+`:`,1),n(`h3`,ct,r(e.$t(`areas`))+`: `+r(e.hexStats.numHexagons)+`, `+r(e.$t(`count`))+`: `+r(e.hexStats.rows),1),n(`button`,{class:`button`,style:{color:`#c0f`,"border-color":`#c0f`},onClick:t[0]||=(...t)=>e.handleShowSelectionButton&&e.handleShowSelectionButton(...t)},r(e.$t(`showDetails`)),1)])):c(``,!0)]),_:1})])):c(``,!0),e.isLoaded&&!e.thumbnail&&!e.myState.statusMessage?(S(),l(`div`,lt,[(S(!0),l(u,null,o(Object.keys(e.aggregations),t=>(S(),l(`div`,{class:`panel-item`,key:t},[n(`p`,ut,r(t),1),(S(!0),l(u,null,o(e.aggregations[t],(n,i)=>(S(),l(`button`,{class:`button is-small aggregation-button`,key:i,style:a({"margin-bottom":`0.25rem`,color:e.activeAggregation===`${t}~${i}`?`white`:e.buttonColors[i],border:`1px solid ${e.buttonColors[i]}`,"border-right":`0.4rem solid ${e.buttonColors[i]}`,"border-radius":`4px`,"background-color":e.activeAggregation===`${t}~${i}`?e.buttonColors[i]:e.$store.state.isDarkMode?`#333`:`white`}),onClick:n=>e.handleOrigDest(t,i)},r(n.title),13,dt))),128))]))),128)),n(`div`,ft,[n(`p`,pt,r(e.$t(`maxHeight`))+`: `+r(e.vizDetails.maxHeight),1),s(x,{class:`ui-slider`,modelValue:e.vizDetails.maxHeight,"onUpdate:modelValue":t[1]||=t=>e.vizDetails.maxHeight=t,size:`small`,min:0,max:250,step:5,tooltip:!1},null,8,[`modelValue`])]),n(`div`,mt,[n(`p`,ht,`Hex Radius: `+r(e.vizDetails.radius),1),s(x,{class:`ui-slider`,modelValue:e.vizDetails.radius,"onUpdate:modelValue":t[2]||=t=>e.vizDetails.radius=t,size:`small`,min:50,max:1e3,step:5,tooltip:!1},null,8,[`modelValue`])])])):c(``,!0),!e.thumbnail&&e.myState.statusMessage?(S(),l(`div`,gt,[n(`p`,_t,r(e.myState.statusMessage),1)])):c(``,!0)],8,it)}var yt=t({default:()=>$}),$=y(rt,[[`render`,vt],[`__scopeId`,`data-v-bfbef670`]]);export{yt as n,$ as t};