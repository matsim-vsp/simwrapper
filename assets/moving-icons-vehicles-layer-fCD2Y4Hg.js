import{A as e,C as t,D as n,a as r,h as i,ht as a,mt as o,n as s,p as c}from"./mapbox-overlay-KuXvUc6L.js";var l=`uniform iconUniforms {
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
`,u={name:`icon`,vs:l,fs:l,uniformTypes:{sizeScale:`f32`,iconsTextureDim:`vec2<f32>`,sizeMinPixels:`f32`,sizeMaxPixels:`f32`,billboard:`f32`,sizeUnits:`f32`,alphaCutoff:`f32`,currentTime:`f32`,latitudeCorrectionFactor:`f32`,iconStillOffsets:`vec2<f32>`,iconStillFrames:`vec4<f32>`,pickable:`f32`,colorDepiction:`f32`}},d=`#version 300 es
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
`,f=`#version 300 es
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
`,p=1024,m=4,h=()=>{},g={minFilter:`linear`,mipmapFilter:`linear`,magFilter:`linear`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`},_={x:0,y:0,width:0,height:0};function v(e){return 2**Math.ceil(Math.log2(e))}function y(e,t,n,r){let i=Math.min(n/t.width,r/t.height),a=Math.floor(t.width*i),o=Math.floor(t.height*i);return i===1?{image:t,width:a,height:o}:(e.canvas.height=o,e.canvas.width=a,e.clearRect(0,0,a,o),e.drawImage(t,0,0,t.width,t.height,0,0,a,o),{image:e.canvas,width:a,height:o})}function b(e){return e&&(e.id||e.url)}function x(e,t,n,r){let{width:i,height:a,device:o}=e,s=o.createTexture({format:`rgba8unorm`,width:t,height:n,sampler:r,mipmaps:!0}),c=o.createCommandEncoder();return c.copyTextureToTexture({sourceTexture:e,destinationTexture:s,width:i,height:a}),c.finish(),e.destroy(),s}function S(e,t,n){for(let r=0;r<t.length;r++){let{icon:i,xOffset:a}=t[r],o=b(i);e[o]={...i,x:a,y:n}}}function C({icons:e,buffer:t,mapping:n={},xOffset:r=0,yOffset:i=0,rowHeight:a=0,canvasWidth:o}){let s=[];for(let c=0;c<e.length;c++){let l=e[c];if(!n[b(l)]){let{height:e,width:c}=l;r+c+t>o&&(S(n,s,i),r=0,i=a+i+t,a=0,s=[]),s.push({icon:l,xOffset:r}),r=r+c+t,a=Math.max(a,e)}}return s.length>0&&S(n,s,i),{mapping:n,rowHeight:a,xOffset:r,yOffset:i,canvasWidth:o,canvasHeight:v(a+i+t)}}function w(e,t,n){if(!e||!t)return null;n||={};let i={},{iterable:a,objectInfo:o}=r(e);for(let e of a){o.index++;let r=t(e,o),a=b(r);if(!r)throw Error(`Icon is missing.`);if(!r.url)throw Error(`Icon url is missing.`);!i[a]&&(!n[a]||r.url!==n[a].url)&&(i[a]={...r,source:e,sourceIndex:o.index})}return i}var T=class{device;onUpdate;onError;_loadOptions=null;_texture=null;_externalTexture=null;_mapping={};_samplerParameters=null;_pendingCount=0;_autoPacking=!1;_xOffset=0;_yOffset=0;_rowHeight=0;_buffer=m;_canvasWidth=p;_canvasHeight=0;_canvas=null;constructor(e,{onUpdate:t=h,onError:n=h}){this.device=e,this.onUpdate=t,this.onError=n}finalize(){this._texture?.delete()}getTexture(){return this._texture||this._externalTexture}getIconMapping(e){let t=this._autoPacking?b(e):e;return this._mapping[t]||_}setProps({loadOptions:e,autoPacking:t,iconAtlas:n,iconMapping:r,textureParameters:i}){e&&(this._loadOptions=e),t!==void 0&&(this._autoPacking=t),r&&(this._mapping=r),n&&(this._texture?.destroy(),this._texture=null,this._externalTexture=n),i&&(this._samplerParameters=i)}get isLoaded(){return this._pendingCount===0}packIcons(e,t){if(!this._autoPacking||typeof document>`u`)return;let n=Object.values(w(e,t,this._mapping)||{});if(n.length>0){let{mapping:e,xOffset:t,yOffset:r,rowHeight:i,canvasHeight:a}=C({icons:n,buffer:this._buffer,canvasWidth:this._canvasWidth,mapping:this._mapping,rowHeight:this._rowHeight,xOffset:this._xOffset,yOffset:this._yOffset});this._rowHeight=i,this._mapping=e,this._xOffset=t,this._yOffset=r,this._canvasHeight=a,this._texture||=this.device.createTexture({format:`rgba8unorm`,data:null,width:this._canvasWidth,height:this._canvasHeight,sampler:this._samplerParameters||g,mipmaps:!0}),this._texture.height!==this._canvasHeight&&(this._texture=x(this._texture,this._canvasWidth,this._canvasHeight,this._samplerParameters||g)),this.onUpdate(),this._canvas=this._canvas||document.createElement(`canvas`),this._loadIcons(n)}}_loadIcons(e){let t=this._canvas.getContext(`2d`,{willReadFrequently:!0});for(let n of e)this._pendingCount++,a(n.url,this._loadOptions).then(e=>{let r=b(n),i=this._mapping[r],{x:a,y:o,width:s,height:c}=i,{image:l,width:u,height:d}=y(t,e,s,c);this._texture?.copyExternalImage({image:l,x:a+(s-u)/2,y:o+(c-d)/2,width:u,height:d}),i.width=u,i.height=d,this._texture.generateMipmap(),this.onUpdate()}).catch(e=>{this.onError({url:n.url,source:n.source,sourceIndex:n.sourceIndex,loadOptions:this._loadOptions,error:e})}).finally(()=>{this._pendingCount--})}},E=function(e){return e[e.REL_SPEED=1]=`REL_SPEED`,e[e.VEH_OCCUPANCY=2]=`VEH_OCCUPANCY`,e}({}),D=[25,220,64,255],O={iconAtlas:{type:`image`,value:null,async:!0},iconMapping:{type:`object`,value:{},async:!0},sizeScale:{type:`number`,value:1,min:0},billboard:!0,sizeUnits:`pixels`,sizeMinPixels:{type:`number`,min:0,value:0},sizeMaxPixels:{type:`number`,min:0,value:2**53-1},alphaCutoff:{type:`number`,value:.05,min:0,max:1},currentTime:{type:`number`,value:0},latitudeCorrectionFactor:{type:`number`,value:.8},colorDepiction:{type:`number`,value:1},pickable:!0,getIcon:{type:`accessor`,value:e=>e.icon},getColor:{type:`accessor`,value:D},getSize:{type:`accessor`,value:1},getAngle:{type:`accessor`,value:0},getPixelOffset:{type:`accessor`,value:[0,0]},onIconError:{type:`function`,value:null,optional:!0},textureParameters:{type:`object`,ignore:!0,value:null},getBOffsets:{type:`accessor`,value:[0,0]},getBIconFrames:{type:`accessor`,value:[0,0,256,256]},getBColorModes:{type:`accessor`,value:1},getColorCode:{type:`accessor`,value:0},getPathStart:{type:`accessor`,value:null},getPathEnd:{type:`accessor`,value:null},getTimeStart:{type:`accessor`,value:null},getTimeEnd:{type:`accessor`,value:null},iconStill:{type:`object`,value:null,optional:!0}},k=class extends s{static defaultProps=O;static layerName=`IconLayer`;getShaders(){return super.getShaders({vs:d,fs:f,modules:[n,t,u]})}initializeState(){this.state={iconManager:new T(this.context.device,{onUpdate:this._onUpdate.bind(this),onError:this._onError.bind(this)})},this.getAttributeManager().addInstanced({instanceTimestamps:{size:1,accessor:`getTimeStart`},instanceTimestampsNext:{size:1,accessor:`getTimeEnd`},instanceStartPositions:{size:2,accessor:`getPathStart`},instanceEndPositions:{size:2,accessor:`getPathEnd`},instanceSizes:{size:1,transition:!0,accessor:`getSize`,defaultValue:1},instanceOffsets:{size:2,defaultValue:[0,0],accessor:`getBOffsets`},instanceIconFrames:{size:4,defaultValue:[0,0,256,256],accessor:`getBIconFrames`},instanceColorModes:{size:1,type:`uint8`,defaultValue:1,accessor:`getBColorModes`},instanceColors:{size:this.props.colorFormat.length,type:`unorm8`,transition:!0,accessor:`getColor`,defaultValue:D},instanceColorCodes:{size:1,accessor:`getColorCode`,defaultValue:0},instanceAngles:{size:1,transition:!0,accessor:`getAngle`},instancePixelOffset:{size:2,transition:!0,accessor:`getPixelOffset`}})}updateState(e){super.updateState(e);let{props:t,oldProps:n,changeFlags:r}=e,i=this.getAttributeManager(),{iconAtlas:a,iconMapping:o,data:s,getIcon:c,textureParameters:l}=t,{iconManager:u}=this.state;if(typeof a==`string`)return;let d=a||this.internalState.isAsyncPropLoading(`iconAtlas`);u.setProps({loadOptions:t.loadOptions,autoPacking:!d,iconAtlas:a,iconMapping:d?o:null,textureParameters:l}),d?n.iconMapping!==t.iconMapping&&i.invalidate(`getIcon`):(r.dataChanged||r.updateTriggersChanged&&(r.updateTriggersChanged.all||r.updateTriggersChanged.getIcon))&&(i.invalidate(`instanceOffsets`),i.invalidate(`instanceIconFrames`),i.invalidate(`instanceColorModes`),i.invalidate(`instanceColorCodes`),u.packIcons(s,c)),r.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),i.invalidateAll())}get isLoaded(){return super.isLoaded&&this.state.iconManager.isLoaded}finalizeState(e){super.finalizeState(e),this.state.iconManager.finalize()}draw(){let{sizeScale:t,sizeMinPixels:n,sizeMaxPixels:r,sizeUnits:i,billboard:a,alphaCutoff:o,currentTime:s,latitudeCorrectionFactor:c,iconStill:l,pickable:u,colorDepiction:d}=this.props,{iconManager:f}=this.state,p=f.getTexture();if(p){let f=this.state.model,m={iconsTexture:p,iconsTextureDim:[p.width,p.height],sizeUnits:e[i],sizeScale:t,sizeMinPixels:n,sizeMaxPixels:r,billboard:a,alphaCutoff:o,currentTime:s,latitudeCorrectionFactor:c,iconStillOffsets:this.getInstanceOffset(l),iconStillFrames:this.getInstanceIconFrame(l),pickable:u,colorDepiction:d};f.shaderInputs.setProps({icon:m}),f.draw(this.context.renderPass)}}_getModel(){let e=[-1,-1,1,-1,-1,1,1,1];return new i(this.context.device,{...this.getShaders(),id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new c({topology:`triangle-strip`,attributes:{positions:{size:2,value:new Float32Array(e)}}}),isInstanced:!0})}_onUpdate(){this.setNeedsRedraw()}_onError(e){let t=this.getCurrentLayer()?.props.onIconError;t?t(e):o.error(e.error.message)()}getInstanceOffset(e){let{width:t,height:n,anchorX:r=t/2,anchorY:i=n/2}=this.state.iconManager.getIconMapping(e);return[t/2-r||0,n/2-i||0]}getInstanceColorMode(e){return+!!this.state.iconManager.getIconMapping(e).mask}getInstanceIconFrame(e){let{x:t,y:n,width:r,height:i}=this.state.iconManager.getIconMapping(e);return[t||0,n||0,r||0,i||0]}};export{k as n,E as t};