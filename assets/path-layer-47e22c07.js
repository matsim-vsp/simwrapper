import{_ as y,a4 as j,a5 as V,a6 as k,f as U,a7 as J,L as H,p as Y,a as Z,U as K,M as W,G as X}from"./layer-d782cb68.js";class q{constructor(t){y(this,"opts",void 0),y(this,"typedArrayManager",void 0),y(this,"indexStarts",[0]),y(this,"vertexStarts",[0]),y(this,"vertexCount",0),y(this,"instanceCount",0),y(this,"attributes",void 0),y(this,"_attributeDefs",void 0),y(this,"data",void 0),y(this,"getGeometry",void 0),y(this,"geometryBuffer",void 0),y(this,"buffers",void 0),y(this,"positionSize",void 0),y(this,"normalize",void 0);const{attributes:e={}}=t;this.typedArrayManager=j,this.attributes={},this._attributeDefs=e,this.opts=t,this.updateGeometry(t)}updateGeometry(t){Object.assign(this.opts,t);const{data:e,buffers:n={},getGeometry:i,geometryBuffer:s,positionFormat:r,dataChanged:a,normalize:c=!0}=this.opts;if(this.data=e,this.getGeometry=i,this.positionSize=s&&s.size||(r==="XY"?2:3),this.buffers=n,this.normalize=c,s&&(V(e.startIndices),this.getGeometry=this.getGeometryFromBuffer(s),c||(n.positions=s)),this.geometryBuffer=n.positions,Array.isArray(a))for(const f of a)this._rebuildGeometry(f);else this._rebuildGeometry()}updatePartialGeometry({startRow:t,endRow:e}){this._rebuildGeometry({startRow:t,endRow:e})}getGeometryFromBuffer(t){const e=t.value||t;return ArrayBuffer.isView(e)?k(e,{size:this.positionSize,offset:t.offset,stride:t.stride,startIndices:this.data.startIndices}):null}_allocate(t,e){const{attributes:n,buffers:i,_attributeDefs:s,typedArrayManager:r}=this;for(const a in s)if(a in i)r.release(n[a]),n[a]=null;else{const c=s[a];c.copy=e,n[a]=r.allocate(n[a],t,c)}}_forEachGeometry(t,e,n){const{data:i,getGeometry:s}=this,{iterable:r,objectInfo:a}=U(i,e,n);for(const c of r){a.index++;const f=s?s(c,a):null;t(f,a.index)}}_rebuildGeometry(t){if(!this.data)return;let{indexStarts:e,vertexStarts:n,instanceCount:i}=this;const{data:s,geometryBuffer:r}=this,{startRow:a=0,endRow:c=1/0}=t||{},f={};if(t||(e=[0],n=[0]),this.normalize||!r)this._forEachGeometry((l,d)=>{const u=l&&this.normalizeGeometry(l);f[d]=u,n[d+1]=n[d]+(u?this.getGeometrySize(u):0)},a,c),i=n[n.length-1];else if(n=s.startIndices,i=n[s.length]||0,ArrayBuffer.isView(r))i=i||r.length/this.positionSize;else if(r instanceof J){const l=r.accessor.stride||this.positionSize*4;i=i||r.byteLength/l}else if(r.buffer){const l=r.stride||this.positionSize*4;i=i||r.buffer.byteLength/l}else if(r.value){const l=r.value,d=r.stride/l.BYTES_PER_ELEMENT||this.positionSize;i=i||l.length/d}this._allocate(i,!!t),this.indexStarts=e,this.vertexStarts=n,this.instanceCount=i;const p={};this._forEachGeometry((l,d)=>{const u=f[d]||l;p.vertexStart=n[d],p.indexStart=e[d];const g=d<n.length-1?n[d+1]:i;p.geometrySize=g-n[d],p.geometryIndex=d,this.updateGeometryAttributes(u,p)},a,c),this.vertexCount=e[e.length-1]}}function m(o,t){const e=t.length,n=o.length;if(n>0){let i=!0;for(let s=0;s<e;s++)if(o[n-e+s]!==t[s]){i=!1;break}if(i)return!1}for(let i=0;i<e;i++)o[n+i]=t[i];return!0}function A(o,t){const e=t.length;for(let n=0;n<e;n++)o[n]=t[n]}function x(o,t,e,n,i=[]){const s=n+t*e;for(let r=0;r<e;r++)i[r]=o[s+r];return i}function T(o,t,e,n,i=[]){let s,r;if(e&8)s=(n[3]-o[1])/(t[1]-o[1]),r=3;else if(e&4)s=(n[1]-o[1])/(t[1]-o[1]),r=1;else if(e&2)s=(n[2]-o[0])/(t[0]-o[0]),r=2;else if(e&1)s=(n[0]-o[0])/(t[0]-o[0]),r=0;else return null;for(let a=0;a<o.length;a++)i[a]=(r&1)===a?n[r]:s*(t[a]-o[a])+o[a];return i}function L(o,t){let e=0;return o[0]<t[0]?e|=1:o[0]>t[2]&&(e|=2),o[1]<t[1]?e|=4:o[1]>t[3]&&(e|=8),e}function G(o,t){const{size:e=2,broken:n=!1,gridResolution:i=10,gridOffset:s=[0,0],startIndex:r=0,endIndex:a=o.length}=t||{},c=(a-r)/e;let f=[];const p=[f],l=x(o,0,e,r);let d,u;const g=B(l,i,s,[]),h=[];m(f,l);for(let P=1;P<c;P++){for(d=x(o,P,e,r,d),u=L(d,g);u;){T(l,d,u,g,h);const v=L(h,g);v&&(T(l,h,v,g,h),u=v),m(f,h),A(l,h),tt(g,i,u),n&&f.length>e&&(f=[],p.push(f),m(f,l)),u=L(d,g)}m(f,d),A(l,d)}return n?p:p[0]}const I=0,Q=1;function w(o,t){for(let e=0;e<t.length;e++)o.push(t[e]);return o}function $(o,t=null,e){if(!o.length)return[];const{size:n=2,gridResolution:i=10,gridOffset:s=[0,0],edgeTypes:r=!1}=e||{},a=[],c=[{pos:o,types:r?new Array(o.length/n).fill(Q):null,holes:t||[]}],f=[[],[]];let p=[];for(;c.length;){const{pos:l,types:d,holes:u}=c.shift();et(l,n,u[0]||l.length,f),p=B(f[0],i,s,p);const g=L(f[1],p);if(g){let h=M(l,d,n,0,u[0]||l.length,p,g);const P={pos:h[0].pos,types:h[0].types,holes:[]},v={pos:h[1].pos,types:h[1].types,holes:[]};c.push(P,v);for(let S=0;S<u.length;S++)h=M(l,d,n,u[S],u[S+1]||l.length,p,g),h[0]&&(P.holes.push(P.pos.length),P.pos=w(P.pos,h[0].pos),r&&(P.types=w(P.types,h[0].types))),h[1]&&(v.holes.push(v.pos.length),v.pos=w(v.pos,h[1].pos),r&&(v.types=w(v.types,h[1].types)))}else{const h={positions:l};r&&(h.edgeTypes=d),u.length&&(h.holeIndices=u),a.push(h)}}return a}function M(o,t,e,n,i,s,r){const a=(i-n)/e,c=[],f=[],p=[],l=[],d=[];let u,g,h;const P=x(o,a-1,e,n);let v=Math.sign(r&8?P[1]-s[3]:P[0]-s[2]),S=t&&t[a-1],C=0,z=0;for(let _=0;_<a;_++)u=x(o,_,e,n,u),g=Math.sign(r&8?u[1]-s[3]:u[0]-s[2]),h=t&&t[n/e+_],g&&v&&v!==g&&(T(P,u,r,s,d),m(c,d)&&p.push(S),m(f,d)&&l.push(S)),g<=0?(m(c,u)&&p.push(h),C-=g):p.length&&(p[p.length-1]=I),g>=0?(m(f,u)&&l.push(h),z+=g):l.length&&(l[l.length-1]=I),A(P,u),v=g,S=h;return[C?{pos:c,types:t&&p}:null,z?{pos:f,types:t&&l}:null]}function B(o,t,e,n){const i=Math.floor((o[0]-e[0])/t)*t+e[0],s=Math.floor((o[1]-e[1])/t)*t+e[1];return n[0]=i,n[1]=s,n[2]=i+t,n[3]=s+t,n}function tt(o,t,e){e&8?(o[1]+=t,o[3]+=t):e&4?(o[1]-=t,o[3]-=t):e&2?(o[0]+=t,o[2]+=t):e&1&&(o[0]-=t,o[2]-=t)}function et(o,t,e,n){let i=1/0,s=-1/0,r=1/0,a=-1/0;for(let c=0;c<e;c+=t){const f=o[c],p=o[c+1];i=f<i?f:i,s=f>s?f:s,r=p<r?p:r,a=p>a?p:a}return n[0][0]=i,n[0][1]=r,n[1][0]=s,n[1][1]=a,n}const nt=85.051129;function it(o,t){const{size:e=2,startIndex:n=0,endIndex:i=o.length,normalize:s=!0}=t||{},r=o.slice(n,i);F(r,e,0,i-n);const a=G(r,{size:e,broken:!0,gridResolution:360,gridOffset:[-180,-180]});if(s)for(const c of a)R(c,e);return a}function pt(o,t=null,e){const{size:n=2,normalize:i=!0,edgeTypes:s=!1}=e||{};t=t||[];const r=[],a=[];let c=0,f=0;for(let l=0;l<=t.length;l++){const d=t[l]||o.length,u=f,g=ot(o,n,c,d);for(let h=g;h<d;h++)r[f++]=o[h];for(let h=c;h<g;h++)r[f++]=o[h];F(r,n,u,f),st(r,n,u,f,e==null?void 0:e.maxLatitude),c=d,a[l]=f}a.pop();const p=$(r,a,{size:n,gridResolution:360,gridOffset:[-180,-180],edgeTypes:s});if(i)for(const l of p)R(l.positions,n);return p}function ot(o,t,e,n){let i=-1,s=-1;for(let r=e+1;r<n;r+=t){const a=Math.abs(o[r]);a>i&&(i=a,s=r-1)}return s}function st(o,t,e,n,i=nt){const s=o[e],r=o[n-t];if(Math.abs(s-r)>180){const a=x(o,0,t,e);a[0]+=Math.round((r-s)/360)*360,m(o,a),a[1]=Math.sign(a[1])*i,m(o,a),a[0]=s,m(o,a)}}function F(o,t,e,n){let i=o[0],s;for(let r=e;r<n;r+=t){s=o[r];const a=s-i;(a>180||a<-180)&&(s-=Math.round(a/360)*360),o[r]=i=s}}function R(o,t){let e;const n=o.length/t;for(let s=0;s<n&&(e=o[s*t],(e+180)%360===0);s++);const i=-Math.round(e/360)*360;if(i!==0)for(let s=0;s<n;s++)o[s*t]+=i}function rt(o,t,e,n){let i;if(Array.isArray(o[0])){const s=o.length*t;i=new Array(s);for(let r=0;r<o.length;r++)for(let a=0;a<t;a++)i[r*t+a]=o[r][a]||0}else i=o;return e?G(i,{size:t,gridResolution:e}):n?it(i,{size:t}):i}const at=1,lt=2,E=4;class ct extends q{constructor(t){super({...t,attributes:{positions:{size:3,padding:18,initialize:!0,type:t.fp64?Float64Array:Float32Array},segmentTypes:{size:1,type:Uint8ClampedArray}}})}get(t){return this.attributes[t]}getGeometryFromBuffer(t){return this.normalize?super.getGeometryFromBuffer(t):null}normalizeGeometry(t){return this.normalize?rt(t,this.positionSize,this.opts.resolution,this.opts.wrapLongitude):t}getGeometrySize(t){if(O(t)){let n=0;for(const i of t)n+=this.getGeometrySize(i);return n}const e=this.getPathLength(t);return e<2?0:this.isClosed(t)?e<3?0:e+2:e}updateGeometryAttributes(t,e){if(e.geometrySize!==0)if(t&&O(t))for(const n of t){const i=this.getGeometrySize(n);e.geometrySize=i,this.updateGeometryAttributes(n,e),e.vertexStart+=i}else this._updateSegmentTypes(t,e),this._updatePositions(t,e)}_updateSegmentTypes(t,e){const n=this.attributes.segmentTypes,i=t?this.isClosed(t):!1,{vertexStart:s,geometrySize:r}=e;n.fill(0,s,s+r),i?(n[s]=E,n[s+r-2]=E):(n[s]+=at,n[s+r-2]+=lt),n[s+r-1]=E}_updatePositions(t,e){const{positions:n}=this.attributes;if(!n||!t)return;const{vertexStart:i,geometrySize:s}=e,r=new Array(3);for(let a=i,c=0;c<s;a++,c++)this.getPointOnPath(t,c,r),n[a*3]=r[0],n[a*3+1]=r[1],n[a*3+2]=r[2]}getPathLength(t){return t.length/this.positionSize}getPointOnPath(t,e,n=[]){const{positionSize:i}=this;e*i>=t.length&&(e+=1-t.length/i);const s=e*i;return n[0]=t[s],n[1]=t[s+1],n[2]=i===3&&t[s+2]||0,n}isClosed(t){if(!this.normalize)return!!this.opts.loop;const{positionSize:e}=this,n=t.length-e;return t[0]===t[n]&&t[1]===t[n+1]&&(e===2||t[2]===t[n+2])}}function O(o){return Array.isArray(o[0])}const ft=`#define SHADER_NAME path-layer-vertex-shader

attribute vec2 positions;

attribute float instanceTypes;
attribute vec3 instanceStartPositions;
attribute vec3 instanceEndPositions;
attribute vec3 instanceLeftPositions;
attribute vec3 instanceRightPositions;
attribute vec3 instanceLeftPositions64Low;
attribute vec3 instanceStartPositions64Low;
attribute vec3 instanceEndPositions64Low;
attribute vec3 instanceRightPositions64Low;
attribute float instanceStrokeWidths;
attribute vec4 instanceColors;
attribute vec3 instancePickingColors;

uniform float widthScale;
uniform float widthMinPixels;
uniform float widthMaxPixels;
uniform float jointType;
uniform float capType;
uniform float miterLimit;
uniform bool billboard;
uniform int widthUnits;

uniform float opacity;

varying vec4 vColor;
varying vec2 vCornerOffset;
varying float vMiterLength;
varying vec2 vPathPosition;
varying float vPathLength;
varying float vJointType;

const float EPSILON = 0.001;
const vec3 ZERO_OFFSET = vec3(0.0);

float flipIfTrue(bool flag) {
  return -(float(flag) * 2. - 1.);
}

// calculate line join positions
vec3 lineJoin(
  vec3 prevPoint, vec3 currPoint, vec3 nextPoint,
  vec2 width
) {
  bool isEnd = positions.x > 0.0;
  // side of the segment - -1: left, 0: center, 1: right
  float sideOfPath = positions.y;
  float isJoint = float(sideOfPath == 0.0);

  vec3 deltaA3 = (currPoint - prevPoint);
  vec3 deltaB3 = (nextPoint - currPoint);

  mat3 rotationMatrix;
  bool needsRotation = !billboard && project_needs_rotation(currPoint, rotationMatrix);
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

  // tangent of the corner
  vec2 tangent = dirA + dirB;
  tangent = length(tangent) > 0. ? normalize(tangent) : perpA;
  // direction of the corner
  vec2 miterVec = vec2(-tangent.y, tangent.x);
  // direction of the segment
  vec2 dir = isEnd ? dirA : dirB;
  // direction of the extrusion
  vec2 perp = isEnd ? perpA : perpB;
  // length of the segment
  float L = isEnd ? lenA : lenB;

  // A = angle of the corner
  float sinHalfA = abs(dot(miterVec, perp));
  float cosHalfA = abs(dot(dirA, miterVec));

  // -1: right, 1: left
  float turnDirection = flipIfTrue(dirA.x * dirB.y >= dirA.y * dirB.x);

  // relative position to the corner:
  // -1: inside (smaller side of the angle)
  // 0: center
  // 1: outside (bigger side of the angle)
  float cornerPosition = sideOfPath * turnDirection;

  float miterSize = 1.0 / max(sinHalfA, EPSILON);
  // trim if inside corner extends further than the line segment
  miterSize = mix(
    min(miterSize, max(lenA, lenB) / max(cosHalfA, EPSILON)),
    miterSize,
    step(0.0, cornerPosition)
  );

  vec2 offsetVec = mix(miterVec * miterSize, perp, step(0.5, cornerPosition))
    * (sideOfPath + isJoint * turnDirection);

  // special treatment for start cap and end cap
  bool isStartCap = lenA == 0.0 || (!isEnd && (instanceTypes == 1.0 || instanceTypes == 3.0));
  bool isEndCap = lenB == 0.0 || (isEnd && (instanceTypes == 2.0 || instanceTypes == 3.0));
  bool isCap = isStartCap || isEndCap;

  // extend out a triangle to envelope the round cap
  if (isCap) {
    offsetVec = mix(perp * sideOfPath, dir * capType * 4.0 * flipIfTrue(isStartCap), isJoint);
    vJointType = capType;
  } else {
    vJointType = jointType;
  }

  // Generate variables for fragment shader
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
  return currPoint + offset;
}

// In clipspace extrusion, if a line extends behind the camera, clip it to avoid visual artifacts
void clipLine(inout vec4 position, vec4 refPosition) {
  if (position.w < EPSILON) {
    float r = (EPSILON - refPosition.w) / (position.w - refPosition.w);
    position = refPosition + (position - refPosition) * r;
  }
}

void main() {
  geometry.pickingColor = instancePickingColors;

  vColor = vec4(instanceColors.rgb, instanceColors.a * opacity);

  float isEnd = positions.x;

  vec3 prevPosition = mix(instanceLeftPositions, instanceStartPositions, isEnd);
  vec3 prevPosition64Low = mix(instanceLeftPositions64Low, instanceStartPositions64Low, isEnd);

  vec3 currPosition = mix(instanceStartPositions, instanceEndPositions, isEnd);
  vec3 currPosition64Low = mix(instanceStartPositions64Low, instanceEndPositions64Low, isEnd);

  vec3 nextPosition = mix(instanceEndPositions, instanceRightPositions, isEnd);
  vec3 nextPosition64Low = mix(instanceEndPositions64Low, instanceRightPositions64Low, isEnd);

  geometry.worldPosition = currPosition;
  vec2 widthPixels = vec2(clamp(
    project_size_to_pixel(instanceStrokeWidths * widthScale, widthUnits),
    widthMinPixels, widthMaxPixels) / 2.0);
  vec3 width;

  if (billboard) {
    // Extrude in clipspace
    vec4 prevPositionScreen = project_position_to_clipspace(prevPosition, prevPosition64Low, ZERO_OFFSET);
    vec4 currPositionScreen = project_position_to_clipspace(currPosition, currPosition64Low, ZERO_OFFSET, geometry.position);
    vec4 nextPositionScreen = project_position_to_clipspace(nextPosition, nextPosition64Low, ZERO_OFFSET);

    clipLine(prevPositionScreen, currPositionScreen);
    clipLine(nextPositionScreen, currPositionScreen);
    clipLine(currPositionScreen, mix(nextPositionScreen, prevPositionScreen, isEnd));

    width = vec3(widthPixels, 0.0);
    DECKGL_FILTER_SIZE(width, geometry);

    vec3 pos = lineJoin(
      prevPositionScreen.xyz / prevPositionScreen.w,
      currPositionScreen.xyz / currPositionScreen.w,
      nextPositionScreen.xyz / nextPositionScreen.w,
      project_pixel_size_to_clipspace(width.xy)
    );

    gl_Position = vec4(pos * currPositionScreen.w, currPositionScreen.w);
  } else {
    // Extrude in commonspace
    prevPosition = project_position(prevPosition, prevPosition64Low);
    currPosition = project_position(currPosition, currPosition64Low);
    nextPosition = project_position(nextPosition, nextPosition64Low);

    width = vec3(project_pixel_size(widthPixels), 0.0);
    DECKGL_FILTER_SIZE(width, geometry);

    vec4 pos = vec4(
      lineJoin(prevPosition, currPosition, nextPosition, width.xy),
      1.0);
    geometry.position = pos;
    gl_Position = project_common_position_to_clipspace(pos);
  }
  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
  DECKGL_FILTER_COLOR(vColor, geometry);
}
`,ht=`#define SHADER_NAME path-layer-fragment-shader

precision highp float;

uniform float miterLimit;

varying vec4 vColor;
varying vec2 vCornerOffset;
varying float vMiterLength;
/*
 * vPathPosition represents the relative coordinates of the current fragment on the path segment.
 * vPathPosition.x - position along the width of the path, between [-1, 1]. 0 is the center line.
 * vPathPosition.y - position along the length of the path, between [0, L / width].
 */
varying vec2 vPathPosition;
varying float vPathLength;
varying float vJointType;

void main(void) {
  geometry.uv = vPathPosition;

  if (vPathPosition.y < 0.0 || vPathPosition.y > vPathLength) {
    // if joint is rounded, test distance from the corner
    if (vJointType > 0.5 && length(vCornerOffset) > 1.0) {
      discard;
    }
    // trim miter
    if (vJointType < 0.5 && vMiterLength > miterLimit + 1.0) {
      discard;
    }
  }
  gl_FragColor = vColor;

  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
}
`,N=[0,0,0,255],dt={widthUnits:"meters",widthScale:{type:"number",min:0,value:1},widthMinPixels:{type:"number",min:0,value:0},widthMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},jointRounded:!1,capRounded:!1,miterLimit:{type:"number",min:0,value:4},billboard:!1,_pathType:null,getPath:{type:"accessor",value:o=>o.path},getColor:{type:"accessor",value:N},getWidth:{type:"accessor",value:1},rounded:{deprecatedFor:["jointRounded","capRounded"]}},b={enter:(o,t)=>t.length?t.subarray(t.length-o.length):o};class D extends H{constructor(...t){super(...t),y(this,"state",void 0)}getShaders(){return super.getShaders({vs:ft,fs:ht,modules:[Y,Z]})}get wrapLongitude(){return!1}initializeState(){this.getAttributeManager().addInstanced({positions:{size:3,vertexOffset:1,type:5130,fp64:this.use64bitPositions(),transition:b,accessor:"getPath",update:this.calculatePositions,noAlloc:!0,shaderAttributes:{instanceLeftPositions:{vertexOffset:0},instanceStartPositions:{vertexOffset:1},instanceEndPositions:{vertexOffset:2},instanceRightPositions:{vertexOffset:3}}},instanceTypes:{size:1,type:5121,update:this.calculateSegmentTypes,noAlloc:!0},instanceStrokeWidths:{size:1,accessor:"getWidth",transition:b,defaultValue:1},instanceColors:{size:this.props.colorFormat.length,type:5121,normalized:!0,accessor:"getColor",transition:b,defaultValue:N},instancePickingColors:{size:3,type:5121,accessor:(n,{index:i,target:s})=>this.encodePickingColor(n&&n.__source?n.__source.index:i,s)}}),this.setState({pathTesselator:new ct({fp64:this.use64bitPositions()})})}updateState(t){super.updateState(t);const{props:e,changeFlags:n}=t,i=this.getAttributeManager();if(n.dataChanged||n.updateTriggersChanged&&(n.updateTriggersChanged.all||n.updateTriggersChanged.getPath)){const{pathTesselator:a}=this.state,c=e.data.attributes||{};a.updateGeometry({data:e.data,geometryBuffer:c.getPath,buffers:c,normalize:!e._pathType,loop:e._pathType==="loop",getGeometry:e.getPath,positionFormat:e.positionFormat,wrapLongitude:e.wrapLongitude,resolution:this.context.viewport.resolution,dataChanged:n.dataChanged}),this.setState({numInstances:a.instanceCount,startIndices:a.vertexStarts}),n.dataChanged||i.invalidateAll()}if(n.extensionsChanged){var r;const{gl:a}=this.context;(r=this.state.model)===null||r===void 0||r.delete(),this.state.model=this._getModel(a),i.invalidateAll()}}getPickingInfo(t){const e=super.getPickingInfo(t),{index:n}=e,{data:i}=this.props;return i[0]&&i[0].__source&&(e.object=i.find(s=>s.__source.index===n)),e}disablePickingIndex(t){const{data:e}=this.props;if(e[0]&&e[0].__source)for(let n=0;n<e.length;n++)e[n].__source.index===t&&this._disablePickingIndex(n);else this._disablePickingIndex(t)}draw({uniforms:t}){const{jointRounded:e,capRounded:n,billboard:i,miterLimit:s,widthUnits:r,widthScale:a,widthMinPixels:c,widthMaxPixels:f}=this.props;this.state.model.setUniforms(t).setUniforms({jointType:Number(e),capType:Number(n),billboard:i,widthUnits:K[r],widthScale:a,miterLimit:s,widthMinPixels:c,widthMaxPixels:f}).draw()}_getModel(t){const e=[0,1,2,1,4,2,1,3,4,3,5,4],n=[0,0,0,-1,0,1,1,-1,1,1,1,0];return new W(t,{...this.getShaders(),id:this.props.id,geometry:new X({drawMode:4,attributes:{indices:new Uint16Array(e),positions:{value:new Float32Array(n),size:2}}}),isInstanced:!0})}calculatePositions(t){const{pathTesselator:e}=this.state;t.startIndices=e.vertexStarts,t.value=e.get("positions")}calculateSegmentTypes(t){const{pathTesselator:e}=this.state;t.startIndices=e.vertexStarts,t.value=e.get("segmentTypes")}}y(D,"defaultProps",dt);y(D,"layerName","PathLayer");export{D as P,q as T,pt as a,$ as c};
//# sourceMappingURL=path-layer-47e22c07.js.map
