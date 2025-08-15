import{G as l}from"./index-DgdUD6UN.js";import{T as g,h as T,I as _,K as E,j as O,k as I}from"./set-rtl-text-plugin-FQQ7PIy4.js";const F=`// BC 2021-04-30: this file forked from https://github.com/visgl/deck.gl
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
`,H=`// BC 2021-04-30: this file forked from https://github.com/visgl/deck.gl
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
`,w=`// BC 2021-04-30: this file forked from https://github.com/visgl/deck.gl
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
`,C=1024,x=4,d=()=>{},R={[l.TEXTURE_MIN_FILTER]:l.LINEAR_MIPMAP_LINEAR,[l.TEXTURE_MAG_FILTER]:l.LINEAR,[l.TEXTURE_WRAP_S]:l.CLAMP_TO_EDGE,[l.TEXTURE_WRAP_T]:l.CLAMP_TO_EDGE};function S(i){return Math.pow(2,Math.ceil(Math.log2(i)))}function b(i,n,t,e){return t===n.width&&e===n.height?n:(i.canvas.height=e,i.canvas.width=t,i.clearRect(0,0,i.canvas.width,i.canvas.height),i.drawImage(n,0,0,n.width,n.height,0,0,t,e),i.canvas)}function p(i){return i&&(i.id||i.url)}function P(i,n,t,e){const o=n.width,s=n.height,a=E(n,{width:t,height:e});return O(n,a,{targetY:0,width:o,height:s}),n.delete(),a}function v(i,n,t){for(let e=0;e<n.length;e++){const{icon:o,xOffset:s}=n[e],a=p(o);i[a]={...o,x:s,y:t}}}function A({icons:i,buffer:n,mapping:t={},xOffset:e=0,yOffset:o=0,rowHeight:s=0,canvasWidth:a}){let r=[];for(let c=0;c<i.length;c++){const f=i[c],u=p(f);if(!t[u]){const{height:m,width:h}=f;e+h+n>a&&(v(t,r,o),e=0,o=s+o+n,s=0,r=[]),r.push({icon:f,xOffset:e}),e=e+h+n,s=Math.max(s,m)}}return r.length>0&&v(t,r,o),{mapping:t,rowHeight:s,xOffset:e,yOffset:o,canvasWidth:a,canvasHeight:S(s+o+n)}}function N(i,n,t){if(!i||!n)return null;t=t||{};const e={},{iterable:o,objectInfo:s}=I(i);for(const a of o){s.index++;const r=n(a,s),c=p(r);if(!r)throw new Error("Icon is missing.");if(!r.url)throw new Error("Icon url is missing.");!e[c]&&(!t[c]||r.url!==t[c].url)&&(e[c]={...r,source:a,sourceIndex:s.index})}return e}class M{gl;onUpdate;onError;_loadOptions;_getIcon;_texture;_externalTexture;_mapping;_pendingCount;_autoPacking;_xOffset;_yOffset;_rowHeight;_buffer;_canvasWidth;_canvasHeight;_canvas;constructor(n,{onUpdate:t=d,onError:e=d}){this.gl=n,this.onUpdate=t,this.onError=e,this._loadOptions=null,this._getIcon=null,this._texture=null,this._externalTexture=null,this._mapping={},this._pendingCount=0,this._autoPacking=!1,this._xOffset=0,this._yOffset=0,this._rowHeight=0,this._buffer=x,this._canvasWidth=C,this._canvasHeight=0,this._canvas=null}finalize(){this._texture?.delete()}getTexture(){return this._texture||this._externalTexture}getIconMapping(n){const t=this._autoPacking?p(n):n;return this._mapping[t]||{}}setProps({loadOptions:n,autoPacking:t,iconAtlas:e,iconMapping:o,data:s,getIcon:a}){n&&(this._loadOptions=n),t!==void 0&&(this._autoPacking=t),a&&(this._getIcon=a),o&&(this._mapping=o),e&&this._updateIconAtlas(e),this._autoPacking&&(s||a)&&typeof document<"u"&&(this._canvas=this._canvas||document.createElement("canvas"),this._updateAutoPacking(s))}get isLoaded(){return this._pendingCount===0}_updateIconAtlas(n){this._texture?.delete(),this._texture=null,this._externalTexture=n,this.onUpdate()}_updateAutoPacking(n){const t=Object.values(N(n,this._getIcon,this._mapping)||{});if(t.length>0){const{mapping:e,xOffset:o,yOffset:s,rowHeight:a,canvasHeight:r}=A({icons:t,buffer:this._buffer,canvasWidth:this._canvasWidth,mapping:this._mapping,rowHeight:this._rowHeight,xOffset:this._xOffset,yOffset:this._yOffset});this._rowHeight=a,this._mapping=e,this._xOffset=o,this._yOffset=s,this._canvasHeight=r,this._texture||(this._texture=new g(this.gl,{width:this._canvasWidth,height:this._canvasHeight,parameters:R})),this._texture.height!==this._canvasHeight&&(this._texture=P(this.gl,this._texture,this._canvasWidth,this._canvasHeight)),this.onUpdate(),this._loadIcons(t)}}_loadIcons(n){const t=this._canvas.getContext("2d");for(const e of n)this._pendingCount++,T(e.url,_,this._loadOptions).then(o=>{const s=p(e),{x:a,y:r,width:c,height:f}=this._mapping[s],u=b(t,o,c,f);this._texture.setSubImageData({data:u,x:a,y:r,width:c,height:f}),this._texture.generateMipmap(),this.onUpdate()}).catch(o=>{this.onError({url:e.url,source:e.source,sourceIndex:e.sourceIndex,loadOptions:this._loadOptions,error:o})}).finally(()=>{this._pendingCount--})}}export{M as I,F as a,w as f,H as v};
