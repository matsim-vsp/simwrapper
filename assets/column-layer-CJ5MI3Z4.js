import{a as I,b as E,c as k,l as A,m as b,W as G,g as F}from"./geojson-layer-DvtTfj7b.js";import{J as N,p as O,v as T,G as U,H as R,I as P,U as M}from"./layer-T9N9JmIf.js";const _={name:"phongMaterial",dependencies:[A],source:k,vs:E,fs:I,defines:{LIGHTING_FRAGMENT:1},uniformTypes:{ambient:"f32",diffuse:"f32",shininess:"f32",specularColor:"vec3<f32>"},defaultUniforms:{ambient:.35,diffuse:.6,shininess:32,specularColor:[.15,.15,.15]},getUniforms(g){const e={...g};return e.specularColor&&(e.specularColor=e.specularColor.map(t=>t/255)),{..._.defaultUniforms,...e}}};class z extends N{constructor(e){const{indices:t,attributes:i}=D(e);super({...e,indices:t,attributes:i})}}function D(g){const{radius:e,height:t=1,nradial:i=10}=g;let{vertices:o}=g;o&&(O.assert(o.length>=i),o=o.flatMap(s=>[s[0],s[1]]),b(o,G.COUNTER_CLOCKWISE));const a=t>0,r=i+1,d=a?r*3+1:i,h=Math.PI*2/i,u=new Uint16Array(a?i*3*2:0),l=new Float32Array(d*3),y=new Float32Array(d*3);let n=0;if(a){for(let s=0;s<r;s++){const c=s*h,m=s%i,f=Math.sin(c),v=Math.cos(c);for(let p=0;p<2;p++)l[n+0]=o?o[m*2]:v*e,l[n+1]=o?o[m*2+1]:f*e,l[n+2]=(1/2-p)*t,y[n+0]=o?o[m*2]:v,y[n+1]=o?o[m*2+1]:f,n+=3}l[n+0]=l[n-3],l[n+1]=l[n-2],l[n+2]=l[n-1],n+=3}for(let s=a?0:1;s<r;s++){const c=Math.floor(s/2)*Math.sign(.5-s%2),m=c*h,f=(c+i)%i,v=Math.sin(m),p=Math.cos(m);l[n+0]=o?o[f*2]:p*e,l[n+1]=o?o[f*2+1]:v*e,l[n+2]=t/2,y[n+2]=1,n+=3}if(a){let s=0;for(let c=0;c<i;c++)u[s++]=c*2+0,u[s++]=c*2+2,u[s++]=c*2+0,u[s++]=c*2+1,u[s++]=c*2+1,u[s++]=c*2+3}return{indices:u,attributes:{POSITION:{size:3,value:l},NORMAL:{size:3,value:y}}}}const S=`uniform columnUniforms {
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
`,W={name:"column",vs:S,fs:S,uniformTypes:{radius:"f32",angle:"f32",offset:"vec2<f32>",extruded:"f32",stroked:"f32",isStroke:"f32",coverage:"f32",elevationScale:"f32",edgeDistance:"f32",widthScale:"f32",widthMinPixels:"f32",widthMaxPixels:"f32",radiusUnits:"i32",widthUnits:"i32"}},j=`#version 300 es
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
`,H=`#version 300 es
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
`,x=[0,0,0,255],V={diskResolution:{type:"number",min:4,value:20},vertices:null,radius:{type:"number",min:0,value:1e3},angle:{type:"number",value:0},offset:{type:"array",value:[0,0]},coverage:{type:"number",min:0,max:1,value:1},elevationScale:{type:"number",min:0,value:1},radiusUnits:"meters",lineWidthUnits:"meters",lineWidthScale:1,lineWidthMinPixels:0,lineWidthMaxPixels:Number.MAX_SAFE_INTEGER,extruded:!0,wireframe:!1,filled:!0,stroked:!1,flatShading:!1,getPosition:{type:"accessor",value:g=>g.position},getFillColor:{type:"accessor",value:x},getLineColor:{type:"accessor",value:x},getLineWidth:{type:"accessor",value:1},getElevation:{type:"accessor",value:1e3},material:!0,getColor:{deprecatedFor:["getFillColor","getLineColor"]}};class w extends T{getShaders(){const e={},{flatShading:t}=this.props;return t&&(e.FLAT_SHADING=1),super.getShaders({vs:j,fs:H,defines:e,modules:[U,t?_:F,R,W]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceElevations:{size:1,transition:!0,accessor:"getElevation"},instanceFillColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,accessor:"getFillColor",defaultValue:x},instanceLineColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,accessor:"getLineColor",defaultValue:x},instanceStrokeWidths:{size:1,accessor:"getLineWidth",transition:!0}})}updateState(e){super.updateState(e);const{props:t,oldProps:i,changeFlags:o}=e,a=o.extensionsChanged||t.flatShading!==i.flatShading;a&&(this.state.models?.forEach(d=>d.destroy()),this.setState(this._getModels()),this.getAttributeManager().invalidateAll());const r=this.getNumInstances();this.state.fillModel.setInstanceCount(r),this.state.wireframeModel.setInstanceCount(r),(a||t.diskResolution!==i.diskResolution||t.vertices!==i.vertices||(t.extruded||t.stroked)!==(i.extruded||i.stroked))&&this._updateGeometry(t)}getGeometry(e,t,i){const o=new z({radius:1,height:i?2:0,vertices:t,nradial:e});let a=0;if(t)for(let r=0;r<e;r++){const d=t[r],h=Math.sqrt(d[0]*d[0]+d[1]*d[1]);a+=h/e}else a=1;return this.setState({edgeDistance:Math.cos(Math.PI/e)*a}),o}_getModels(){const e=this.getShaders(),t=this.getAttributeManager().getBufferLayouts(),i=new P(this.context.device,{...e,id:`${this.props.id}-fill`,bufferLayout:t,isInstanced:!0}),o=new P(this.context.device,{...e,id:`${this.props.id}-wireframe`,bufferLayout:t,isInstanced:!0});return{fillModel:i,wireframeModel:o,models:[o,i]}}_updateGeometry({diskResolution:e,vertices:t,extruded:i,stroked:o}){const a=this.getGeometry(e,t,i||o);this.setState({fillVertexCount:a.attributes.POSITION.value.length/3});const r=this.state.fillModel,d=this.state.wireframeModel;r.setGeometry(a),r.setTopology("triangle-strip"),r.setIndexBuffer(null),d.setGeometry(a),d.setTopology("line-list")}draw({uniforms:e}){const{lineWidthUnits:t,lineWidthScale:i,lineWidthMinPixels:o,lineWidthMaxPixels:a,radiusUnits:r,elevationScale:d,extruded:h,filled:u,stroked:l,wireframe:y,offset:n,coverage:s,radius:c,angle:m}=this.props,f=this.state.fillModel,v=this.state.wireframeModel,{fillVertexCount:p,edgeDistance:L}=this.state,C={radius:c,angle:m/180*Math.PI,offset:n,extruded:h,stroked:l,coverage:s,elevationScale:d,edgeDistance:L,radiusUnits:M[r],widthUnits:M[t],widthScale:i,widthMinPixels:o,widthMaxPixels:a};h&&y&&(v.shaderInputs.setProps({column:{...C,isStroke:!0}}),v.draw(this.context.renderPass)),u&&(f.setVertexCount(p),f.shaderInputs.setProps({column:{...C,isStroke:!1}}),f.draw(this.context.renderPass)),!h&&l&&(f.setVertexCount(p*2/3),f.shaderInputs.setProps({column:{...C,isStroke:!0}}),f.draw(this.context.renderPass))}}w.layerName="ColumnLayer";w.defaultProps=V;export{w as C};
