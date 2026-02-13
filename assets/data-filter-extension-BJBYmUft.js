import{I as L,O as Y,p as O}from"./layer-T9N9JmIf.js";import{L as P}from"./layer-extension-LbH36Bf-.js";const _=`uniform dataFilterUniforms {
  bool useSoftMargin;
  bool enabled;
  bool transformSize;
  bool transformColor;
#ifdef DATAFILTER_TYPE
  DATAFILTER_TYPE min;
  DATAFILTER_TYPE softMin;
  DATAFILTER_TYPE softMax;
  DATAFILTER_TYPE max;
#ifdef DATAFILTER_DOUBLE
  DATAFILTER_TYPE min64High;
  DATAFILTER_TYPE max64High;
#endif
#endif
#ifdef DATACATEGORY_TYPE
  highp uvec4 categoryBitMask;
#endif
} dataFilter;
`,V=`
#ifdef DATAFILTER_TYPE
  in DATAFILTER_TYPE filterValues;
#ifdef DATAFILTER_DOUBLE
  in DATAFILTER_TYPE filterValues64Low;
#endif
#endif

#ifdef DATACATEGORY_TYPE
  in DATACATEGORY_TYPE filterCategoryValues;
#endif

out float dataFilter_value;

float dataFilter_reduceValue(float value) {
  return value;
}
float dataFilter_reduceValue(vec2 value) {
  return min(value.x, value.y);
}
float dataFilter_reduceValue(vec3 value) {
  return min(min(value.x, value.y), value.z);
}
float dataFilter_reduceValue(vec4 value) {
  return min(min(value.x, value.y), min(value.z, value.w));
}

#ifdef DATAFILTER_TYPE
  void dataFilter_setValue(DATAFILTER_TYPE valueFromMin, DATAFILTER_TYPE valueFromMax) {
    if (dataFilter.useSoftMargin) {
      // smoothstep results are undefined if edge0 ≥ edge1
      // Fallback to ignore filterSoftRange if it is truncated by filterRange
      DATAFILTER_TYPE leftInRange = mix(
        smoothstep(dataFilter.min, dataFilter.softMin, valueFromMin),
        step(dataFilter.min, valueFromMin),
        step(dataFilter.softMin, dataFilter.min)
      );
      DATAFILTER_TYPE rightInRange = mix(
        1.0 - smoothstep(dataFilter.softMax, dataFilter.max, valueFromMax),
        step(valueFromMax, dataFilter.max),
        step(dataFilter.max, dataFilter.softMax)
      );
      dataFilter_value = dataFilter_reduceValue(leftInRange * rightInRange);
    } else {
      dataFilter_value = dataFilter_reduceValue(
        step(dataFilter.min, valueFromMin) * step(valueFromMax, dataFilter.max)
      );
    }
  }
#endif

#ifdef DATACATEGORY_TYPE
  void dataFilter_setCategoryValue(DATACATEGORY_TYPE category) {
    #if DATACATEGORY_CHANNELS == 1 // One 128-bit mask
    uint dataFilter_masks = dataFilter.categoryBitMask[category / 32u];
    #elif DATACATEGORY_CHANNELS == 2 // Two 64-bit masks
    uvec2 dataFilter_masks = uvec2(
      dataFilter.categoryBitMask[category.x / 32u],
      dataFilter.categoryBitMask[category.y / 32u + 2u]
    );
    #elif DATACATEGORY_CHANNELS == 3 // Three 32-bit masks
    uvec3 dataFilter_masks = dataFilter.categoryBitMask.xyz;
    #else // Four 32-bit masks
    uvec4 dataFilter_masks = dataFilter.categoryBitMask;
    #endif

    // Shift mask and extract relevant bits
    DATACATEGORY_TYPE dataFilter_bits = DATACATEGORY_TYPE(dataFilter_masks) >> (category & 31u);
    dataFilter_bits &= 1u;

    #if DATACATEGORY_CHANNELS == 1
    if(dataFilter_bits == 0u) dataFilter_value = 0.0;
    #else
    if(any(equal(dataFilter_bits, DATACATEGORY_TYPE(0u)))) dataFilter_value = 0.0;
    #endif
  }
#endif
`,v=`
${_}
${V}
`,k=`
in float dataFilter_value;
`,h=`
${_}
${k}
`;function p(s){if(!s||!("extensions"in s))return{};const{filterRange:e=[-1,1],filterEnabled:t=!0,filterTransformSize:a=!0,filterTransformColor:i=!0,categoryBitMask:r}=s,l=s.filterSoftRange||e;return{...Number.isFinite(e[0])?{min:e[0],softMin:l[0],softMax:l[1],max:e[1]}:{min:e.map(o=>o[0]),softMin:l.map(o=>o[0]),softMax:l.map(o=>o[1]),max:e.map(o=>o[1])},enabled:t,useSoftMargin:!!s.filterSoftRange,transformSize:t&&a,transformColor:t&&i,...r&&{categoryBitMask:r}}}function B(s){if(!s||!("extensions"in s))return{};const e=p(s);if(Number.isFinite(e.min)){const t=Math.fround(e.min);e.min-=t,e.softMin-=t,e.min64High=t;const a=Math.fround(e.max);e.max-=a,e.softMax-=a,e.max64High=a}else{const t=e.min.map(Math.fround);e.min=e.min.map((i,r)=>i-t[r]),e.softMin=e.softMin.map((i,r)=>i-t[r]),e.min64High=t;const a=e.max.map(Math.fround);e.max=e.max.map((i,r)=>i-a[r]),e.softMax=e.softMax.map((i,r)=>i-a[r]),e.max64High=a}return e}const y={"vs:#main-start":`
    dataFilter_value = 1.0;
    if (dataFilter.enabled) {
      #ifdef DATAFILTER_TYPE
        #ifdef DATAFILTER_DOUBLE
          dataFilter_setValue(
            filterValues - dataFilter.min64High + filterValues64Low,
            filterValues - dataFilter.max64High + filterValues64Low
          );
        #else
          dataFilter_setValue(filterValues, filterValues);
        #endif
      #endif

      #ifdef DATACATEGORY_TYPE
        dataFilter_setCategoryValue(filterCategoryValues);
      #endif
    }
  `,"vs:#main-end":`
    if (dataFilter_value == 0.0) {
      gl_Position = vec4(0.);
    }
  `,"vs:DECKGL_FILTER_SIZE":`
    if (dataFilter.transformSize) {
      size = size * dataFilter_value;
    }
  `,"fs:DECKGL_FILTER_COLOR":`
    if (dataFilter_value == 0.0) discard;
    if (dataFilter.transformColor) {
      color.a *= dataFilter_value;
    }
  `};function M(s){const{categorySize:e,filterSize:t,fp64:a}=s,i={useSoftMargin:"i32",enabled:"i32",transformSize:"i32",transformColor:"i32"};if(t){const r=t===1?"f32":`vec${t}<f32>`;i.min=r,i.softMin=r,i.softMax=r,i.max=r,a&&(i.min64High=r,i.max64High=r)}return e&&(i.categoryBitMask="vec4<i32>"),i}const G={name:"dataFilter",vs:v,fs:h,inject:y,getUniforms:p,uniformTypesFromOptions:M},z={name:"dataFilter",vs:v,fs:h,inject:y,getUniforms:B,uniformTypesFromOptions:M},N=`#version 300 es
#define SHADER_NAME data-filter-vertex-shader

#ifdef FLOAT_TARGET
  in float filterIndices;
  in float filterPrevIndices;
#else
  in vec2 filterIndices;
  in vec2 filterPrevIndices;
#endif

out vec4 vColor;
const float component = 1.0 / 255.0;

void main() {
  #ifdef FLOAT_TARGET
    dataFilter_value *= float(filterIndices != filterPrevIndices);
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    vColor = vec4(0.0, 0.0, 0.0, 1.0);
  #else
    // Float texture is not supported: pack result into 4 channels x 256 px x 64px
    dataFilter_value *= float(filterIndices.x != filterPrevIndices.x);
    float col = filterIndices.x;
    float row = filterIndices.y * 4.0;
    float channel = floor(row);
    row = fract(row);
    vColor = component * vec4(bvec4(channel == 0.0, channel == 1.0, channel == 2.0, channel == 3.0));
    gl_Position = vec4(col * 2.0 - 1.0, row * 2.0 - 1.0, 0.0, 1.0);
  #endif
  gl_PointSize = 1.0;
}
`,w=`#version 300 es
#define SHADER_NAME data-filter-fragment-shader
precision highp float;

in vec4 vColor;

out vec4 fragColor;

void main() {
  if (dataFilter_value < 0.5) {
    discard;
  }
  fragColor = vColor;
}
`,H=["float32-renderable-webgl","texture-blend-float-webgl"];function U(s){return H.every(e=>s.features.has(e))}function K(s,e){return e?s.createFramebuffer({width:1,height:1,colorAttachments:[s.createTexture({format:"rgba32float",mipmaps:!1})]}):s.createFramebuffer({width:256,height:64,colorAttachments:[s.createTexture({format:"rgba8unorm",mipmaps:!1})]})}function $(s,e,t,a){return t.defines.NON_INSTANCED_MODEL=1,a&&(t.defines.FLOAT_TARGET=1),new L(s,{id:"data-filter-aggregation-model",vertexCount:1,isInstanced:!1,topology:"point-list",disableWarnings:!0,vs:N,fs:w,bufferLayout:e,...t})}const Z={blend:!0,blendColorSrcFactor:"one",blendColorDstFactor:"one",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one",blendColorOperation:"add",blendAlphaOperation:"add",depthCompare:"never"},q={getFilterValue:{type:"accessor",value:0},getFilterCategory:{type:"accessor",value:0},onFilteredItemsChange:{type:"function",value:null,optional:!0},filterEnabled:!0,filterRange:[-1,1],filterSoftRange:null,filterCategories:[0],filterTransformSize:!0,filterTransformColor:!0},W={categorySize:0,filterSize:1,fp64:!1,countItems:!1},j={1:"uint",2:"uvec2",3:"uvec3",4:"uvec4"},J={1:"float",2:"vec2",3:"vec3",4:"vec4"};class C extends P{constructor(e={}){super({...W,...e})}getShaders(e){const{categorySize:t,filterSize:a,fp64:i}=e.opts,r={};t&&(r.DATACATEGORY_TYPE=j[t],r.DATACATEGORY_CHANNELS=t),a&&(r.DATAFILTER_TYPE=J[a],r.DATAFILTER_DOUBLE=!!i);const l=i?z:G;return l.uniformTypes=l.uniformTypesFromOptions(e.opts),{modules:[l],defines:r}}initializeState(e,t){const a=this.getAttributeManager(),{categorySize:i,filterSize:r,fp64:l}=t.opts;a&&(r&&a.add({filterValues:{size:r,type:l?"float64":"float32",stepMode:"dynamic",accessor:"getFilterValue"}}),i&&a.add({filterCategoryValues:{size:i,stepMode:"dynamic",accessor:"getFilterCategory",type:"uint32",transform:i===1?n=>t._getCategoryKey.call(this,n,0):n=>n.map((d,c)=>t._getCategoryKey.call(this,d,c))}}));const{device:o}=this.context;if(a&&t.opts.countItems){const n=U(o);a.add({filterVertexIndices:{size:n?1:2,vertexOffset:1,type:"unorm8",accessor:(f,{index:u})=>{const g=f&&f.__source?f.__source.index:u;return n?(g+1)%255:[(g+1)%255,Math.floor(g/255)%255]},shaderAttributes:{filterPrevIndices:{vertexOffset:0},filterIndices:{vertexOffset:1}}}});const d=K(o,n),c=$(o,a.getBufferLayouts({isInstanced:!1}),t.getShaders.call(this,t),n);this.setState({filterFBO:d,filterModel:c})}}updateState({props:e,oldProps:t,changeFlags:a},i){const r=this.getAttributeManager(),{categorySize:l}=i.opts;if(this.state.filterModel){const o=r.attributes.filterValues?.needsUpdate()||r.attributes.filterCategoryValues?.needsUpdate()||e.filterEnabled!==t.filterEnabled||e.filterRange!==t.filterRange||e.filterSoftRange!==t.filterSoftRange||e.filterCategories!==t.filterCategories;o&&this.setState({filterNeedsUpdate:o})}r?.attributes.filterCategoryValues&&((r.attributes.filterCategoryValues.needsUpdate()||!Y(e.filterCategories,t.filterCategories,2))&&this.setState({categoryBitMask:null}),a.dataChanged&&(this.setState({categoryMap:Array(l).fill(0).map(()=>({}))}),r.attributes.filterCategoryValues.setNeedsUpdate("categoryMap")))}draw(e,t){const a=this.state.filterFBO,i=this.state.filterModel,r=this.state.filterNeedsUpdate;this.state.categoryBitMask||t._updateCategoryBitMask.call(this,e,t);const{onFilteredItemsChange:l,extensions:o,filterEnabled:n,filterRange:d,filterSoftRange:c,filterTransformSize:f,filterTransformColor:u,filterCategories:g}=this.props,m={extensions:o,filterEnabled:n,filterRange:d,filterSoftRange:c,filterTransformSize:f,filterTransformColor:u,filterCategories:g};if(this.state.categoryBitMask&&(m.categoryBitMask=this.state.categoryBitMask),this.setShaderModuleProps({dataFilter:m}),r&&l&&i){const R=this.getAttributeManager(),{attributes:{filterValues:x,filterCategoryValues:b,filterVertexIndices:S}}=R;i.setVertexCount(this.getNumInstances());const I={...x?.getValue(),...b?.getValue(),...S?.getValue()};i.setAttributes(I),i.shaderInputs.setProps({dataFilter:m});const D=[0,0,a.width,a.height],F=i.device.beginRenderPass({id:"data-filter-aggregation",framebuffer:a,parameters:{viewport:D},clearColor:[0,0,0,0]});i.setParameters(Z),i.draw(F),F.end();const A=i.device.readPixelsToArrayWebGL(a);let E=0;for(let T=0;T<A.length;T++)E+=A[T];l({id:this.id,count:E}),this.state.filterNeedsUpdate=!1}}finalizeState(){const e=this.state.filterFBO,t=this.state.filterModel;e?.destroy(),t?.destroy()}_updateCategoryBitMask(e,t){const{categorySize:a}=t.opts;if(!a)return;const{filterCategories:i}=this.props,r=new Uint32Array([0,0,0,0]),l=a===1?[i]:i,o=a===1?128:a===2?64:32;for(let n=0;n<l.length;n++){const d=l[n];for(const c of d){const f=t._getCategoryKey.call(this,c,n);if(f<o){const u=n*(o/32)+Math.floor(f/32);r[u]+=Math.pow(2,f%32)}else O.warn(`Exceeded maximum number of categories (${o})`)()}}this.state.categoryBitMask=r}_getCategoryKey(e,t){const a=this.state.categoryMap[t];return e in a||(a[e]=Object.keys(a).length),a[e]}}C.defaultProps=q;C.extensionName="DataFilterExtension";export{C as D};
