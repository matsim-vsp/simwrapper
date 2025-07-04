import{_ as f,J as O,C as v,T as y,h as x,I as b,K as P,j as R,k as A,L as N,p as L,a as F,M,G as w,l as z}from"./set-rtl-text-plugin-CAj6Z1OM.js";import{d as H,n as D}from"./index-CJ-FYo83.js";import{t as U}from"./index-Ab7VWJrS.js";import{G as u}from"./index-DgdUD6UN.js";import{L as G}from"./line-layer-CjVP5jwp.js";const k=[255,255,255],W=1,j=[0,0,1],B=[0,0,1];let Y=0;class ge{constructor(e={}){f(this,"id",void 0),f(this,"color",void 0),f(this,"intensity",void 0),f(this,"type","point"),f(this,"position",void 0),f(this,"attenuation",void 0),f(this,"projectedLight",void 0);const{color:t=k}=e,{intensity:n=W}=e,{position:o=B}=e;this.id=e.id||"point-".concat(Y++),this.color=t,this.intensity=n,this.type="point",this.position=o,this.attenuation=K(e),this.projectedLight={...this}}getProjectedLight({layer:e}){const{projectedLight:t}=this,n=e.context.viewport,{coordinateSystem:o,coordinateOrigin:s}=e.props,a=O(this.position,{viewport:n,coordinateSystem:o,coordinateOrigin:s,fromCoordinateSystem:n.isGeospatial?v.LNGLAT:v.CARTESIAN,fromCoordinateOrigin:[0,0,0]});return t.color=this.color,t.intensity=this.intensity,t.position=a,t}}function K(i){return i.attenuation?i.attenuation:"intensity"in i?[0,0,i.intensity||0]:j}const V=H({name:"PlaybackControls",props:{isRunning:{type:Boolean,required:!0},timeStart:{type:Number,required:!0},timeEnd:{type:Number,required:!0},currentTime:{type:Number,required:!0}},data:i=>({pauseWhileDragging:!1,sliderValue:0,sliderOptions:{min:0,max:1e6,clickable:!1,duration:0,lazy:!0,tooltip:!1}}),mounted(){window.addEventListener("keyup",this.onKeyPressed)},beforeDestroy(){window.removeEventListener("keyup",this.onKeyPressed)},watch:{currentTime(){this.sliderValue=1e6*(this.currentTime-this.timeStart)/(this.timeEnd-this.timeStart)}},methods:{toggleSimulation(){this.$emit("click")},convertSecondsToClockTimeMinutes(i){const e=this.getSecondsFromSlider(i);try{const t=U(e),n=("00"+t.minutes).slice(-2);return`${t.hours}:${n}`}catch{return"00:00"}},dragStart(){this.isRunning&&(this.pauseWhileDragging=!0,this.$emit("click"))},dragEnd(){this.pauseWhileDragging&&this.$emit("click"),this.pauseWhileDragging=!1},dragging(i){this.$emit("time",this.getSecondsFromSlider(i))},onKeyPressed(i){i.code==="Space"&&this.toggleSimulation()},getSecondsFromSlider(i){let e=(this.timeEnd-this.timeStart)*i/1e6;return e===this.timeEnd&&(e=this.timeEnd-1),e}}});var X=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("div",{staticClass:"slider-thingy"},[t("b-slider",e._b({staticClass:"slider",attrs:{size:"is-large"},on:{dragging:e.dragging,dragstart:e.dragStart,dragend:e.dragEnd},model:{value:e.sliderValue,callback:function(n){e.sliderValue=n},expression:"sliderValue"}},"b-slider",e.sliderOptions,!1)),t("div",{staticClass:"buttons"},[t("div",{staticClass:"playpause",on:{click:e.toggleSimulation}},[e.isRunning?t("i",{staticClass:"button-icon fa fa-1x fa-pause"}):t("i",{staticClass:"button-icon fa fa-1x fa-play"})])])],1)},$=[],q=D(V,X,$,!1,null,"ac23e3c7");const ve=q.exports,Z=`// BC 2021-04-30: this file forked from https://github.com/visgl/deck.gl
//
// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

#define SHADER_NAME icon-layer-vertex-shader

attribute vec2 positions;

attribute float instanceSizes;
attribute vec4 instanceColors;
attribute vec3 instancePickingColors;
attribute vec4 instanceIconFrames;
attribute float instanceColorModes;
attribute vec2 instanceOffsets;
attribute vec2 instancePixelOffset;
attribute float instanceColorCodes;

uniform float sizeScale;
uniform vec2 iconsTextureDim;
uniform float sizeMinPixels;
uniform float sizeMaxPixels;
uniform bool billboard;
uniform float latitudeCorrectionFactor;

uniform float currentTime;

uniform vec2 iconStillOffsets;
uniform vec4 iconStillFrames;

attribute float instanceTimestamps;
attribute float instanceTimestampsNext;
attribute vec2 instanceStartPositions;
attribute vec2 instanceEndPositions;

varying float vColorMode;
varying vec4 vColor;
varying vec2 vTextureCoords;
varying vec2 uv;
varying float vPercentComplete;

// ------------------------------------------------------------------

vec2 rotate_by_angle(vec2 vertex, float angle_radian) {
  float cos_angle = cos(angle_radian);
  float sin_angle = sin(angle_radian);
  mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
  return rotationMatrix * vertex;
}

vec3 interpolate(in vec3 point1, in vec3 point2, in float timestepFraction) {
    if (timestepFraction <= 0.0) {
        return point1;
    } else if (timestepFraction >= 1.0 ) {
        return point2;
    } else {
        vec3 direction = point2 - point1;
        return point1 + (direction * timestepFraction);
    }
}

void main(void) {

  // Calculate progress:
  // Skip everything else if this vertex is outside the time window
  if (currentTime < instanceTimestamps) {
    vPercentComplete = -1.0;
    return;
  } else if (currentTime >= instanceTimestampsNext) {
    vPercentComplete = -1.0;
    return;
  } else {
    vPercentComplete = (currentTime - instanceTimestamps) /
                       (instanceTimestampsNext - instanceTimestamps);
  }

  geometry.pickingColor = instancePickingColors;

  vec3 startPosition = vec3(instanceStartPositions, 5.0);
  vec3 endPosition = vec3(instanceEndPositions, 5.0);

  // are we stationary/still
  bool still = (instanceStartPositions == instanceEndPositions);

  // geometry.uv = positions;
  // uv = positions;

  // this could be the problem right here;
  vec2 iconSize = still ? iconStillFrames.zw : instanceIconFrames.zw;
  // convert size in meters to pixels, then scaled and clamp
  // project meters to pixels and clamp to limits
  float sizePixels = clamp(
    project_size_to_pixel(instanceSizes * sizeScale),
    sizeMinPixels, sizeMaxPixels
  );

  // scale icon height to match instanceSize
  float instanceScale = iconSize.y == 0.0 ? 0.0 : sizePixels / iconSize.y;

  // // figure out angle based on motion direction
  float angle = 0.0;
  if (!still) {
    vec2 direction = endPosition.xy - startPosition.xy;
    angle = atan(direction.y , direction.x * latitudeCorrectionFactor);
  }

  // scale and rotate vertex in "pixel" value and convert back to fraction in clipspace
  vec2 pixelOffset = positions / 2.0 * iconSize + (still ? iconStillOffsets : instanceOffsets);
  pixelOffset = rotate_by_angle(pixelOffset, angle) * instanceScale;
  pixelOffset += instancePixelOffset;
  pixelOffset.y *= -1.0;

  vec3 newPosition = interpolate(startPosition, endPosition, vPercentComplete);

  if (billboard)  {
    // billboard mode
    gl_Position = project_position_to_clipspace(newPosition, vec3(0.0), vec3(0.0), geometry.position);
    vec3 offset = vec3(pixelOffset, 0.0);
    DECKGL_FILTER_SIZE(offset, geometry);
    gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
  } else {
    // flat-against-map mode
    vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
    DECKGL_FILTER_SIZE(offset_common, geometry);
    gl_Position = project_position_to_clipspace(newPosition, vec3(0.0), offset_common, geometry.position);
  }
  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);

  vec2 upperleft = (still ? iconStillFrames.xy : instanceIconFrames.xy);

  vTextureCoords = mix(
    upperleft,
    upperleft + iconSize,
    (positions.xy + 1.0) / 2.0
  ) / iconsTextureDim;

  // COLORS
  vColor = instanceColors;
  if (instanceColorCodes  == 1.0) {
    // green
    // vColor = vec4(0.0, 0.65, 0.0, 1.0);
    vColor = vec4(0.0, 0.75, 0.22, 1.0);
  } else if (instanceColorCodes == 2.0) {
    // yellow
    // vColor = vec4(0.85, 0.65, 0.0, 1.0);
    vColor = vec4(0.90, 0.80, 0.0, 1.0);
  } else if (instanceColorCodes == 3.0 ) {
    // red
    vColor = vec4(0.95, 0.0, 0.2, 1.0);
  }

  DECKGL_FILTER_COLOR(vColor, geometry);

  vColorMode = instanceColorModes;
}
`,J=`// BC 2021-04-30: this file forked from https://github.com/visgl/deck.gl
//
// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

#define SHADER_NAME icon-layer-vertex-shader

attribute vec2 positions;

attribute float instanceSizes;
attribute vec4 instanceColors;
attribute vec3 instancePickingColors;
attribute vec4 instanceIconFrames;
attribute float instanceColorModes;
attribute vec2 instanceOffsets;
attribute vec2 instancePixelOffset;
attribute float instanceColorCodes;

uniform float sizeScale;
uniform vec2 iconsTextureDim;
uniform float sizeMinPixels;
uniform float sizeMaxPixels;
uniform bool billboard;
uniform float latitudeCorrectionFactor;

uniform float currentTime;

uniform vec2 iconStillOffsets;
uniform vec4 iconStillFrames;

attribute float instanceTimestamps;
attribute float instanceTimestampsNext;
attribute vec2 instanceStartPositions;
attribute vec2 instanceEndPositions;

varying float vColorMode;
varying vec4 vColor;
varying vec2 vTextureCoords;
varying vec2 uv;
varying float vPercentComplete;

// ------------------------------------------------------------------

vec2 rotate_by_angle(vec2 vertex, float angle_radian) {
  float cos_angle = cos(angle_radian);
  float sin_angle = sin(angle_radian);
  mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
  return rotationMatrix * vertex;
}

vec3 interpolate(in vec3 point1, in vec3 point2, in float timestepFraction) {
    if (timestepFraction <= 0.0) {
        return point1;
    } else if (timestepFraction >= 1.0 ) {
        return point2;
    } else {
        vec3 direction = point2 - point1;
        return point1 + (direction * timestepFraction);
    }
}

void main(void) {

  // Calculate progress:
  // Skip everything else if this vertex is outside the time window
  if (currentTime < instanceTimestamps) {
    vPercentComplete = -1.0;
    return;
  } else if (currentTime >= instanceTimestampsNext) {
    vPercentComplete = -1.0;
    return;
  } else {
    vPercentComplete = (currentTime - instanceTimestamps) /
                       (instanceTimestampsNext - instanceTimestamps);
  }

  geometry.pickingColor = instancePickingColors;

  vec3 startPosition = vec3(instanceStartPositions, 5.0);
  vec3 endPosition = vec3(instanceEndPositions, 5.0);

  // are we stationary/still
  bool still = (instanceStartPositions == instanceEndPositions);

  // geometry.uv = positions;
  // uv = positions;

  // this could be the problem right here;
  vec2 iconSize = still ? iconStillFrames.zw : instanceIconFrames.zw;
  // convert size in meters to pixels, then scaled and clamp
  // project meters to pixels and clamp to limits
  float sizePixels = clamp(
    project_size_to_pixel(instanceSizes * sizeScale),
    sizeMinPixels, sizeMaxPixels
  );

  // scale icon height to match instanceSize
  float instanceScale = iconSize.y == 0.0 ? 0.0 : sizePixels / iconSize.y;

  // // figure out angle based on motion direction
  float angle = 0.0;
  if (!still) {
    vec2 direction = endPosition.xy - startPosition.xy;
    angle = atan(direction.y , direction.x * latitudeCorrectionFactor);
  }

  // scale and rotate vertex in "pixel" value and convert back to fraction in clipspace
  vec2 pixelOffset = positions / 2.0 * iconSize + (still ? iconStillOffsets : instanceOffsets);
  pixelOffset = rotate_by_angle(pixelOffset, angle) * instanceScale;
  pixelOffset += instancePixelOffset;
  pixelOffset.y *= -1.0;

  vec3 newPosition = interpolate(startPosition, endPosition, vPercentComplete);

  if (billboard)  {
    // billboard mode
    gl_Position = project_position_to_clipspace(newPosition, vec3(0.0), vec3(0.0), geometry.position);
    vec3 offset = vec3(pixelOffset, 0.0);
    DECKGL_FILTER_SIZE(offset, geometry);
    gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
  } else {
    // flat-against-map mode
    vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
    DECKGL_FILTER_SIZE(offset_common, geometry);
    gl_Position = project_position_to_clipspace(newPosition, vec3(0.0), offset_common, geometry.position);
  }
  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);

  vec2 upperleft = (still ? iconStillFrames.xy : instanceIconFrames.xy);

  vTextureCoords = mix(
    upperleft,
    upperleft + iconSize,
    (positions.xy + 1.0) / 2.0
  ) / iconsTextureDim;

  // COLORS
  vColor = instanceColors;
  float bp1 = 0.20;
  float bp2 = 0.40;

  vec4 col1 = vec4(0.95, 0.0, 0.2, 1.0);
  vec4 col2 = vec4(0.90, 0.80, 0.0, 0.8);
  vec4 col3 = vec4(0.00, 0.75, 0.20, 1.0);
  vec4 col4 = vec4(0.15, 0.45, 0.98, 1.0);

  if (instanceColorCodes < bp1) {
    float t = instanceColorCodes / bp1;
    vColor = mix(col1, col2, t);
  } else if (instanceColorCodes < bp2) {
    float t = (instanceColorCodes - bp2 + bp1) / (bp2 - bp1);
    vColor =  mix(col2, col3, t);
  } else {
    float t = (instanceColorCodes - bp2) / (1.0 - bp2);
    vColor =  mix(col3, col4,  t);
  }

  // if (instanceColorCodes  == 1.0) {
  //   // green
  //   vColor = vec4(0.0, 0.75, 0.22, 1.0);
  // } else if (instanceColorCodes == 2.0) {
  //   // yellow
  //   vColor = vec4(0.90, 0.80, 0.0, 1.0);
  // } else if (instanceColorCodes == 3.0 ) {
  //   // red
  //   vColor = vec4(0.95, 0.0, 0.2, 1.0);
  // }

  DECKGL_FILTER_COLOR(vColor, geometry);

  vColorMode = instanceColorModes;
}
`,Q=`// BC 2021-04-30: this file forked from https://github.com/visgl/deck.gl
//
// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

#define SHADER_NAME icon-layer-fragment-shader

precision highp float;

uniform float opacity;
uniform sampler2D iconsTexture;
uniform float alphaCutoff;

varying float vColorMode;
varying vec4 vColor;
varying vec2 vTextureCoords;
varying vec2 uv;

uniform float currentTime;
varying float vPercentComplete;

void main(void) {

  if (vPercentComplete == -1.0) discard;

  geometry.uv = uv;

  vec4 texColor = texture2D(iconsTexture, vTextureCoords);

  // if colorMode == 0, use pixel color from the texture
  // if colorMode == 1 or rendering picking buffer, use texture as transparency mask
  vec3 color = mix(texColor.rgb, vColor.rgb, vColorMode);
  // Take the global opacity and the alpha from vColor into account for the alpha component
  float a = texColor.a * opacity * vColor.a;

  if (a < alphaCutoff) {
    discard;
  }

  gl_FragColor = vec4(color, a);
  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
}
`,ee=1024,te=4,T=()=>{},ne={[u.TEXTURE_MIN_FILTER]:u.LINEAR_MIPMAP_LINEAR,[u.TEXTURE_MAG_FILTER]:u.LINEAR,[u.TEXTURE_WRAP_S]:u.CLAMP_TO_EDGE,[u.TEXTURE_WRAP_T]:u.CLAMP_TO_EDGE};function ie(i){return Math.pow(2,Math.ceil(Math.log2(i)))}function oe(i,e,t,n){return t===e.width&&n===e.height?e:(i.canvas.height=n,i.canvas.width=t,i.clearRect(0,0,i.canvas.width,i.canvas.height),i.drawImage(e,0,0,e.width,e.height,0,0,t,n),i.canvas)}function h(i){return i&&(i.id||i.url)}function se(i,e,t,n){const o=e.width,s=e.height,a=P(e,{width:t,height:n});return R(e,a,{targetY:0,width:o,height:s}),e.delete(),a}function _(i,e,t){for(let n=0;n<e.length;n++){const{icon:o,xOffset:s}=e[n],a=h(o);i[a]={...o,x:s,y:t}}}function ae({icons:i,buffer:e,mapping:t={},xOffset:n=0,yOffset:o=0,rowHeight:s=0,canvasWidth:a}){let r=[];for(let c=0;c<i.length;c++){const l=i[c],d=h(l);if(!t[d]){const{height:m,width:p}=l;n+p+e>a&&(_(t,r,o),n=0,o=s+o+e,s=0,r=[]),r.push({icon:l,xOffset:n}),n=n+p+e,s=Math.max(s,m)}}return r.length>0&&_(t,r,o),{mapping:t,rowHeight:s,xOffset:n,yOffset:o,canvasWidth:a,canvasHeight:ie(s+o+e)}}function re(i,e,t){if(!i||!e)return null;t=t||{};const n={},{iterable:o,objectInfo:s}=A(i);for(const a of o){s.index++;const r=e(a,s),c=h(r);if(!r)throw new Error("Icon is missing.");if(!r.url)throw new Error("Icon url is missing.");!n[c]&&(!t[c]||r.url!==t[c].url)&&(n[c]={...r,source:a,sourceIndex:s.index})}return n}class ce{gl;onUpdate;onError;_loadOptions;_getIcon;_texture;_externalTexture;_mapping;_pendingCount;_autoPacking;_xOffset;_yOffset;_rowHeight;_buffer;_canvasWidth;_canvasHeight;_canvas;constructor(e,{onUpdate:t=T,onError:n=T}){this.gl=e,this.onUpdate=t,this.onError=n,this._loadOptions=null,this._getIcon=null,this._texture=null,this._externalTexture=null,this._mapping={},this._pendingCount=0,this._autoPacking=!1,this._xOffset=0,this._yOffset=0,this._rowHeight=0,this._buffer=te,this._canvasWidth=ee,this._canvasHeight=0,this._canvas=null}finalize(){this._texture?.delete()}getTexture(){return this._texture||this._externalTexture}getIconMapping(e){const t=this._autoPacking?h(e):e;return this._mapping[t]||{}}setProps({loadOptions:e,autoPacking:t,iconAtlas:n,iconMapping:o,data:s,getIcon:a}){e&&(this._loadOptions=e),t!==void 0&&(this._autoPacking=t),a&&(this._getIcon=a),o&&(this._mapping=o),n&&this._updateIconAtlas(n),this._autoPacking&&(s||a)&&typeof document<"u"&&(this._canvas=this._canvas||document.createElement("canvas"),this._updateAutoPacking(s))}get isLoaded(){return this._pendingCount===0}_updateIconAtlas(e){this._texture?.delete(),this._texture=null,this._externalTexture=e,this.onUpdate()}_updateAutoPacking(e){const t=Object.values(re(e,this._getIcon,this._mapping)||{});if(t.length>0){const{mapping:n,xOffset:o,yOffset:s,rowHeight:a,canvasHeight:r}=ae({icons:t,buffer:this._buffer,canvasWidth:this._canvasWidth,mapping:this._mapping,rowHeight:this._rowHeight,xOffset:this._xOffset,yOffset:this._yOffset});this._rowHeight=a,this._mapping=n,this._xOffset=o,this._yOffset=s,this._canvasHeight=r,this._texture||(this._texture=new y(this.gl,{width:this._canvasWidth,height:this._canvasHeight,parameters:ne})),this._texture.height!==this._canvasHeight&&(this._texture=se(this.gl,this._texture,this._canvasWidth,this._canvasHeight)),this.onUpdate(),this._loadIcons(t)}}_loadIcons(e){const t=this._canvas.getContext("2d");for(const n of e)this._pendingCount++,x(n.url,b,this._loadOptions).then(o=>{const s=h(n),{x:a,y:r,width:c,height:l}=this._mapping[s],d=oe(t,o,c,l);this._texture.setSubImageData({data:d,x:a,y:r,width:c,height:l}),this._texture.generateMipmap(),this.onUpdate()}).catch(o=>{this.onError({url:n.url,source:n.source,sourceIndex:n.sourceIndex,loadOptions:this._loadOptions,error:o})}).finally(()=>{this._pendingCount--})}}const E=[0,0,0,255],le={iconAtlas:{type:"image",value:null,async:!0},iconMapping:{type:"object",value:{},async:!0},sizeScale:{type:"number",value:1,min:0},billboard:!1,sizeUnits:"pixels",isColorOccupancy:!1,latitudeCorrectionFactor:.8,sizeMinPixels:{type:"number",min:0,value:0},sizeMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},alphaCutoff:{type:"number",value:.05,min:0,max:1},iconStill:{type:"object",value:null},getIcon:{type:"accessor",value:i=>i.icon},getColor:{type:"accessor",value:E},getSize:{type:"accessor",value:1},getAngle:{type:"accessor",value:0},getPixelOffset:{type:"accessor",value:[0,0]},getPathStart:{type:"accessor",value:null},getPathEnd:{type:"accessor",value:null},getTimeStart:{type:"accessor",value:null},getTimeEnd:{type:"accessor",value:null},currentTime:{type:"number",value:0},pickable:{type:"boolean",value:!0},onIconError:{type:"function",value:null,compare:!1,optional:!0}};class I extends N{getShaders(){const e=this.props.isColorOccupancy?J:Z;return super.getShaders({vs:e,fs:Q,modules:[L,F]})}initializeState(){this.state={iconManager:new ce(this.context.gl,{onUpdate:this._onUpdate.bind(this),onError:this._onError.bind(this)})},this.getAttributeManager().addInstanced({instanceTimestamps:{size:1,accessor:"getTimeStart"},instanceTimestampsNext:{size:1,accessor:"getTimeEnd"},instanceStartPositions:{size:2,accessor:"getPathStart"},instanceEndPositions:{size:2,accessor:"getPathEnd"},instanceSizes:{size:1,transition:!0,accessor:"getSize",defaultValue:1},instanceOffsets:{size:2,accessor:"getIcon",transform:this.getInstanceOffset},instanceIconFrames:{size:4,accessor:"getIcon",transform:this.getInstanceIconFrame},instanceColorModes:{size:1,type:u.UNSIGNED_BYTE,accessor:"getIcon",transform:this.getInstanceColorMode},instanceColors:{size:this.props.colorFormat.length,type:u.UNSIGNED_BYTE,normalized:!0,transition:!0,accessor:"getColor",defaultValue:E},instanceAngles:{size:1,transition:!0,accessor:"getAngle"},instancePixelOffset:{size:2,transition:!0,accessor:"getPixelOffset"}})}updateState({oldProps:e,props:t,changeFlags:n}){super.updateState({props:t,oldProps:e,changeFlags:n});const o=this.getAttributeManager(),{iconAtlas:s,iconMapping:a,data:r,getIcon:c}=t,{iconManager:l}=this.state;l.setProps({loadOptions:t.loadOptions});let d=!1;if(s||this.internalState.isAsyncPropLoading("iconAtlas")?(e.iconAtlas!==t.iconAtlas&&l.setProps({iconAtlas:s,autoPacking:!1}),e.iconMapping!==t.iconMapping&&(l.setProps({iconMapping:a}),d=!0)):l.setProps({autoPacking:!0}),(n.dataChanged||n.updateTriggersChanged&&(n.updateTriggersChanged.all||n.updateTriggersChanged.getIcon))&&l.setProps({data:r,getIcon:c}),d&&(o.invalidate("instanceOffsets"),o.invalidate("instanceIconFrames"),o.invalidate("instanceColorModes")),n.extensionsChanged){const{gl:p}=this.context;this.state.model?.delete(),this.state.model=this._getModel(p),o.invalidateAll()}}get isLoaded(){return super.isLoaded&&this.state.iconManager.isLoaded}finalizeState(){super.finalizeState(),this.state.iconManager.finalize()}draw({uniforms:e}){const{sizeScale:t,sizeMinPixels:n,sizeMaxPixels:o,sizeUnits:s,billboard:a,alphaCutoff:r,currentTime:c,iconStill:l,pickable:d,latitudeCorrectionFactor:m}=this.props,{iconManager:p}=this.state,{viewport:S}=this.context,g=p.getTexture();g&&this.state.model.setUniforms(e).setUniforms({iconsTexture:g,iconsTextureDim:[g.width,g.height],sizeScale:t*(s==="pixels"?S.metersPerPixel:1),sizeMinPixels:n,sizeMaxPixels:o,billboard:a,alphaCutoff:r,currentTime:c,pickable:d,latitudeCorrectionFactor:m,iconStillOffsets:this.getInstanceOffset(l),iconStillFrames:this.getInstanceIconFrame(l)}).draw()}_getModel(e){const t=[-1,-1,-1,1,1,1,1,-1];return new M(e,{...this.getShaders(),id:this.props.id,geometry:new w({drawMode:u.TRIANGLE_FAN,attributes:{positions:{size:2,value:new Float32Array(t)}}}),isInstanced:!0})}_onUpdate(){this.setNeedsRedraw()}_onError(e){const{onIconError:t}=this.getCurrentLayer().props;t?t(e):z.error(e.error)()}getInstanceOffset(e){const t=this.state.iconManager.getIconMapping(e);return[t.width/2-t.anchorX||0,t.height/2-t.anchorY||0]}getInstanceColorMode(e){return this.state.iconManager.getIconMapping(e).mask?1:0}getInstanceIconFrame(e){const t=this.state.iconManager.getIconMapping(e);return[t.x||0,t.y||0,t.width||0,t.height||0]}}I.layerName="FlatIconLayer";I.defaultProps=le;const ue={currentTime:{type:"number",value:0,min:0},getTimeStart:{type:"accessor",value:null},getTimeEnd:{type:"accessor",value:null},searchFlag:{type:"number",value:0}};class C extends G{getShaders(){const e=super.getShaders();return e.inject={"vs:#decl":`        attribute float timeStart;
        attribute float timeEnd;
        uniform float currentTime;
        uniform float searchFlag;
        varying float vTime;
      `,"vs:#main-start":`        if (searchFlag == 1.0) {
          vTime = 999.0;
        } else if(timeStart > currentTime || timeEnd < currentTime ) {
          vTime = -1.0;
          return;
        } else {
          float nearBeginning = currentTime - timeStart;
          float nearEnd = timeEnd - currentTime;
          vTime = min(nearBeginning, nearEnd);
        }
      `,"fs:#decl":`        uniform float currentTime;
        varying float vTime;
        uniform float searchFlag;
      `,"fs:#main-start":`        if (searchFlag == 0.0 && vTime == -1.0 ) discard;
      `,"fs:DECKGL_FILTER_COLOR":`        if (searchFlag == 0.0 && vTime <= 10.0) color.a *= (vTime / 10.0);
      `},e}initializeState(e){super.initializeState(e),this.getAttributeManager().addInstanced({timeStart:{size:1,accessor:"getTimeStart"},timeEnd:{size:1,accessor:"getTimeEnd"}})}draw(e){const{currentTime:t,searchFlag:n}=this.props;e.uniforms=Object.assign({},e.uniforms,{currentTime:t,searchFlag:n}),super.draw(e)}}C.layerName="PathTraceLayer";C.defaultProps=ue;export{ce as I,ge as P,Z as a,C as b,I as c,ve as d,Q as f,J as v};
