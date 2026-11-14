import{gt as e,h as t,u as n}from"./mapbox-overlay-BGPj_c-_.js";import{t as r}from"./layer-extension-DVKB3bDp.js";var i=`layout(std140) uniform dataFilterUniforms {
  bool useSoftMargin;
  bool enabled;
  bool transformSize;
  bool transformColor;
  vec4 min;
  vec4 softMin;
  vec4 softMax;
  vec4 max;
  vec4 min64High;
  vec4 max64High;
  highp uvec4 categoryBitMask;
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

#ifdef DATAFILTER_TYPE
  float dataFilter_getMin(float _) {
    return dataFilter.min.x;
  }
  vec2 dataFilter_getMin(vec2 _) {
    return dataFilter.min.xy;
  }
  vec3 dataFilter_getMin(vec3 _) {
    return dataFilter.min.xyz;
  }
  vec4 dataFilter_getMin(vec4 _) {
    return dataFilter.min;
  }

  float dataFilter_getSoftMin(float _) {
    return dataFilter.softMin.x;
  }
  vec2 dataFilter_getSoftMin(vec2 _) {
    return dataFilter.softMin.xy;
  }
  vec3 dataFilter_getSoftMin(vec3 _) {
    return dataFilter.softMin.xyz;
  }
  vec4 dataFilter_getSoftMin(vec4 _) {
    return dataFilter.softMin;
  }

  float dataFilter_getSoftMax(float _) {
    return dataFilter.softMax.x;
  }
  vec2 dataFilter_getSoftMax(vec2 _) {
    return dataFilter.softMax.xy;
  }
  vec3 dataFilter_getSoftMax(vec3 _) {
    return dataFilter.softMax.xyz;
  }
  vec4 dataFilter_getSoftMax(vec4 _) {
    return dataFilter.softMax;
  }

  float dataFilter_getMax(float _) {
    return dataFilter.max.x;
  }
  vec2 dataFilter_getMax(vec2 _) {
    return dataFilter.max.xy;
  }
  vec3 dataFilter_getMax(vec3 _) {
    return dataFilter.max.xyz;
  }
  vec4 dataFilter_getMax(vec4 _) {
    return dataFilter.max;
  }

  float dataFilter_getMin64High(float _) {
    return dataFilter.min64High.x;
  }
  vec2 dataFilter_getMin64High(vec2 _) {
    return dataFilter.min64High.xy;
  }
  vec3 dataFilter_getMin64High(vec3 _) {
    return dataFilter.min64High.xyz;
  }
  vec4 dataFilter_getMin64High(vec4 _) {
    return dataFilter.min64High;
  }

  float dataFilter_getMax64High(float _) {
    return dataFilter.max64High.x;
  }
  vec2 dataFilter_getMax64High(vec2 _) {
    return dataFilter.max64High.xy;
  }
  vec3 dataFilter_getMax64High(vec3 _) {
    return dataFilter.max64High.xyz;
  }
  vec4 dataFilter_getMax64High(vec4 _) {
    return dataFilter.max64High;
  }
#endif

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
    DATAFILTER_TYPE dataFilter_min = dataFilter_getMin(valueFromMin);
    DATAFILTER_TYPE dataFilter_softMin = dataFilter_getSoftMin(valueFromMin);
    DATAFILTER_TYPE dataFilter_softMax = dataFilter_getSoftMax(valueFromMin);
    DATAFILTER_TYPE dataFilter_max = dataFilter_getMax(valueFromMin);
    if (dataFilter.useSoftMargin) {
      // smoothstep results are undefined if edge0 ≥ edge1
      // Fallback to ignore filterSoftRange if it is truncated by filterRange
      DATAFILTER_TYPE leftInRange = mix(
        smoothstep(dataFilter_min, dataFilter_softMin, valueFromMin),
        step(dataFilter_min, valueFromMin),
        step(dataFilter_softMin, dataFilter_min)
      );
      DATAFILTER_TYPE rightInRange = mix(
        1.0 - smoothstep(dataFilter_softMax, dataFilter_max, valueFromMax),
        step(valueFromMax, dataFilter_max),
        step(dataFilter_max, dataFilter_softMax)
      );
      dataFilter_value = dataFilter_reduceValue(leftInRange * rightInRange);
    } else {
      dataFilter_value = dataFilter_reduceValue(
        step(dataFilter_min, valueFromMin) * step(valueFromMax, dataFilter_max)
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
    if (dataFilter_bits == 0u) dataFilter_value = 0.0;
    #else
    if (any(equal(dataFilter_bits, DATACATEGORY_TYPE(0u)))) dataFilter_value = 0.0;
    #endif
  }
#endif

`,o=`
${i}

in float dataFilter_value;

`;function s(e){if(!e||!(`extensions`in e))return{};let{filterRange:t=[-1,1],filterEnabled:n=!0,filterTransformSize:r=!0,filterTransformColor:i=!0,categoryBitMask:a}=e,o=e.filterSoftRange||t,s=e=>Array.isArray(e)?[e[0]||0,e[1]||0,e[2]||0,e[3]||0]:[e,0,0,0];return{...Number.isFinite(t[0])?{min:s(t[0]),softMin:s(o[0]),softMax:s(o[1]),max:s(t[1])}:{min:s(t.map(e=>e[0])),softMin:s(o.map(e=>e[0])),softMax:s(o.map(e=>e[1])),max:s(t.map(e=>e[1]))},enabled:n,useSoftMargin:!!e.filterSoftRange,transformSize:n&&r,transformColor:n&&i,...a&&{categoryBitMask:a}}}function c(e){if(!e||!(`extensions`in e))return{};let t=s(e),n=t.min.map(Math.fround);t.min=t.min.map((e,t)=>e-n[t]),t.softMin=t.softMin.map((e,t)=>e-n[t]),t.min64High=n;let r=t.max.map(Math.fround);return t.max=t.max.map((e,t)=>e-r[t]),t.softMax=t.softMax.map((e,t)=>e-r[t]),t.max64High=r,t}var l={"vs:#main-start":`
    dataFilter_value = 1.0;
    if (dataFilter.enabled) {
      #ifdef DATAFILTER_TYPE
        #ifdef DATAFILTER_DOUBLE
          dataFilter_setValue(
            filterValues - dataFilter_getMin64High(filterValues) + filterValues64Low,
            filterValues - dataFilter_getMax64High(filterValues) + filterValues64Low
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
  `};function u(e){return{useSoftMargin:`i32`,enabled:`i32`,transformSize:`i32`,transformColor:`i32`,min:`vec4<f32>`,softMin:`vec4<f32>`,softMax:`vec4<f32>`,max:`vec4<f32>`,min64High:`vec4<f32>`,max64High:`vec4<f32>`,categoryBitMask:`vec4<u32>`}}var d={name:`dataFilter`,vs:a,fs:o,inject:l,getUniforms:s,uniformTypesFromOptions:u},f={name:`dataFilter`,vs:a,fs:o,inject:l,getUniforms:c,uniformTypesFromOptions:u},p=`#version 300 es
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
`,h=[`float32-renderable-webgl`,`texture-blend-float-webgl`];function g(e){return h.every(t=>e.features.has(t))}function _(e,t){return t?e.createFramebuffer({width:1,height:1,colorAttachments:[e.createTexture({format:`rgba32float`,dimension:`2d`,width:1,height:1})]}):e.createFramebuffer({width:256,height:64,colorAttachments:[e.createTexture({format:`rgba8unorm`,dimension:`2d`,width:256,height:64})]})}function v(e,n,r,i){return r.defines.NON_INSTANCED_MODEL=1,i&&(r.defines.FLOAT_TARGET=1),new t(e,{id:`data-filter-aggregation-model`,vertexCount:1,isInstanced:!1,topology:`point-list`,disableWarnings:!0,vs:p,fs:m,bufferLayout:n,...r})}var y={blend:!0,blendColorSrcFactor:`one`,blendColorDstFactor:`one`,blendAlphaSrcFactor:`one`,blendAlphaDstFactor:`one`,blendColorOperation:`add`,blendAlphaOperation:`add`,depthCompare:`never`},b={getFilterValue:{type:`accessor`,value:0},getFilterCategory:{type:`accessor`,value:0},onFilteredItemsChange:{type:`function`,value:null,optional:!0},filterEnabled:!0,filterRange:[-1,1],filterSoftRange:null,filterCategories:[0],filterTransformSize:!0,filterTransformColor:!0},x={categorySize:0,filterSize:1,fp64:!1,countItems:!1},S={1:`uint`,2:`uvec2`,3:`uvec3`,4:`uvec4`},C={1:`float`,2:`vec2`,3:`vec3`,4:`vec4`},w=class extends r{constructor(e={}){super({...x,...e})}getShaders(e){let{categorySize:t,filterSize:n,fp64:r}=e.opts,i={};t&&(i.DATACATEGORY_TYPE=S[t],i.DATACATEGORY_CHANNELS=t),n&&(i.DATAFILTER_TYPE=C[n],i.DATAFILTER_DOUBLE=!!r);let a=r?f:d;return a.uniformTypes=a.uniformTypesFromOptions(e.opts),{modules:[a],defines:i}}initializeState(e,t){let n=this.getAttributeManager(),{categorySize:r,filterSize:i,fp64:a}=t.opts;n&&(i&&n.add({filterValues:{size:i,type:a?`float64`:`float32`,stepMode:`dynamic`,accessor:`getFilterValue`}}),r&&n.add({filterCategoryValues:{size:r,stepMode:`dynamic`,accessor:`getFilterCategory`,type:`uint32`,transform:r===1?e=>t._getCategoryKey.call(this,e,0):e=>e.map((e,n)=>t._getCategoryKey.call(this,e,n))}}));let{device:o}=this.context;if(n&&t.opts.countItems){let e=g(o);n.add({filterVertexIndices:{size:e?1:2,vertexOffset:1,type:`unorm8`,accessor:(t,{index:n})=>{let r=t&&t.__source?t.__source.index:n;return e?(r+1)%255:[(r+1)%255,Math.floor(r/255)%255]},shaderAttributes:{filterPrevIndices:{vertexOffset:0},filterIndices:{vertexOffset:1}}}});let r=_(o,e),i=v(o,n.getBufferLayouts({isInstanced:!1}),t.getShaders.call(this,t),e);this.setState({filterFBO:r,filterModel:i})}}updateState({props:e,oldProps:t,changeFlags:r},i){let a=this.getAttributeManager(),{categorySize:o}=i.opts;if(this.state.filterModel){let n=a.attributes.filterValues?.needsUpdate()||a.attributes.filterCategoryValues?.needsUpdate()||e.filterEnabled!==t.filterEnabled||e.filterRange!==t.filterRange||e.filterSoftRange!==t.filterSoftRange||e.filterCategories!==t.filterCategories;n&&this.setState({filterNeedsUpdate:n})}a?.attributes.filterCategoryValues&&((a.attributes.filterCategoryValues.needsUpdate()||!n(e.filterCategories,t.filterCategories,2))&&this.setState({categoryBitMask:null}),r.dataChanged&&(this.setState({categoryMap:Array(o).fill(0).map(()=>({}))}),a.attributes.filterCategoryValues.setNeedsUpdate(`categoryMap`)))}draw(e,t){let n=this.state.filterFBO,r=this.state.filterModel,i=this.state.filterNeedsUpdate;this.state.categoryBitMask||t._updateCategoryBitMask.call(this,e,t);let{onFilteredItemsChange:a,extensions:o,filterEnabled:s,filterRange:c,filterSoftRange:l,filterTransformSize:u,filterTransformColor:d,filterCategories:f}=this.props,p={extensions:o,filterEnabled:s,filterRange:c,filterSoftRange:l,filterTransformSize:u,filterTransformColor:d,filterCategories:f};if(this.state.categoryBitMask&&(p.categoryBitMask=this.state.categoryBitMask),this.setShaderModuleProps({dataFilter:p}),i&&a&&r){let{attributes:{filterValues:e,filterCategoryValues:t,filterVertexIndices:i}}=this.getAttributeManager();r.setVertexCount(this.getNumInstances());let o={...e?.getValue(),...t?.getValue(),...i?.getValue()};r.setAttributes(o),r.shaderInputs.setProps({dataFilter:p});let s=[0,0,n.width,n.height],c=r.device.beginRenderPass({id:`data-filter-aggregation`,framebuffer:n,parameters:{viewport:s},clearColor:[0,0,0,0]});r.setParameters(y),r.draw(c),c.end();let l=r.device.readPixelsToArrayWebGL(n),u=0;for(let e=0;e<l.length;e++)u+=l[e];a({id:this.id,count:u}),this.state.filterNeedsUpdate=!1}}finalizeState(){let e=this.state.filterFBO,t=this.state.filterModel;e?.destroy(),t?.destroy()}_updateCategoryBitMask(t,n){let{categorySize:r}=n.opts;if(!r)return;let{filterCategories:i}=this.props,a=new Uint32Array([0,0,0,0]),o=r===1?[i]:i,s=r===1?128:r===2?64:32;for(let t=0;t<o.length;t++){let r=o[t];for(let i of r){let r=n._getCategoryKey.call(this,i,t);if(r<s){let e=s/32*t+Math.floor(r/32);a[e]+=2**(r%32)}else e.warn(`Exceeded maximum number of categories (${s})`)()}}this.state.categoryBitMask=a}_getCategoryKey(e,t){let n=this.state.categoryMap[t];return e in n||(n[e]=Object.keys(n).length),n[e]}};w.defaultProps=b,w.extensionName=`DataFilterExtension`;export{w as t};