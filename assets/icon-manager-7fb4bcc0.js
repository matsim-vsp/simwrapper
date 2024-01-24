var m=Object.defineProperty;var v=(i,n,t)=>n in i?m(i,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[n]=t;var r=(i,n,t)=>(v(i,typeof n!="symbol"?n+"":n,t),t);import{G as h}from"./index-a3e39363.js";import{Z as E,$ as I,a0 as O,a1 as R,a2 as x,f as S}from"./layer-d6b9c82f.js";const D=`// BC 2021-04-30: this file forked from https://github.com/visgl/deck.gl
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
`,U=`// BC 2021-04-30: this file forked from https://github.com/visgl/deck.gl
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
`,A=1024,C=4,_=()=>{},N={[h.TEXTURE_MIN_FILTER]:h.LINEAR_MIPMAP_LINEAR,[h.TEXTURE_MAG_FILTER]:h.LINEAR,[h.TEXTURE_WRAP_S]:h.CLAMP_TO_EDGE,[h.TEXTURE_WRAP_T]:h.CLAMP_TO_EDGE};function P(i){return Math.pow(2,Math.ceil(Math.log2(i)))}function b(i,n,t,e){return t===n.width&&e===n.height?n:(i.canvas.height=e,i.canvas.width=t,i.clearRect(0,0,i.canvas.width,i.canvas.height),i.drawImage(n,0,0,n.width,n.height,0,0,t,e),i.canvas)}function u(i){return i&&(i.id||i.url)}function y(i,n,t,e){const o=n.width,s=n.height,a=R(n,{width:t,height:e});return x(n,a,{targetY:0,width:o,height:s}),n.delete(),a}function g(i,n,t){for(let e=0;e<n.length;e++){const{icon:o,xOffset:s}=n[e],a=u(o);i[a]={...o,x:s,y:t}}}function L({icons:i,buffer:n,mapping:t={},xOffset:e=0,yOffset:o=0,rowHeight:s=0,canvasWidth:a}){let c=[];for(let l=0;l<i.length;l++){const f=i[l],p=u(f);if(!t[p]){const{height:T,width:d}=f;e+d+n>a&&(g(t,c,o),e=0,o=s+o+n,s=0,c=[]),c.push({icon:f,xOffset:e}),e=e+d+n,s=Math.max(s,T)}}return c.length>0&&g(t,c,o),{mapping:t,rowHeight:s,xOffset:e,yOffset:o,canvasWidth:a,canvasHeight:P(s+o+n)}}function F(i,n,t){if(!i||!n)return null;t=t||{};const e={},{iterable:o,objectInfo:s}=S(i);for(const a of o){s.index++;const c=n(a,s),l=u(c);if(!c)throw new Error("Icon is missing.");if(!c.url)throw new Error("Icon url is missing.");!e[l]&&(!t[l]||c.url!==t[l].url)&&(e[l]={...c,source:a,sourceIndex:s.index})}return e}class W{constructor(n,{onUpdate:t=_,onError:e=_}){r(this,"gl");r(this,"onUpdate");r(this,"onError");r(this,"_loadOptions");r(this,"_getIcon");r(this,"_texture");r(this,"_externalTexture");r(this,"_mapping");r(this,"_pendingCount");r(this,"_autoPacking");r(this,"_xOffset");r(this,"_yOffset");r(this,"_rowHeight");r(this,"_buffer");r(this,"_canvasWidth");r(this,"_canvasHeight");r(this,"_canvas");this.gl=n,this.onUpdate=t,this.onError=e,this._loadOptions=null,this._getIcon=null,this._texture=null,this._externalTexture=null,this._mapping={},this._pendingCount=0,this._autoPacking=!1,this._xOffset=0,this._yOffset=0,this._rowHeight=0,this._buffer=C,this._canvasWidth=A,this._canvasHeight=0,this._canvas=null}finalize(){var n;(n=this._texture)==null||n.delete()}getTexture(){return this._texture||this._externalTexture}getIconMapping(n){const t=this._autoPacking?u(n):n;return this._mapping[t]||{}}setProps({loadOptions:n,autoPacking:t,iconAtlas:e,iconMapping:o,data:s,getIcon:a}){n&&(this._loadOptions=n),t!==void 0&&(this._autoPacking=t),a&&(this._getIcon=a),o&&(this._mapping=o),e&&this._updateIconAtlas(e),this._autoPacking&&(s||a)&&typeof document<"u"&&(this._canvas=this._canvas||document.createElement("canvas"),this._updateAutoPacking(s))}get isLoaded(){return this._pendingCount===0}_updateIconAtlas(n){var t;(t=this._texture)==null||t.delete(),this._texture=null,this._externalTexture=n,this.onUpdate()}_updateAutoPacking(n){const t=Object.values(F(n,this._getIcon,this._mapping)||{});if(t.length>0){const{mapping:e,xOffset:o,yOffset:s,rowHeight:a,canvasHeight:c}=L({icons:t,buffer:this._buffer,canvasWidth:this._canvasWidth,mapping:this._mapping,rowHeight:this._rowHeight,xOffset:this._xOffset,yOffset:this._yOffset});this._rowHeight=a,this._mapping=e,this._xOffset=o,this._yOffset=s,this._canvasHeight=c,this._texture||(this._texture=new E(this.gl,{width:this._canvasWidth,height:this._canvasHeight,parameters:N})),this._texture.height!==this._canvasHeight&&(this._texture=y(this.gl,this._texture,this._canvasWidth,this._canvasHeight)),this.onUpdate(),this._loadIcons(t)}}_loadIcons(n){const t=this._canvas.getContext("2d");for(const e of n)this._pendingCount++,I(e.url,O,this._loadOptions).then(o=>{const s=u(e),{x:a,y:c,width:l,height:f}=this._mapping[s],p=b(t,o,l,f);this._texture.setSubImageData({data:p,x:a,y:c,width:l,height:f}),this._texture.generateMipmap(),this.onUpdate()}).catch(o=>{this.onError({url:e.url,source:e.source,sourceIndex:e.sourceIndex,loadOptions:this._loadOptions,error:o})}).finally(()=>{this._pendingCount--})}}export{W as I,U as f,D as v};
//# sourceMappingURL=icon-manager-7fb4bcc0.js.map
