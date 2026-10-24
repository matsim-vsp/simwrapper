import{A as e,C as t,D as n,h as r,mt as i,n as a,p as o}from"./mapbox-overlay-KuXvUc6L.js";import{c as s,d as c,f as l,h as u,m as d,o as f,p}from"./geojson-layer-D3rMABvN.js";var m={name:`phongMaterial`,dependencies:[u],source:l,vs:d,fs:p,defines:{LIGHTING_FRAGMENT:!0},uniformTypes:{ambient:`f32`,diffuse:`f32`,shininess:`f32`,specularColor:`vec3<f32>`},defaultUniforms:{ambient:.35,diffuse:.6,shininess:32,specularColor:[.15,.15,.15]},getUniforms(e){let t={...e};return t.specularColor&&=t.specularColor.map(e=>e/255),{...m.defaultUniforms,...t}}},h=class extends o{constructor(e){let{indices:t,attributes:n}=g(e);super({...e,indices:t,attributes:n})}};function g(e){let{radius:t,height:n=1,nradial:r=10}=e,{vertices:a}=e;a&&(i.assert(a.length>=r),a=a.flatMap(e=>[e[0],e[1]]),s(a,f.COUNTER_CLOCKWISE));let o=n>0,c=r+1,l=o?c*3+1:r,u=Math.PI*2/r,d=new Uint16Array(o?r*3*2:0),p=new Float32Array(l*3),m=new Float32Array(l*3),h=0;if(o){for(let e=0;e<c;e++){let i=e*u,o=e%r,s=Math.sin(i),c=Math.cos(i);for(let e=0;e<2;e++)p[h+0]=a?a[o*2]:c*t,p[h+1]=a?a[o*2+1]:s*t,p[h+2]=(1/2-e)*n,m[h+0]=a?a[o*2]:c,m[h+1]=a?a[o*2+1]:s,h+=3}p[h+0]=p[h-3],p[h+1]=p[h-2],p[h+2]=p[h-1],h+=3}for(let e=+!o;e<c;e++){let i=Math.floor(e/2)*Math.sign(.5-e%2),o=i*u,s=(i+r)%r,c=Math.sin(o),l=Math.cos(o);p[h+0]=a?a[s*2]:l*t,p[h+1]=a?a[s*2+1]:c*t,p[h+2]=n/2,m[h+2]=1,h+=3}if(o){let e=0;for(let t=0;t<r;t++)d[e++]=t*2+0,d[e++]=t*2+2,d[e++]=t*2+0,d[e++]=t*2+1,d[e++]=t*2+1,d[e++]=t*2+3}return{indices:d,attributes:{POSITION:{size:3,value:p},NORMAL:{size:3,value:m}}}}var _=`uniform columnUniforms {
  float radius;
  float angle;
  vec2 offset;
  bool extruded;
  bool stroked;
  bool isStroke;
  float coverage;
  float elevationScale;
  float edgeDistance;
  float widthScale;
  float widthMinPixels;
  float widthMaxPixels;
  highp int radiusUnits;
  highp int widthUnits;
} column;
`,v={name:`column`,vs:_,fs:_,uniformTypes:{radius:`f32`,angle:`f32`,offset:`vec2<f32>`,extruded:`f32`,stroked:`f32`,isStroke:`f32`,coverage:`f32`,elevationScale:`f32`,edgeDistance:`f32`,widthScale:`f32`,widthMinPixels:`f32`,widthMaxPixels:`f32`,radiusUnits:`i32`,widthUnits:`i32`}},y=`#version 300 es
#define SHADER_NAME column-layer-vertex-shader
in vec3 positions;
in vec3 normals;
in vec3 instancePositions;
in float instanceElevations;
in vec3 instancePositions64Low;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
in float instanceStrokeWidths;
in vec3 instancePickingColors;
out vec4 vColor;
#ifdef FLAT_SHADING
out vec3 cameraPosition;
out vec4 position_commonspace;
#endif
void main(void) {
geometry.worldPosition = instancePositions;
vec4 color = column.isStroke ? instanceLineColors : instanceFillColors;
mat2 rotationMatrix = mat2(cos(column.angle), sin(column.angle), -sin(column.angle), cos(column.angle));
float elevation = 0.0;
float strokeOffsetRatio = 1.0;
if (column.extruded) {
elevation = instanceElevations * (positions.z + 1.0) / 2.0 * column.elevationScale;
} else if (column.stroked) {
float widthPixels = clamp(
project_size_to_pixel(instanceStrokeWidths * column.widthScale, column.widthUnits),
column.widthMinPixels, column.widthMaxPixels) / 2.0;
float halfOffset = project_pixel_size(widthPixels) / project_size(column.edgeDistance * column.coverage * column.radius);
if (column.isStroke) {
strokeOffsetRatio -= sign(positions.z) * halfOffset;
} else {
strokeOffsetRatio -= halfOffset;
}
}
float shouldRender = float(color.a > 0.0 && instanceElevations >= 0.0);
float dotRadius = column.radius * column.coverage * shouldRender;
geometry.pickingColor = instancePickingColors;
vec3 centroidPosition = vec3(instancePositions.xy, instancePositions.z + elevation);
vec3 centroidPosition64Low = instancePositions64Low;
vec2 offset = (rotationMatrix * positions.xy * strokeOffsetRatio + column.offset) * dotRadius;
if (column.radiusUnits == UNIT_METERS) {
offset = project_size(offset);
}
vec3 pos = vec3(offset, 0.);
DECKGL_FILTER_SIZE(pos, geometry);
gl_Position = project_position_to_clipspace(centroidPosition, centroidPosition64Low, pos, geometry.position);
geometry.normal = project_normal(vec3(rotationMatrix * normals.xy, normals.z));
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
if (column.extruded && !column.isStroke) {
#ifdef FLAT_SHADING
cameraPosition = project.cameraPosition;
position_commonspace = geometry.position;
vColor = vec4(color.rgb, color.a * layer.opacity);
#else
vec3 lightColor = lighting_getLightColor(color.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
vColor = vec4(lightColor, color.a * layer.opacity);
#endif
} else {
vColor = vec4(color.rgb, color.a * layer.opacity);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,b=`#version 300 es
#define SHADER_NAME column-layer-fragment-shader
precision highp float;
out vec4 fragColor;
in vec4 vColor;
#ifdef FLAT_SHADING
in vec3 cameraPosition;
in vec4 position_commonspace;
#endif
void main(void) {
fragColor = vColor;
geometry.uv = vec2(0.);
#ifdef FLAT_SHADING
if (column.extruded && !column.isStroke && !bool(picking.isActive)) {
vec3 normal = normalize(cross(dFdx(position_commonspace.xyz), dFdy(position_commonspace.xyz)));
fragColor.rgb = lighting_getLightColor(vColor.rgb, cameraPosition, position_commonspace.xyz, normal);
}
#endif
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,x=[0,0,0,255],S={diskResolution:{type:`number`,min:4,value:20},vertices:null,radius:{type:`number`,min:0,value:1e3},angle:{type:`number`,value:0},offset:{type:`array`,value:[0,0]},coverage:{type:`number`,min:0,max:1,value:1},elevationScale:{type:`number`,min:0,value:1},radiusUnits:`meters`,lineWidthUnits:`meters`,lineWidthScale:1,lineWidthMinPixels:0,lineWidthMaxPixels:2**53-1,extruded:!0,wireframe:!1,filled:!0,stroked:!1,flatShading:!1,getPosition:{type:`accessor`,value:e=>e.position},getFillColor:{type:`accessor`,value:x},getLineColor:{type:`accessor`,value:x},getLineWidth:{type:`accessor`,value:1},getElevation:{type:`accessor`,value:1e3},material:!0,getColor:{deprecatedFor:[`getFillColor`,`getLineColor`]}},C=class extends a{getShaders(){let e={},{flatShading:r}=this.props;return r&&(e.FLAT_SHADING=1),super.getShaders({vs:y,fs:b,defines:e,modules:[n,r?m:c,t,v]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:`float64`,fp64:this.use64bitPositions(),transition:!0,accessor:`getPosition`},instanceElevations:{size:1,transition:!0,accessor:`getElevation`},instanceFillColors:{size:this.props.colorFormat.length,type:`unorm8`,transition:!0,accessor:`getFillColor`,defaultValue:x},instanceLineColors:{size:this.props.colorFormat.length,type:`unorm8`,transition:!0,accessor:`getLineColor`,defaultValue:x},instanceStrokeWidths:{size:1,accessor:`getLineWidth`,transition:!0}})}updateState(e){super.updateState(e);let{props:t,oldProps:n,changeFlags:r}=e,i=r.extensionsChanged||t.flatShading!==n.flatShading;i&&(this.state.models?.forEach(e=>e.destroy()),this.setState(this._getModels()),this.getAttributeManager().invalidateAll());let a=this.getNumInstances();this.state.fillModel.setInstanceCount(a),this.state.wireframeModel.setInstanceCount(a),(i||t.diskResolution!==n.diskResolution||t.vertices!==n.vertices||(t.extruded||t.stroked)!==(n.extruded||n.stroked))&&this._updateGeometry(t)}getGeometry(e,t,n){let r=new h({radius:1,height:n?2:0,vertices:t,nradial:e}),i=0;if(t)for(let n=0;n<e;n++){let r=t[n],a=Math.sqrt(r[0]*r[0]+r[1]*r[1]);i+=a/e}else i=1;return this.setState({edgeDistance:Math.cos(Math.PI/e)*i}),r}_getModels(){let e=this.getShaders(),t=this.getAttributeManager().getBufferLayouts(),n=new r(this.context.device,{...e,id:`${this.props.id}-fill`,bufferLayout:t,isInstanced:!0}),i=new r(this.context.device,{...e,id:`${this.props.id}-wireframe`,bufferLayout:t,isInstanced:!0});return{fillModel:n,wireframeModel:i,models:[i,n]}}_updateGeometry({diskResolution:e,vertices:t,extruded:n,stroked:r}){let i=this.getGeometry(e,t,n||r);this.setState({fillVertexCount:i.attributes.POSITION.value.length/3});let a=this.state.fillModel,o=this.state.wireframeModel;a.setGeometry(i),a.setTopology(`triangle-strip`),a.setIndexBuffer(null),o.setGeometry(i),o.setTopology(`line-list`)}draw({uniforms:t}){let{lineWidthUnits:n,lineWidthScale:r,lineWidthMinPixels:i,lineWidthMaxPixels:a,radiusUnits:o,elevationScale:s,extruded:c,filled:l,stroked:u,wireframe:d,offset:f,coverage:p,radius:m,angle:h}=this.props,g=this.state.fillModel,_=this.state.wireframeModel,{fillVertexCount:v,edgeDistance:y}=this.state,b={radius:m,angle:h/180*Math.PI,offset:f,extruded:c,stroked:u,coverage:p,elevationScale:s,edgeDistance:y,radiusUnits:e[o],widthUnits:e[n],widthScale:r,widthMinPixels:i,widthMaxPixels:a};c&&d&&(_.shaderInputs.setProps({column:{...b,isStroke:!0}}),_.draw(this.context.renderPass)),l&&(g.setVertexCount(v),g.shaderInputs.setProps({column:{...b,isStroke:!1}}),g.draw(this.context.renderPass)),!c&&u&&(g.setVertexCount(v*2/3),g.shaderInputs.setProps({column:{...b,isStroke:!0}}),g.draw(this.context.renderPass))}};C.layerName=`ColumnLayer`,C.defaultProps=S;export{C as t};