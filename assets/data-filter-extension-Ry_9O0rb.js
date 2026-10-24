import{h as e,mt as t,u as n}from"./mapbox-overlay-KuXvUc6L.js";import{t as r}from"./layer-extension-B8r-f_Dl.js";var i=`uniform dataFilterUniforms {
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
`,a=`
${i}

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

`,o=`
${i}

in float dataFilter_value;

`;function s(e){if(!e||!(`extensions`in e))return{};let{filterRange:t=[-1,1],filterEnabled:n=!0,filterTransformSize:r=!0,filterTransformColor:i=!0,categoryBitMask:a}=e,o=e.filterSoftRange||t;return{...Number.isFinite(t[0])?{min:t[0],softMin:o[0],softMax:o[1],max:t[1]}:{min:t.map(e=>e[0]),softMin:o.map(e=>e[0]),softMax:o.map(e=>e[1]),max:t.map(e=>e[1])},enabled:n,useSoftMargin:!!e.filterSoftRange,transformSize:n&&r,transformColor:n&&i,...a&&{categoryBitMask:a}}}function c(e){if(!e||!(`extensions`in e))return{};let t=s(e);if(Number.isFinite(t.min)){let e=Math.fround(t.min);t.min-=e,t.softMin-=e,t.min64High=e;let n=Math.fround(t.max);t.max-=n,t.softMax-=n,t.max64High=n}else{let e=t.min.map(Math.fround);t.min=t.min.map((t,n)=>t-e[n]),t.softMin=t.softMin.map((t,n)=>t-e[n]),t.min64High=e;let n=t.max.map(Math.fround);t.max=t.max.map((e,t)=>e-n[t]),t.softMax=t.softMax.map((e,t)=>e-n[t]),t.max64High=n}return t}var l={"vs:#main-start":`
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
  `};function u(e){let{categorySize:t,filterSize:n,fp64:r}=e,i={useSoftMargin:`i32`,enabled:`i32`,transformSize:`i32`,transformColor:`i32`};if(n){let e=n===1?`f32`:`vec${n}<f32>`;i.min=e,i.softMin=e,i.softMax=e,i.max=e,r&&(i.min64High=e,i.max64High=e)}return t&&(i.categoryBitMask=`vec4<i32>`),i}var d={name:`dataFilter`,vs:a,fs:o,inject:l,getUniforms:s,uniformTypesFromOptions:u},f={name:`dataFilter`,vs:a,fs:o,inject:l,getUniforms:c,uniformTypesFromOptions:u},p=`#version 300 es
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
`,m=`#version 300 es
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
`,h=[`float32-renderable-webgl`,`texture-blend-float-webgl`];function g(e){return h.every(t=>e.features.has(t))}function _(e,t){return t?e.createFramebuffer({width:1,height:1,colorAttachments:[e.createTexture({format:`rgba32float`,dimension:`2d`,width:1,height:1})]}):e.createFramebuffer({width:256,height:64,colorAttachments:[e.createTexture({format:`rgba8unorm`,dimension:`2d`,width:256,height:64})]})}function v(t,n,r,i){return r.defines.NON_INSTANCED_MODEL=1,i&&(r.defines.FLOAT_TARGET=1),new e(t,{id:`data-filter-aggregation-model`,vertexCount:1,isInstanced:!1,topology:`point-list`,disableWarnings:!0,vs:p,fs:m,bufferLayout:n,...r})}var y={blend:!0,blendColorSrcFactor:`one`,blendColorDstFactor:`one`,blendAlphaSrcFactor:`one`,blendAlphaDstFactor:`one`,blendColorOperation:`add`,blendAlphaOperation:`add`,depthCompare:`never`},b={getFilterValue:{type:`accessor`,value:0},getFilterCategory:{type:`accessor`,value:0},onFilteredItemsChange:{type:`function`,value:null,optional:!0},filterEnabled:!0,filterRange:[-1,1],filterSoftRange:null,filterCategories:[0],filterTransformSize:!0,filterTransformColor:!0},x={categorySize:0,filterSize:1,fp64:!1,countItems:!1},S={1:`uint`,2:`uvec2`,3:`uvec3`,4:`uvec4`},C={1:`float`,2:`vec2`,3:`vec3`,4:`vec4`},w=class extends r{constructor(e={}){super({...x,...e})}getShaders(e){let{categorySize:t,filterSize:n,fp64:r}=e.opts,i={};t&&(i.DATACATEGORY_TYPE=S[t],i.DATACATEGORY_CHANNELS=t),n&&(i.DATAFILTER_TYPE=C[n],i.DATAFILTER_DOUBLE=!!r);let a=r?f:d;return a.uniformTypes=a.uniformTypesFromOptions(e.opts),{modules:[a],defines:i}}initializeState(e,t){let n=this.getAttributeManager(),{categorySize:r,filterSize:i,fp64:a}=t.opts;n&&(i&&n.add({filterValues:{size:i,type:a?`float64`:`float32`,stepMode:`dynamic`,accessor:`getFilterValue`}}),r&&n.add({filterCategoryValues:{size:r,stepMode:`dynamic`,accessor:`getFilterCategory`,type:`uint32`,transform:r===1?e=>t._getCategoryKey.call(this,e,0):e=>e.map((e,n)=>t._getCategoryKey.call(this,e,n))}}));let{device:o}=this.context;if(n&&t.opts.countItems){let e=g(o);n.add({filterVertexIndices:{size:e?1:2,vertexOffset:1,type:`unorm8`,accessor:(t,{index:n})=>{let r=t&&t.__source?t.__source.index:n;return e?(r+1)%255:[(r+1)%255,Math.floor(r/255)%255]},shaderAttributes:{filterPrevIndices:{vertexOffset:0},filterIndices:{vertexOffset:1}}}});let r=_(o,e),i=v(o,n.getBufferLayouts({isInstanced:!1}),t.getShaders.call(this,t),e);this.setState({filterFBO:r,filterModel:i})}}updateState({props:e,oldProps:t,changeFlags:r},i){let a=this.getAttributeManager(),{categorySize:o}=i.opts;if(this.state.filterModel){let n=a.attributes.filterValues?.needsUpdate()||a.attributes.filterCategoryValues?.needsUpdate()||e.filterEnabled!==t.filterEnabled||e.filterRange!==t.filterRange||e.filterSoftRange!==t.filterSoftRange||e.filterCategories!==t.filterCategories;n&&this.setState({filterNeedsUpdate:n})}a?.attributes.filterCategoryValues&&((a.attributes.filterCategoryValues.needsUpdate()||!n(e.filterCategories,t.filterCategories,2))&&this.setState({categoryBitMask:null}),r.dataChanged&&(this.setState({categoryMap:Array(o).fill(0).map(()=>({}))}),a.attributes.filterCategoryValues.setNeedsUpdate(`categoryMap`)))}draw(e,t){let n=this.state.filterFBO,r=this.state.filterModel,i=this.state.filterNeedsUpdate;this.state.categoryBitMask||t._updateCategoryBitMask.call(this,e,t);let{onFilteredItemsChange:a,extensions:o,filterEnabled:s,filterRange:c,filterSoftRange:l,filterTransformSize:u,filterTransformColor:d,filterCategories:f}=this.props,p={extensions:o,filterEnabled:s,filterRange:c,filterSoftRange:l,filterTransformSize:u,filterTransformColor:d,filterCategories:f};if(this.state.categoryBitMask&&(p.categoryBitMask=this.state.categoryBitMask),this.setShaderModuleProps({dataFilter:p}),i&&a&&r){let{attributes:{filterValues:e,filterCategoryValues:t,filterVertexIndices:i}}=this.getAttributeManager();r.setVertexCount(this.getNumInstances());let o={...e?.getValue(),...t?.getValue(),...i?.getValue()};r.setAttributes(o),r.shaderInputs.setProps({dataFilter:p});let s=[0,0,n.width,n.height],c=r.device.beginRenderPass({id:`data-filter-aggregation`,framebuffer:n,parameters:{viewport:s},clearColor:[0,0,0,0]});r.setParameters(y),r.draw(c),c.end();let l=r.device.readPixelsToArrayWebGL(n),u=0;for(let e=0;e<l.length;e++)u+=l[e];a({id:this.id,count:u}),this.state.filterNeedsUpdate=!1}}finalizeState(){let e=this.state.filterFBO,t=this.state.filterModel;e?.destroy(),t?.destroy()}_updateCategoryBitMask(e,n){let{categorySize:r}=n.opts;if(!r)return;let{filterCategories:i}=this.props,a=new Uint32Array([0,0,0,0]),o=r===1?[i]:i,s=r===1?128:r===2?64:32;for(let e=0;e<o.length;e++){let r=o[e];for(let i of r){let r=n._getCategoryKey.call(this,i,e);if(r<s){let t=s/32*e+Math.floor(r/32);a[t]+=2**(r%32)}else t.warn(`Exceeded maximum number of categories (${s})`)()}}this.state.categoryBitMask=a}_getCategoryKey(e,t){let n=this.state.categoryMap[t];return e in n||(n[e]=Object.keys(n).length),n[e]}};w.defaultProps=b,w.extensionName=`DataFilterExtension`;export{w as t};