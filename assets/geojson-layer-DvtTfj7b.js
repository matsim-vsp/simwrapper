import{r as Ve,v as q,w as je,o as $e,x as Ke,y as Ze,q as Xe,z as Ye,B as Bt,E as Je,F as qe,G as ut,H as dt,U as at,I as X,J,p as $,K as wt}from"./layer-T9N9JmIf.js";import{c as Qe}from"./index-D_sw2g-2.js";const Kt=`precision highp int;

// #if (defined(SHADER_TYPE_FRAGMENT) && defined(LIGHTING_FRAGMENT)) || (defined(SHADER_TYPE_VERTEX) && defined(LIGHTING_VERTEX))
struct AmbientLight {
  vec3 color;
};

struct PointLight {
  vec3 color;
  vec3 position;
  vec3 attenuation; // 2nd order x:Constant-y:Linear-z:Exponential
};

struct DirectionalLight {
  vec3 color;
  vec3 direction;
};

uniform lightingUniforms {
  int enabled;
  int lightType;

  int directionalLightCount;
  int pointLightCount;

  vec3 ambientColor;

  vec3 lightColor0;
  vec3 lightPosition0;
  vec3 lightDirection0;
  vec3 lightAttenuation0;

  vec3 lightColor1;
  vec3 lightPosition1;
  vec3 lightDirection1;
  vec3 lightAttenuation1;

  vec3 lightColor2;
  vec3 lightPosition2;
  vec3 lightDirection2;
  vec3 lightAttenuation2;
} lighting;

PointLight lighting_getPointLight(int index) {
  switch (index) {
    case 0:
      return PointLight(lighting.lightColor0, lighting.lightPosition0, lighting.lightAttenuation0);
    case 1:
      return PointLight(lighting.lightColor1, lighting.lightPosition1, lighting.lightAttenuation1);
    case 2:
    default:  
      return PointLight(lighting.lightColor2, lighting.lightPosition2, lighting.lightAttenuation2);
  }
}

DirectionalLight lighting_getDirectionalLight(int index) {
  switch (index) {
    case 0:
      return DirectionalLight(lighting.lightColor0, lighting.lightDirection0);
    case 1:
      return DirectionalLight(lighting.lightColor1, lighting.lightDirection1);
    case 2:
    default:   
      return DirectionalLight(lighting.lightColor2, lighting.lightDirection2);
  }
} 

float getPointLightAttenuation(PointLight pointLight, float distance) {
  return pointLight.attenuation.x
       + pointLight.attenuation.y * distance
       + pointLight.attenuation.z * distance * distance;
}

// #endif
`,ti=`// #if (defined(SHADER_TYPE_FRAGMENT) && defined(LIGHTING_FRAGMENT)) || (defined(SHADER_TYPE_VERTEX) && defined(LIGHTING_VERTEX))
struct AmbientLight {
  color: vec3<f32>,
};

struct PointLight {
  color: vec3<f32>,
  position: vec3<f32>,
  attenuation: vec3<f32>, // 2nd order x:Constant-y:Linear-z:Exponential
};

struct DirectionalLight {
  color: vec3<f32>,
  direction: vec3<f32>,
};

struct lightingUniforms {
  enabled: i32,
  pointLightCount: i32,
  directionalLightCount: i32,

  ambientColor: vec3<f32>,

  // TODO - support multiple lights by uncommenting arrays below
  lightType: i32,
  lightColor: vec3<f32>,
  lightDirection: vec3<f32>,
  lightPosition: vec3<f32>,
  lightAttenuation: vec3<f32>,

  // AmbientLight ambientLight;
  // PointLight pointLight[MAX_LIGHTS];
  // DirectionalLight directionalLight[MAX_LIGHTS];
};

// Binding 0:1 is reserved for lighting (Note: could go into separate bind group as it is stable across draw calls)
@binding(1) @group(0) var<uniform> lighting : lightingUniforms;

fn lighting_getPointLight(index: i32) -> PointLight {
  return PointLight(lighting.lightColor, lighting.lightPosition, lighting.lightAttenuation);
}

fn lighting_getDirectionalLight(index: i32) -> DirectionalLight {
  return DirectionalLight(lighting.lightColor, lighting.lightDirection);
} 

fn getPointLightAttenuation(pointLight: PointLight, distance: f32) -> f32 {
  return pointLight.attenuation.x
       + pointLight.attenuation.y * distance
       + pointLight.attenuation.z * distance * distance;
}
`,be=3,ei=255;var lt;(function(n){n[n.POINT=0]="POINT",n[n.DIRECTIONAL=1]="DIRECTIONAL"})(lt||(lt={}));const xt={props:{},uniforms:{},name:"lighting",defines:{MAX_LIGHTS:be},uniformTypes:{enabled:"i32",lightType:"i32",directionalLightCount:"i32",pointLightCount:"i32",ambientLightColor:"vec3<f32>",lightColor0:"vec3<f32>",lightPosition0:"vec3<f32>",lightDirection0:"vec3<f32>",lightAttenuation0:"vec3<f32>",lightColor1:"vec3<f32>",lightPosition1:"vec3<f32>",lightDirection1:"vec3<f32>",lightAttenuation1:"vec3<f32>",lightColor2:"vec3<f32>",lightPosition2:"vec3<f32>",lightDirection2:"vec3<f32>",lightAttenuation2:"vec3<f32>"},defaultUniforms:{enabled:1,lightType:lt.POINT,directionalLightCount:0,pointLightCount:0,ambientLightColor:[.1,.1,.1],lightColor0:[1,1,1],lightPosition0:[1,1,2],lightDirection0:[1,1,1],lightAttenuation0:[1,0,0],lightColor1:[1,1,1],lightPosition1:[1,1,2],lightDirection1:[1,1,1],lightAttenuation1:[1,0,0],lightColor2:[1,1,1],lightPosition2:[1,1,2],lightDirection2:[1,1,1],lightAttenuation2:[1,0,0]},source:ti,vs:Kt,fs:Kt,getUniforms:ii};function ii(n,t={}){if(n=n&&{...n},!n)return{...xt.defaultUniforms};n.lights&&(n={...n,...ni(n.lights),lights:void 0});const{ambientLight:e,pointLights:i,directionalLights:o}=n||{};if(!(e||i&&i.length>0||o&&o.length>0))return{...xt.defaultUniforms,enabled:0};const r={...xt.defaultUniforms,...t,...oi({ambientLight:e,pointLights:i,directionalLights:o})};return n.enabled!==void 0&&(r.enabled=n.enabled?1:0),r}function oi({ambientLight:n,pointLights:t=[],directionalLights:e=[]}){const i={};i.ambientLightColor=Tt(n);let o=0;for(const s of t){i.lightType=lt.POINT;const r=o;i[`lightColor${r}`]=Tt(s),i[`lightPosition${r}`]=s.position,i[`lightAttenuation${r}`]=s.attenuation||[1,0,0],o++}for(const s of e){i.lightType=lt.DIRECTIONAL;const r=o;i[`lightColor${r}`]=Tt(s),i[`lightDirection${r}`]=s.direction,o++}return o>be&&Ve.warn("MAX_LIGHTS exceeded")(),i.directionalLightCount=e.length,i.pointLightCount=t.length,i}function ni(n){const t={pointLights:[],directionalLights:[]};for(const e of n||[])switch(e.type){case"ambient":t.ambientLight=e;break;case"directional":t.directionalLights?.push(e);break;case"point":t.pointLights?.push(e);break}return t}function Tt(n={}){const{color:t=[0,0,0],intensity:e=1}=n;return t.map(i=>i*e/ei)}const si=`uniform phongMaterialUniforms {
  uniform float ambient;
  uniform float diffuse;
  uniform float shininess;
  uniform vec3  specularColor;
} material;
`,ri=`uniform phongMaterialUniforms {
  uniform float ambient;
  uniform float diffuse;
  uniform float shininess;
  uniform vec3  specularColor;
} material;

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 light_direction, vec3 view_direction, vec3 normal_worldspace, vec3 color) {
  vec3 halfway_direction = normalize(light_direction + view_direction);
  float lambertian = dot(light_direction, normal_worldspace);
  float specular = 0.0;
  if (lambertian > 0.0) {
    float specular_angle = max(dot(normal_worldspace, halfway_direction), 0.0);
    specular = pow(specular_angle, material.shininess);
  }
  lambertian = max(lambertian, 0.0);
  return (lambertian * material.diffuse * surfaceColor + specular * material.specularColor) * color;
}

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 cameraPosition, vec3 position_worldspace, vec3 normal_worldspace) {
  vec3 lightColor = surfaceColor;

  if (lighting.enabled == 0) {
    return lightColor;
  }

  vec3 view_direction = normalize(cameraPosition - position_worldspace);
  lightColor = material.ambient * surfaceColor * lighting.ambientColor;

  for (int i = 0; i < lighting.pointLightCount; i++) {
    PointLight pointLight = lighting_getPointLight(i);
    vec3 light_position_worldspace = pointLight.position;
    vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
    float light_attenuation = getPointLightAttenuation(pointLight, distance(light_position_worldspace, position_worldspace));
    lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color / light_attenuation);
  }

  int totalLights = min(MAX_LIGHTS, lighting.pointLightCount + lighting.directionalLightCount);
  for (int i = lighting.pointLightCount; i < totalLights; i++) {
    DirectionalLight directionalLight = lighting_getDirectionalLight(i);
    lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
  }
  
  return lightColor;
}
`,ai=`struct phongMaterialUniforms {
  ambient: f32,
  diffuse: f32,
  shininess: f32,
  specularColor: vec3<f32>,
};

@binding(2) @group(0) var<uniform> phongMaterial : phongMaterialUniforms;

fn lighting_getLightColor(surfaceColor: vec3<f32>, light_direction: vec3<f32>, view_direction: vec3<f32>, normal_worldspace: vec3<f32>, color: vec3<f32>) -> vec3<f32> {
  let halfway_direction: vec3<f32> = normalize(light_direction + view_direction);
  var lambertian: f32 = dot(light_direction, normal_worldspace);
  var specular: f32 = 0.0;
  if (lambertian > 0.0) {
    let specular_angle = max(dot(normal_worldspace, halfway_direction), 0.0);
    specular = pow(specular_angle, phongMaterial.shininess);
  }
  lambertian = max(lambertian, 0.0);
  return (lambertian * phongMaterial.diffuse * surfaceColor + specular * phongMaterial.specularColor) * color;
}

fn lighting_getLightColor2(surfaceColor: vec3<f32>, cameraPosition: vec3<f32>, position_worldspace: vec3<f32>, normal_worldspace: vec3<f32>) -> vec3<f32> {
  var lightColor: vec3<f32> = surfaceColor;

  if (lighting.enabled == 0) {
    return lightColor;
  }

  let view_direction: vec3<f32> = normalize(cameraPosition - position_worldspace);
  lightColor = phongMaterial.ambient * surfaceColor * lighting.ambientColor;

  if (lighting.lightType == 0) {
    let pointLight: PointLight  = lighting_getPointLight(0);
    let light_position_worldspace: vec3<f32> = pointLight.position;
    let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
    lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color);
  } else if (lighting.lightType == 1) {
    var directionalLight: DirectionalLight = lighting_getDirectionalLight(0);
    lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
  }
  
  return lightColor;
  /*
  for (int i = 0; i < MAX_LIGHTS; i++) {
    if (i >= lighting.pointLightCount) {
      break;
    }
    PointLight pointLight = lighting.pointLight[i];
    vec3 light_position_worldspace = pointLight.position;
    vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
    lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color);
  }

  for (int i = 0; i < MAX_LIGHTS; i++) {
    if (i >= lighting.directionalLightCount) {
      break;
    }
    DirectionalLight directionalLight = lighting.directionalLight[i];
    lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
  }
  */
}

fn lighting_getSpecularLightColor(cameraPosition: vec3<f32>, position_worldspace: vec3<f32>, normal_worldspace: vec3<f32>) -> vec3<f32>{
  var lightColor = vec3<f32>(0, 0, 0);
  let surfaceColor = vec3<f32>(0, 0, 0);

  if (lighting.enabled == 0) {
    let view_direction = normalize(cameraPosition - position_worldspace);

    switch (lighting.lightType) {
      case 0, default: {
        let pointLight: PointLight = lighting_getPointLight(0);
        let light_position_worldspace: vec3<f32> = pointLight.position;
        let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
        lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color);
      }
      case 1: {
        let directionalLight: DirectionalLight = lighting_getDirectionalLight(0);
        lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
      }
    }
  }
  return lightColor;
}
`,we={props:{},name:"gouraudMaterial",vs:ri.replace("phongMaterial","gouraudMaterial"),fs:si.replace("phongMaterial","gouraudMaterial"),source:ai.replaceAll("phongMaterial","gouraudMaterial"),defines:{LIGHTING_VERTEX:1},dependencies:[xt],uniformTypes:{ambient:"f32",diffuse:"f32",shininess:"f32",specularColor:"vec3<f32>"},defaultUniforms:{ambient:.35,diffuse:.6,shininess:32,specularColor:[.15,.15,.15]},getUniforms(n){const t={...n};return t.specularColor&&(t.specularColor=t.specularColor.map(e=>e/255)),{...we.defaultUniforms,...t}}},li="compositeLayer.renderLayers";class Dt extends q{get isComposite(){return!0}get isDrawable(){return!1}get isLoaded(){return super.isLoaded&&this.getSubLayers().every(t=>t.isLoaded)}getSubLayers(){return this.internalState&&this.internalState.subLayers||[]}initializeState(t){}setState(t){super.setState(t),this.setNeedsUpdate()}getPickingInfo({info:t}){const{object:e}=t;return e&&e.__source&&e.__source.parent&&e.__source.parent.id===this.id&&(t.object=e.__source.object,t.index=e.__source.index),t}filterSubLayer(t){return!0}shouldRenderSubLayer(t,e){return e&&e.length}getSubLayerClass(t,e){const{_subLayerProps:i}=this.props;return i&&i[t]&&i[t].type||e}getSubLayerRow(t,e,i){return t.__source={parent:this,object:e,index:i},t}getSubLayerAccessor(t){if(typeof t=="function"){const e={index:-1,data:this.props.data,target:[]};return(i,o)=>i&&i.__source?(e.index=i.__source.index,t(i.__source.object,e)):t(i,o)}return t}getSubLayerProps(t={}){const{opacity:e,pickable:i,visible:o,parameters:s,getPolygonOffset:r,highlightedObjectIndex:a,autoHighlight:l,highlightColor:g,coordinateSystem:d,coordinateOrigin:h,wrapLongitude:p,positionFormat:P,modelMatrix:C,extensions:L,fetch:b,operation:T,_subLayerProps:z}=this.props,S={id:"",updateTriggers:{},opacity:e,pickable:i,visible:o,parameters:s,getPolygonOffset:r,highlightedObjectIndex:a,autoHighlight:l,highlightColor:g,coordinateSystem:d,coordinateOrigin:h,wrapLongitude:p,positionFormat:P,modelMatrix:C,extensions:L,fetch:b,operation:T},B=z&&t.id&&z[t.id],O=B&&B.updateTriggers,R=t.id||"sublayer";if(B){const U=this.props[je],H=t.type?t.type._propTypes:{};for(const W in B){const Z=H[W]||U[W];Z&&Z.type==="accessor"&&(B[W]=this.getSubLayerAccessor(B[W]))}}Object.assign(S,t,B),S.id=`${this.props.id}-${R}`,S.updateTriggers={all:this.props.updateTriggers?.all,...t.updateTriggers,...O};for(const U of L){const H=U.getSubLayerProps.call(this,U);H&&Object.assign(S,H,{updateTriggers:Object.assign(S.updateTriggers,H.updateTriggers)})}return S}_updateAutoHighlight(t){for(const e of this.getSubLayers())e.updateAutoHighlight(t)}_getAttributeManager(){return null}_postUpdate(t,e){let i=this.internalState.subLayers;const o=!i||this.needsUpdate();if(o){const s=this.renderLayers();i=$e(s,Boolean),this.internalState.subLayers=i}Ke(li,this,o,i);for(const s of i)s.parent=this}}Dt.layerName="CompositeLayer";class Te{constructor(t){this.indexStarts=[0],this.vertexStarts=[0],this.vertexCount=0,this.instanceCount=0;const{attributes:e={}}=t;this.typedArrayManager=Ze,this.attributes={},this._attributeDefs=e,this.opts=t,this.updateGeometry(t)}updateGeometry(t){Object.assign(this.opts,t);const{data:e,buffers:i={},getGeometry:o,geometryBuffer:s,positionFormat:r,dataChanged:a,normalize:l=!0}=this.opts;if(this.data=e,this.getGeometry=o,this.positionSize=s&&s.size||(r==="XY"?2:3),this.buffers=i,this.normalize=l,s&&(Xe(e.startIndices),this.getGeometry=this.getGeometryFromBuffer(s),l||(i.vertexPositions=s)),this.geometryBuffer=i.vertexPositions,Array.isArray(a))for(const g of a)this._rebuildGeometry(g);else this._rebuildGeometry()}updatePartialGeometry({startRow:t,endRow:e}){this._rebuildGeometry({startRow:t,endRow:e})}getGeometryFromBuffer(t){const e=t.value||t;return ArrayBuffer.isView(e)?Ye(e,{size:this.positionSize,offset:t.offset,stride:t.stride,startIndices:this.data.startIndices}):null}_allocate(t,e){const{attributes:i,buffers:o,_attributeDefs:s,typedArrayManager:r}=this;for(const a in s)if(a in o)r.release(i[a]),i[a]=null;else{const l=s[a];l.copy=e,i[a]=r.allocate(i[a],t,l)}}_forEachGeometry(t,e,i){const{data:o,getGeometry:s}=this,{iterable:r,objectInfo:a}=Bt(o,e,i);for(const l of r){a.index++;const g=s?s(l,a):null;t(g,a.index)}}_rebuildGeometry(t){if(!this.data)return;let{indexStarts:e,vertexStarts:i,instanceCount:o}=this;const{data:s,geometryBuffer:r}=this,{startRow:a=0,endRow:l=1/0}=t||{},g={};if(t||(e=[0],i=[0]),this.normalize||!r)this._forEachGeometry((h,p)=>{const P=h&&this.normalizeGeometry(h);g[p]=P,i[p+1]=i[p]+(P?this.getGeometrySize(P):0)},a,l),o=i[i.length-1];else if(i=s.startIndices,o=i[s.length]||0,ArrayBuffer.isView(r))o=o||r.length/this.positionSize;else if(r instanceof Je){const h=this.positionSize*4;o=o||r.byteLength/h}else if(r.buffer){const h=r.stride||this.positionSize*4;o=o||r.buffer.byteLength/h}else if(r.value){const h=r.value,p=r.stride/h.BYTES_PER_ELEMENT||this.positionSize;o=o||h.length/p}this._allocate(o,!!t),this.indexStarts=e,this.vertexStarts=i,this.instanceCount=o;const d={};this._forEachGeometry((h,p)=>{const P=g[p]||h;d.vertexStart=i[p],d.indexStart=e[p];const C=p<i.length-1?i[p+1]:o;d.geometrySize=C-i[p],d.geometryIndex=p,this.updateGeometryAttributes(P,d)},a,l),this.vertexCount=e[e.length-1]}}const Zt=`uniform iconUniforms {
  float sizeScale;
  vec2 iconsTextureDim;
  float sizeMinPixels;
  float sizeMaxPixels;
  bool billboard;
  highp int sizeUnits;
  float alphaCutoff;
} icon;
`,ci={name:"icon",vs:Zt,fs:Zt,uniformTypes:{sizeScale:"f32",iconsTextureDim:"vec2<f32>",sizeMinPixels:"f32",sizeMaxPixels:"f32",billboard:"f32",sizeUnits:"i32",alphaCutoff:"f32"}},gi=`#version 300 es
#define SHADER_NAME icon-layer-vertex-shader
in vec2 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in float instanceSizes;
in float instanceAngles;
in vec4 instanceColors;
in vec3 instancePickingColors;
in vec4 instanceIconFrames;
in float instanceColorModes;
in vec2 instanceOffsets;
in vec2 instancePixelOffset;
out float vColorMode;
out vec4 vColor;
out vec2 vTextureCoords;
out vec2 uv;
vec2 rotate_by_angle(vec2 vertex, float angle) {
float angle_radian = angle * PI / 180.0;
float cos_angle = cos(angle_radian);
float sin_angle = sin(angle_radian);
mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
return rotationMatrix * vertex;
}
void main(void) {
geometry.worldPosition = instancePositions;
geometry.uv = positions;
geometry.pickingColor = instancePickingColors;
uv = positions;
vec2 iconSize = instanceIconFrames.zw;
float sizePixels = clamp(
project_size_to_pixel(instanceSizes * icon.sizeScale, icon.sizeUnits),
icon.sizeMinPixels, icon.sizeMaxPixels
);
float instanceScale = iconSize.y == 0.0 ? 0.0 : sizePixels / iconSize.y;
vec2 pixelOffset = positions / 2.0 * iconSize + instanceOffsets;
pixelOffset = rotate_by_angle(pixelOffset, instanceAngles) * instanceScale;
pixelOffset += instancePixelOffset;
pixelOffset.y *= -1.0;
if (icon.billboard)  {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = vec3(pixelOffset, 0.0);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
DECKGL_FILTER_SIZE(offset_common, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
vTextureCoords = mix(
instanceIconFrames.xy,
instanceIconFrames.xy + iconSize,
(positions.xy + 1.0) / 2.0
) / icon.iconsTextureDim;
vColor = instanceColors;
DECKGL_FILTER_COLOR(vColor, geometry);
vColorMode = instanceColorModes;
}
`,ui=`#version 300 es
#define SHADER_NAME icon-layer-fragment-shader
precision highp float;
uniform sampler2D iconsTexture;
in float vColorMode;
in vec4 vColor;
in vec2 vTextureCoords;
in vec2 uv;
out vec4 fragColor;
void main(void) {
geometry.uv = uv;
vec4 texColor = texture(iconsTexture, vTextureCoords);
vec3 color = mix(texColor.rgb, vColor.rgb, vColorMode);
float a = texColor.a * layer.opacity * vColor.a;
if (a < icon.alphaCutoff) {
discard;
}
fragColor = vec4(color, a);
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,di=1024,fi=4,Xt=()=>{},Yt={minFilter:"linear",mipmapFilter:"linear",magFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"},hi={x:0,y:0,width:0,height:0};function pi(n){return Math.pow(2,Math.ceil(Math.log2(n)))}function yi(n,t,e,i){const o=Math.min(e/t.width,i/t.height),s=Math.floor(t.width*o),r=Math.floor(t.height*o);return o===1?{image:t,width:s,height:r}:(n.canvas.height=r,n.canvas.width=s,n.clearRect(0,0,s,r),n.drawImage(t,0,0,t.width,t.height,0,0,s,r),{image:n.canvas,width:s,height:r})}function ct(n){return n&&(n.id||n.url)}function vi(n,t,e,i){const{width:o,height:s,device:r}=n,a=r.createTexture({format:"rgba8unorm",width:t,height:e,sampler:i,mipmaps:!0}),l=r.createCommandEncoder();return l.copyTextureToTexture({sourceTexture:n,destinationTexture:a,width:o,height:s}),l.finish(),n.destroy(),a}function Jt(n,t,e){for(let i=0;i<t.length;i++){const{icon:o,xOffset:s}=t[i],r=ct(o);n[r]={...o,x:s,y:e}}}function xi({icons:n,buffer:t,mapping:e={},xOffset:i=0,yOffset:o=0,rowHeight:s=0,canvasWidth:r}){let a=[];for(let l=0;l<n.length;l++){const g=n[l],d=ct(g);if(!e[d]){const{height:h,width:p}=g;i+p+t>r&&(Jt(e,a,o),i=0,o=s+o+t,s=0,a=[]),a.push({icon:g,xOffset:i}),i=i+p+t,s=Math.max(s,h)}}return a.length>0&&Jt(e,a,o),{mapping:e,rowHeight:s,xOffset:i,yOffset:o,canvasWidth:r,canvasHeight:pi(s+o+t)}}function mi(n,t,e){if(!n||!t)return null;e=e||{};const i={},{iterable:o,objectInfo:s}=Bt(n);for(const r of o){s.index++;const a=t(r,s),l=ct(a);if(!a)throw new Error("Icon is missing.");if(!a.url)throw new Error("Icon url is missing.");!i[l]&&(!e[l]||a.url!==e[l].url)&&(i[l]={...a,source:r,sourceIndex:s.index})}return i}class Pi{constructor(t,{onUpdate:e=Xt,onError:i=Xt}){this._loadOptions=null,this._texture=null,this._externalTexture=null,this._mapping={},this._samplerParameters=null,this._pendingCount=0,this._autoPacking=!1,this._xOffset=0,this._yOffset=0,this._rowHeight=0,this._buffer=fi,this._canvasWidth=di,this._canvasHeight=0,this._canvas=null,this.device=t,this.onUpdate=e,this.onError=i}finalize(){this._texture?.delete()}getTexture(){return this._texture||this._externalTexture}getIconMapping(t){const e=this._autoPacking?ct(t):t;return this._mapping[e]||hi}setProps({loadOptions:t,autoPacking:e,iconAtlas:i,iconMapping:o,textureParameters:s}){t&&(this._loadOptions=t),e!==void 0&&(this._autoPacking=e),o&&(this._mapping=o),i&&(this._texture?.delete(),this._texture=null,this._externalTexture=i),s&&(this._samplerParameters=s)}get isLoaded(){return this._pendingCount===0}packIcons(t,e){if(!this._autoPacking||typeof document>"u")return;const i=Object.values(mi(t,e,this._mapping)||{});if(i.length>0){const{mapping:o,xOffset:s,yOffset:r,rowHeight:a,canvasHeight:l}=xi({icons:i,buffer:this._buffer,canvasWidth:this._canvasWidth,mapping:this._mapping,rowHeight:this._rowHeight,xOffset:this._xOffset,yOffset:this._yOffset});this._rowHeight=a,this._mapping=o,this._xOffset=s,this._yOffset=r,this._canvasHeight=l,this._texture||(this._texture=this.device.createTexture({format:"rgba8unorm",width:this._canvasWidth,height:this._canvasHeight,sampler:this._samplerParameters||Yt,mipmaps:!0})),this._texture.height!==this._canvasHeight&&(this._texture=vi(this._texture,this._canvasWidth,this._canvasHeight,this._samplerParameters||Yt)),this.onUpdate(),this._canvas=this._canvas||document.createElement("canvas"),this._loadIcons(i)}}_loadIcons(t){const e=this._canvas.getContext("2d",{willReadFrequently:!0});for(const i of t)this._pendingCount++,qe(i.url,this._loadOptions).then(o=>{const s=ct(i),r=this._mapping[s],{x:a,y:l,width:g,height:d}=r,{image:h,width:p,height:P}=yi(e,o,g,d);this._texture?.copyExternalImage({image:h,x:a+(g-p)/2,y:l+(d-P)/2,width:p,height:P}),r.width=p,r.height=P,this._texture.generateMipmap(),this.onUpdate()}).catch(o=>{this.onError({url:i.url,source:i.source,sourceIndex:i.sourceIndex,loadOptions:this._loadOptions,error:o})}).finally(()=>{this._pendingCount--})}}const Ae=[0,0,0,255],_i={iconAtlas:{type:"image",value:null,async:!0},iconMapping:{type:"object",value:{},async:!0},sizeScale:{type:"number",value:1,min:0},billboard:!0,sizeUnits:"pixels",sizeMinPixels:{type:"number",min:0,value:0},sizeMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},alphaCutoff:{type:"number",value:.05,min:0,max:1},getPosition:{type:"accessor",value:n=>n.position},getIcon:{type:"accessor",value:n=>n.icon},getColor:{type:"accessor",value:Ae},getSize:{type:"accessor",value:1},getAngle:{type:"accessor",value:0},getPixelOffset:{type:"accessor",value:[0,0]},onIconError:{type:"function",value:null,optional:!0},textureParameters:{type:"object",ignore:!0,value:null}};class bt extends q{getShaders(){return super.getShaders({vs:gi,fs:ui,modules:[ut,dt,ci]})}initializeState(){this.state={iconManager:new Pi(this.context.device,{onUpdate:this._onUpdate.bind(this),onError:this._onError.bind(this)})},this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceSizes:{size:1,transition:!0,accessor:"getSize",defaultValue:1},instanceOffsets:{size:2,accessor:"getIcon",transform:this.getInstanceOffset},instanceIconFrames:{size:4,accessor:"getIcon",transform:this.getInstanceIconFrame},instanceColorModes:{size:1,type:"uint8",accessor:"getIcon",transform:this.getInstanceColorMode},instanceColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,accessor:"getColor",defaultValue:Ae},instanceAngles:{size:1,transition:!0,accessor:"getAngle"},instancePixelOffset:{size:2,transition:!0,accessor:"getPixelOffset"}})}updateState(t){super.updateState(t);const{props:e,oldProps:i,changeFlags:o}=t,s=this.getAttributeManager(),{iconAtlas:r,iconMapping:a,data:l,getIcon:g,textureParameters:d}=e,{iconManager:h}=this.state;if(typeof r=="string")return;const p=r||this.internalState.isAsyncPropLoading("iconAtlas");h.setProps({loadOptions:e.loadOptions,autoPacking:!p,iconAtlas:r,iconMapping:p?a:null,textureParameters:d}),p?i.iconMapping!==e.iconMapping&&s.invalidate("getIcon"):(o.dataChanged||o.updateTriggersChanged&&(o.updateTriggersChanged.all||o.updateTriggersChanged.getIcon))&&h.packIcons(l,g),o.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),s.invalidateAll())}get isLoaded(){return super.isLoaded&&this.state.iconManager.isLoaded}finalizeState(t){super.finalizeState(t),this.state.iconManager.finalize()}draw({uniforms:t}){const{sizeScale:e,sizeMinPixels:i,sizeMaxPixels:o,sizeUnits:s,billboard:r,alphaCutoff:a}=this.props,{iconManager:l}=this.state,g=l.getTexture();if(g){const d=this.state.model,h={iconsTexture:g,iconsTextureDim:[g.width,g.height],sizeUnits:at[s],sizeScale:e,sizeMinPixels:i,sizeMaxPixels:o,billboard:r,alphaCutoff:a};d.shaderInputs.setProps({icon:h}),d.draw(this.context.renderPass)}}_getModel(){const t=[-1,-1,1,-1,-1,1,1,1];return new X(this.context.device,{...this.getShaders(),id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new J({topology:"triangle-strip",attributes:{positions:{size:2,value:new Float32Array(t)}}}),isInstanced:!0})}_onUpdate(){this.setNeedsRedraw()}_onError(t){const e=this.getCurrentLayer()?.props.onIconError;e?e(t):$.error(t.error.message)()}getInstanceOffset(t){const{width:e,height:i,anchorX:o=e/2,anchorY:s=i/2}=this.state.iconManager.getIconMapping(t);return[e/2-o,i/2-s]}getInstanceColorMode(t){return this.state.iconManager.getIconMapping(t).mask?1:0}getInstanceIconFrame(t){const{x:e,y:i,width:o,height:s}=this.state.iconManager.getIconMapping(t);return[e,i,o,s]}}bt.defaultProps=_i;bt.layerName="IconLayer";const qt=`uniform scatterplotUniforms {
  float radiusScale;
  float radiusMinPixels;
  float radiusMaxPixels;
  float lineWidthScale;
  float lineWidthMinPixels;
  float lineWidthMaxPixels;
  float stroked;
  float filled;
  bool antialiasing;
  bool billboard;
  highp int radiusUnits;
  highp int lineWidthUnits;
} scatterplot;
`,Li={name:"scatterplot",vs:qt,fs:qt,source:"",uniformTypes:{radiusScale:"f32",radiusMinPixels:"f32",radiusMaxPixels:"f32",lineWidthScale:"f32",lineWidthMinPixels:"f32",lineWidthMaxPixels:"f32",stroked:"f32",filled:"f32",antialiasing:"f32",billboard:"f32",radiusUnits:"i32",lineWidthUnits:"i32"}},Ci=`#version 300 es
#define SHADER_NAME scatterplot-layer-vertex-shader
in vec3 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in float instanceRadius;
in float instanceLineWidths;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
in vec3 instancePickingColors;
out vec4 vFillColor;
out vec4 vLineColor;
out vec2 unitPosition;
out float innerUnitRadius;
out float outerRadiusPixels;
void main(void) {
geometry.worldPosition = instancePositions;
outerRadiusPixels = clamp(
project_size_to_pixel(scatterplot.radiusScale * instanceRadius, scatterplot.radiusUnits),
scatterplot.radiusMinPixels, scatterplot.radiusMaxPixels
);
float lineWidthPixels = clamp(
project_size_to_pixel(scatterplot.lineWidthScale * instanceLineWidths, scatterplot.lineWidthUnits),
scatterplot.lineWidthMinPixels, scatterplot.lineWidthMaxPixels
);
outerRadiusPixels += scatterplot.stroked * lineWidthPixels / 2.0;
float edgePadding = scatterplot.antialiasing ? (outerRadiusPixels + SMOOTH_EDGE_RADIUS) / outerRadiusPixels : 1.0;
unitPosition = edgePadding * positions.xy;
geometry.uv = unitPosition;
geometry.pickingColor = instancePickingColors;
innerUnitRadius = 1.0 - scatterplot.stroked * lineWidthPixels / outerRadiusPixels;
if (scatterplot.billboard) {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = edgePadding * positions * outerRadiusPixels;
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset = edgePadding * positions * project_pixel_size(outerRadiusPixels);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
vFillColor = vec4(instanceFillColors.rgb, instanceFillColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vFillColor, geometry);
vLineColor = vec4(instanceLineColors.rgb, instanceLineColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vLineColor, geometry);
}
`,Si=`#version 300 es
#define SHADER_NAME scatterplot-layer-fragment-shader
precision highp float;
in vec4 vFillColor;
in vec4 vLineColor;
in vec2 unitPosition;
in float innerUnitRadius;
in float outerRadiusPixels;
out vec4 fragColor;
void main(void) {
geometry.uv = unitPosition;
float distToCenter = length(unitPosition) * outerRadiusPixels;
float inCircle = scatterplot.antialiasing ?
smoothedge(distToCenter, outerRadiusPixels) :
step(distToCenter, outerRadiusPixels);
if (inCircle == 0.0) {
discard;
}
if (scatterplot.stroked > 0.5) {
float isLine = scatterplot.antialiasing ?
smoothedge(innerUnitRadius * outerRadiusPixels, distToCenter) :
step(innerUnitRadius * outerRadiusPixels, distToCenter);
if (scatterplot.filled > 0.5) {
fragColor = mix(vFillColor, vLineColor, isLine);
} else {
if (isLine == 0.0) {
discard;
}
fragColor = vec4(vLineColor.rgb, vLineColor.a * isLine);
}
} else if (scatterplot.filled < 0.5) {
discard;
} else {
fragColor = vFillColor;
}
fragColor.a *= inCircle;
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,bi=`// TODO(ibgreen): Hack for Layer uniforms (move to new "color" module?)

struct LayerUniforms {
  opacity: f32,
};

var<private> layer: LayerUniforms = LayerUniforms(1.0);
// @group(0) @binding(1) var<uniform> layer: LayerUniforms;

// Main shaders

struct ScatterplotUniforms {
  radiusScale: f32,
  radiusMinPixels: f32,
  radiusMaxPixels: f32,
  lineWidthScale: f32,
  lineWidthMinPixels: f32,
  lineWidthMaxPixels: f32,
  stroked: f32,
  filled: i32,
  antialiasing: i32,
  billboard: i32,
  radiusUnits: i32,
  lineWidthUnits: i32,
};

struct ConstantAttributeUniforms {
 instancePositions: vec3<f32>,
 instancePositions64Low: vec3<f32>,
 instanceRadius: f32,
 instanceLineWidths: f32,
 instanceFillColors: vec4<f32>,
 instanceLineColors: vec4<f32>,
 instancePickingColors: vec3<f32>,

 instancePositionsConstant: i32,
 instancePositions64LowConstant: i32,
 instanceRadiusConstant: i32,
 instanceLineWidthsConstant: i32,
 instanceFillColorsConstant: i32,
 instanceLineColorsConstant: i32,
 instancePickingColorsConstant: i32
};

@group(0) @binding(2) var<uniform> scatterplot: ScatterplotUniforms;

struct ConstantAttributes {
  instancePositions: vec3<f32>,
  instancePositions64Low: vec3<f32>,
  instanceRadius: f32,
  instanceLineWidths: f32,
  instanceFillColors: vec4<f32>,
  instanceLineColors: vec4<f32>,
  instancePickingColors: vec3<f32>
};

const constants = ConstantAttributes(
  vec3<f32>(0.0),
  vec3<f32>(0.0),
  0.0,
  0.0,
  vec4<f32>(0.0, 0.0, 0.0, 1.0),
  vec4<f32>(0.0, 0.0, 0.0, 1.0),
  vec3<f32>(0.0)
);

struct Attributes {
  @builtin(instance_index) instanceIndex : u32,
  @builtin(vertex_index) vertexIndex : u32,
  @location(0) positions: vec3<f32>,
  @location(1) instancePositions: vec3<f32>,
  @location(2) instancePositions64Low: vec3<f32>,
  @location(3) instanceRadius: f32,
  @location(4) instanceLineWidths: f32,
  @location(5) instanceFillColors: vec4<f32>,
  @location(6) instanceLineColors: vec4<f32>,
  @location(7) instancePickingColors: vec3<f32>
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vFillColor: vec4<f32>,
  @location(1) vLineColor: vec4<f32>,
  @location(2) unitPosition: vec2<f32>,
  @location(3) innerUnitRadius: f32,
  @location(4) outerRadiusPixels: f32,
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var varyings: Varyings;

  // Draw an inline geometry constant array clip space triangle to verify that rendering works.
  // var positions = array<vec2<f32>, 3>(vec2(0.0, 0.5), vec2(-0.5, -0.5), vec2(0.5, -0.5));
  // if (attributes.instanceIndex == 0) {
  //   varyings.position = vec4<f32>(positions[attributes.vertexIndex], 0.0, 1.0);
  //   return varyings;
  // }

  // var geometry: Geometry;
  // geometry.worldPosition = instancePositions;

  // Multiply out radius and clamp to limits
  varyings.outerRadiusPixels = clamp(
    project_unit_size_to_pixel(scatterplot.radiusScale * attributes.instanceRadius, scatterplot.radiusUnits),
    scatterplot.radiusMinPixels, scatterplot.radiusMaxPixels
  );

  // Multiply out line width and clamp to limits
  let lineWidthPixels = clamp(
    project_unit_size_to_pixel(scatterplot.lineWidthScale * attributes.instanceLineWidths, scatterplot.lineWidthUnits),
    scatterplot.lineWidthMinPixels, scatterplot.lineWidthMaxPixels
  );

  // outer radius needs to offset by half stroke width
  varyings.outerRadiusPixels += scatterplot.stroked * lineWidthPixels / 2.0;
  // Expand geometry to accommodate edge smoothing
  let edgePadding = select(
    (varyings.outerRadiusPixels + SMOOTH_EDGE_RADIUS) / varyings.outerRadiusPixels,
    1.0,
    scatterplot.antialiasing != 0
  );

  // position on the containing square in [-1, 1] space
  varyings.unitPosition = edgePadding * attributes.positions.xy;
  geometry.uv = varyings.unitPosition;
  geometry.pickingColor = attributes.instancePickingColors;

  varyings.innerUnitRadius = 1.0 - scatterplot.stroked * lineWidthPixels / varyings.outerRadiusPixels;

  if (scatterplot.billboard != 0) {
    varyings.position = project_position_to_clipspace(attributes.instancePositions, attributes.instancePositions64Low, vec3<f32>(0.0)); // TODO , geometry.position);
    // DECKGL_FILTER_GL_POSITION(varyings.position, geometry);
    let offset = attributes.positions; // * edgePadding * varyings.outerRadiusPixels;
    // DECKGL_FILTER_SIZE(offset, geometry);
    let clipPixels = project_pixel_size_to_clipspace(offset.xy);
    varyings.position.x = clipPixels.x;
    varyings.position.y = clipPixels.y;
  } else {
    let offset = edgePadding * attributes.positions * project_pixel_size_float(varyings.outerRadiusPixels);
    // DECKGL_FILTER_SIZE(offset, geometry);
    varyings.position = project_position_to_clipspace(attributes.instancePositions, attributes.instancePositions64Low, offset); // TODO , geometry.position);
    // DECKGL_FILTER_GL_POSITION(varyings.position, geometry);
  }

  // Apply opacity to instance color, or return instance picking color
  varyings.vFillColor = vec4<f32>(attributes.instanceFillColors.rgb, attributes.instanceFillColors.a * layer.opacity);
  // DECKGL_FILTER_COLOR(varyings.vFillColor, geometry);
  varyings.vLineColor = vec4<f32>(attributes.instanceLineColors.rgb, attributes.instanceLineColors.a * layer.opacity);
  // DECKGL_FILTER_COLOR(varyings.vLineColor, geometry);

  return varyings;
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  // var geometry: Geometry;
  // geometry.uv = unitPosition;

  let distToCenter = length(varyings.unitPosition) * varyings.outerRadiusPixels;
  let inCircle = select(
    smoothedge(distToCenter, varyings.outerRadiusPixels),
    step(distToCenter, varyings.outerRadiusPixels),
    scatterplot.antialiasing != 0
  );

  if (inCircle == 0.0) {
    // discard;
  }

  var fragColor: vec4<f32>;

  if (scatterplot.stroked != 0) {
    let isLine = select(
      smoothedge(varyings.innerUnitRadius * varyings.outerRadiusPixels, distToCenter),
      step(varyings.innerUnitRadius * varyings.outerRadiusPixels, distToCenter),
      scatterplot.antialiasing != 0
    );

    if (scatterplot.filled != 0) {
      fragColor = mix(varyings.vFillColor, varyings.vLineColor, isLine);
    } else {
      if (isLine == 0.0) {
        // discard;
      }
      fragColor = vec4<f32>(varyings.vLineColor.rgb, varyings.vLineColor.a * isLine);
    }
  } else if (scatterplot.filled == 0) {
    // discard;
  } else {
    fragColor = varyings.vFillColor;
  }

  fragColor.a *= inCircle;
  // DECKGL_FILTER_COLOR(fragColor, geometry);

  return fragColor;
  // return vec4<f32>(0, 0, 1, 1);
}
`,Qt=[0,0,0,255],wi={radiusUnits:"meters",radiusScale:{type:"number",min:0,value:1},radiusMinPixels:{type:"number",min:0,value:0},radiusMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},lineWidthUnits:"meters",lineWidthScale:{type:"number",min:0,value:1},lineWidthMinPixels:{type:"number",min:0,value:0},lineWidthMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},stroked:!1,filled:!0,billboard:!1,antialiasing:!0,getPosition:{type:"accessor",value:n=>n.position},getRadius:{type:"accessor",value:1},getFillColor:{type:"accessor",value:Qt},getLineColor:{type:"accessor",value:Qt},getLineWidth:{type:"accessor",value:1},strokeWidth:{deprecatedFor:"getLineWidth"},outline:{deprecatedFor:"stroked"},getColor:{deprecatedFor:["getFillColor","getLineColor"]}};class Gt extends q{getShaders(){return super.getShaders({vs:Ci,fs:Si,source:bi,modules:[ut,dt,Li]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceRadius:{size:1,transition:!0,accessor:"getRadius",defaultValue:1},instanceFillColors:{size:this.props.colorFormat.length,transition:!0,type:"unorm8",accessor:"getFillColor",defaultValue:[0,0,0,255]},instanceLineColors:{size:this.props.colorFormat.length,transition:!0,type:"unorm8",accessor:"getLineColor",defaultValue:[0,0,0,255]},instanceLineWidths:{size:1,transition:!0,accessor:"getLineWidth",defaultValue:1}})}updateState(t){super.updateState(t),t.changeFlags.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),this.getAttributeManager().invalidateAll())}draw({uniforms:t}){const{radiusUnits:e,radiusScale:i,radiusMinPixels:o,radiusMaxPixels:s,stroked:r,filled:a,billboard:l,antialiasing:g,lineWidthUnits:d,lineWidthScale:h,lineWidthMinPixels:p,lineWidthMaxPixels:P}=this.props,C={stroked:r,filled:a,billboard:l,antialiasing:g,radiusUnits:at[e],radiusScale:i,radiusMinPixels:o,radiusMaxPixels:s,lineWidthUnits:at[d],lineWidthScale:h,lineWidthMinPixels:p,lineWidthMaxPixels:P},L=this.state.model;L.shaderInputs.setProps({scatterplot:C}),L.draw(this.context.renderPass)}_getModel(){const t=[-1,-1,0,1,-1,0,-1,1,0,1,1,0];return new X(this.context.device,{...this.getShaders(),id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new J({topology:"triangle-strip",attributes:{positions:{size:3,value:new Float32Array(t)}}}),isInstanced:!0})}}Gt.defaultProps=wi;Gt.layerName="ScatterplotLayer";const Ie={CLOCKWISE:1,COUNTER_CLOCKWISE:-1};function Ee(n,t,e={}){return Ti(n,e)!==t?(Ii(n,e),!0):!1}function Ti(n,t={}){return Math.sign(Ai(n,t))}const te={x:0,y:1,z:2};function Ai(n,t={}){const{start:e=0,end:i=n.length,plane:o="xy"}=t,s=t.size||2;let r=0;const a=te[o[0]],l=te[o[1]];for(let g=e,d=i-s;g<i;g+=s)r+=(n[g+a]-n[d+a])*(n[g+l]+n[d+l]),d=g;return r/2}function Ii(n,t){const{start:e=0,end:i=n.length,size:o=2}=t,s=(i-e)/o,r=Math.floor(s/2);for(let a=0;a<r;++a){const l=e+a*o,g=e+(s-1-a)*o;for(let d=0;d<o;++d){const h=n[l+d];n[l+d]=n[g+d],n[g+d]=h}}}function j(n,t){const e=t.length,i=n.length;if(i>0){let o=!0;for(let s=0;s<e;s++)if(n[i-e+s]!==t[s]){o=!1;break}if(o)return!1}for(let o=0;o<e;o++)n[i+o]=t[o];return!0}function Rt(n,t){const e=t.length;for(let i=0;i<e;i++)n[i]=t[i]}function gt(n,t,e,i,o=[]){const s=i+t*e;for(let r=0;r<e;r++)o[r]=n[s+r];return o}function Ft(n,t,e,i,o=[]){let s,r;if(e&8)s=(i[3]-n[1])/(t[1]-n[1]),r=3;else if(e&4)s=(i[1]-n[1])/(t[1]-n[1]),r=1;else if(e&2)s=(i[2]-n[0])/(t[0]-n[0]),r=2;else if(e&1)s=(i[0]-n[0])/(t[0]-n[0]),r=0;else return null;for(let a=0;a<n.length;a++)o[a]=(r&1)===a?i[r]:s*(t[a]-n[a])+n[a];return o}function mt(n,t){let e=0;return n[0]<t[0]?e|=1:n[0]>t[2]&&(e|=2),n[1]<t[1]?e|=4:n[1]>t[3]&&(e|=8),e}function Me(n,t){const{size:e=2,broken:i=!1,gridResolution:o=10,gridOffset:s=[0,0],startIndex:r=0,endIndex:a=n.length}=t||{},l=(a-r)/e;let g=[];const d=[g],h=gt(n,0,e,r);let p,P;const C=Oe(h,o,s,[]),L=[];j(g,h);for(let b=1;b<l;b++){for(p=gt(n,b,e,r,p),P=mt(p,C);P;){Ft(h,p,P,C,L);const T=mt(L,C);T&&(Ft(h,L,T,C,L),P=T),j(g,L),Rt(h,L),Mi(C,o,P),i&&g.length>e&&(g=[],d.push(g),j(g,h)),P=mt(p,C)}j(g,p),Rt(h,p)}return i?d:d[0]}const ee=0,Ei=1;function ze(n,t=null,e){if(!n.length)return[];const{size:i=2,gridResolution:o=10,gridOffset:s=[0,0],edgeTypes:r=!1}=e||{},a=[],l=[{pos:n,types:r?new Array(n.length/i).fill(Ei):null,holes:t||[]}],g=[[],[]];let d=[];for(;l.length;){const{pos:h,types:p,holes:P}=l.shift();zi(h,i,P[0]||h.length,g),d=Oe(g[0],o,s,d);const C=mt(g[1],d);if(C){let L=ie(h,p,i,0,P[0]||h.length,d,C);const b={pos:L[0].pos,types:L[0].types,holes:[]},T={pos:L[1].pos,types:L[1].types,holes:[]};l.push(b,T);for(let z=0;z<P.length;z++)L=ie(h,p,i,P[z],P[z+1]||h.length,d,C),L[0]&&(b.holes.push(b.pos.length),b.pos=ft(b.pos,L[0].pos),r&&(b.types=ft(b.types,L[0].types))),L[1]&&(T.holes.push(T.pos.length),T.pos=ft(T.pos,L[1].pos),r&&(T.types=ft(T.types,L[1].types)))}else{const L={positions:h};r&&(L.edgeTypes=p),P.length&&(L.holeIndices=P),a.push(L)}}return a}function ie(n,t,e,i,o,s,r){const a=(o-i)/e,l=[],g=[],d=[],h=[],p=[];let P,C,L;const b=gt(n,a-1,e,i);let T=Math.sign(r&8?b[1]-s[3]:b[0]-s[2]),z=t&&t[a-1],S=0,B=0;for(let O=0;O<a;O++)P=gt(n,O,e,i,P),C=Math.sign(r&8?P[1]-s[3]:P[0]-s[2]),L=t&&t[i/e+O],C&&T&&T!==C&&(Ft(b,P,r,s,p),j(l,p)&&d.push(z),j(g,p)&&h.push(z)),C<=0?(j(l,P)&&d.push(L),S-=C):d.length&&(d[d.length-1]=ee),C>=0?(j(g,P)&&h.push(L),B+=C):h.length&&(h[h.length-1]=ee),Rt(b,P),T=C,z=L;return[S?{pos:l,types:t&&d}:null,B?{pos:g,types:t&&h}:null]}function Oe(n,t,e,i){const o=Math.floor((n[0]-e[0])/t)*t+e[0],s=Math.floor((n[1]-e[1])/t)*t+e[1];return i[0]=o,i[1]=s,i[2]=o+t,i[3]=s+t,i}function Mi(n,t,e){e&8?(n[1]+=t,n[3]+=t):e&4?(n[1]-=t,n[3]-=t):e&2?(n[0]+=t,n[2]+=t):e&1&&(n[0]-=t,n[2]-=t)}function zi(n,t,e,i){let o=1/0,s=-1/0,r=1/0,a=-1/0;for(let l=0;l<e;l+=t){const g=n[l],d=n[l+1];o=g<o?g:o,s=g>s?g:s,r=d<r?d:r,a=d>a?d:a}return i[0][0]=o,i[0][1]=r,i[1][0]=s,i[1][1]=a,i}function ft(n,t){for(let e=0;e<t.length;e++)n.push(t[e]);return n}const Oi=85.051129;function Ri(n,t){const{size:e=2,startIndex:i=0,endIndex:o=n.length,normalize:s=!0}=t||{},r=n.slice(i,o);Re(r,e,0,o-i);const a=Me(r,{size:e,broken:!0,gridResolution:360,gridOffset:[-180,-180]});if(s)for(const l of a)Fe(l,e);return a}function Fi(n,t=null,e){const{size:i=2,normalize:o=!0,edgeTypes:s=!1}=e||{};t=t||[];const r=[],a=[];let l=0,g=0;for(let h=0;h<=t.length;h++){const p=t[h]||n.length,P=g,C=ki(n,i,l,p);for(let L=C;L<p;L++)r[g++]=n[L];for(let L=l;L<C;L++)r[g++]=n[L];Re(r,i,P,g),Bi(r,i,P,g,e?.maxLatitude),l=p,a[h]=g}a.pop();const d=ze(r,a,{size:i,gridResolution:360,gridOffset:[-180,-180],edgeTypes:s});if(o)for(const h of d)Fe(h.positions,i);return d}function ki(n,t,e,i){let o=-1,s=-1;for(let r=e+1;r<i;r+=t){const a=Math.abs(n[r]);a>o&&(o=a,s=r-1)}return s}function Bi(n,t,e,i,o=Oi){const s=n[e],r=n[i-t];if(Math.abs(s-r)>180){const a=gt(n,0,t,e);a[0]+=Math.round((r-s)/360)*360,j(n,a),a[1]=Math.sign(a[1])*o,j(n,a),a[0]=s,j(n,a)}}function Re(n,t,e,i){let o=n[0],s;for(let r=e;r<i;r+=t){s=n[r];const a=s-o;(a>180||a<-180)&&(s-=Math.round(a/360)*360),n[r]=o=s}}function Fe(n,t){let e;const i=n.length/t;for(let s=0;s<i&&(e=n[s*t],(e+180)%360===0);s++);const o=-Math.round(e/360)*360;if(o!==0)for(let s=0;s<i;s++)n[s*t]+=o}function Di(n,t,e,i){let o;if(Array.isArray(n[0])){const s=n.length*t;o=new Array(s);for(let r=0;r<n.length;r++)for(let a=0;a<t;a++)o[r*t+a]=n[r][a]||0}else o=n;return e?Me(o,{size:t,gridResolution:e}):i?Ri(o,{size:t}):o}const Gi=1,Wi=2,At=4;class Ni extends Te{constructor(t){super({...t,attributes:{positions:{size:3,padding:18,initialize:!0,type:t.fp64?Float64Array:Float32Array},segmentTypes:{size:1,type:Uint8ClampedArray}}})}get(t){return this.attributes[t]}getGeometryFromBuffer(t){return this.normalize?super.getGeometryFromBuffer(t):null}normalizeGeometry(t){return this.normalize?Di(t,this.positionSize,this.opts.resolution,this.opts.wrapLongitude):t}getGeometrySize(t){if(oe(t)){let i=0;for(const o of t)i+=this.getGeometrySize(o);return i}const e=this.getPathLength(t);return e<2?0:this.isClosed(t)?e<3?0:e+2:e}updateGeometryAttributes(t,e){if(e.geometrySize!==0)if(t&&oe(t))for(const i of t){const o=this.getGeometrySize(i);e.geometrySize=o,this.updateGeometryAttributes(i,e),e.vertexStart+=o}else this._updateSegmentTypes(t,e),this._updatePositions(t,e)}_updateSegmentTypes(t,e){const i=this.attributes.segmentTypes,o=t?this.isClosed(t):!1,{vertexStart:s,geometrySize:r}=e;i.fill(0,s,s+r),o?(i[s]=At,i[s+r-2]=At):(i[s]+=Gi,i[s+r-2]+=Wi),i[s+r-1]=At}_updatePositions(t,e){const{positions:i}=this.attributes;if(!i||!t)return;const{vertexStart:o,geometrySize:s}=e,r=new Array(3);for(let a=o,l=0;l<s;a++,l++)this.getPointOnPath(t,l,r),i[a*3]=r[0],i[a*3+1]=r[1],i[a*3+2]=r[2]}getPathLength(t){return t.length/this.positionSize}getPointOnPath(t,e,i=[]){const{positionSize:o}=this;e*o>=t.length&&(e+=1-t.length/o);const s=e*o;return i[0]=t[s],i[1]=t[s+1],i[2]=o===3&&t[s+2]||0,i}isClosed(t){if(!this.normalize)return!!this.opts.loop;const{positionSize:e}=this,i=t.length-e;return t[0]===t[i]&&t[1]===t[i+1]&&(e===2||t[2]===t[i+2])}}function oe(n){return Array.isArray(n[0])}const ne=`uniform pathUniforms {
  float widthScale;
  float widthMinPixels;
  float widthMaxPixels;
  float jointType;
  float capType;
  float miterLimit;
  bool billboard;
  highp int widthUnits;
} path;
`,Ui={name:"path",vs:ne,fs:ne,uniformTypes:{widthScale:"f32",widthMinPixels:"f32",widthMaxPixels:"f32",jointType:"f32",capType:"f32",miterLimit:"f32",billboard:"f32",widthUnits:"i32"}},Hi=`#version 300 es
#define SHADER_NAME path-layer-vertex-shader
in vec2 positions;
in float instanceTypes;
in vec3 instanceStartPositions;
in vec3 instanceEndPositions;
in vec3 instanceLeftPositions;
in vec3 instanceRightPositions;
in vec3 instanceLeftPositions64Low;
in vec3 instanceStartPositions64Low;
in vec3 instanceEndPositions64Low;
in vec3 instanceRightPositions64Low;
in float instanceStrokeWidths;
in vec4 instanceColors;
in vec3 instancePickingColors;
uniform float opacity;
out vec4 vColor;
out vec2 vCornerOffset;
out float vMiterLength;
out vec2 vPathPosition;
out float vPathLength;
out float vJointType;
const float EPSILON = 0.001;
const vec3 ZERO_OFFSET = vec3(0.0);
float flipIfTrue(bool flag) {
return -(float(flag) * 2. - 1.);
}
vec3 getLineJoinOffset(
vec3 prevPoint, vec3 currPoint, vec3 nextPoint,
vec2 width
) {
bool isEnd = positions.x > 0.0;
float sideOfPath = positions.y;
float isJoint = float(sideOfPath == 0.0);
vec3 deltaA3 = (currPoint - prevPoint);
vec3 deltaB3 = (nextPoint - currPoint);
mat3 rotationMatrix;
bool needsRotation = !path.billboard && project_needs_rotation(currPoint, rotationMatrix);
if (needsRotation) {
deltaA3 = deltaA3 * rotationMatrix;
deltaB3 = deltaB3 * rotationMatrix;
}
vec2 deltaA = deltaA3.xy / width;
vec2 deltaB = deltaB3.xy / width;
float lenA = length(deltaA);
float lenB = length(deltaB);
vec2 dirA = lenA > 0. ? normalize(deltaA) : vec2(0.0, 0.0);
vec2 dirB = lenB > 0. ? normalize(deltaB) : vec2(0.0, 0.0);
vec2 perpA = vec2(-dirA.y, dirA.x);
vec2 perpB = vec2(-dirB.y, dirB.x);
vec2 tangent = dirA + dirB;
tangent = length(tangent) > 0. ? normalize(tangent) : perpA;
vec2 miterVec = vec2(-tangent.y, tangent.x);
vec2 dir = isEnd ? dirA : dirB;
vec2 perp = isEnd ? perpA : perpB;
float L = isEnd ? lenA : lenB;
float sinHalfA = abs(dot(miterVec, perp));
float cosHalfA = abs(dot(dirA, miterVec));
float turnDirection = flipIfTrue(dirA.x * dirB.y >= dirA.y * dirB.x);
float cornerPosition = sideOfPath * turnDirection;
float miterSize = 1.0 / max(sinHalfA, EPSILON);
miterSize = mix(
min(miterSize, max(lenA, lenB) / max(cosHalfA, EPSILON)),
miterSize,
step(0.0, cornerPosition)
);
vec2 offsetVec = mix(miterVec * miterSize, perp, step(0.5, cornerPosition))
* (sideOfPath + isJoint * turnDirection);
bool isStartCap = lenA == 0.0 || (!isEnd && (instanceTypes == 1.0 || instanceTypes == 3.0));
bool isEndCap = lenB == 0.0 || (isEnd && (instanceTypes == 2.0 || instanceTypes == 3.0));
bool isCap = isStartCap || isEndCap;
if (isCap) {
offsetVec = mix(perp * sideOfPath, dir * path.capType * 4.0 * flipIfTrue(isStartCap), isJoint);
vJointType = path.capType;
} else {
vJointType = path.jointType;
}
vPathLength = L;
vCornerOffset = offsetVec;
vMiterLength = dot(vCornerOffset, miterVec * turnDirection);
vMiterLength = isCap ? isJoint : vMiterLength;
vec2 offsetFromStartOfPath = vCornerOffset + deltaA * float(isEnd);
vPathPosition = vec2(
dot(offsetFromStartOfPath, perp),
dot(offsetFromStartOfPath, dir)
);
geometry.uv = vPathPosition;
float isValid = step(instanceTypes, 3.5);
vec3 offset = vec3(offsetVec * width * isValid, 0.0);
if (needsRotation) {
offset = rotationMatrix * offset;
}
return offset;
}
void clipLine(inout vec4 position, vec4 refPosition) {
if (position.w < EPSILON) {
float r = (EPSILON - refPosition.w) / (position.w - refPosition.w);
position = refPosition + (position - refPosition) * r;
}
}
void main() {
geometry.pickingColor = instancePickingColors;
vColor = vec4(instanceColors.rgb, instanceColors.a * layer.opacity);
float isEnd = positions.x;
vec3 prevPosition = mix(instanceLeftPositions, instanceStartPositions, isEnd);
vec3 prevPosition64Low = mix(instanceLeftPositions64Low, instanceStartPositions64Low, isEnd);
vec3 currPosition = mix(instanceStartPositions, instanceEndPositions, isEnd);
vec3 currPosition64Low = mix(instanceStartPositions64Low, instanceEndPositions64Low, isEnd);
vec3 nextPosition = mix(instanceEndPositions, instanceRightPositions, isEnd);
vec3 nextPosition64Low = mix(instanceEndPositions64Low, instanceRightPositions64Low, isEnd);
geometry.worldPosition = currPosition;
vec2 widthPixels = vec2(clamp(
project_size_to_pixel(instanceStrokeWidths * path.widthScale, path.widthUnits),
path.widthMinPixels, path.widthMaxPixels) / 2.0);
vec3 width;
if (path.billboard) {
vec4 prevPositionScreen = project_position_to_clipspace(prevPosition, prevPosition64Low, ZERO_OFFSET);
vec4 currPositionScreen = project_position_to_clipspace(currPosition, currPosition64Low, ZERO_OFFSET, geometry.position);
vec4 nextPositionScreen = project_position_to_clipspace(nextPosition, nextPosition64Low, ZERO_OFFSET);
clipLine(prevPositionScreen, currPositionScreen);
clipLine(nextPositionScreen, currPositionScreen);
clipLine(currPositionScreen, mix(nextPositionScreen, prevPositionScreen, isEnd));
width = vec3(widthPixels, 0.0);
DECKGL_FILTER_SIZE(width, geometry);
vec3 offset = getLineJoinOffset(
prevPositionScreen.xyz / prevPositionScreen.w,
currPositionScreen.xyz / currPositionScreen.w,
nextPositionScreen.xyz / nextPositionScreen.w,
project_pixel_size_to_clipspace(width.xy)
);
DECKGL_FILTER_GL_POSITION(currPositionScreen, geometry);
gl_Position = vec4(currPositionScreen.xyz + offset * currPositionScreen.w, currPositionScreen.w);
} else {
prevPosition = project_position(prevPosition, prevPosition64Low);
currPosition = project_position(currPosition, currPosition64Low);
nextPosition = project_position(nextPosition, nextPosition64Low);
width = vec3(project_pixel_size(widthPixels), 0.0);
DECKGL_FILTER_SIZE(width, geometry);
vec3 offset = getLineJoinOffset(prevPosition, currPosition, nextPosition, width.xy);
geometry.position = vec4(currPosition + offset, 1.0);
gl_Position = project_common_position_to_clipspace(geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,Vi=`#version 300 es
#define SHADER_NAME path-layer-fragment-shader
precision highp float;
in vec4 vColor;
in vec2 vCornerOffset;
in float vMiterLength;
in vec2 vPathPosition;
in float vPathLength;
in float vJointType;
out vec4 fragColor;
void main(void) {
geometry.uv = vPathPosition;
if (vPathPosition.y < 0.0 || vPathPosition.y > vPathLength) {
if (vJointType > 0.5 && length(vCornerOffset) > 1.0) {
discard;
}
if (vJointType < 0.5 && vMiterLength > path.miterLimit + 1.0) {
discard;
}
}
fragColor = vColor;
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,ke=[0,0,0,255],ji={widthUnits:"meters",widthScale:{type:"number",min:0,value:1},widthMinPixels:{type:"number",min:0,value:0},widthMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},jointRounded:!1,capRounded:!1,miterLimit:{type:"number",min:0,value:4},billboard:!1,_pathType:null,getPath:{type:"accessor",value:n=>n.path},getColor:{type:"accessor",value:ke},getWidth:{type:"accessor",value:1},rounded:{deprecatedFor:["jointRounded","capRounded"]}},It={enter:(n,t)=>t.length?t.subarray(t.length-n.length):n};class Wt extends q{getShaders(){return super.getShaders({vs:Hi,fs:Vi,modules:[ut,dt,Ui]})}get wrapLongitude(){return!1}getBounds(){return this.getAttributeManager()?.getBounds(["vertexPositions"])}initializeState(){this.getAttributeManager().addInstanced({vertexPositions:{size:3,vertexOffset:1,type:"float64",fp64:this.use64bitPositions(),transition:It,accessor:"getPath",update:this.calculatePositions,noAlloc:!0,shaderAttributes:{instanceLeftPositions:{vertexOffset:0},instanceStartPositions:{vertexOffset:1},instanceEndPositions:{vertexOffset:2},instanceRightPositions:{vertexOffset:3}}},instanceTypes:{size:1,type:"uint8",update:this.calculateSegmentTypes,noAlloc:!0},instanceStrokeWidths:{size:1,accessor:"getWidth",transition:It,defaultValue:1},instanceColors:{size:this.props.colorFormat.length,type:"unorm8",accessor:"getColor",transition:It,defaultValue:ke},instancePickingColors:{size:4,type:"uint8",accessor:(i,{index:o,target:s})=>this.encodePickingColor(i&&i.__source?i.__source.index:o,s)}}),this.setState({pathTesselator:new Ni({fp64:this.use64bitPositions()})})}updateState(t){super.updateState(t);const{props:e,changeFlags:i}=t,o=this.getAttributeManager();if(i.dataChanged||i.updateTriggersChanged&&(i.updateTriggersChanged.all||i.updateTriggersChanged.getPath)){const{pathTesselator:r}=this.state,a=e.data.attributes||{};r.updateGeometry({data:e.data,geometryBuffer:a.getPath,buffers:a,normalize:!e._pathType,loop:e._pathType==="loop",getGeometry:e.getPath,positionFormat:e.positionFormat,wrapLongitude:e.wrapLongitude,resolution:this.context.viewport.resolution,dataChanged:i.dataChanged}),this.setState({numInstances:r.instanceCount,startIndices:r.vertexStarts}),i.dataChanged||o.invalidateAll()}i.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),o.invalidateAll())}getPickingInfo(t){const e=super.getPickingInfo(t),{index:i}=e,o=this.props.data;return o[0]&&o[0].__source&&(e.object=o.find(s=>s.__source.index===i)),e}disablePickingIndex(t){const e=this.props.data;if(e[0]&&e[0].__source)for(let i=0;i<e.length;i++)e[i].__source.index===t&&this._disablePickingIndex(i);else super.disablePickingIndex(t)}draw({uniforms:t}){const{jointRounded:e,capRounded:i,billboard:o,miterLimit:s,widthUnits:r,widthScale:a,widthMinPixels:l,widthMaxPixels:g}=this.props,d=this.state.model,h={jointType:Number(e),capType:Number(i),billboard:o,widthUnits:at[r],widthScale:a,miterLimit:s,widthMinPixels:l,widthMaxPixels:g};d.shaderInputs.setProps({path:h}),d.draw(this.context.renderPass)}_getModel(){const t=[0,1,2,1,4,2,1,3,4,3,5,4],e=[0,0,0,-1,0,1,1,-1,1,1,1,0];return new X(this.context.device,{...this.getShaders(),id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new J({topology:"triangle-list",attributes:{indices:new Uint16Array(t),positions:{value:new Float32Array(e),size:2}}}),isInstanced:!0})}calculatePositions(t){const{pathTesselator:e}=this.state;t.startIndices=e.vertexStarts,t.value=e.get("positions")}calculateSegmentTypes(t){const{pathTesselator:e}=this.state;t.startIndices=e.vertexStarts,t.value=e.get("segmentTypes")}}Wt.defaultProps=ji;Wt.layerName="PathLayer";var ht={exports:{}},se;function $i(){if(se)return ht.exports;se=1,ht.exports=n,ht.exports.default=n;function n(c,f,u){u=u||2;var y=f&&f.length,v=y?f[0]*u:c.length,x=t(c,0,v,u,!0),m=[];if(!x||x.next===x.prev)return m;var _,A,w,D,F,I,V;if(y&&(x=l(c,f,x,u)),c.length>80*u){_=w=c[0],A=D=c[1];for(var k=u;k<v;k+=u)F=c[k],I=c[k+1],F<_&&(_=F),I<A&&(A=I),F>w&&(w=F),I>D&&(D=I);V=Math.max(w-_,D-A),V=V!==0?32767/V:0}return i(x,m,u,_,A,V,0),m}function t(c,f,u,y,v){var x,m;if(v===et(c,f,u,y)>0)for(x=f;x<u;x+=y)m=tt(x,c[x],c[x+1],m);else for(x=u-y;x>=f;x-=y)m=tt(x,c[x],c[x+1],m);return m&&B(m,m.next)&&(N(m),m=m.next),m}function e(c,f){if(!c)return c;f||(f=c);var u=c,y;do if(y=!1,!u.steiner&&(B(u,u.next)||S(u.prev,u,u.next)===0)){if(N(u),u=f=u.prev,u===u.next)break;y=!0}else u=u.next;while(y||u!==f);return f}function i(c,f,u,y,v,x,m){if(c){!m&&x&&P(c,y,v,x);for(var _=c,A,w;c.prev!==c.next;){if(A=c.prev,w=c.next,x?s(c,y,v,x):o(c)){f.push(A.i/u|0),f.push(c.i/u|0),f.push(w.i/u|0),N(c),c=w.next,_=w.next;continue}if(c=w,c===_){m?m===1?(c=r(e(c),f,u),i(c,f,u,y,v,x,2)):m===2&&a(c,f,u,y,v,x):i(e(c),f,u,y,v,x,1);break}}}}function o(c){var f=c.prev,u=c,y=c.next;if(S(f,u,y)>=0)return!1;for(var v=f.x,x=u.x,m=y.x,_=f.y,A=u.y,w=y.y,D=v<x?v<m?v:m:x<m?x:m,F=_<A?_<w?_:w:A<w?A:w,I=v>x?v>m?v:m:x>m?x:m,V=_>A?_>w?_:w:A>w?A:w,k=y.next;k!==f;){if(k.x>=D&&k.x<=I&&k.y>=F&&k.y<=V&&T(v,_,x,A,m,w,k.x,k.y)&&S(k.prev,k,k.next)>=0)return!1;k=k.next}return!0}function s(c,f,u,y){var v=c.prev,x=c,m=c.next;if(S(v,x,m)>=0)return!1;for(var _=v.x,A=x.x,w=m.x,D=v.y,F=x.y,I=m.y,V=_<A?_<w?_:w:A<w?A:w,k=D<F?D<I?D:I:F<I?F:I,it=_>A?_>w?_:w:A>w?A:w,ot=D>F?D>I?D:I:F>I?F:I,jt=L(V,k,f,u,y),$t=L(it,ot,f,u,y),E=c.prevZ,M=c.nextZ;E&&E.z>=jt&&M&&M.z<=$t;){if(E.x>=V&&E.x<=it&&E.y>=k&&E.y<=ot&&E!==v&&E!==m&&T(_,D,A,F,w,I,E.x,E.y)&&S(E.prev,E,E.next)>=0||(E=E.prevZ,M.x>=V&&M.x<=it&&M.y>=k&&M.y<=ot&&M!==v&&M!==m&&T(_,D,A,F,w,I,M.x,M.y)&&S(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;E&&E.z>=jt;){if(E.x>=V&&E.x<=it&&E.y>=k&&E.y<=ot&&E!==v&&E!==m&&T(_,D,A,F,w,I,E.x,E.y)&&S(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;M&&M.z<=$t;){if(M.x>=V&&M.x<=it&&M.y>=k&&M.y<=ot&&M!==v&&M!==m&&T(_,D,A,F,w,I,M.x,M.y)&&S(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function r(c,f,u){var y=c;do{var v=y.prev,x=y.next.next;!B(v,x)&&O(v,y,y.next,x)&&W(v,x)&&W(x,v)&&(f.push(v.i/u|0),f.push(y.i/u|0),f.push(x.i/u|0),N(y),N(y.next),y=c=x),y=y.next}while(y!==c);return e(y)}function a(c,f,u,y,v,x){var m=c;do{for(var _=m.next.next;_!==m.prev;){if(m.i!==_.i&&z(m,_)){var A=Q(m,_);m=e(m,m.next),A=e(A,A.next),i(m,f,u,y,v,x,0),i(A,f,u,y,v,x,0);return}_=_.next}m=m.next}while(m!==c)}function l(c,f,u,y){var v=[],x,m,_,A,w;for(x=0,m=f.length;x<m;x++)_=f[x]*y,A=x<m-1?f[x+1]*y:c.length,w=t(c,_,A,y,!1),w===w.next&&(w.steiner=!0),v.push(b(w));for(v.sort(g),x=0;x<v.length;x++)u=d(v[x],u);return u}function g(c,f){return c.x-f.x}function d(c,f){var u=h(c,f);if(!u)return f;var y=Q(u,c);return e(y,y.next),e(u,u.next)}function h(c,f){var u=f,y=c.x,v=c.y,x=-1/0,m;do{if(v<=u.y&&v>=u.next.y&&u.next.y!==u.y){var _=u.x+(v-u.y)*(u.next.x-u.x)/(u.next.y-u.y);if(_<=y&&_>x&&(x=_,m=u.x<u.next.x?u:u.next,_===y))return m}u=u.next}while(u!==f);if(!m)return null;var A=m,w=m.x,D=m.y,F=1/0,I;u=m;do y>=u.x&&u.x>=w&&y!==u.x&&T(v<D?y:x,v,w,D,v<D?x:y,v,u.x,u.y)&&(I=Math.abs(v-u.y)/(y-u.x),W(u,c)&&(I<F||I===F&&(u.x>m.x||u.x===m.x&&p(m,u)))&&(m=u,F=I)),u=u.next;while(u!==A);return m}function p(c,f){return S(c.prev,c,f.prev)<0&&S(f.next,c,c.next)<0}function P(c,f,u,y){var v=c;do v.z===0&&(v.z=L(v.x,v.y,f,u,y)),v.prevZ=v.prev,v.nextZ=v.next,v=v.next;while(v!==c);v.prevZ.nextZ=null,v.prevZ=null,C(v)}function C(c){var f,u,y,v,x,m,_,A,w=1;do{for(u=c,c=null,x=null,m=0;u;){for(m++,y=u,_=0,f=0;f<w&&(_++,y=y.nextZ,!!y);f++);for(A=w;_>0||A>0&&y;)_!==0&&(A===0||!y||u.z<=y.z)?(v=u,u=u.nextZ,_--):(v=y,y=y.nextZ,A--),x?x.nextZ=v:c=v,v.prevZ=x,x=v;u=y}x.nextZ=null,w*=2}while(m>1);return c}function L(c,f,u,y,v){return c=(c-u)*v|0,f=(f-y)*v|0,c=(c|c<<8)&16711935,c=(c|c<<4)&252645135,c=(c|c<<2)&858993459,c=(c|c<<1)&1431655765,f=(f|f<<8)&16711935,f=(f|f<<4)&252645135,f=(f|f<<2)&858993459,f=(f|f<<1)&1431655765,c|f<<1}function b(c){var f=c,u=c;do(f.x<u.x||f.x===u.x&&f.y<u.y)&&(u=f),f=f.next;while(f!==c);return u}function T(c,f,u,y,v,x,m,_){return(v-m)*(f-_)>=(c-m)*(x-_)&&(c-m)*(y-_)>=(u-m)*(f-_)&&(u-m)*(x-_)>=(v-m)*(y-_)}function z(c,f){return c.next.i!==f.i&&c.prev.i!==f.i&&!H(c,f)&&(W(c,f)&&W(f,c)&&Z(c,f)&&(S(c.prev,c,f.prev)||S(c,f.prev,f))||B(c,f)&&S(c.prev,c,c.next)>0&&S(f.prev,f,f.next)>0)}function S(c,f,u){return(f.y-c.y)*(u.x-f.x)-(f.x-c.x)*(u.y-f.y)}function B(c,f){return c.x===f.x&&c.y===f.y}function O(c,f,u,y){var v=U(S(c,f,u)),x=U(S(c,f,y)),m=U(S(u,y,c)),_=U(S(u,y,f));return!!(v!==x&&m!==_||v===0&&R(c,u,f)||x===0&&R(c,y,f)||m===0&&R(u,c,y)||_===0&&R(u,f,y))}function R(c,f,u){return f.x<=Math.max(c.x,u.x)&&f.x>=Math.min(c.x,u.x)&&f.y<=Math.max(c.y,u.y)&&f.y>=Math.min(c.y,u.y)}function U(c){return c>0?1:c<0?-1:0}function H(c,f){var u=c;do{if(u.i!==c.i&&u.next.i!==c.i&&u.i!==f.i&&u.next.i!==f.i&&O(u,u.next,c,f))return!0;u=u.next}while(u!==c);return!1}function W(c,f){return S(c.prev,c,c.next)<0?S(c,f,c.next)>=0&&S(c,c.prev,f)>=0:S(c,f,c.prev)<0||S(c,c.next,f)<0}function Z(c,f){var u=c,y=!1,v=(c.x+f.x)/2,x=(c.y+f.y)/2;do u.y>x!=u.next.y>x&&u.next.y!==u.y&&v<(u.next.x-u.x)*(x-u.y)/(u.next.y-u.y)+u.x&&(y=!y),u=u.next;while(u!==c);return y}function Q(c,f){var u=new G(c.i,c.x,c.y),y=new G(f.i,f.x,f.y),v=c.next,x=f.prev;return c.next=f,f.prev=c,u.next=v,v.prev=u,y.next=u,u.prev=y,x.next=y,y.prev=x,y}function tt(c,f,u,y){var v=new G(c,f,u);return y?(v.next=y.next,v.prev=y,y.next.prev=v,y.next=v):(v.prev=v,v.next=v),v}function N(c){c.next.prev=c.prev,c.prev.next=c.next,c.prevZ&&(c.prevZ.nextZ=c.nextZ),c.nextZ&&(c.nextZ.prevZ=c.prevZ)}function G(c,f,u){this.i=c,this.x=f,this.y=u,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}n.deviation=function(c,f,u,y){var v=f&&f.length,x=v?f[0]*u:c.length,m=Math.abs(et(c,0,x,u));if(v)for(var _=0,A=f.length;_<A;_++){var w=f[_]*u,D=_<A-1?f[_+1]*u:c.length;m-=Math.abs(et(c,w,D,u))}var F=0;for(_=0;_<y.length;_+=3){var I=y[_]*u,V=y[_+1]*u,k=y[_+2]*u;F+=Math.abs((c[I]-c[k])*(c[V+1]-c[I+1])-(c[I]-c[V])*(c[k+1]-c[I+1]))}return m===0&&F===0?0:Math.abs((F-m)/m)};function et(c,f,u,y){for(var v=0,x=f,m=u-y;x<u;x+=y)v+=(c[m]-c[x])*(c[x+1]+c[m+1]),m=x;return v}return n.flatten=function(c){for(var f=c[0][0].length,u={vertices:[],holes:[],dimensions:f},y=0,v=0;v<c.length;v++){for(var x=0;x<c[v].length;x++)for(var m=0;m<f;m++)u.vertices.push(c[v][x][m]);v>0&&(y+=c[v-1].length,u.holes.push(y))}return u},ht.exports}var Ki=$i();const Zi=Qe(Ki),pt=Ie.CLOCKWISE,re=Ie.COUNTER_CLOCKWISE,K={};function Xi(n){if(n=n&&n.positions||n,!Array.isArray(n)&&!ArrayBuffer.isView(n))throw new Error("invalid polygon")}function st(n){return"positions"in n?n.positions:n}function Pt(n){return"holeIndices"in n?n.holeIndices:null}function Yi(n){return Array.isArray(n[0])}function Ji(n){return n.length>=1&&n[0].length>=2&&Number.isFinite(n[0][0])}function qi(n){const t=n[0],e=n[n.length-1];return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}function Qi(n,t,e,i){for(let o=0;o<t;o++)if(n[e+o]!==n[i-t+o])return!1;return!0}function ae(n,t,e,i,o){let s=t;const r=e.length;for(let a=0;a<r;a++)for(let l=0;l<i;l++)n[s++]=e[a][l]||0;if(!qi(e))for(let a=0;a<i;a++)n[s++]=e[0][a]||0;return K.start=t,K.end=s,K.size=i,Ee(n,o,K),s}function le(n,t,e,i,o=0,s,r){s=s||e.length;const a=s-o;if(a<=0)return t;let l=t;for(let g=0;g<a;g++)n[l++]=e[o+g];if(!Qi(e,i,o,s))for(let g=0;g<i;g++)n[l++]=e[o+g];return K.start=t,K.end=l,K.size=i,Ee(n,r,K),l}function to(n,t){Xi(n);const e=[],i=[];if("positions"in n){const{positions:o,holeIndices:s}=n;if(s){let r=0;for(let a=0;a<=s.length;a++)r=le(e,r,o,t,s[a-1],s[a],a===0?pt:re),i.push(r);return i.pop(),{positions:e,holeIndices:i}}n=o}if(!Yi(n))return le(e,0,n,t,0,e.length,pt),e;if(!Ji(n)){let o=0;for(const[s,r]of n.entries())o=ae(e,o,r,t,s===0?pt:re),i.push(o);return i.pop(),{positions:e,holeIndices:i}}return ae(e,0,n,t,pt),e}function Et(n,t,e){const i=n.length/3;let o=0;for(let s=0;s<i;s++){const r=(s+1)%i;o+=n[s*3+t]*n[r*3+e],o-=n[r*3+t]*n[s*3+e]}return Math.abs(o/2)}function ce(n,t,e,i){const o=n.length/3;for(let s=0;s<o;s++){const r=s*3,a=n[r+0],l=n[r+1],g=n[r+2];n[r+t]=a,n[r+e]=l,n[r+i]=g}}function eo(n,t,e,i){let o=Pt(n);o&&(o=o.map(a=>a/t));let s=st(n);const r=i&&t===3;if(e){const a=s.length;s=s.slice();const l=[];for(let g=0;g<a;g+=t){l[0]=s[g],l[1]=s[g+1],r&&(l[2]=s[g+2]);const d=e(l);s[g]=d[0],s[g+1]=d[1],r&&(s[g+2]=d[2])}}if(r){const a=Et(s,0,1),l=Et(s,0,2),g=Et(s,1,2);if(!a&&!l&&!g)return[];a>l&&a>g||(l>g?(e||(s=s.slice()),ce(s,0,2,1)):(e||(s=s.slice()),ce(s,2,0,1)))}return Zi(s,o,t)}class io extends Te{constructor(t){const{fp64:e,IndexType:i=Uint32Array}=t;super({...t,attributes:{positions:{size:3,type:e?Float64Array:Float32Array},vertexValid:{type:Uint16Array,size:1},indices:{type:i,size:1}}})}get(t){const{attributes:e}=this;return t==="indices"?e.indices&&e.indices.subarray(0,this.vertexCount):e[t]}updateGeometry(t){super.updateGeometry(t);const e=this.buffers.indices;if(e)this.vertexCount=(e.value||e).length;else if(this.data&&!this.getGeometry)throw new Error("missing indices buffer")}normalizeGeometry(t){if(this.normalize){const e=to(t,this.positionSize);return this.opts.resolution?ze(st(e),Pt(e),{size:this.positionSize,gridResolution:this.opts.resolution,edgeTypes:!0}):this.opts.wrapLongitude?Fi(st(e),Pt(e),{size:this.positionSize,maxLatitude:86,edgeTypes:!0}):e}return t}getGeometrySize(t){if(ge(t)){let e=0;for(const i of t)e+=this.getGeometrySize(i);return e}return st(t).length/this.positionSize}getGeometryFromBuffer(t){return this.normalize||!this.buffers.indices?super.getGeometryFromBuffer(t):null}updateGeometryAttributes(t,e){if(t&&ge(t))for(const i of t){const o=this.getGeometrySize(i);e.geometrySize=o,this.updateGeometryAttributes(i,e),e.vertexStart+=o,e.indexStart=this.indexStarts[e.geometryIndex+1]}else{const i=t;this._updateIndices(i,e),this._updatePositions(i,e),this._updateVertexValid(i,e)}}_updateIndices(t,{geometryIndex:e,vertexStart:i,indexStart:o}){const{attributes:s,indexStarts:r,typedArrayManager:a}=this;let l=s.indices;if(!l||!t)return;let g=o;const d=eo(t,this.positionSize,this.opts.preproject,this.opts.full3d);l=a.allocate(l,o+d.length,{copy:!0});for(let h=0;h<d.length;h++)l[g++]=d[h]+i;r[e+1]=o+d.length,s.indices=l}_updatePositions(t,{vertexStart:e,geometrySize:i}){const{attributes:{positions:o},positionSize:s}=this;if(!o||!t)return;const r=st(t);for(let a=e,l=0;l<i;a++,l++){const g=r[l*s],d=r[l*s+1],h=s>2?r[l*s+2]:0;o[a*3]=g,o[a*3+1]=d,o[a*3+2]=h}}_updateVertexValid(t,{vertexStart:e,geometrySize:i}){const{positionSize:o}=this,s=this.attributes.vertexValid,r=t&&Pt(t);if(t&&t.edgeTypes?s.set(t.edgeTypes,e):s.fill(1,e,e+i),r)for(let a=0;a<r.length;a++)s[e+r[a]/o-1]=0;s[e+i-1]=0}}function ge(n){return Array.isArray(n)&&n.length>0&&!Number.isFinite(n[0])}const ue=`uniform solidPolygonUniforms {
  bool extruded;
  bool isWireframe;
  float elevationScale;
} solidPolygon;
`,oo={name:"solidPolygon",vs:ue,fs:ue,uniformTypes:{extruded:"f32",isWireframe:"f32",elevationScale:"f32"}},Be=`in vec4 fillColors;
in vec4 lineColors;
in vec3 pickingColors;
out vec4 vColor;
struct PolygonProps {
vec3 positions;
vec3 positions64Low;
vec3 normal;
float elevations;
};
vec3 project_offset_normal(vec3 vector) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT_OFFSETS) {
return normalize(vector * project.commonUnitsPerWorldUnit);
}
return project_normal(vector);
}
void calculatePosition(PolygonProps props) {
vec3 pos = props.positions;
vec3 pos64Low = props.positions64Low;
vec3 normal = props.normal;
vec4 colors = solidPolygon.isWireframe ? lineColors : fillColors;
geometry.worldPosition = props.positions;
geometry.pickingColor = pickingColors;
if (solidPolygon.extruded) {
pos.z += props.elevations * solidPolygon.elevationScale;
}
gl_Position = project_position_to_clipspace(pos, pos64Low, vec3(0.), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
if (solidPolygon.extruded) {
#ifdef IS_SIDE_VERTEX
normal = project_offset_normal(normal);
#else
normal = project_normal(normal);
#endif
geometry.normal = normal;
vec3 lightColor = lighting_getLightColor(colors.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
vColor = vec4(lightColor, colors.a * layer.opacity);
} else {
vColor = vec4(colors.rgb, colors.a * layer.opacity);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,no=`#version 300 es
#define SHADER_NAME solid-polygon-layer-vertex-shader
in vec3 vertexPositions;
in vec3 vertexPositions64Low;
in float elevations;
${Be}
void main(void) {
PolygonProps props;
props.positions = vertexPositions;
props.positions64Low = vertexPositions64Low;
props.elevations = elevations;
props.normal = vec3(0.0, 0.0, 1.0);
calculatePosition(props);
}
`,so=`#version 300 es
#define SHADER_NAME solid-polygon-layer-vertex-shader-side
#define IS_SIDE_VERTEX
in vec2 positions;
in vec3 vertexPositions;
in vec3 nextVertexPositions;
in vec3 vertexPositions64Low;
in vec3 nextVertexPositions64Low;
in float elevations;
in float instanceVertexValid;
${Be}
void main(void) {
if(instanceVertexValid < 0.5){
gl_Position = vec4(0.);
return;
}
PolygonProps props;
vec3 pos;
vec3 pos64Low;
vec3 nextPos;
vec3 nextPos64Low;
#if RING_WINDING_ORDER_CW == 1
pos = vertexPositions;
pos64Low = vertexPositions64Low;
nextPos = nextVertexPositions;
nextPos64Low = nextVertexPositions64Low;
#else
pos = nextVertexPositions;
pos64Low = nextVertexPositions64Low;
nextPos = vertexPositions;
nextPos64Low = vertexPositions64Low;
#endif
props.positions = mix(pos, nextPos, positions.x);
props.positions64Low = mix(pos64Low, nextPos64Low, positions.x);
props.normal = vec3(
pos.y - nextPos.y + (pos64Low.y - nextPos64Low.y),
nextPos.x - pos.x + (nextPos64Low.x - pos64Low.x),
0.0);
props.elevations = elevations * positions.y;
calculatePosition(props);
}
`,ro=`#version 300 es
#define SHADER_NAME solid-polygon-layer-fragment-shader
precision highp float;
in vec4 vColor;
out vec4 fragColor;
void main(void) {
fragColor = vColor;
geometry.uv = vec2(0.);
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,Ct=[0,0,0,255],ao={filled:!0,extruded:!1,wireframe:!1,_normalize:!0,_windingOrder:"CW",_full3d:!1,elevationScale:{type:"number",min:0,value:1},getPolygon:{type:"accessor",value:n=>n.polygon},getElevation:{type:"accessor",value:1e3},getFillColor:{type:"accessor",value:Ct},getLineColor:{type:"accessor",value:Ct},material:!0},yt={enter:(n,t)=>t.length?t.subarray(t.length-n.length):n};class Nt extends q{getShaders(t){return super.getShaders({vs:t==="top"?no:so,fs:ro,defines:{RING_WINDING_ORDER_CW:!this.props._normalize&&this.props._windingOrder==="CCW"?0:1},modules:[ut,we,dt,oo]})}get wrapLongitude(){return!1}getBounds(){return this.getAttributeManager()?.getBounds(["vertexPositions"])}initializeState(){const{viewport:t}=this.context;let{coordinateSystem:e}=this.props;const{_full3d:i}=this.props;t.isGeospatial&&e===wt.DEFAULT&&(e=wt.LNGLAT);let o;e===wt.LNGLAT&&(i?o=t.projectPosition.bind(t):o=t.projectFlat.bind(t)),this.setState({numInstances:0,polygonTesselator:new io({preproject:o,fp64:this.use64bitPositions(),IndexType:Uint32Array})});const s=this.getAttributeManager(),r=!0;s.remove(["instancePickingColors"]),s.add({indices:{size:1,isIndexed:!0,update:this.calculateIndices,noAlloc:r},vertexPositions:{size:3,type:"float64",stepMode:"dynamic",fp64:this.use64bitPositions(),transition:yt,accessor:"getPolygon",update:this.calculatePositions,noAlloc:r,shaderAttributes:{nextVertexPositions:{vertexOffset:1}}},instanceVertexValid:{size:1,type:"uint16",stepMode:"instance",update:this.calculateVertexValid,noAlloc:r},elevations:{size:1,stepMode:"dynamic",transition:yt,accessor:"getElevation"},fillColors:{size:this.props.colorFormat.length,type:"unorm8",stepMode:"dynamic",transition:yt,accessor:"getFillColor",defaultValue:Ct},lineColors:{size:this.props.colorFormat.length,type:"unorm8",stepMode:"dynamic",transition:yt,accessor:"getLineColor",defaultValue:Ct},pickingColors:{size:4,type:"uint8",stepMode:"dynamic",accessor:(a,{index:l,target:g})=>this.encodePickingColor(a&&a.__source?a.__source.index:l,g)}})}getPickingInfo(t){const e=super.getPickingInfo(t),{index:i}=e,o=this.props.data;return o[0]&&o[0].__source&&(e.object=o.find(s=>s.__source.index===i)),e}disablePickingIndex(t){const e=this.props.data;if(e[0]&&e[0].__source)for(let i=0;i<e.length;i++)e[i].__source.index===t&&this._disablePickingIndex(i);else super.disablePickingIndex(t)}draw({uniforms:t}){const{extruded:e,filled:i,wireframe:o,elevationScale:s}=this.props,{topModel:r,sideModel:a,wireframeModel:l,polygonTesselator:g}=this.state,d={extruded:!!e,elevationScale:s,isWireframe:!1};l&&o&&(l.setInstanceCount(g.instanceCount-1),l.shaderInputs.setProps({solidPolygon:{...d,isWireframe:!0}}),l.draw(this.context.renderPass)),a&&i&&(a.setInstanceCount(g.instanceCount-1),a.shaderInputs.setProps({solidPolygon:d}),a.draw(this.context.renderPass)),r&&i&&(r.setVertexCount(g.vertexCount),r.shaderInputs.setProps({solidPolygon:d}),r.draw(this.context.renderPass))}updateState(t){super.updateState(t),this.updateGeometry(t);const{props:e,oldProps:i,changeFlags:o}=t,s=this.getAttributeManager();(o.extensionsChanged||e.filled!==i.filled||e.extruded!==i.extruded)&&(this.state.models?.forEach(a=>a.destroy()),this.setState(this._getModels()),s.invalidateAll())}updateGeometry({props:t,oldProps:e,changeFlags:i}){if(i.dataChanged||i.updateTriggersChanged&&(i.updateTriggersChanged.all||i.updateTriggersChanged.getPolygon)){const{polygonTesselator:s}=this.state,r=t.data.attributes||{};s.updateGeometry({data:t.data,normalize:t._normalize,geometryBuffer:r.getPolygon,buffers:r,getGeometry:t.getPolygon,positionFormat:t.positionFormat,wrapLongitude:t.wrapLongitude,resolution:this.context.viewport.resolution,fp64:this.use64bitPositions(),dataChanged:i.dataChanged,full3d:t._full3d}),this.setState({numInstances:s.instanceCount,startIndices:s.vertexStarts}),i.dataChanged||this.getAttributeManager().invalidateAll()}}_getModels(){const{id:t,filled:e,extruded:i}=this.props;let o,s,r;if(e){const a=this.getShaders("top");a.defines.NON_INSTANCED_MODEL=1;const l=this.getAttributeManager().getBufferLayouts({isInstanced:!1});o=new X(this.context.device,{...a,id:`${t}-top`,topology:"triangle-list",bufferLayout:l,isIndexed:!0,userData:{excludeAttributes:{instanceVertexValid:!0}}})}if(i){const a=this.getAttributeManager().getBufferLayouts({isInstanced:!0});s=new X(this.context.device,{...this.getShaders("side"),id:`${t}-side`,bufferLayout:a,geometry:new J({topology:"triangle-strip",attributes:{positions:{size:2,value:new Float32Array([1,0,0,0,1,1,0,1])}}}),isInstanced:!0,userData:{excludeAttributes:{indices:!0}}}),r=new X(this.context.device,{...this.getShaders("side"),id:`${t}-wireframe`,bufferLayout:a,geometry:new J({topology:"line-strip",attributes:{positions:{size:2,value:new Float32Array([1,0,0,0,0,1,1,1])}}}),isInstanced:!0,userData:{excludeAttributes:{indices:!0}}})}return{models:[s,r,o].filter(Boolean),topModel:o,sideModel:s,wireframeModel:r}}calculateIndices(t){const{polygonTesselator:e}=this.state;t.startIndices=e.indexStarts,t.value=e.get("indices")}calculatePositions(t){const{polygonTesselator:e}=this.state;t.startIndices=e.vertexStarts,t.value=e.get("positions")}calculateVertexValid(t){t.value=this.state.polygonTesselator.get("vertexValid")}}Nt.defaultProps=ao;Nt.layerName="SolidPolygonLayer";function lo({data:n,getIndex:t,dataRange:e,replace:i}){const{startRow:o=0,endRow:s=1/0}=e,r=n.length;let a=r,l=r;for(let p=0;p<r;p++){const P=t(n[p]);if(a>p&&P>=o&&(a=p),P>=s){l=p;break}}let g=a;const h=l-a!==i.length?n.slice(l):void 0;for(let p=0;p<i.length;p++)n[g++]=i[p];if(h){for(let p=0;p<h.length;p++)n[g++]=h[p];n.length=g}return{startRow:a,endRow:a+i.length}}function co(n,t){if(!n)return null;const e="startIndices"in n?n.startIndices[t]:t,i=n.featureIds.value[e];return e!==-1?go(n,i,e):null}function go(n,t,e){const i={properties:{...n.properties[t]}};for(const o in n.numericProps)i.properties[o]=n.numericProps[o].value[e];return i}function uo(n,t){const e={points:null,lines:null,polygons:null};for(const i in e){const o=n[i].globalFeatureIds.value;e[i]=new Uint8ClampedArray(o.length*4);const s=[];for(let r=0;r<o.length;r++)t(o[r],s),e[i][r*4+0]=s[0],e[i][r*4+1]=s[1],e[i][r*4+2]=s[2],e[i][r*4+3]=255}return e}const de=`uniform sdfUniforms {
  float gamma;
  bool enabled;
  float buffer;
  float outlineBuffer;
  vec4 outlineColor;
} sdf;
`,fo={name:"sdf",vs:de,fs:de,uniformTypes:{gamma:"f32",enabled:"f32",buffer:"f32",outlineBuffer:"f32",outlineColor:"vec4<f32>"}},ho=`#version 300 es
#define SHADER_NAME multi-icon-layer-fragment-shader
precision highp float;
uniform sampler2D iconsTexture;
in vec4 vColor;
in vec2 vTextureCoords;
in vec2 uv;
out vec4 fragColor;
void main(void) {
geometry.uv = uv;
if (!bool(picking.isActive)) {
float alpha = texture(iconsTexture, vTextureCoords).a;
vec4 color = vColor;
if (sdf.enabled) {
float distance = alpha;
alpha = smoothstep(sdf.buffer - sdf.gamma, sdf.buffer + sdf.gamma, distance);
if (sdf.outlineBuffer > 0.0) {
float inFill = alpha;
float inBorder = smoothstep(sdf.outlineBuffer - sdf.gamma, sdf.outlineBuffer + sdf.gamma, distance);
color = mix(sdf.outlineColor, vColor, inFill);
alpha = inBorder;
}
}
float a = alpha * color.a;
if (a < icon.alphaCutoff) {
discard;
}
fragColor = vec4(color.rgb, a * layer.opacity);
}
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,Mt=192/256,fe=[],po={getIconOffsets:{type:"accessor",value:n=>n.offsets},alphaCutoff:.001,smoothing:.1,outlineWidth:0,outlineColor:{type:"color",value:[0,0,0,255]}};class Ut extends bt{getShaders(){const t=super.getShaders();return{...t,modules:[...t.modules,fo],fs:ho}}initializeState(){super.initializeState(),this.getAttributeManager().addInstanced({instanceOffsets:{size:2,accessor:"getIconOffsets"},instancePickingColors:{type:"uint8",size:3,accessor:(e,{index:i,target:o})=>this.encodePickingColor(i,o)}})}updateState(t){super.updateState(t);const{props:e,oldProps:i}=t;let{outlineColor:o}=e;o!==i.outlineColor&&(o=o.map(s=>s/255),o[3]=Number.isFinite(o[3])?o[3]:1,this.setState({outlineColor:o})),!e.sdf&&e.outlineWidth&&$.warn(`${this.id}: fontSettings.sdf is required to render outline`)()}draw(t){const{sdf:e,smoothing:i,outlineWidth:o}=this.props,{outlineColor:s}=this.state,r=o?Math.max(i,Mt*(1-o)):-1,a=this.state.model,l={buffer:Mt,outlineBuffer:r,gamma:i,enabled:!!e,outlineColor:s};if(a.shaderInputs.setProps({sdf:l}),super.draw(t),e&&o){const{iconManager:g}=this.state;g.getTexture()&&(a.shaderInputs.setProps({sdf:{...l,outlineBuffer:Mt}}),a.draw(this.context.renderPass))}}getInstanceOffset(t){return t?Array.from(t).flatMap(e=>super.getInstanceOffset(e)):fe}getInstanceColorMode(t){return 1}getInstanceIconFrame(t){return t?Array.from(t).flatMap(e=>super.getInstanceIconFrame(e)):fe}}Ut.defaultProps=po;Ut.layerName="MultiIconLayer";const rt=1e20;class yo{constructor({fontSize:t=24,buffer:e=3,radius:i=8,cutoff:o=.25,fontFamily:s="sans-serif",fontWeight:r="normal",fontStyle:a="normal",lang:l=null}={}){this.buffer=e,this.cutoff=o,this.radius=i,this.lang=l;const g=this.size=t+e*4,d=this._createCanvas(g),h=this.ctx=d.getContext("2d",{willReadFrequently:!0});h.font=`${a} ${r} ${t}px ${s}`,h.textBaseline="alphabetic",h.textAlign="left",h.fillStyle="black",this.gridOuter=new Float64Array(g*g),this.gridInner=new Float64Array(g*g),this.f=new Float64Array(g),this.z=new Float64Array(g+1),this.v=new Uint16Array(g)}_createCanvas(t){const e=document.createElement("canvas");return e.width=e.height=t,e}draw(t){const{width:e,actualBoundingBoxAscent:i,actualBoundingBoxDescent:o,actualBoundingBoxLeft:s,actualBoundingBoxRight:r}=this.ctx.measureText(t),a=Math.ceil(i),l=0,g=Math.max(0,Math.min(this.size-this.buffer,Math.ceil(r-s))),d=Math.min(this.size-this.buffer,a+Math.ceil(o)),h=g+2*this.buffer,p=d+2*this.buffer,P=Math.max(h*p,0),C=new Uint8ClampedArray(P),L={data:C,width:h,height:p,glyphWidth:g,glyphHeight:d,glyphTop:a,glyphLeft:l,glyphAdvance:e};if(g===0||d===0)return L;const{ctx:b,buffer:T,gridInner:z,gridOuter:S}=this;this.lang&&(b.lang=this.lang),b.clearRect(T,T,g,d),b.fillText(t,T,T+a);const B=b.getImageData(T,T,g,d);S.fill(rt,0,P),z.fill(0,0,P);for(let O=0;O<d;O++)for(let R=0;R<g;R++){const U=B.data[4*(O*g+R)+3]/255;if(U===0)continue;const H=(O+T)*h+R+T;if(U===1)S[H]=0,z[H]=rt;else{const W=.5-U;S[H]=W>0?W*W:0,z[H]=W<0?W*W:0}}he(S,0,0,h,p,h,this.f,this.v,this.z),he(z,T,T,g,d,h,this.f,this.v,this.z);for(let O=0;O<P;O++){const R=Math.sqrt(S[O])-Math.sqrt(z[O]);C[O]=Math.round(255-255*(R/this.radius+this.cutoff))}return L}}function he(n,t,e,i,o,s,r,a,l){for(let g=t;g<t+i;g++)pe(n,e*s+g,s,o,r,a,l);for(let g=e;g<e+o;g++)pe(n,g*s+t,1,i,r,a,l)}function pe(n,t,e,i,o,s,r){s[0]=0,r[0]=-rt,r[1]=rt,o[0]=n[t];for(let a=1,l=0,g=0;a<i;a++){o[a]=n[t+a*e];const d=a*a;do{const h=s[l];g=(o[a]-o[h]+d-h*h)/(a-h)/2}while(g<=r[l]&&--l>-1);l++,s[l]=a,r[l]=g,r[l+1]=rt}for(let a=0,l=0;a<i;a++){for(;r[l+1]<a;)l++;const g=s[l],d=a-g;n[t+a*e]=o[g]+d*d}}const vo=32,xo=[];function mo(n){return Math.pow(2,Math.ceil(Math.log2(n)))}function Po({characterSet:n,getFontWidth:t,fontHeight:e,buffer:i,maxCanvasWidth:o,mapping:s={},xOffset:r=0,yOffset:a=0}){let l=0,g=r;const d=e+i*2;for(const h of n)if(!s[h]){const p=t(h);g+p+i*2>o&&(g=0,l++),s[h]={x:g+i,y:a+l*d+i,width:p,height:d,layoutWidth:p,layoutHeight:e},g+=p+i*2}return{mapping:s,xOffset:g,yOffset:a+l*d,canvasHeight:mo(a+(l+1)*d)}}function De(n,t,e,i){let o=0;for(let s=t;s<e;s++){const r=n[s];o+=i[r]?.layoutWidth||0}return o}function Ge(n,t,e,i,o,s){let r=t,a=0;for(let l=t;l<e;l++){const g=De(n,l,l+1,o);a+g>i&&(r<l&&s.push(l),r=l,a=0),a+=g}return a}function _o(n,t,e,i,o,s){let r=t,a=t,l=t,g=0;for(let d=t;d<e;d++)if((n[d]===" "||n[d+1]===" "||d+1===e)&&(l=d+1),l>a){let h=De(n,a,l,o);g+h>i&&(r<a&&(s.push(a),r=a,g=0),h>i&&(h=Ge(n,a,l,i,o,s),r=s[s.length-1])),a=l,g+=h}return g}function Lo(n,t,e,i,o=0,s){s===void 0&&(s=n.length);const r=[];return t==="break-all"?Ge(n,o,s,e,i,r):_o(n,o,s,e,i,r),r}function Co(n,t,e,i,o,s){let r=0,a=0;for(let l=t;l<e;l++){const g=n[l],d=i[g];d?(a||(a=d.layoutHeight),o[l]=r+d.layoutWidth/2,r+=d.layoutWidth):($.warn(`Missing character: ${g} (${g.codePointAt(0)})`)(),o[l]=r,r+=vo)}s[0]=r,s[1]=a}function So(n,t,e,i,o){const s=Array.from(n),r=s.length,a=new Array(r),l=new Array(r),g=new Array(r),d=(e==="break-word"||e==="break-all")&&isFinite(i)&&i>0,h=[0,0],p=[0,0];let P=0,C=0,L=0;for(let b=0;b<=r;b++){const T=s[b];if((T===`
`||b===r)&&(L=b),L>C){const z=d?Lo(s,e,i,o,C,L):xo;for(let S=0;S<=z.length;S++){const B=S===0?C:z[S-1],O=S<z.length?z[S]:L;Co(s,B,O,o,a,p);for(let R=B;R<O;R++){a[R]-p[0]/2;const U=s[R],H=o[U]?.layoutOffsetY||0;l[R]=P+p[1]/2+H,g[R]=p[0]}P=P+p[1]*t,h[0]=Math.max(h[0],p[0])}C=L}T===`
`&&(a[C]=0,l[C]=0,g[C]=0,C++)}return h[1]=P,{x:a,y:l,rowWidth:g,size:h}}function bo({value:n,length:t,stride:e,offset:i,startIndices:o,characterSet:s}){const r=n.BYTES_PER_ELEMENT,a=e?e/r:1,l=i?i/r:0,g=o[t]||Math.ceil((n.length-l)/a),d=s&&new Set,h=new Array(t);let p=n;if(a>1||l>0){const P=n.constructor;p=new P(g);for(let C=0;C<g;C++)p[C]=n[C*a+l]}for(let P=0;P<t;P++){const C=o[P],L=o[P+1]||g,b=p.subarray(C,L);h[P]=String.fromCodePoint.apply(null,b),d&&b.forEach(d.add,d)}if(d)for(const P of d)s.add(String.fromCodePoint(P));return{texts:h,characterCount:g}}class We{constructor(t=5){this._cache={},this._order=[],this.limit=t}get(t){const e=this._cache[t];return e&&(this._deleteOrder(t),this._appendOrder(t)),e}set(t,e){this._cache[t]?(this.delete(t),this._cache[t]=e,this._appendOrder(t)):(Object.keys(this._cache).length===this.limit&&this.delete(this._order[0]),this._cache[t]=e,this._appendOrder(t))}delete(t){this._cache[t]&&(delete this._cache[t],this._deleteOrder(t))}_deleteOrder(t){const e=this._order.indexOf(t);e>=0&&this._order.splice(e,1)}_appendOrder(t){this._order.push(t)}}function wo(){const n=[];for(let t=32;t<128;t++)n.push(String.fromCharCode(t));return n}const Y={fontFamily:"Monaco, monospace",fontWeight:"normal",characterSet:wo(),fontSize:64,buffer:4,sdf:!1,cutoff:.25,radius:12,smoothing:.1},ye=1024,ve=.9,xe=1.2,Ne=3;let St=new We(Ne);function To(n,t){let e;typeof t=="string"?e=new Set(Array.from(t)):e=new Set(t);const i=St.get(n);if(!i)return e;for(const o in i.mapping)e.has(o)&&e.delete(o);return e}function Ao(n,t){for(let e=0;e<n.length;e++)t.data[4*e+3]=n[e]}function me(n,t,e,i){n.font=`${i} ${e}px ${t}`,n.fillStyle="#000",n.textBaseline="alphabetic",n.textAlign="left"}function Io(n){$.assert(Number.isFinite(n)&&n>=Ne,"Invalid cache limit"),St=new We(n)}class Eo{constructor(){this.props={...Y}}get atlas(){return this._atlas}get mapping(){return this._atlas&&this._atlas.mapping}get scale(){const{fontSize:t,buffer:e}=this.props;return(t*xe+e*2)/t}setProps(t={}){Object.assign(this.props,t),this._key=this._getKey();const e=To(this._key,this.props.characterSet),i=St.get(this._key);if(i&&e.size===0){this._atlas!==i&&(this._atlas=i);return}const o=this._generateFontAtlas(e,i);this._atlas=o,St.set(this._key,o)}_generateFontAtlas(t,e){const{fontFamily:i,fontWeight:o,fontSize:s,buffer:r,sdf:a,radius:l,cutoff:g}=this.props;let d=e&&e.data;d||(d=document.createElement("canvas"),d.width=ye);const h=d.getContext("2d",{willReadFrequently:!0});me(h,i,s,o);const{mapping:p,canvasHeight:P,xOffset:C,yOffset:L}=Po({getFontWidth:b=>h.measureText(b).width,fontHeight:s*xe,buffer:r,characterSet:t,maxCanvasWidth:ye,...e&&{mapping:e.mapping,xOffset:e.xOffset,yOffset:e.yOffset}});if(d.height!==P){const b=h.getImageData(0,0,d.width,d.height);d.height=P,h.putImageData(b,0,0)}if(me(h,i,s,o),a){const b=new yo({fontSize:s,buffer:r,radius:l,cutoff:g,fontFamily:i,fontWeight:`${o}`});for(const T of t){const{data:z,width:S,height:B,glyphTop:O}=b.draw(T);p[T].width=S,p[T].layoutOffsetY=s*ve-O;const R=h.createImageData(S,B);Ao(z,R),h.putImageData(R,p[T].x,p[T].y)}}else for(const b of t)h.fillText(b,p[b].x,p[b].y+r+s*ve);return{xOffset:C,yOffset:L,mapping:p,data:d,width:d.width,height:d.height}}_getKey(){const{fontFamily:t,fontWeight:e,fontSize:i,buffer:o,sdf:s,radius:r,cutoff:a}=this.props;return s?`${t} ${e} ${i} ${o} ${r} ${a}`:`${t} ${e} ${i} ${o}`}}const Pe=`uniform textBackgroundUniforms {
  bool billboard;
  float sizeScale;
  float sizeMinPixels;
  float sizeMaxPixels;
  vec4 borderRadius;
  vec4 padding;
  highp int sizeUnits;
  bool stroked;
} textBackground;
`,Mo={name:"textBackground",vs:Pe,fs:Pe,uniformTypes:{billboard:"f32",sizeScale:"f32",sizeMinPixels:"f32",sizeMaxPixels:"f32",borderRadius:"vec4<f32>",padding:"vec4<f32>",sizeUnits:"i32",stroked:"f32"}},zo=`#version 300 es
#define SHADER_NAME text-background-layer-vertex-shader
in vec2 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in vec4 instanceRects;
in float instanceSizes;
in float instanceAngles;
in vec2 instancePixelOffsets;
in float instanceLineWidths;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
in vec3 instancePickingColors;
out vec4 vFillColor;
out vec4 vLineColor;
out float vLineWidth;
out vec2 uv;
out vec2 dimensions;
vec2 rotate_by_angle(vec2 vertex, float angle) {
float angle_radian = radians(angle);
float cos_angle = cos(angle_radian);
float sin_angle = sin(angle_radian);
mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
return rotationMatrix * vertex;
}
void main(void) {
geometry.worldPosition = instancePositions;
geometry.uv = positions;
geometry.pickingColor = instancePickingColors;
uv = positions;
vLineWidth = instanceLineWidths;
float sizePixels = clamp(
project_size_to_pixel(instanceSizes * textBackground.sizeScale, textBackground.sizeUnits),
textBackground.sizeMinPixels, textBackground.sizeMaxPixels
);
dimensions = instanceRects.zw * sizePixels + textBackground.padding.xy + textBackground.padding.zw;
vec2 pixelOffset = (positions * instanceRects.zw + instanceRects.xy) * sizePixels + mix(-textBackground.padding.xy, textBackground.padding.zw, positions);
pixelOffset = rotate_by_angle(pixelOffset, instanceAngles);
pixelOffset += instancePixelOffsets;
pixelOffset.y *= -1.0;
if (textBackground.billboard)  {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = vec3(pixelOffset, 0.0);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
DECKGL_FILTER_SIZE(offset_common, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
vFillColor = vec4(instanceFillColors.rgb, instanceFillColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vFillColor, geometry);
vLineColor = vec4(instanceLineColors.rgb, instanceLineColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vLineColor, geometry);
}
`,Oo=`#version 300 es
#define SHADER_NAME text-background-layer-fragment-shader
precision highp float;
in vec4 vFillColor;
in vec4 vLineColor;
in float vLineWidth;
in vec2 uv;
in vec2 dimensions;
out vec4 fragColor;
float round_rect(vec2 p, vec2 size, vec4 radii) {
vec2 pixelPositionCB = (p - 0.5) * size;
vec2 sizeCB = size * 0.5;
float maxBorderRadius = min(size.x, size.y) * 0.5;
vec4 borderRadius = vec4(min(radii, maxBorderRadius));
borderRadius.xy =
(pixelPositionCB.x > 0.0) ? borderRadius.xy : borderRadius.zw;
borderRadius.x = (pixelPositionCB.y > 0.0) ? borderRadius.x : borderRadius.y;
vec2 q = abs(pixelPositionCB) - sizeCB + borderRadius.x;
return -(min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - borderRadius.x);
}
float rect(vec2 p, vec2 size) {
vec2 pixelPosition = p * size;
return min(min(pixelPosition.x, size.x - pixelPosition.x),
min(pixelPosition.y, size.y - pixelPosition.y));
}
vec4 get_stroked_fragColor(float dist) {
float isBorder = smoothedge(dist, vLineWidth);
return mix(vFillColor, vLineColor, isBorder);
}
void main(void) {
geometry.uv = uv;
if (textBackground.borderRadius != vec4(0.0)) {
float distToEdge = round_rect(uv, dimensions, textBackground.borderRadius);
if (textBackground.stroked) {
fragColor = get_stroked_fragColor(distToEdge);
} else {
fragColor = vFillColor;
}
float shapeAlpha = smoothedge(-distToEdge, 0.0);
fragColor.a *= shapeAlpha;
} else {
if (textBackground.stroked) {
float distToEdge = rect(uv, dimensions);
fragColor = get_stroked_fragColor(distToEdge);
} else {
fragColor = vFillColor;
}
}
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,Ro={billboard:!0,sizeScale:1,sizeUnits:"pixels",sizeMinPixels:0,sizeMaxPixels:Number.MAX_SAFE_INTEGER,borderRadius:{type:"object",value:0},padding:{type:"array",value:[0,0,0,0]},getPosition:{type:"accessor",value:n=>n.position},getSize:{type:"accessor",value:1},getAngle:{type:"accessor",value:0},getPixelOffset:{type:"accessor",value:[0,0]},getBoundingRect:{type:"accessor",value:[0,0,0,0]},getFillColor:{type:"accessor",value:[0,0,0,255]},getLineColor:{type:"accessor",value:[0,0,0,255]},getLineWidth:{type:"accessor",value:1}};class Ht extends q{getShaders(){return super.getShaders({vs:zo,fs:Oo,modules:[ut,dt,Mo]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceSizes:{size:1,transition:!0,accessor:"getSize",defaultValue:1},instanceAngles:{size:1,transition:!0,accessor:"getAngle"},instanceRects:{size:4,accessor:"getBoundingRect"},instancePixelOffsets:{size:2,transition:!0,accessor:"getPixelOffset"},instanceFillColors:{size:4,transition:!0,type:"unorm8",accessor:"getFillColor",defaultValue:[0,0,0,255]},instanceLineColors:{size:4,transition:!0,type:"unorm8",accessor:"getLineColor",defaultValue:[0,0,0,255]},instanceLineWidths:{size:1,transition:!0,accessor:"getLineWidth",defaultValue:1}})}updateState(t){super.updateState(t);const{changeFlags:e}=t;e.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),this.getAttributeManager().invalidateAll())}draw({uniforms:t}){const{billboard:e,sizeScale:i,sizeUnits:o,sizeMinPixels:s,sizeMaxPixels:r,getLineWidth:a}=this.props;let{padding:l,borderRadius:g}=this.props;l.length<4&&(l=[l[0],l[1],l[0],l[1]]),Array.isArray(g)||(g=[g,g,g,g]);const d=this.state.model,h={billboard:e,stroked:!!a,borderRadius:g,padding:l,sizeUnits:at[o],sizeScale:i,sizeMinPixels:s,sizeMaxPixels:r};d.shaderInputs.setProps({textBackground:h}),d.draw(this.context.renderPass)}_getModel(){const t=[0,0,1,0,0,1,1,1];return new X(this.context.device,{...this.getShaders(),id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new J({topology:"triangle-strip",vertexCount:4,attributes:{positions:{size:2,value:new Float32Array(t)}}}),isInstanced:!0})}}Ht.defaultProps=Ro;Ht.layerName="TextBackgroundLayer";const _e={start:1,middle:0,end:-1},Le={top:1,center:0,bottom:-1},zt=[0,0,0,255],Fo=1,ko={billboard:!0,sizeScale:1,sizeUnits:"pixels",sizeMinPixels:0,sizeMaxPixels:Number.MAX_SAFE_INTEGER,background:!1,getBackgroundColor:{type:"accessor",value:[255,255,255,255]},getBorderColor:{type:"accessor",value:zt},getBorderWidth:{type:"accessor",value:0},backgroundBorderRadius:{type:"object",value:0},backgroundPadding:{type:"array",value:[0,0,0,0]},characterSet:{type:"object",value:Y.characterSet},fontFamily:Y.fontFamily,fontWeight:Y.fontWeight,lineHeight:Fo,outlineWidth:{type:"number",value:0,min:0},outlineColor:{type:"color",value:zt},fontSettings:{type:"object",value:{},compare:1},wordBreak:"break-word",maxWidth:{type:"number",value:-1},getText:{type:"accessor",value:n=>n.text},getPosition:{type:"accessor",value:n=>n.position},getColor:{type:"accessor",value:zt},getSize:{type:"accessor",value:32},getAngle:{type:"accessor",value:0},getTextAnchor:{type:"accessor",value:"middle"},getAlignmentBaseline:{type:"accessor",value:"center"},getPixelOffset:{type:"accessor",value:[0,0]},backgroundColor:{deprecatedFor:["background","getBackgroundColor"]}};class Vt extends Dt{constructor(){super(...arguments),this.getBoundingRect=(t,e)=>{let{size:[i,o]}=this.transformParagraph(t,e);const{fontSize:s}=this.state.fontAtlasManager.props;i/=s,o/=s;const{getTextAnchor:r,getAlignmentBaseline:a}=this.props,l=_e[typeof r=="function"?r(t,e):r],g=Le[typeof a=="function"?a(t,e):a];return[(l-1)*i/2,(g-1)*o/2,i,o]},this.getIconOffsets=(t,e)=>{const{getTextAnchor:i,getAlignmentBaseline:o}=this.props,{x:s,y:r,rowWidth:a,size:[l,g]}=this.transformParagraph(t,e),d=_e[typeof i=="function"?i(t,e):i],h=Le[typeof o=="function"?o(t,e):o],p=s.length,P=new Array(p*2);let C=0;for(let L=0;L<p;L++){const b=(1-d)*(l-a[L])/2;P[C++]=(d-1)*l/2+b+s[L],P[C++]=(h-1)*g/2+r[L]}return P}}initializeState(){this.state={styleVersion:0,fontAtlasManager:new Eo},this.props.maxWidth>0&&$.once(1,"v8.9 breaking change: TextLayer maxWidth is now relative to text size")()}updateState(t){const{props:e,oldProps:i,changeFlags:o}=t;(o.dataChanged||o.updateTriggersChanged&&(o.updateTriggersChanged.all||o.updateTriggersChanged.getText))&&this._updateText(),(this._updateFontAtlas()||e.lineHeight!==i.lineHeight||e.wordBreak!==i.wordBreak||e.maxWidth!==i.maxWidth)&&this.setState({styleVersion:this.state.styleVersion+1})}getPickingInfo({info:t}){return t.object=t.index>=0?this.props.data[t.index]:null,t}_updateFontAtlas(){const{fontSettings:t,fontFamily:e,fontWeight:i}=this.props,{fontAtlasManager:o,characterSet:s}=this.state,r={...t,characterSet:s,fontFamily:e,fontWeight:i};if(!o.mapping)return o.setProps(r),!0;for(const a in r)if(r[a]!==o.props[a])return o.setProps(r),!0;return!1}_updateText(){const{data:t,characterSet:e}=this.props,i=t.attributes?.getText;let{getText:o}=this.props,s=t.startIndices,r;const a=e==="auto"&&new Set;if(i&&s){const{texts:l,characterCount:g}=bo({...ArrayBuffer.isView(i)?{value:i}:i,length:t.length,startIndices:s,characterSet:a});r=g,o=(d,{index:h})=>l[h]}else{const{iterable:l,objectInfo:g}=Bt(t);s=[0],r=0;for(const d of l){g.index++;const h=Array.from(o(d,g)||"");a&&h.forEach(a.add,a),r+=h.length,s.push(r)}}this.setState({getText:o,startIndices:s,numInstances:r,characterSet:a||e})}transformParagraph(t,e){const{fontAtlasManager:i}=this.state,o=i.mapping,s=this.state.getText,{wordBreak:r,lineHeight:a,maxWidth:l}=this.props,g=s(t,e)||"";return So(g,a,r,l*i.props.fontSize,o)}renderLayers(){const{startIndices:t,numInstances:e,getText:i,fontAtlasManager:{scale:o,atlas:s,mapping:r},styleVersion:a}=this.state,{data:l,_dataDiff:g,getPosition:d,getColor:h,getSize:p,getAngle:P,getPixelOffset:C,getBackgroundColor:L,getBorderColor:b,getBorderWidth:T,backgroundBorderRadius:z,backgroundPadding:S,background:B,billboard:O,fontSettings:R,outlineWidth:U,outlineColor:H,sizeScale:W,sizeUnits:Z,sizeMinPixels:Q,sizeMaxPixels:tt,transitions:N,updateTriggers:G}=this.props,et=this.getSubLayerClass("characters",Ut),c=this.getSubLayerClass("background",Ht);return[B&&new c({getFillColor:L,getLineColor:b,getLineWidth:T,borderRadius:z,padding:S,getPosition:d,getSize:p,getAngle:P,getPixelOffset:C,billboard:O,sizeScale:W,sizeUnits:Z,sizeMinPixels:Q,sizeMaxPixels:tt,transitions:N&&{getPosition:N.getPosition,getAngle:N.getAngle,getSize:N.getSize,getFillColor:N.getBackgroundColor,getLineColor:N.getBorderColor,getLineWidth:N.getBorderWidth,getPixelOffset:N.getPixelOffset}},this.getSubLayerProps({id:"background",updateTriggers:{getPosition:G.getPosition,getAngle:G.getAngle,getSize:G.getSize,getFillColor:G.getBackgroundColor,getLineColor:G.getBorderColor,getLineWidth:G.getBorderWidth,getPixelOffset:G.getPixelOffset,getBoundingRect:{getText:G.getText,getTextAnchor:G.getTextAnchor,getAlignmentBaseline:G.getAlignmentBaseline,styleVersion:a}}}),{data:l.attributes&&l.attributes.background?{length:l.length,attributes:l.attributes.background}:l,_dataDiff:g,autoHighlight:!1,getBoundingRect:this.getBoundingRect}),new et({sdf:R.sdf,smoothing:Number.isFinite(R.smoothing)?R.smoothing:Y.smoothing,outlineWidth:U/(R.radius||Y.radius),outlineColor:H,iconAtlas:s,iconMapping:r,getPosition:d,getColor:h,getSize:p,getAngle:P,getPixelOffset:C,billboard:O,sizeScale:W*o,sizeUnits:Z,sizeMinPixels:Q*o,sizeMaxPixels:tt*o,transitions:N&&{getPosition:N.getPosition,getAngle:N.getAngle,getColor:N.getColor,getSize:N.getSize,getPixelOffset:N.getPixelOffset}},this.getSubLayerProps({id:"characters",updateTriggers:{all:G.getText,getPosition:G.getPosition,getAngle:G.getAngle,getColor:G.getColor,getSize:G.getSize,getPixelOffset:G.getPixelOffset,getIconOffsets:{getTextAnchor:G.getTextAnchor,getAlignmentBaseline:G.getAlignmentBaseline,styleVersion:a}}}),{data:l,_dataDiff:g,startIndices:t,numInstances:e,getIconOffsets:this.getIconOffsets,getIcon:i})]}static set fontAtlasCacheLimit(t){Io(t)}}Vt.defaultProps=ko;Vt.layerName="TextLayer";const _t={circle:{type:Gt,props:{filled:"filled",stroked:"stroked",lineWidthMaxPixels:"lineWidthMaxPixels",lineWidthMinPixels:"lineWidthMinPixels",lineWidthScale:"lineWidthScale",lineWidthUnits:"lineWidthUnits",pointRadiusMaxPixels:"radiusMaxPixels",pointRadiusMinPixels:"radiusMinPixels",pointRadiusScale:"radiusScale",pointRadiusUnits:"radiusUnits",pointAntialiasing:"antialiasing",pointBillboard:"billboard",getFillColor:"getFillColor",getLineColor:"getLineColor",getLineWidth:"getLineWidth",getPointRadius:"getRadius"}},icon:{type:bt,props:{iconAtlas:"iconAtlas",iconMapping:"iconMapping",iconSizeMaxPixels:"sizeMaxPixels",iconSizeMinPixels:"sizeMinPixels",iconSizeScale:"sizeScale",iconSizeUnits:"sizeUnits",iconAlphaCutoff:"alphaCutoff",iconBillboard:"billboard",getIcon:"getIcon",getIconAngle:"getAngle",getIconColor:"getColor",getIconPixelOffset:"getPixelOffset",getIconSize:"getSize"}},text:{type:Vt,props:{textSizeMaxPixels:"sizeMaxPixels",textSizeMinPixels:"sizeMinPixels",textSizeScale:"sizeScale",textSizeUnits:"sizeUnits",textBackground:"background",textBackgroundPadding:"backgroundPadding",textFontFamily:"fontFamily",textFontWeight:"fontWeight",textLineHeight:"lineHeight",textMaxWidth:"maxWidth",textOutlineColor:"outlineColor",textOutlineWidth:"outlineWidth",textWordBreak:"wordBreak",textCharacterSet:"characterSet",textBillboard:"billboard",textFontSettings:"fontSettings",getText:"getText",getTextAngle:"getAngle",getTextColor:"getColor",getTextPixelOffset:"getPixelOffset",getTextSize:"getSize",getTextAnchor:"getTextAnchor",getTextAlignmentBaseline:"getAlignmentBaseline",getTextBackgroundColor:"getBackgroundColor",getTextBorderColor:"getBorderColor",getTextBorderWidth:"getBorderWidth"}}},Lt={type:Wt,props:{lineWidthUnits:"widthUnits",lineWidthScale:"widthScale",lineWidthMinPixels:"widthMinPixels",lineWidthMaxPixels:"widthMaxPixels",lineJointRounded:"jointRounded",lineCapRounded:"capRounded",lineMiterLimit:"miterLimit",lineBillboard:"billboard",getLineColor:"getColor",getLineWidth:"getWidth"}},kt={type:Nt,props:{extruded:"extruded",filled:"filled",wireframe:"wireframe",elevationScale:"elevationScale",material:"material",_full3d:"_full3d",getElevation:"getElevation",getFillColor:"getFillColor",getLineColor:"getLineColor"}};function nt({type:n,props:t}){const e={};for(const i in t)e[i]=n.defaultProps[t[i]];return e}function Ot(n,t){const{transitions:e,updateTriggers:i}=n.props,o={updateTriggers:{},transitions:e&&{getPosition:e.geometry}};for(const s in t){const r=t[s];let a=n.props[s];s.startsWith("get")&&(a=n.getSubLayerAccessor(a),o.updateTriggers[r]=i[s],e&&(o.transitions[r]=e[s])),o[r]=a}return o}function Bo(n){if(Array.isArray(n))return n;switch($.assert(n.type,"GeoJSON does not have type"),n.type){case"Feature":return[n];case"FeatureCollection":return $.assert(Array.isArray(n.features),"GeoJSON does not have features array"),n.features;default:return[{geometry:n}]}}function Ce(n,t,e={}){const i={pointFeatures:[],lineFeatures:[],polygonFeatures:[],polygonOutlineFeatures:[]},{startRow:o=0,endRow:s=n.length}=e;for(let r=o;r<s;r++){const a=n[r],{geometry:l}=a;if(l)if(l.type==="GeometryCollection"){$.assert(Array.isArray(l.geometries),"GeoJSON does not have geometries array");const{geometries:g}=l;for(let d=0;d<g.length;d++){const h=g[d];Se(h,i,t,a,r)}}else Se(l,i,t,a,r)}return i}function Se(n,t,e,i,o){const{type:s,coordinates:r}=n,{pointFeatures:a,lineFeatures:l,polygonFeatures:g,polygonOutlineFeatures:d}=t;if(!Go(s,r)){$.warn(`${s} coordinates are malformed`)();return}switch(s){case"Point":a.push(e({geometry:n},i,o));break;case"MultiPoint":r.forEach(h=>{a.push(e({geometry:{type:"Point",coordinates:h}},i,o))});break;case"LineString":l.push(e({geometry:n},i,o));break;case"MultiLineString":r.forEach(h=>{l.push(e({geometry:{type:"LineString",coordinates:h}},i,o))});break;case"Polygon":g.push(e({geometry:n},i,o)),r.forEach(h=>{d.push(e({geometry:{type:"LineString",coordinates:h}},i,o))});break;case"MultiPolygon":r.forEach(h=>{g.push(e({geometry:{type:"Polygon",coordinates:h}},i,o)),h.forEach(p=>{d.push(e({geometry:{type:"LineString",coordinates:p}},i,o))})});break}}const Do={Point:1,MultiPoint:2,LineString:2,MultiLineString:3,Polygon:3,MultiPolygon:4};function Go(n,t){let e=Do[n];for($.assert(e,`Unknown GeoJSON type ${n}`);t&&--e>0;)t=t[0];return t&&Number.isFinite(t[0])}function Ue(){return{points:{},lines:{},polygons:{},polygonsOutline:{}}}function vt(n){return n.geometry.coordinates}function Wo(n,t){const e=Ue(),{pointFeatures:i,lineFeatures:o,polygonFeatures:s,polygonOutlineFeatures:r}=n;return e.points.data=i,e.points._dataDiff=t.pointFeatures&&(()=>t.pointFeatures),e.points.getPosition=vt,e.lines.data=o,e.lines._dataDiff=t.lineFeatures&&(()=>t.lineFeatures),e.lines.getPath=vt,e.polygons.data=s,e.polygons._dataDiff=t.polygonFeatures&&(()=>t.polygonFeatures),e.polygons.getPolygon=vt,e.polygonsOutline.data=r,e.polygonsOutline._dataDiff=t.polygonOutlineFeatures&&(()=>t.polygonOutlineFeatures),e.polygonsOutline.getPath=vt,e}function No(n,t){const e=Ue(),{points:i,lines:o,polygons:s}=n,r=uo(n,t);return e.points.data={length:i.positions.value.length/i.positions.size,attributes:{...i.attributes,getPosition:i.positions,instancePickingColors:{size:4,value:r.points}},properties:i.properties,numericProps:i.numericProps,featureIds:i.featureIds},e.lines.data={length:o.pathIndices.value.length-1,startIndices:o.pathIndices.value,attributes:{...o.attributes,getPath:o.positions,instancePickingColors:{size:4,value:r.lines}},properties:o.properties,numericProps:o.numericProps,featureIds:o.featureIds},e.lines._pathType="open",e.polygons.data={length:s.polygonIndices.value.length-1,startIndices:s.polygonIndices.value,attributes:{...s.attributes,getPolygon:s.positions,pickingColors:{size:4,value:r.polygons}},properties:s.properties,numericProps:s.numericProps,featureIds:s.featureIds},e.polygons._normalize=!1,s.triangles&&(e.polygons.data.attributes.indices=s.triangles.value),e.polygonsOutline.data={length:s.primitivePolygonIndices.value.length-1,startIndices:s.primitivePolygonIndices.value,attributes:{...s.attributes,getPath:s.positions,instancePickingColors:{size:4,value:r.polygons}},properties:s.properties,numericProps:s.numericProps,featureIds:s.featureIds},e.polygonsOutline._pathType="open",e}const Uo=["points","linestrings","polygons"],Ho={...nt(_t.circle),...nt(_t.icon),...nt(_t.text),...nt(Lt),...nt(kt),stroked:!0,filled:!0,extruded:!1,wireframe:!1,_full3d:!1,iconAtlas:{type:"object",value:null},iconMapping:{type:"object",value:{}},getIcon:{type:"accessor",value:n=>n.properties.icon},getText:{type:"accessor",value:n=>n.properties.text},pointType:"circle",getRadius:{deprecatedFor:"getPointRadius"}};class He extends Dt{initializeState(){this.state={layerProps:{},features:{},featuresDiff:{}}}updateState({props:t,changeFlags:e}){if(!e.dataChanged)return;const{data:i}=this.props,o=i&&"points"in i&&"polygons"in i&&"lines"in i;this.setState({binary:o}),o?this._updateStateBinary({props:t,changeFlags:e}):this._updateStateJSON({props:t,changeFlags:e})}_updateStateBinary({props:t,changeFlags:e}){const i=No(t.data,this.encodePickingColor);this.setState({layerProps:i})}_updateStateJSON({props:t,changeFlags:e}){const i=Bo(t.data),o=this.getSubLayerRow.bind(this);let s={};const r={};if(Array.isArray(e.dataChanged)){const l=this.state.features;for(const g in l)s[g]=l[g].slice(),r[g]=[];for(const g of e.dataChanged){const d=Ce(i,o,g);for(const h in l)r[h].push(lo({data:s[h],getIndex:p=>p.__source.index,dataRange:g,replace:d[h]}))}}else s=Ce(i,o);const a=Wo(s,r);this.setState({features:s,featuresDiff:r,layerProps:a})}getPickingInfo(t){const e=super.getPickingInfo(t),{index:i,sourceLayer:o}=e;return e.featureType=Uo.find(s=>o.id.startsWith(`${this.id}-${s}-`)),i>=0&&o.id.startsWith(`${this.id}-points-text`)&&this.state.binary&&(e.index=this.props.data.points.globalFeatureIds.value[i]),e}_updateAutoHighlight(t){const e=`${this.id}-points-`,i=t.featureType==="points";for(const o of this.getSubLayers())o.id.startsWith(e)===i&&o.updateAutoHighlight(t)}_renderPolygonLayer(){const{extruded:t,wireframe:e}=this.props,{layerProps:i}=this.state,o="polygons-fill",s=this.shouldRenderSubLayer(o,i.polygons?.data)&&this.getSubLayerClass(o,kt.type);if(s){const r=Ot(this,kt.props),a=t&&e;return a||delete r.getLineColor,r.updateTriggers.lineColors=a,new s(r,this.getSubLayerProps({id:o,updateTriggers:r.updateTriggers}),i.polygons)}return null}_renderLineLayers(){const{extruded:t,stroked:e}=this.props,{layerProps:i}=this.state,o="polygons-stroke",s="linestrings",r=!t&&e&&this.shouldRenderSubLayer(o,i.polygonsOutline?.data)&&this.getSubLayerClass(o,Lt.type),a=this.shouldRenderSubLayer(s,i.lines?.data)&&this.getSubLayerClass(s,Lt.type);if(r||a){const l=Ot(this,Lt.props);return[r&&new r(l,this.getSubLayerProps({id:o,updateTriggers:l.updateTriggers}),i.polygonsOutline),a&&new a(l,this.getSubLayerProps({id:s,updateTriggers:l.updateTriggers}),i.lines)]}return null}_renderPointLayers(){const{pointType:t}=this.props,{layerProps:e,binary:i}=this.state;let{highlightedObjectIndex:o}=this.props;!i&&Number.isFinite(o)&&(o=e.points.data.findIndex(a=>a.__source.index===o));const s=new Set(t.split("+")),r=[];for(const a of s){const l=`points-${a}`,g=_t[a],d=g&&this.shouldRenderSubLayer(l,e.points?.data)&&this.getSubLayerClass(l,g.type);if(d){const h=Ot(this,g.props);let p=e.points;if(a==="text"&&i){const{instancePickingColors:P,...C}=p.data.attributes;p={...p,data:{...p.data,attributes:C}}}r.push(new d(h,this.getSubLayerProps({id:l,updateTriggers:h.updateTriggers,highlightedObjectIndex:o}),p))}}return r}renderLayers(){const{extruded:t}=this.props,e=this._renderPolygonLayer(),i=this._renderLineLayers(),o=this._renderPointLayers();return[!t&&e,i,o,t&&e]}getSubLayerAccessor(t){const{binary:e}=this.state;return!e||typeof t!="function"?super.getSubLayerAccessor(t):(i,o)=>{const{data:s,index:r}=o,a=co(s,r);return t(a,o)}}}He.layerName="GeoJsonLayer";He.defaultProps=Ho;export{Dt as C,He as G,Wt as P,Gt as S,Vt as T,Ie as W,ri as a,si as b,ai as c,Nt as d,we as g,xt as l,Ee as m};
