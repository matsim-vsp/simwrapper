var O=Object.defineProperty;var x=(i,e,t)=>e in i?O(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var c=(i,e,t)=>(x(i,typeof e!="symbol"?e+"":e,t),t);import{_ as f,af as C,X as _,a0 as P,a1 as A,a2 as R,ag as b,a3 as N,f as L,L as M,p as F,a as w,M as z,G as H,l as D}from"./layer-d782cb68.js";import{d as U,n as k}from"./index-5bc32c72.js";import{t as G}from"./index-5b66ed1a.js";import{G as d}from"./index-a3e39363.js";import{L as W}from"./line-layer-e013a4c2.js";const j=[255,255,255],B=1,Y=[0,0,1],V=[0,0,1];let K=0;class _e{constructor(e={}){f(this,"id",void 0),f(this,"color",void 0),f(this,"intensity",void 0),f(this,"type","point"),f(this,"position",void 0),f(this,"attenuation",void 0),f(this,"projectedLight",void 0);const{color:t=j}=e,{intensity:n=B}=e,{position:s=V}=e;this.id=e.id||"point-".concat(K++),this.color=t,this.intensity=n,this.type="point",this.position=s,this.attenuation=X(e),this.projectedLight={...this}}getProjectedLight({layer:e}){const{projectedLight:t}=this,n=e.context.viewport,{coordinateSystem:s,coordinateOrigin:o}=e.props,a=C(this.position,{viewport:n,coordinateSystem:s,coordinateOrigin:o,fromCoordinateSystem:n.isGeospatial?_.LNGLAT:_.CARTESIAN,fromCoordinateOrigin:[0,0,0]});return t.color=this.color,t.intensity=this.intensity,t.position=a,t}}function X(i){return i.attenuation?i.attenuation:"intensity"in i?[0,0,i.intensity||0]:Y}const $=U({name:"PlaybackControls",props:{isRunning:{type:Boolean,required:!0},timeStart:{type:Number,required:!0},timeEnd:{type:Number,required:!0},currentTime:{type:Number,required:!0}},data:()=>({pauseWhileDragging:!1,sliderValue:0,sliderOptions:{min:0,max:1e6,clickable:!1,duration:0,lazy:!0,tooltip:!0,"tooltip-placement":"top"}}),mounted(){this.sliderOptions["custom-formatter"]=i=>this.convertSecondsToClockTimeMinutes(i),window.addEventListener("keyup",this.onKeyPressed)},beforeDestroy(){window.removeEventListener("keyup",this.onKeyPressed)},watch:{currentTime(){this.sliderValue=1e6*(this.currentTime-this.timeStart)/(this.timeEnd-this.timeStart)}},methods:{toggleSimulation(){this.$emit("click")},convertSecondsToClockTimeMinutes(i){const e=this.getSecondsFromSlider(i);try{const t=G(e),n=("00"+t.minutes).slice(-2);return`${t.hours}:${n}`}catch{return"00:00"}},dragStart(){this.isRunning&&(this.pauseWhileDragging=!0,this.$emit("click"))},dragEnd(){this.pauseWhileDragging&&this.$emit("click"),this.pauseWhileDragging=!1},dragging(i){this.$emit("time",this.getSecondsFromSlider(i))},onKeyPressed(i){i.code==="Space"&&this.toggleSimulation()},getSecondsFromSlider(i){let e=(this.timeEnd-this.timeStart)*i/1e6;return e===this.timeEnd&&(e=this.timeEnd-1),e}}});var q=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("div",{staticClass:"slider-thingy"},[t("b-slider",e._b({staticClass:"slider",attrs:{size:"is-large"},on:{dragging:e.dragging,dragstart:e.dragStart,dragend:e.dragEnd},model:{value:e.sliderValue,callback:function(n){e.sliderValue=n},expression:"sliderValue"}},"b-slider",e.sliderOptions,!1)),t("div",{staticClass:"buttons"},[t("div",{staticClass:"playpause",on:{click:e.toggleSimulation}},[e.isRunning?t("i",{staticClass:"button-icon fa fa-1x fa-pause"}):t("i",{staticClass:"button-icon fa fa-1x fa-play"})])])],1)},Z=[];var J=k($,q,Z,!1,null,"a92cf858",null,null);const ve=J.exports,Q=`// BC 2021-04-30: this file forked from https://github.com/visgl/deck.gl
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

uniform float sizeScale;
uniform vec2 iconsTextureDim;
uniform float sizeMinPixels;
uniform float sizeMaxPixels;
uniform bool billboard;

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
  } else if (currentTime > instanceTimestampsNext) {
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
    vec3 direction = normalize(endPosition - startPosition);
    angle = atan( direction.y / direction.x);
    if (direction.x < 0.0) angle = angle - PI;
  }

  // scale and rotate vertex in "pixel" value and convert back to fraction in clipspace
  vec2 pixelOffset = positions / 2.0 * iconSize + (still ? iconStillOffsets : instanceOffsets);
  pixelOffset = rotate_by_angle(pixelOffset, angle) * instanceScale;
  pixelOffset += instancePixelOffset;
  pixelOffset.y *= -1.0;

  vec3 newPosition = interpolate(startPosition, endPosition, vPercentComplete);

  if (billboard)  {
    gl_Position = project_position_to_clipspace(newPosition, vec3(0.0), vec3(0.0), geometry.position);
    vec3 offset = vec3(pixelOffset, 0.0);
    DECKGL_FILTER_SIZE(offset, geometry);
    gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);

  } else {
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

  vColor = instanceColors;
  DECKGL_FILTER_COLOR(vColor, geometry);

  vColorMode = instanceColorModes;
}
`,ee=`// BC 2021-04-30: this file forked from https://github.com/visgl/deck.gl
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
`,te=1024,ne=4,v=()=>{},ie={[d.TEXTURE_MIN_FILTER]:d.LINEAR_MIPMAP_LINEAR,[d.TEXTURE_MAG_FILTER]:d.LINEAR,[d.TEXTURE_WRAP_S]:d.CLAMP_TO_EDGE,[d.TEXTURE_WRAP_T]:d.CLAMP_TO_EDGE};function se(i){return Math.pow(2,Math.ceil(Math.log2(i)))}function oe(i,e,t,n){return t===e.width&&n===e.height?e:(i.canvas.height=n,i.canvas.width=t,i.clearRect(0,0,i.canvas.width,i.canvas.height),i.drawImage(e,0,0,e.width,e.height,0,0,t,n),i.canvas)}function m(i){return i&&(i.id||i.url)}function ae(i,e,t,n){const s=e.width,o=e.height,a=b(e,{width:t,height:n});return N(e,a,{targetY:0,width:s,height:o}),e.delete(),a}function E(i,e,t){for(let n=0;n<e.length;n++){const{icon:s,xOffset:o}=e[n],a=m(s);i[a]={...s,x:o,y:t}}}function re({icons:i,buffer:e,mapping:t={},xOffset:n=0,yOffset:s=0,rowHeight:o=0,canvasWidth:a}){let r=[];for(let l=0;l<i.length;l++){const u=i[l],h=m(u);if(!t[h]){const{height:T,width:g}=u;n+g+e>a&&(E(t,r,s),n=0,s=o+s+e,o=0,r=[]),r.push({icon:u,xOffset:n}),n=n+g+e,o=Math.max(o,T)}}return r.length>0&&E(t,r,s),{mapping:t,rowHeight:o,xOffset:n,yOffset:s,canvasWidth:a,canvasHeight:se(o+s+e)}}function ce(i,e,t){if(!i||!e)return null;t=t||{};const n={},{iterable:s,objectInfo:o}=L(i);for(const a of s){o.index++;const r=e(a,o),l=m(r);if(!r)throw new Error("Icon is missing.");if(!r.url)throw new Error("Icon url is missing.");!n[l]&&(!t[l]||r.url!==t[l].url)&&(n[l]={...r,source:a,sourceIndex:o.index})}return n}class le{constructor(e,{onUpdate:t=v,onError:n=v}){c(this,"gl");c(this,"onUpdate");c(this,"onError");c(this,"_loadOptions");c(this,"_getIcon");c(this,"_texture");c(this,"_externalTexture");c(this,"_mapping");c(this,"_pendingCount");c(this,"_autoPacking");c(this,"_xOffset");c(this,"_yOffset");c(this,"_rowHeight");c(this,"_buffer");c(this,"_canvasWidth");c(this,"_canvasHeight");c(this,"_canvas");this.gl=e,this.onUpdate=t,this.onError=n,this._loadOptions=null,this._getIcon=null,this._texture=null,this._externalTexture=null,this._mapping={},this._pendingCount=0,this._autoPacking=!1,this._xOffset=0,this._yOffset=0,this._rowHeight=0,this._buffer=ne,this._canvasWidth=te,this._canvasHeight=0,this._canvas=null}finalize(){var e;(e=this._texture)==null||e.delete()}getTexture(){return this._texture||this._externalTexture}getIconMapping(e){const t=this._autoPacking?m(e):e;return this._mapping[t]||{}}setProps({loadOptions:e,autoPacking:t,iconAtlas:n,iconMapping:s,data:o,getIcon:a}){e&&(this._loadOptions=e),t!==void 0&&(this._autoPacking=t),a&&(this._getIcon=a),s&&(this._mapping=s),n&&this._updateIconAtlas(n),this._autoPacking&&(o||a)&&typeof document<"u"&&(this._canvas=this._canvas||document.createElement("canvas"),this._updateAutoPacking(o))}get isLoaded(){return this._pendingCount===0}_updateIconAtlas(e){var t;(t=this._texture)==null||t.delete(),this._texture=null,this._externalTexture=e,this.onUpdate()}_updateAutoPacking(e){const t=Object.values(ce(e,this._getIcon,this._mapping)||{});if(t.length>0){const{mapping:n,xOffset:s,yOffset:o,rowHeight:a,canvasHeight:r}=re({icons:t,buffer:this._buffer,canvasWidth:this._canvasWidth,mapping:this._mapping,rowHeight:this._rowHeight,xOffset:this._xOffset,yOffset:this._yOffset});this._rowHeight=a,this._mapping=n,this._xOffset=s,this._yOffset=o,this._canvasHeight=r,this._texture||(this._texture=new P(this.gl,{width:this._canvasWidth,height:this._canvasHeight,parameters:ie})),this._texture.height!==this._canvasHeight&&(this._texture=ae(this.gl,this._texture,this._canvasWidth,this._canvasHeight)),this.onUpdate(),this._loadIcons(t)}}_loadIcons(e){const t=this._canvas.getContext("2d");for(const n of e)this._pendingCount++,A(n.url,R,this._loadOptions).then(s=>{const o=m(n),{x:a,y:r,width:l,height:u}=this._mapping[o],h=oe(t,s,l,u);this._texture.setSubImageData({data:h,x:a,y:r,width:l,height:u}),this._texture.generateMipmap(),this.onUpdate()}).catch(s=>{this.onError({url:n.url,source:n.source,sourceIndex:n.sourceIndex,loadOptions:this._loadOptions,error:s})}).finally(()=>{this._pendingCount--})}}const I=[0,0,0,255],ue={iconAtlas:{type:"image",value:null,async:!0},iconMapping:{type:"object",value:{},async:!0},sizeScale:{type:"number",value:1,min:0},billboard:!1,sizeUnits:"pixels",sizeMinPixels:{type:"number",min:0,value:0},sizeMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},alphaCutoff:{type:"number",value:.05,min:0,max:1},iconStill:{type:"object",value:null},getIcon:{type:"accessor",value:i=>i.icon},getColor:{type:"accessor",value:I},getSize:{type:"accessor",value:1},getAngle:{type:"accessor",value:0},getPixelOffset:{type:"accessor",value:[0,0]},getPathStart:{type:"accessor",value:null},getPathEnd:{type:"accessor",value:null},getTimeStart:{type:"accessor",value:null},getTimeEnd:{type:"accessor",value:null},currentTime:{type:"number",value:0},pickable:{type:"boolean",value:!0},onIconError:{type:"function",value:null,compare:!1,optional:!0}};class S extends M{getShaders(){return super.getShaders({vs:Q,fs:ee,modules:[F,w]})}initializeState(){this.state={iconManager:new le(this.context.gl,{onUpdate:this._onUpdate.bind(this),onError:this._onError.bind(this)})},this.getAttributeManager().addInstanced({instanceTimestamps:{size:1,accessor:"getTimeStart"},instanceTimestampsNext:{size:1,accessor:"getTimeEnd"},instanceStartPositions:{size:2,accessor:"getPathStart"},instanceEndPositions:{size:2,accessor:"getPathEnd"},instanceSizes:{size:1,transition:!0,accessor:"getSize",defaultValue:1},instanceOffsets:{size:2,accessor:"getIcon",transform:this.getInstanceOffset},instanceIconFrames:{size:4,accessor:"getIcon",transform:this.getInstanceIconFrame},instanceColorModes:{size:1,type:d.UNSIGNED_BYTE,accessor:"getIcon",transform:this.getInstanceColorMode},instanceColors:{size:this.props.colorFormat.length,type:d.UNSIGNED_BYTE,normalized:!0,transition:!0,accessor:"getColor",defaultValue:I},instanceAngles:{size:1,transition:!0,accessor:"getAngle"},instancePixelOffset:{size:2,transition:!0,accessor:"getPixelOffset"}})}updateState({oldProps:e,props:t,changeFlags:n}){var g;super.updateState({props:t,oldProps:e,changeFlags:n});const s=this.getAttributeManager(),{iconAtlas:o,iconMapping:a,data:r,getIcon:l}=t,{iconManager:u}=this.state;u.setProps({loadOptions:t.loadOptions});let h=!1;if(o||this.internalState.isAsyncPropLoading("iconAtlas")?(e.iconAtlas!==t.iconAtlas&&u.setProps({iconAtlas:o,autoPacking:!1}),e.iconMapping!==t.iconMapping&&(u.setProps({iconMapping:a}),h=!0)):u.setProps({autoPacking:!0}),(n.dataChanged||n.updateTriggersChanged&&(n.updateTriggersChanged.all||n.updateTriggersChanged.getIcon))&&u.setProps({data:r,getIcon:l}),h&&(s.invalidate("instanceOffsets"),s.invalidate("instanceIconFrames"),s.invalidate("instanceColorModes")),n.extensionsChanged){const{gl:p}=this.context;(g=this.state.model)==null||g.delete(),this.state.model=this._getModel(p),s.invalidateAll()}}get isLoaded(){return super.isLoaded&&this.state.iconManager.isLoaded}finalizeState(){super.finalizeState(),this.state.iconManager.finalize()}draw({uniforms:e}){const{sizeScale:t,sizeMinPixels:n,sizeMaxPixels:s,sizeUnits:o,billboard:a,alphaCutoff:r,currentTime:l,iconStill:u,pickable:h}=this.props,{iconManager:T}=this.state,{viewport:g}=this.context,p=T.getTexture();p&&this.state.model.setUniforms(e).setUniforms({iconsTexture:p,iconsTextureDim:[p.width,p.height],sizeScale:t*(o==="pixels"?g.metersPerPixel:1),sizeMinPixels:n,sizeMaxPixels:s,billboard:a,alphaCutoff:r,currentTime:l,pickable:h,iconStillOffsets:this.getInstanceOffset(u),iconStillFrames:this.getInstanceIconFrame(u)}).draw()}_getModel(e){const t=[-1,-1,-1,1,1,1,1,-1];return new z(e,{...this.getShaders(),id:this.props.id,geometry:new H({drawMode:d.TRIANGLE_FAN,attributes:{positions:{size:2,value:new Float32Array(t)}}}),isInstanced:!0})}_onUpdate(){this.setNeedsRedraw()}_onError(e){const{onIconError:t}=this.getCurrentLayer().props;t?t(e):D.error(e.error)()}getInstanceOffset(e){const t=this.state.iconManager.getIconMapping(e);return[t.width/2-t.anchorX||0,t.height/2-t.anchorY||0]}getInstanceColorMode(e){return this.state.iconManager.getIconMapping(e).mask?1:0}getInstanceIconFrame(e){const t=this.state.iconManager.getIconMapping(e);return[t.x||0,t.y||0,t.width||0,t.height||0]}}S.layerName="FlatIconLayer";S.defaultProps=ue;const de={currentTime:{type:"number",value:0,min:0},getTimeStart:{type:"accessor",value:null},getTimeEnd:{type:"accessor",value:null},searchFlag:{type:"number",value:0}};class y extends W{getShaders(){const e=super.getShaders();return e.inject={"vs:#decl":`        attribute float timeStart;
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
      `},e}initializeState(e){super.initializeState(e),this.getAttributeManager().addInstanced({timeStart:{size:1,accessor:"getTimeStart"},timeEnd:{size:1,accessor:"getTimeEnd"}})}draw(e){const{currentTime:t,searchFlag:n}=this.props;e.uniforms=Object.assign({},e.uniforms,{currentTime:t,searchFlag:n}),super.draw(e)}}y.layerName="PathTraceLayer";y.defaultProps=de;export{le as I,_e as P,y as a,S as b,ve as c,ee as f,Q as v};
//# sourceMappingURL=PathTraceLayer-f427d912.js.map
