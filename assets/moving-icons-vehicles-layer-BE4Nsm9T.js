import{F as P,B as b,v as M,G as T,H as z,U as S,I as E,J as I,p as O}from"./layer-T9N9JmIf.js";const m=`uniform iconUniforms {
  float sizeScale;
  vec2 iconsTextureDim;
  float sizeMinPixels;
  float sizeMaxPixels;
  bool billboard;
  float sizeUnits;
  float alphaCutoff;
  float currentTime;
  float latitudeCorrectionFactor;
  vec2 iconStillOffsets;
  vec4 iconStillFrames;
  bool pickable;
  float colorDepiction;
} icon;
`,w={name:"icon",vs:m,fs:m,uniformTypes:{sizeScale:"f32",iconsTextureDim:"vec2<f32>",sizeMinPixels:"f32",sizeMaxPixels:"f32",billboard:"f32",sizeUnits:"f32",alphaCutoff:"f32",currentTime:"f32",latitudeCorrectionFactor:"f32",iconStillOffsets:"vec2<f32>",iconStillFrames:"vec4<f32>",pickable:"f32",colorDepiction:"f32"}},F=`#version 300 es
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
in float instanceColorCodes;

in float instanceTimestamps;
in float instanceTimestampsNext;
in vec2 instanceStartPositions;
in vec2 instanceEndPositions;

out float vColorMode;
out vec4 vColor;
out vec2 vTextureCoords;
out vec2 uv;

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

// // small random perturbance
// float rand(vec2 co) {
//   return 0.05 * (fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453) - 0.5);
// }

void main(void) {

  // Calculate progress:
  // Skip everything else if this vertex is outside the time window
  // Vertex shader has no "discard()" so we move the vertex outside "clipspace"
  float percentComplete;
  if (icon.currentTime < instanceTimestamps) {
    gl_Position = vec4(2.0,2.0,2.0,1.0);
    return;
  } else if (icon.currentTime >= instanceTimestampsNext) {
    gl_Position = vec4(2.0,2.0,2.0,1.0);
    return;
  } else {
    percentComplete = (icon.currentTime - instanceTimestamps) /
                       (instanceTimestampsNext - instanceTimestamps);
  }

  geometry.pickingColor = instancePickingColors;

  // float z = 5.0 + rand(instancePositions.xy);

  vec3 startPosition = vec3(instanceStartPositions, 5);
  vec3 endPosition = vec3(instanceEndPositions, 5);

  // are we stationary/still
  bool still = (instanceStartPositions == instanceEndPositions);

  vec2 iconSize = still ? icon.iconStillFrames.zw : instanceIconFrames.zw;
  // convert size in meters to pixels, then scaled and clamp
  // project meters to pixels and clamp to limits
  int sizeUnits = int(icon.sizeUnits);
  float sizePixels = clamp(
    project_size_to_pixel(instanceSizes * icon.sizeScale, sizeUnits),
    icon.sizeMinPixels, icon.sizeMaxPixels
  );

  // scale icon height to match instanceSize
  float instanceScale = iconSize.y == 0.0 ? 0.0 : sizePixels / iconSize.y;

  // // figure out angle based on motion direction - mind the latitude!
  float angle = 0.0;
  if (!still) {
    vec2 direction = endPosition.xy - startPosition.xy;
    angle = atan(direction.y , direction.x * icon.latitudeCorrectionFactor);
  }

  // scale and rotate vertex in "pixel" value and convert back to fraction in clipspace
  vec2 pixelOffset = positions / 2.0 * iconSize + (still ? icon.iconStillOffsets : instanceOffsets);
  pixelOffset = rotate_by_angle(pixelOffset, angle) * instanceScale;
  pixelOffset += instancePixelOffset;
  pixelOffset.y *= -1.0;

  vec3 newPosition = interpolate(startPosition, endPosition, percentComplete);

  if (icon.billboard)  {
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

  // get the icon from the iconFrames
  vec2 upperleft = (still ? icon.iconStillFrames.xy : instanceIconFrames.xy);

  vTextureCoords = mix(
    upperleft,
    upperleft + iconSize,
    (positions.xy + 1.0) / 2.0
  ) / icon.iconsTextureDim;

  if (icon.colorDepiction == 1.0) {
    // COLORS: RELATIVE SPEED
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
  } else {
  // COLORS: OCCUPANCY
    vColor = still ? vec4(0.5,0.5,0.5,1.0) : instanceColors;

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
  }

  DECKGL_FILTER_COLOR(vColor, geometry);

  vColorMode = instanceColorModes;
}
`,L=`#version 300 es
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

  // if colorMode == 0, use pixel color from the texture
  // if colorMode == 1 or rendering picking buffer, use texture as transparency mask
  vec3 color = mix(texColor.rgb, vColor.rgb, vColorMode);
  // Take the global opacity and the alpha from vColor into account for the alpha component
  float a = texColor.a * layer.opacity * vColor.a;

  if (a < icon.alphaCutoff) {
    discard;
  }

  fragColor = vec4(color, a);
  DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,A=1024,U=4,v=()=>{},_={minFilter:"linear",mipmapFilter:"linear",magFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"},R={x:0,y:0,width:0,height:0};function k(s){return Math.pow(2,Math.ceil(Math.log2(s)))}function N(s,e,n,t){const o=Math.min(n/e.width,t/e.height),i=Math.floor(e.width*o),a=Math.floor(e.height*o);return o===1?{image:e,width:i,height:a}:(s.canvas.height=a,s.canvas.width=i,s.clearRect(0,0,i,a),s.drawImage(e,0,0,e.width,e.height,0,0,i,a),{image:s.canvas,width:i,height:a})}function g(s){return s&&(s.id||s.url)}function D(s,e,n,t){const{width:o,height:i,device:a}=s,r=a.createTexture({format:"rgba8unorm",width:e,height:n,sampler:t,mipmaps:!0}),c=a.createCommandEncoder();return c.copyTextureToTexture({sourceTexture:s,destinationTexture:r,width:o,height:i}),c.finish(),s.destroy(),r}function x(s,e,n){for(let t=0;t<e.length;t++){const{icon:o,xOffset:i}=e[t],a=g(o);s[a]={...o,x:i,y:n}}}function H({icons:s,buffer:e,mapping:n={},xOffset:t=0,yOffset:o=0,rowHeight:i=0,canvasWidth:a}){let r=[];for(let c=0;c<s.length;c++){const u=s[c],p=g(u);if(!n[p]){const{height:d,width:l}=u;t+l+e>a&&(x(n,r,o),t=0,o=i+o+e,i=0,r=[]),r.push({icon:u,xOffset:t}),t=t+l+e,i=Math.max(i,d)}}return r.length>0&&x(n,r,o),{mapping:n,rowHeight:i,xOffset:t,yOffset:o,canvasWidth:a,canvasHeight:k(i+o+e)}}function j(s,e,n){if(!s||!e)return null;n=n||{};const t={},{iterable:o,objectInfo:i}=b(s);for(const a of o){i.index++;const r=e(a,i),c=g(r);if(!r)throw new Error("Icon is missing.");if(!r.url)throw new Error("Icon url is missing.");!t[c]&&(!n[c]||r.url!==n[c].url)&&(t[c]={...r,source:a,sourceIndex:i.index})}return t}class V{device;onUpdate;onError;_loadOptions=null;_texture=null;_externalTexture=null;_mapping={};_samplerParameters=null;_pendingCount=0;_autoPacking=!1;_xOffset=0;_yOffset=0;_rowHeight=0;_buffer=U;_canvasWidth=A;_canvasHeight=0;_canvas=null;constructor(e,{onUpdate:n=v,onError:t=v}){this.device=e,this.onUpdate=n,this.onError=t}finalize(){this._texture?.delete()}getTexture(){return this._texture||this._externalTexture}getIconMapping(e){const n=this._autoPacking?g(e):e;return this._mapping[n]||R}setProps({loadOptions:e,autoPacking:n,iconAtlas:t,iconMapping:o,textureParameters:i}){e&&(this._loadOptions=e),n!==void 0&&(this._autoPacking=n),o&&(this._mapping=o),t&&(this._texture?.destroy(),this._texture=null,this._externalTexture=t),i&&(this._samplerParameters=i)}get isLoaded(){return this._pendingCount===0}packIcons(e,n){if(!this._autoPacking||typeof document>"u")return;const t=Object.values(j(e,n,this._mapping)||{});if(t.length>0){const{mapping:o,xOffset:i,yOffset:a,rowHeight:r,canvasHeight:c}=H({icons:t,buffer:this._buffer,canvasWidth:this._canvasWidth,mapping:this._mapping,rowHeight:this._rowHeight,xOffset:this._xOffset,yOffset:this._yOffset});this._rowHeight=r,this._mapping=o,this._xOffset=i,this._yOffset=a,this._canvasHeight=c,this._texture||(this._texture=this.device.createTexture({format:"rgba8unorm",data:null,width:this._canvasWidth,height:this._canvasHeight,sampler:this._samplerParameters||_,mipmaps:!0})),this._texture.height!==this._canvasHeight&&(this._texture=D(this._texture,this._canvasWidth,this._canvasHeight,this._samplerParameters||_)),this.onUpdate(),this._canvas=this._canvas||document.createElement("canvas"),this._loadIcons(t)}}_loadIcons(e){const n=this._canvas.getContext("2d",{willReadFrequently:!0});for(const t of e)this._pendingCount++,P(t.url,this._loadOptions).then(o=>{const i=g(t),a=this._mapping[i],{x:r,y:c,width:u,height:p}=a,{image:d,width:l,height:f}=N(n,o,u,p);this._texture?.copyExternalImage({image:d,x:r+(u-l)/2,y:c+(p-f)/2,width:l,height:f}),a.width=l,a.height=f,this._texture.generateMipmap(),this.onUpdate()}).catch(o=>{this.onError({url:t.url,source:t.source,sourceIndex:t.sourceIndex,loadOptions:this._loadOptions,error:o})}).finally(()=>{this._pendingCount--})}}var B=(s=>(s[s.REL_SPEED=1]="REL_SPEED",s[s.VEH_OCCUPANCY=2]="VEH_OCCUPANCY",s))(B||{});const C=[25,220,64,255],G={iconAtlas:{type:"image",value:null,async:!0},iconMapping:{type:"object",value:{},async:!0},sizeScale:{type:"number",value:1,min:0},billboard:!0,sizeUnits:"pixels",sizeMinPixels:{type:"number",min:0,value:0},sizeMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},alphaCutoff:{type:"number",value:.05,min:0,max:1},currentTime:{type:"number",value:0},latitudeCorrectionFactor:{type:"number",value:.8},colorDepiction:{type:"number",value:1},pickable:!0,getIcon:{type:"accessor",value:s=>s.icon},getColor:{type:"accessor",value:C},getSize:{type:"accessor",value:1},getAngle:{type:"accessor",value:0},getPixelOffset:{type:"accessor",value:[0,0]},onIconError:{type:"function",value:null,optional:!0},textureParameters:{type:"object",ignore:!0,value:null},getBOffsets:{type:"accessor",value:[0,0]},getBIconFrames:{type:"accessor",value:[0,0,256,256]},getBColorModes:{type:"accessor",value:1},getColorCode:{type:"accessor",value:0},getPathStart:{type:"accessor",value:null},getPathEnd:{type:"accessor",value:null},getTimeStart:{type:"accessor",value:null},getTimeEnd:{type:"accessor",value:null},iconStill:{type:"object",value:null,optional:!0}};class K extends M{static defaultProps=G;static layerName="IconLayer";getShaders(){return super.getShaders({vs:F,fs:L,modules:[T,z,w]})}initializeState(){this.state={iconManager:new V(this.context.device,{onUpdate:this._onUpdate.bind(this),onError:this._onError.bind(this)})},this.getAttributeManager().addInstanced({instanceTimestamps:{size:1,accessor:"getTimeStart"},instanceTimestampsNext:{size:1,accessor:"getTimeEnd"},instanceStartPositions:{size:2,accessor:"getPathStart"},instanceEndPositions:{size:2,accessor:"getPathEnd"},instanceSizes:{size:1,transition:!0,accessor:"getSize",defaultValue:1},instanceOffsets:{size:2,defaultValue:[0,0],accessor:"getBOffsets"},instanceIconFrames:{size:4,defaultValue:[0,0,256,256],accessor:"getBIconFrames"},instanceColorModes:{size:1,type:"uint8",defaultValue:1,accessor:"getBColorModes"},instanceColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,accessor:"getColor",defaultValue:C},instanceColorCodes:{size:1,accessor:"getColorCode",defaultValue:0},instanceAngles:{size:1,transition:!0,accessor:"getAngle"},instancePixelOffset:{size:2,transition:!0,accessor:"getPixelOffset"}})}updateState(e){super.updateState(e);const{props:n,oldProps:t,changeFlags:o}=e,i=this.getAttributeManager(),{iconAtlas:a,iconMapping:r,data:c,getIcon:u,textureParameters:p}=n,{iconManager:d}=this.state;if(typeof a=="string")return;const l=a||this.internalState.isAsyncPropLoading("iconAtlas");d.setProps({loadOptions:n.loadOptions,autoPacking:!l,iconAtlas:a,iconMapping:l?r:null,textureParameters:p}),l?t.iconMapping!==n.iconMapping&&i.invalidate("getIcon"):(o.dataChanged||o.updateTriggersChanged&&(o.updateTriggersChanged.all||o.updateTriggersChanged.getIcon))&&(i.invalidate("instanceOffsets"),i.invalidate("instanceIconFrames"),i.invalidate("instanceColorModes"),i.invalidate("instanceColorCodes"),d.packIcons(c,u)),o.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),i.invalidateAll())}get isLoaded(){return super.isLoaded&&this.state.iconManager.isLoaded}finalizeState(e){super.finalizeState(e),this.state.iconManager.finalize()}draw(){const{sizeScale:e,sizeMinPixels:n,sizeMaxPixels:t,sizeUnits:o,billboard:i,alphaCutoff:a,currentTime:r,latitudeCorrectionFactor:c,iconStill:u,pickable:p,colorDepiction:d}=this.props,{iconManager:l}=this.state,f=l.getTexture();if(f){const h=this.state.model,y={iconsTexture:f,iconsTextureDim:[f.width,f.height],sizeUnits:S[o],sizeScale:e,sizeMinPixels:n,sizeMaxPixels:t,billboard:i,alphaCutoff:a,currentTime:r,latitudeCorrectionFactor:c,iconStillOffsets:this.getInstanceOffset(u),iconStillFrames:this.getInstanceIconFrame(u),pickable:p,colorDepiction:d};h.shaderInputs.setProps({icon:y}),h.draw(this.context.renderPass)}}_getModel(){const e=[-1,-1,1,-1,-1,1,1,1];return new E(this.context.device,{...this.getShaders(),id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new I({topology:"triangle-strip",attributes:{positions:{size:2,value:new Float32Array(e)}}}),isInstanced:!0})}_onUpdate(){this.setNeedsRedraw()}_onError(e){const n=this.getCurrentLayer()?.props.onIconError;n?n(e):O.error(e.error.message)()}getInstanceOffset(e){const{width:n,height:t,anchorX:o=n/2,anchorY:i=t/2}=this.state.iconManager.getIconMapping(e);return[n/2-o||0,t/2-i||0]}getInstanceColorMode(e){return this.state.iconManager.getIconMapping(e).mask?1:0}getInstanceIconFrame(e){const{x:n,y:t,width:o,height:i}=this.state.iconManager.getIconMapping(e);return[n||0,t||0,o||0,i||0]}}export{B as C,K as I};
