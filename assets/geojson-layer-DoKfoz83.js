import{l as y,_ as C}from"./set-rtl-text-plugin-i7BvRADR.js";import{S as A,I as v,T as M,C as O}from"./text-layer-BvG04bBg.js";import{P as R}from"./path-layer-6zjC53jx.js";import{S as _}from"./solid-polygon-layer-Dh2NTTQU.js";function W({data:o,getIndex:n,dataRange:e,replace:t}){const{startRow:i=0,endRow:s=1/0}=e,r=o.length;let a=r,l=r;for(let p=0;p<r;p++){const x=n(o[p]);if(a>p&&x>=i&&(a=p),x>=s){l=p;break}}let c=a;const g=l-a!==t.length?o.slice(l):void 0;for(let p=0;p<t.length;p++)o[c++]=t[p];if(g){for(let p=0;p<g.length;p++)o[c++]=g[p];o.length=c}return{startRow:a,endRow:a+t.length}}function z(o,n){if(!o)return null;const e="startIndices"in o?o.startIndices[n]:n,t=o.featureIds.value[e];return e!==-1?F(o,t,e):null}function F(o,n,e){const t={properties:{...o.properties[n]}};for(const i in o.numericProps)t.properties[i]=o.numericProps[i].value[e];return t}function w(o,n){const e={points:null,lines:null,polygons:null};for(const t in e){const i=o[t].globalFeatureIds.value;e[t]=new Uint8ClampedArray(i.length*3);const s=[];for(let r=0;r<i.length;r++)n(i[r],s),e[t][r*3+0]=s[0],e[t][r*3+1]=s[1],e[t][r*3+2]=s[2]}return e}const f={circle:{type:A,props:{filled:"filled",stroked:"stroked",lineWidthMaxPixels:"lineWidthMaxPixels",lineWidthMinPixels:"lineWidthMinPixels",lineWidthScale:"lineWidthScale",lineWidthUnits:"lineWidthUnits",pointRadiusMaxPixels:"radiusMaxPixels",pointRadiusMinPixels:"radiusMinPixels",pointRadiusScale:"radiusScale",pointRadiusUnits:"radiusUnits",pointAntialiasing:"antialiasing",pointBillboard:"billboard",getFillColor:"getFillColor",getLineColor:"getLineColor",getLineWidth:"getLineWidth",getPointRadius:"getRadius"}},icon:{type:v,props:{iconAtlas:"iconAtlas",iconMapping:"iconMapping",iconSizeMaxPixels:"sizeMaxPixels",iconSizeMinPixels:"sizeMinPixels",iconSizeScale:"sizeScale",iconSizeUnits:"sizeUnits",iconAlphaCutoff:"alphaCutoff",iconBillboard:"billboard",getIcon:"getIcon",getIconAngle:"getAngle",getIconColor:"getColor",getIconPixelOffset:"getPixelOffset",getIconSize:"getSize"}},text:{type:M,props:{textSizeMaxPixels:"sizeMaxPixels",textSizeMinPixels:"sizeMinPixels",textSizeScale:"sizeScale",textSizeUnits:"sizeUnits",textBackground:"background",textBackgroundPadding:"backgroundPadding",textFontFamily:"fontFamily",textFontWeight:"fontWeight",textLineHeight:"lineHeight",textMaxWidth:"maxWidth",textOutlineColor:"outlineColor",textOutlineWidth:"outlineWidth",textWordBreak:"wordBreak",textCharacterSet:"characterSet",textBillboard:"billboard",textFontSettings:"fontSettings",getText:"getText",getTextAngle:"getAngle",getTextColor:"getColor",getTextPixelOffset:"getPixelOffset",getTextSize:"getSize",getTextAnchor:"getTextAnchor",getTextAlignmentBaseline:"getAlignmentBaseline",getTextBackgroundColor:"getBackgroundColor",getTextBorderColor:"getBorderColor",getTextBorderWidth:"getBorderWidth"}}},P={type:R,props:{lineWidthUnits:"widthUnits",lineWidthScale:"widthScale",lineWidthMinPixels:"widthMinPixels",lineWidthMaxPixels:"widthMaxPixels",lineJointRounded:"jointRounded",lineCapRounded:"capRounded",lineMiterLimit:"miterLimit",lineBillboard:"billboard",getLineColor:"getColor",getLineWidth:"getWidth"}},S={type:_,props:{extruded:"extruded",filled:"filled",wireframe:"wireframe",elevationScale:"elevationScale",material:"material",getElevation:"getElevation",getFillColor:"getFillColor",getLineColor:"getLineColor"}};function d({type:o,props:n}){const e={};for(const t in n)e[t]=o.defaultProps[n[t]];return e}function L(o,n){const{transitions:e,updateTriggers:t}=o.props,i={updateTriggers:{},transitions:e&&{getPosition:e.geometry}};for(const s in n){const r=n[s];let a=o.props[s];s.startsWith("get")&&(a=o.getSubLayerAccessor(a),i.updateTriggers[r]=t[s],e&&(i.transitions[r]=e[s])),i[r]=a}return i}function E(o){if(Array.isArray(o))return o;switch(y.assert(o.type,"GeoJSON does not have type"),o.type){case"Feature":return[o];case"FeatureCollection":return y.assert(Array.isArray(o.features),"GeoJSON does not have features array"),o.features;default:return[{geometry:o}]}}function b(o,n,e={}){const t={pointFeatures:[],lineFeatures:[],polygonFeatures:[],polygonOutlineFeatures:[]},{startRow:i=0,endRow:s=o.length}=e;for(let r=i;r<s;r++){const a=o[r],{geometry:l}=a;if(l)if(l.type==="GeometryCollection"){y.assert(Array.isArray(l.geometries),"GeoJSON does not have geometries array");const{geometries:c}=l;for(let u=0;u<c.length;u++){const g=c[u];m(g,t,n,a,r)}}else m(l,t,n,a,r)}return t}function m(o,n,e,t,i){const{type:s,coordinates:r}=o,{pointFeatures:a,lineFeatures:l,polygonFeatures:c,polygonOutlineFeatures:u}=n;if(!G(s,r)){y.warn("".concat(s," coordinates are malformed"))();return}switch(s){case"Point":a.push(e({geometry:o},t,i));break;case"MultiPoint":r.forEach(g=>{a.push(e({geometry:{type:"Point",coordinates:g}},t,i))});break;case"LineString":l.push(e({geometry:o},t,i));break;case"MultiLineString":r.forEach(g=>{l.push(e({geometry:{type:"LineString",coordinates:g}},t,i))});break;case"Polygon":c.push(e({geometry:o},t,i)),r.forEach(g=>{u.push(e({geometry:{type:"LineString",coordinates:g}},t,i))});break;case"MultiPolygon":r.forEach(g=>{c.push(e({geometry:{type:"Polygon",coordinates:g}},t,i)),g.forEach(p=>{u.push(e({geometry:{type:"LineString",coordinates:p}},t,i))})});break}}const B={Point:1,MultiPoint:2,LineString:2,MultiLineString:3,Polygon:3,MultiPolygon:4};function G(o,n){let e=B[o];for(y.assert(e,"Unknown GeoJSON type ".concat(o));n&&--e>0;)n=n[0];return n&&Number.isFinite(n[0])}function I(){return{points:{},lines:{},polygons:{},polygonsOutline:{}}}function h(o){return o.geometry.coordinates}function N(o,n){const e=I(),{pointFeatures:t,lineFeatures:i,polygonFeatures:s,polygonOutlineFeatures:r}=o;return e.points.data=t,e.points._dataDiff=n.pointFeatures&&(()=>n.pointFeatures),e.points.getPosition=h,e.lines.data=i,e.lines._dataDiff=n.lineFeatures&&(()=>n.lineFeatures),e.lines.getPath=h,e.polygons.data=s,e.polygons._dataDiff=n.polygonFeatures&&(()=>n.polygonFeatures),e.polygons.getPolygon=h,e.polygonsOutline.data=r,e.polygonsOutline._dataDiff=n.polygonOutlineFeatures&&(()=>n.polygonOutlineFeatures),e.polygonsOutline.getPath=h,e}function U(o,n){const e=I(),{points:t,lines:i,polygons:s}=o,r=w(o,n);return e.points.data={length:t.positions.value.length/t.positions.size,attributes:{...t.attributes,getPosition:t.positions,instancePickingColors:{size:3,value:r.points}},properties:t.properties,numericProps:t.numericProps,featureIds:t.featureIds},e.lines.data={length:i.pathIndices.value.length-1,startIndices:i.pathIndices.value,attributes:{...i.attributes,getPath:i.positions,instancePickingColors:{size:3,value:r.lines}},properties:i.properties,numericProps:i.numericProps,featureIds:i.featureIds},e.lines._pathType="open",e.polygons.data={length:s.polygonIndices.value.length-1,startIndices:s.polygonIndices.value,attributes:{...s.attributes,getPolygon:s.positions,pickingColors:{size:3,value:r.polygons}},properties:s.properties,numericProps:s.numericProps,featureIds:s.featureIds},e.polygons._normalize=!1,s.triangles&&(e.polygons.data.attributes.indices=s.triangles.value),e.polygonsOutline.data={length:s.primitivePolygonIndices.value.length-1,startIndices:s.primitivePolygonIndices.value,attributes:{...s.attributes,getPath:s.positions,instancePickingColors:{size:3,value:r.polygons}},properties:s.properties,numericProps:s.numericProps,featureIds:s.featureIds},e.polygonsOutline._pathType="open",e}const J=["points","linestrings","polygons"],Y={...d(f.circle),...d(f.icon),...d(f.text),...d(P),...d(S),stroked:!0,filled:!0,extruded:!1,wireframe:!1,iconAtlas:{type:"object",value:null},iconMapping:{type:"object",value:{}},getIcon:{type:"accessor",value:o=>o.properties.icon},getText:{type:"accessor",value:o=>o.properties.text},pointType:"circle",getRadius:{deprecatedFor:"getPointRadius"}};class k extends O{initializeState(){this.state={layerProps:{},features:{}}}updateState({props:n,changeFlags:e}){if(!e.dataChanged)return;const{data:t}=this.props,i=t&&"points"in t&&"polygons"in t&&"lines"in t;this.setState({binary:i}),i?this._updateStateBinary({props:n,changeFlags:e}):this._updateStateJSON({props:n,changeFlags:e})}_updateStateBinary({props:n,changeFlags:e}){const t=U(n.data,this.encodePickingColor);this.setState({layerProps:t})}_updateStateJSON({props:n,changeFlags:e}){const t=E(n.data),i=this.getSubLayerRow.bind(this);let s={};const r={};if(Array.isArray(e.dataChanged)){const l=this.state.features;for(const c in l)s[c]=l[c].slice(),r[c]=[];for(const c of e.dataChanged){const u=b(t,i,c);for(const g in l)r[g].push(W({data:s[g],getIndex:p=>p.__source.index,dataRange:c,replace:u[g]}))}}else s=b(t,i);const a=N(s,r);this.setState({features:s,featuresDiff:r,layerProps:a})}getPickingInfo(n){const e=super.getPickingInfo(n),{index:t,sourceLayer:i}=e;return e.featureType=J.find(s=>i.id.startsWith("".concat(this.id,"-").concat(s,"-"))),t>=0&&i.id.startsWith("".concat(this.id,"-points-text"))&&this.state.binary&&(e.index=this.props.data.points.globalFeatureIds.value[t]),e}_updateAutoHighlight(n){const e="".concat(this.id,"-points-"),t=n.featureType==="points";for(const i of this.getSubLayers())i.id.startsWith(e)===t&&i.updateAutoHighlight(n)}_renderPolygonLayer(){const{extruded:n,wireframe:e}=this.props,{layerProps:t}=this.state,i="polygons-fill",s=this.shouldRenderSubLayer(i,t.polygons.data)&&this.getSubLayerClass(i,S.type);if(s){const r=L(this,S.props),a=n&&e;return a||delete r.getLineColor,r.updateTriggers.lineColors=a,new s(r,this.getSubLayerProps({id:i,updateTriggers:r.updateTriggers}),t.polygons)}return null}_renderLineLayers(){const{extruded:n,stroked:e}=this.props,{layerProps:t}=this.state,i="polygons-stroke",s="linestrings",r=!n&&e&&this.shouldRenderSubLayer(i,t.polygonsOutline.data)&&this.getSubLayerClass(i,P.type),a=this.shouldRenderSubLayer(s,t.lines.data)&&this.getSubLayerClass(s,P.type);if(r||a){const l=L(this,P.props);return[r&&new r(l,this.getSubLayerProps({id:i,updateTriggers:l.updateTriggers}),t.polygonsOutline),a&&new a(l,this.getSubLayerProps({id:s,updateTriggers:l.updateTriggers}),t.lines)]}return null}_renderPointLayers(){const{pointType:n}=this.props,{layerProps:e,binary:t}=this.state;let{highlightedObjectIndex:i}=this.props;!t&&Number.isFinite(i)&&(i=e.points.data.findIndex(a=>a.__source.index===i));const s=new Set(n.split("+")),r=[];for(const a of s){const l="points-".concat(a),c=f[a],u=c&&this.shouldRenderSubLayer(l,e.points.data)&&this.getSubLayerClass(l,c.type);if(u){const g=L(this,c.props);let p=e.points;if(a==="text"&&t){const{instancePickingColors:x,...T}=p.data.attributes;p={...p,data:{...p.data,attributes:T}}}r.push(new u(g,this.getSubLayerProps({id:l,updateTriggers:g.updateTriggers,highlightedObjectIndex:i}),p))}}return r}renderLayers(){const{extruded:n}=this.props,e=this._renderPolygonLayer(),t=this._renderLineLayers(),i=this._renderPointLayers();return[!n&&e,t,i,n&&e]}getSubLayerAccessor(n){const{binary:e}=this.state;return!e||typeof n!="function"?super.getSubLayerAccessor(n):(t,i)=>{const{data:s,index:r}=i,a=z(s,r);return n(a,i)}}}C(k,"layerName","GeoJsonLayer");C(k,"defaultProps",Y);export{k as G};
