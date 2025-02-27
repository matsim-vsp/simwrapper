import{r as E,g as w,R as A,j as R,M as it,d as st,C as nt,V,h as k,n as at}from"./index-Bcyum9lL.js";import{d as ot}from"./index-CuygpRj2.js";import{Y as O}from"./index-C2yv4UXI.js";import{u as rt}from"./util-LXagx_XK.js";import{H as lt}from"./HTTPFileSystem-s4sqyA8J.js";import{C as ct}from"./CollapsiblePanel-DERQW1ub.js";import{D as ut}from"./DrawingTool-DxOLhKT7.js";import{Z as gt}from"./ZoomButtons-yJ7KurlV.js";import{_ as b,N as ht,O as dt,Q as mt,l as I,k as pt,D as ft,S as yt}from"./set-rtl-text-plugin-i7BvRADR.js";import{c as St}from"./index-CHwTd29i.js";import{A as vt}from"./arc-layer-B1Wy5Vkf.js";import{C as bt}from"./text-layer-BvG04bBg.js";import{C as xt}from"./column-layer-B48OMsBy.js";import"./fxp-4YEvQr-_.js";import"./extends-CCbyfPlC.js";import"./geojson-layer-DoKfoz83.js";import"./path-layer-6zjC53jx.js";import"./cut-by-mercator-bounds-P6ltG1KM.js";import"./solid-polygon-layer-Dh2NTTQU.js";function Dt(i){return new Worker("/simwrapper/assets/CsvGzipParser.worker-C5BaxedB.js",{name:i?.name})}const z={SUM:1,MEAN:2,MIN:3,MAX:4};function q(i,t){return i+t}function Ct(i,t){return t>i?t:i}function At(i,t){return t<i?t:i}function wt(i,t){if(Number.isFinite(t))return i.length?t:null;const e=i.map(t).filter(Number.isFinite);return e.length?e.reduce(q,0)/e.length:null}function zt(i,t){if(Number.isFinite(t))return i.length?i.length*t:null;const e=i.map(t).filter(Number.isFinite);return e.length?e.reduce(q,0):null}function Mt(i,t){if(Number.isFinite(t))return i.length?t:null;const e=i.map(t).filter(Number.isFinite);return e.length?e.reduce(Ct,-1/0):null}function Tt(i,t){if(Number.isFinite(t))return i.length?t:null;const e=i.map(t).filter(Number.isFinite);return e.length?e.reduce(At,1/0):null}function _t(i,t,e){const s=z[i]||z.SUM;switch(t=Pt(t,e),s){case z.MIN:return n=>Tt(n,t);case z.SUM:return n=>zt(n,t);case z.MEAN:return n=>wt(n,t);case z.MAX:return n=>Mt(n,t);default:return null}}function Pt(i,t={}){return Number.isFinite(i)?i:e=>(t.index=e.index,i(e.source,t))}function kt(i,t={}){return e=>(t.indices=e.map(s=>s.index),i(e.map(s=>s.source),t))}const Ft=[[255,255,178],[254,217,118],[254,178,76],[253,141,60],[240,59,32],[189,0,38]];function Ht(i,t){const e={};for(const s in i)t.includes(s)||(e[s]=i[s]);return e}class X extends bt{constructor(...t){super(...t),b(this,"state",void 0)}initializeAggregationLayer(t){super.initializeState(this.context),this.setState({ignoreProps:Ht(this.constructor._propTypes,t.data.props),dimensions:t})}updateState(t){super.updateState(t);const{changeFlags:e}=t;if(e.extensionsChanged){const s=this.getShaders({});s&&s.defines&&(s.defines.NON_INSTANCED_MODEL=1),this.updateShaders(s)}this._updateAttributes()}updateAttributes(t){this.setState({changedAttributes:t})}getAttributes(){return this.getAttributeManager().getShaderAttributes()}getModuleSettings(){const{viewport:t,mousePosition:e,gl:s}=this.context;return Object.assign(Object.create(this.props),{viewport:t,mousePosition:e,pickingActive:0,devicePixelRatio:ht(s)})}updateShaders(t){}isAggregationDirty(t,e={}){const{props:s,oldProps:n,changeFlags:a}=t,{compareAll:o=!1,dimension:r}=e,{ignoreProps:u}=this.state,{props:l,accessors:h=[]}=r,{updateTriggersChanged:c}=a;if(a.dataChanged)return!0;if(c){if(c.all)return!0;for(const d of h)if(c[d])return!0}if(o)return a.extensionsChanged?!0:dt({oldProps:n,newProps:s,ignoreProps:u,propTypes:this.constructor._propTypes});for(const d of l)if(s[d]!==n[d])return!0;return!1}isAttributeChanged(t){const{changedAttributes:e}=this.state;return t?e&&e[t]!==void 0:!It(e)}_getAttributeManager(){return new mt(this.context.gl,{id:this.props.id,stats:this.context.stats})}}b(X,"layerName","AggregationLayer");function It(i){let t=!0;for(const e in i){t=!1;break}return t}function H(i,t,e){const s=e;return s.domain=()=>i,s.range=()=>t,s}function N(i,t){return H(i,t,s=>Nt(i,t,s))}function Lt(i,t){return H(i,t,s=>Ut(i,t,s))}function $t(i,t){const e=i.sort(Z);let s=0;const n=Math.max(1,t.length),a=new Array(n-1);for(;++s<n;)a[s-1]=Bt(e,s/n);const o=r=>Rt(a,t,r);return o.thresholds=()=>a,H(i,t,o)}function Z(i,t){return i-t}function Bt(i,t){const e=i.length;if(t<=0||e<2)return i[0];if(t>=1)return i[e-1];const s=(e-1)*t,n=Math.floor(s),a=i[n],o=i[n+1];return a+(o-a)*(s-n)}function Et(i,t){let e=0,s=i.length;for(;e<s;){const n=e+s>>>1;Z(i[n],t)>0?s=n:e=n+1}return e}function Rt(i,t,e){return t[Et(i,e)]}function Vt(i,t,e,s){const n="".concat(s);let a=t.get(n);return a===void 0&&(a=i.push(s),t.set(n,a)),e[(a-1)%e.length]}function Ot(i,t){const e=new Map,s=[];for(const a of i){const o="".concat(a);e.has(o)||e.set(o,s.push(a))}return H(i,t,a=>Vt(s,e,t,a))}function Nt(i,t,e){const s=i[1]-i[0];if(s<=0)return I.warn("quantizeScale: invalid domain, returning range[0]")(),t[0];const n=s/t.length,a=Math.floor((e-i[0])/n),o=Math.max(Math.min(a,t.length-1),0);return t[o]}function Ut(i,t,e){return(e-i[0])/(i[1]-i[0])*(t[1]-t[0])+t[0]}function Q(i){return i!=null}function jt(i){const t=[];return i.forEach(e=>{!t.includes(e)&&Q(e)&&t.push(e)}),t}function K(i,t){return(typeof t=="function"?i.map(t):i).filter(Q)}function Wt(i,t){return K(i,t)}function Yt(i,t){return jt(K(i,t))}function Gt(i,t,e){return Math.max(t,Math.min(e,i))}function qt(i){switch(i){case"quantize":return N;case"linear":return Lt;case"quantile":return $t;case"ordinal":return Ot;default:return N}}const J=i=>i.length,Xt=3402823466e29,tt=i=>i.points,et=i=>i.index,U=(i,t)=>i<t?-1:i>t?1:i>=t?0:NaN,Zt={getValue:J,getPoints:tt,getIndex:et,filterData:null};class Qt{constructor(t=[],e=Zt){b(this,"maxCount",void 0),b(this,"maxValue",void 0),b(this,"minValue",void 0),b(this,"totalCount",void 0),b(this,"aggregatedBins",void 0),b(this,"sortedBins",void 0),b(this,"binMap",void 0),this.aggregatedBins=this.getAggregatedBins(t,e),this._updateMinMaxValues(),this.binMap=this.getBinMap()}getAggregatedBins(t,e){const{getValue:s=J,getPoints:n=tt,getIndex:a=et,filterData:o}=e,r=typeof o=="function",u=t.length,l=[];let h=0;for(let c=0;c<u;c++){const d=t[c],y=n(d),p=a(d),m=r?y.filter(o):y;d.filteredPoints=r?m:null;const f=m.length?s(m):null;f!=null&&(l[h]={i:Number.isFinite(p)?p:c,value:f,counts:m.length},h++)}return l}_percentileToIndex(t){const e=this.sortedBins.length;if(e<2)return[0,0];const[s,n]=t.map(r=>Gt(r,0,100)),a=Math.ceil(s/100*(e-1)),o=Math.floor(n/100*(e-1));return[a,o]}getBinMap(){const t={};for(const e of this.aggregatedBins)t[e.i]=e;return t}_updateMinMaxValues(){let t=0,e=0,s=Xt,n=0;for(const a of this.aggregatedBins)t=t>a.counts?t:a.counts,e=e>a.value?e:a.value,s=s<a.value?s:a.value,n+=a.counts;this.maxCount=t,this.maxValue=e,this.minValue=s,this.totalCount=n}getValueRange(t){if(this.sortedBins||(this.sortedBins=this.aggregatedBins.sort((n,a)=>U(n.value,a.value))),!this.sortedBins.length)return[];let e=0,s=this.sortedBins.length-1;if(Array.isArray(t)){const n=this._percentileToIndex(t);e=n[0],s=n[1]}return[this.sortedBins[e].value,this.sortedBins[s].value]}getValueDomainByScale(t,[e=0,s=100]=[]){if(this.sortedBins||(this.sortedBins=this.aggregatedBins.sort((a,o)=>U(a.value,o.value))),!this.sortedBins.length)return[];const n=this._percentileToIndex([e,s]);return this._getScaleDomain(t,n)}_getScaleDomain(t,[e,s]){const n=this.sortedBins;switch(t){case"quantize":case"linear":return[n[e].value,n[s].value];case"quantile":return Wt(n.slice(e,s+1),a=>a.value);case"ordinal":return Yt(n,a=>a.value);default:return[n[e].value,n[s].value]}}}function j(){}const W=["getBins","getDomain","getScaleFunc"],Y=[{key:"fillColor",accessor:"getFillColor",pickingInfo:"colorValue",getBins:{triggers:{value:{prop:"getColorValue",updateTrigger:"getColorValue"},weight:{prop:"getColorWeight",updateTrigger:"getColorWeight"},aggregation:{prop:"colorAggregation"},filterData:{prop:"_filterData",updateTrigger:"_filterData"}}},getDomain:{triggers:{lowerPercentile:{prop:"lowerPercentile"},upperPercentile:{prop:"upperPercentile"},scaleType:{prop:"colorScaleType"}}},getScaleFunc:{triggers:{domain:{prop:"colorDomain"},range:{prop:"colorRange"}},onSet:{props:"onSetColorDomain"}},nullValue:[0,0,0,0]},{key:"elevation",accessor:"getElevation",pickingInfo:"elevationValue",getBins:{triggers:{value:{prop:"getElevationValue",updateTrigger:"getElevationValue"},weight:{prop:"getElevationWeight",updateTrigger:"getElevationWeight"},aggregation:{prop:"elevationAggregation"},filterData:{prop:"_filterData",updateTrigger:"_filterData"}}},getDomain:{triggers:{lowerPercentile:{prop:"elevationLowerPercentile"},upperPercentile:{prop:"elevationUpperPercentile"},scaleType:{prop:"elevationScaleType"}}},getScaleFunc:{triggers:{domain:{prop:"elevationDomain"},range:{prop:"elevationRange"}},onSet:{props:"onSetElevationDomain"}},nullValue:-1}],Kt=i=>i.cellSize;class Jt{constructor(t){this.state={layerData:{},dimensions:{}},this.changeFlags={},this.dimensionUpdaters={},this._getCellSize=t.getCellSize||Kt,this._getAggregator=t.getAggregator,this._addDimension(t.dimensions||Y)}static defaultDimensions(){return Y}updateState(t,e){const{oldProps:s,props:n,changeFlags:a}=t;this.updateGetValueFuncs(s,n,a);const o=this.needsReProjectPoints(s,n,a);let r=!1;return a.dataChanged||o?(this.getAggregatedData(n,e),r=!0):((this.getDimensionChanges(s,n,a)||[]).forEach(l=>typeof l=="function"&&l()),r=!0),this.setState({aggregationDirty:r}),this.state}setState(t){this.state={...this.state,...t}}setDimensionState(t,e){this.setState({dimensions:{...this.state.dimensions,[t]:{...this.state.dimensions[t],...e}}})}normalizeResult(t={}){return t.hexagons?{data:t.hexagons,...t}:t.layerData?{data:t.layerData,...t}:t}getAggregatedData(t,e){const n=this._getAggregator(t)(t,e);this.setState({layerData:this.normalizeResult(n)}),this.changeFlags={layerData:!0},this.getSortedBins(t)}updateGetValueFuncs(t,e,s){for(const n in this.dimensionUpdaters){const{value:a,weight:o,aggregation:r}=this.dimensionUpdaters[n].getBins.triggers;let u=e[a.prop];this.needUpdateDimensionStep(this.dimensionUpdaters[n].getBins,t,e,s)&&(u?u=kt(u,{data:e.data}):u=_t(e[r.prop],e[o.prop],{data:e.data})),u&&this.setDimensionState(n,{getValue:u})}}needsReProjectPoints(t,e,s){return this._getCellSize(t)!==this._getCellSize(e)||this._getAggregator(t)!==this._getAggregator(e)||s.updateTriggersChanged&&(s.updateTriggersChanged.all||s.updateTriggersChanged.getPosition)}addDimension(t){this._addDimension(t)}_addDimension(t=[]){t.forEach(e=>{const{key:s}=e;this.dimensionUpdaters[s]=this.getDimensionUpdaters(e),this.state.dimensions[s]={getValue:null,domain:null,sortedBins:null,scaleFunc:j}})}getDimensionUpdaters({key:t,accessor:e,pickingInfo:s,getBins:n,getDomain:a,getScaleFunc:o,nullValue:r}){return{key:t,accessor:e,pickingInfo:s,getBins:{updater:this.getDimensionSortedBins,...n},getDomain:{updater:this.getDimensionValueDomain,...a},getScaleFunc:{updater:this.getDimensionScale,...o},attributeAccessor:this.getSubLayerDimensionAttribute(t,r)}}needUpdateDimensionStep(t,e,s,n){return Object.values(t.triggers).some(a=>a.updateTrigger?n.dataChanged||n.updateTriggersChanged&&(n.updateTriggersChanged.all||n.updateTriggersChanged[a.updateTrigger]):e[a.prop]!==s[a.prop])}getDimensionChanges(t,e,s){const n=[];for(const a in this.dimensionUpdaters){const o=W.find(r=>this.needUpdateDimensionStep(this.dimensionUpdaters[a][r],t,e,s));o&&n.push(this.dimensionUpdaters[a][o].updater.bind(this,e,this.dimensionUpdaters[a]))}return n.length?n:null}getUpdateTriggers(t){const e=t.updateTriggers||{},s={};for(const n in this.dimensionUpdaters){const{accessor:a}=this.dimensionUpdaters[n];s[a]={},W.forEach(o=>{Object.values(this.dimensionUpdaters[n][o].triggers).forEach(({prop:r,updateTrigger:u})=>{if(u){const l=e[u];typeof l=="object"&&!Array.isArray(l)?Object.assign(s[a],l):l!==void 0&&(s[a][r]=l)}else s[a][r]=t[r]})})}return s}getSortedBins(t){for(const e in this.dimensionUpdaters)this.getDimensionSortedBins(t,this.dimensionUpdaters[e])}getDimensionSortedBins(t,e){const{key:s}=e,{getValue:n}=this.state.dimensions[s],a=new Qt(this.state.layerData.data||[],{getValue:n,filterData:t._filterData});this.setDimensionState(s,{sortedBins:a}),this.getDimensionValueDomain(t,e)}getDimensionValueDomain(t,e){const{getDomain:s,key:n}=e,{triggers:{lowerPercentile:a,upperPercentile:o,scaleType:r}}=s,u=this.state.dimensions[n].sortedBins.getValueDomainByScale(t[r.prop],[t[a.prop],t[o.prop]]);this.setDimensionState(n,{valueDomain:u}),this.getDimensionScale(t,e)}getDimensionScale(t,e){const{key:s,getScaleFunc:n,getDomain:a}=e,{domain:o,range:r}=n.triggers,{scaleType:u}=a.triggers,{onSet:l}=n,h=t[r.prop],c=t[o.prop]||this.state.dimensions[s].valueDomain,y=qt(u&&t[u.prop])(c,h);typeof l=="object"&&typeof t[l.props]=="function"&&t[l.props](y.domain()),this.setDimensionState(s,{scaleFunc:y})}getSubLayerDimensionAttribute(t,e){return s=>{const{sortedBins:n,scaleFunc:a}=this.state.dimensions[t],o=n.binMap[s.index];if(o&&o.counts===0)return e;const r=o&&o.value,u=a.domain();return r>=u[0]&&r<=u[u.length-1]?a(r):e}}getSubLayerAccessors(t){const e={};for(const s in this.dimensionUpdaters){const{accessor:n}=this.dimensionUpdaters[s];e[n]=this.getSubLayerDimensionAttribute(t,s)}return e}getPickingInfo({info:t}){const e=t.picked&&t.index>-1;let s=null;if(e){const n=this.state.layerData.data[t.index],a={};for(const o in this.dimensionUpdaters){const{pickingInfo:r}=this.dimensionUpdaters[o],{sortedBins:u}=this.state.dimensions[o],l=u.binMap[n.index]&&u.binMap[n.index].value;a[r]=l}s=Object.assign(a,n,{points:n.filteredPoints||n.points})}return t.picked=!!s,t.object=s,t}getAccessor(t){return this.dimensionUpdaters.hasOwnProperty(t)?this.dimensionUpdaters[t].attributeAccessor:j}}var M=Math.PI/3,te=[0,M,2*M,3*M,4*M,5*M];function ee(i){return i[0]}function ie(i){return i[1]}function se(){var i=0,t=0,e=1,s=1,n=ee,a=ie,o,r,u;function l(c){var d={},y=[],p,m=c.length;for(p=0;p<m;++p)if(!(isNaN(S=+n.call(null,f=c[p],p,c))||isNaN(v=+a.call(null,f,p,c)))){var f,S,v,x=Math.round(v=v/u),C=Math.round(S=S/r-(x&1)/2),T=v-x;if(Math.abs(T)*3>1){var g=S-C,D=C+(S<C?-1:1)/2,_=x+(v<x?-1:1),F=S-D,$=v-_;g*g+T*T>F*F+$*$&&(C=D+(x&1?1:-1)/2,x=_)}var B=C+"-"+x,P=d[B];P?P.push(f):(y.push(P=d[B]=[f]),P.x=(C+(x&1)/2)*r,P.y=x*u)}return y}function h(c){var d=0,y=0;return te.map(function(p){var m=Math.sin(p)*c,f=-Math.cos(p)*c,S=m-d,v=f-y;return d=m,y=f,[S,v]})}return l.hexagon=function(c){return"m"+h(c==null?o:+c).join("l")+"z"},l.centers=function(){for(var c=[],d=Math.round(t/u),y=Math.round(i/r),p=d*u;p<s+o;p+=u,++d)for(var m=y*r+(d&1)*r/2;m<e+r/2;m+=r)c.push([m,p]);return c},l.mesh=function(){var c=h(o).slice(0,4).join("l");return l.centers().map(function(d){return"M"+d+"m"+c}).join("")},l.x=function(c){return arguments.length?(n=c,l):n},l.y=function(c){return arguments.length?(a=c,l):a},l.radius=function(c){return arguments.length?(o=+c,r=o*2*Math.sin(M),u=o*1.5,l):o},l.size=function(c){return arguments.length?(i=t=0,e=+c[0],s=+c[1],l):[e-i,s-t]},l.extent=function(c){return arguments.length?(i=+c[0][0],t=+c[0][1],e=+c[1][0],s=+c[1][1],l):[[i,t],[e,s]]},l.radius(1)}function ne(i,t){const{data:e,radius:s}=i,{viewport:n,attributes:a}=t,o=e.length?ae(e,t):null,r=oe(s,n,o),u=[],{iterable:l,objectInfo:h}=pt(e),c=a.positions.value,{size:d}=a.positions.getAccessor();for(const m of l){h.index++;const f=h.index*d,S=[c[f],c[f+1]];Number.isFinite(S[0])&&Number.isFinite(S[1])?u.push({screenCoord:n.projectFlat(S),source:m,index:h.index}):I.warn("HexagonLayer: invalid position")()}return{hexagons:se().radius(r).x(m=>m.screenCoord[0]).y(m=>m.screenCoord[1])(u).map((m,f)=>({position:n.unprojectFlat([m.x,m.y]),points:m,index:f})),radiusCommon:r}}function ae(i,t){const{attributes:e}=t,s=e.positions.value,{size:n}=e.positions.getAccessor();let a=1/0,o=1/0,r=-1/0,u=-1/0,l;for(l=0;l<n*i.length;l+=n){const h=s[l],c=s[l+1];Number.isFinite(h)&&Number.isFinite(c)&&(a=Math.min(h,a),r=Math.max(h,r),o=Math.min(c,o),u=Math.max(c,u))}return[a,o,r,u].every(Number.isFinite)?[(a+r)/2,(o+u)/2]:null}function oe(i,t,e){const{unitsPerMeter:s}=t.getDistanceScales(e);return i*s[0]}function G(){}const re={colorDomain:null,colorRange:Ft,getColorValue:{type:"accessor",value:null},getColorWeight:{type:"accessor",value:1},colorAggregation:"SUM",lowerPercentile:{type:"number",value:0,min:0,max:100},upperPercentile:{type:"number",value:100,min:0,max:100},colorScaleType:"quantize",onSetColorDomain:G,elevationDomain:null,elevationRange:[0,1e3],getElevationValue:{type:"accessor",value:null},getElevationWeight:{type:"accessor",value:1},elevationAggregation:"SUM",elevationLowerPercentile:{type:"number",value:0,min:0,max:100},elevationUpperPercentile:{type:"number",value:100,min:0,max:100},elevationScale:{type:"number",min:0,value:1},elevationScaleType:"linear",onSetElevationDomain:G,radius:{type:"number",value:1e3,min:1},coverage:{type:"number",min:0,max:1,value:1},extruded:!1,hexagonAggregator:ne,getPosition:{type:"accessor",value:i=>i.position},material:!0,_filterData:{type:"function",value:null,optional:!0}};class L extends X{constructor(...t){super(...t),b(this,"state",void 0)}initializeState(){const t=new Jt({getAggregator:s=>s.hexagonAggregator,getCellSize:s=>s.radius});this.state={cpuAggregator:t,aggregatorState:t.state,vertices:null},this.getAttributeManager().add({positions:{size:3,type:5130,accessor:"getPosition"}})}updateState(t){if(super.updateState(t),t.changeFlags.propsOrDataChanged){const e=this.state.cpuAggregator.updateState(t,{viewport:this.context.viewport,attributes:this.getAttributes()});if(this.state.aggregatorState.layerData!==e.layerData){const{hexagonVertices:s}=e.layerData||{};this.setState({vertices:s&&this.convertLatLngToMeterOffset(s)})}this.setState({aggregatorState:e})}}convertLatLngToMeterOffset(t){const{viewport:e}=this.context;if(Array.isArray(t)&&t.length===6){const s=t[0],n=t[3],a=[(s[0]+n[0])/2,(s[1]+n[1])/2],o=e.projectFlat(a),{metersPerUnit:r}=e.getDistanceScales(a);return t.map(l=>{const h=e.projectFlat(l);return[(h[0]-o[0])*r[0],(h[1]-o[1])*r[1]]})}return I.error("HexagonLayer: hexagonVertices needs to be an array of 6 points")(),null}getPickingInfo({info:t}){return this.state.cpuAggregator.getPickingInfo({info:t})}_onGetSublayerColor(t){return this.state.cpuAggregator.getAccessor("fillColor")(t)}_onGetSublayerElevation(t){return this.state.cpuAggregator.getAccessor("elevation")(t)}_getSublayerUpdateTriggers(){return this.state.cpuAggregator.getUpdateTriggers(this.props)}renderLayers(){const{elevationScale:t,extruded:e,coverage:s,material:n,transitions:a}=this.props,{aggregatorState:o,vertices:r}=this.state,u=this.getSubLayerClass("hexagon-cell",xt),l=this._getSublayerUpdateTriggers(),h=r?{vertices:r,radius:1}:{radius:o.layerData.radiusCommon||1,radiusUnits:"common",angle:90};return new u({...h,diskResolution:6,elevationScale:t,extruded:e,coverage:s,material:n,getFillColor:this._onGetSublayerColor.bind(this),getElevation:this._onGetSublayerElevation.bind(this),transitions:a&&{getFillColor:a.getColorValue||a.getColorWeight,getElevation:a.getElevationValue||a.getElevationWeight}},this.getSubLayerProps({id:"hexagon-cell",updateTriggers:l}),{data:o.layerData.data})}}b(L,"layerName","HexagonLayer");b(L,"defaultProps",re);const le={ambient:.64,diffuse:.6,shininess:32,specularColor:[51,51,51]};function ce({viewId:i=0,colorRamp:t="chlorophyll",coverage:e=.65,dark:s=!1,data:n={raw:new Float32Array(0),length:0},extrude:a=!0,highlights:o=[],mapIsIndependent:r=!1,maxHeight:u=200,metric:l="Count",radius:h=100,selectedHexStats:c={rows:0,numHexagons:0,selectedHexagonIds:[]},upperPercentile:d=100,onClick:y={}}){const[p,m]=E.useState(w.state.viewState),f=E.useMemo(()=>{let g=[];return o.length?g=o.map(D=>D[1]):n.length?g={length:n.length,attributes:{getPosition:{value:n.raw,size:2}}}:g=[],g},[n,o]);A[i]=()=>{m(w.state.viewState)};function S(g){g.latitude&&(g.center||(g.center=[0,0]),g.center[0]=g.longitude,g.center[1]=g.latitude,m(g),r||w.commit("setMapCamera",g))}const v=St({colormap:t,nshades:10,format:"rba",alpha:1}).map(g=>[g[0],g[1],g[2]]);function x({object:g}){if(!g||!g.position||!g.position.length)return null;const D=g.position[1],_=g.position[0],F=g.points.length;return{html:`        <b>${o.length?"Count":l}: ${F} </b><br/>
        ${Number.isFinite(D)?D.toFixed(4):""} / ${Number.isFinite(_)?_.toFixed(4):""}
      `,style:s?{color:"#ccc",backgroundColor:"#2a3c4f"}:{color:"#223",backgroundColor:"white"}}}function C(g,D){y(g,D)}const T=[new vt({id:"arc-layer",data:o,getSourcePosition:g=>g[0],getTargetPosition:g=>g[1],pickable:!1,opacity:.4,getHeight:0,getWidth:1,getSourceColor:s?[144,96,128]:[192,192,240],getTargetColor:s?[144,96,128]:[192,192,240]}),new L({id:"hexlayer",data:f,getPosition:o.length?g=>g:null,colorRange:s?v.slice(1):v.reverse().slice(1),coverage:e,autoHighlight:!0,elevationRange:[0,u],elevationScale:n&&n.length?50:0,extruded:a,selectedHexStats:c,pickable:!0,opacity:.7,radius:h,upperPercentile:d,material:le,transitions:{elevationScale:{type:"interpolation",duration:1e3},opacity:{type:"interpolation",duration:200}}})];return R.createElement(ft,{layers:T,controller:!0,useDevicePixels:!1,viewState:p,getTooltip:x,onClick:C,onViewStateChange:g=>S(g.viewState)},R.createElement(yt,{mapStyle:w.getters.mapStyle,preventStyleDiffing:!0,mapboxApiAccessToken:it}))}const ue={messages:{en:{loading:"Loading data...",sorting:"Sorting into bins...",aggregate:"Summary",maxHeight:"3D Height",showDetails:"Show Details",selection:"Selection",areas:"Areas",count:"Count"},de:{loading:"Dateien laden...",sorting:"Sortieren...",aggregate:"Daten",maxHeight:"3-D Höhe",showDetails:"Details anzeigen",selection:"Ausgewählt",areas:"Orte",count:"Anzahl"}}},ge=st({name:"XyHexagonsPlugin",i18n:ue,components:{CollapsiblePanel:ct,DrawingTool:ut,XyHexDeckMap:ce,ToggleButton:ot.ToggleButton,ZoomButtons:gt},props:{root:{type:String,required:!0},subfolder:{type:String,required:!0},yamlConfig:String,config:Object,thumbnail:Boolean},data:()=>{const i=["bathymetry","par","chlorophyll","magma"];return{id:`id-${Math.floor(1e12*Math.random())}`,standaloneYAMLconfig:{title:"",description:"",file:"",projection:"",thumbnail:"",aggregations:{},radius:250,maxHeight:0,center:null,zoom:9,mapIsIndependent:!1},YAMLrequirementsXY:{file:"",aggregations:{}},colorRamps:i,buttonColors:["#5E8AAE","#BF7230","#269367","#9C439C"],aggregations:{},columnLookup:[],gzipWorker:null,colorRamp:i[0],globalState:w.state,vizDetails:{title:"",description:"",file:"",projection:"",thumbnail:"",aggregations:{},radius:250,maxHeight:0,center:null,zoom:9},myState:{statusMessage:"",subfolder:"",yamlConfig:"",thumbnail:!1},rowCache:{},requests:{raw:new Float32Array(0),length:0},highlightedTrips:[],searchTerm:"",searchEnabled:!1,isLoaded:!1,activeAggregation:"",isHighlightingZone:!1,multiSelectedHexagons:{},thumbnailUrl:"url('assets/thumbnail.jpg') no-repeat;",hexStats:null,resizer:null}},computed:{fileApi(){return new lt(this.fileSystem,w)},fileSystem(){const i=this.$store.state.svnProjects.filter(t=>t.slug===this.root);if(i.length===0)throw console.log("no such project"),Error;return i[0]},urlThumbnail(){return this.thumbnailUrl},buttonLabel(){const[i,t]=this.activeAggregation.split("~");return this.aggregations[i][t].title},extrudeTowers(){return this.vizDetails.maxHeight>0},mapProps(){return{viewId:this.id,colorRamp:this.colorRamp,coverage:.65,dark:this.$store.state.isDarkMode,data:this.requests,extrude:this.extrudeTowers,highlights:this.highlightedTrips,mapIsIndependent:this.vizDetails.mapIsIndependent,maxHeight:this.vizDetails.maxHeight,metric:this.buttonLabel,radius:this.vizDetails.radius,selectedHexStats:this.hexStats,upperPercentile:100,onClick:this.handleClick}},textColor(){const i={text:"#3498db",bg:"#eeeef480"},t={text:"white",bg:"#181518aa"};return this.$store.state.colorScheme===nt.DarkMode?t:i}},watch:{extrudeTowers(){this.extrudeTowers&&this.globalState.viewState.pitch==0&&w.commit("setMapCamera",Object.assign({},this.globalState.viewState,{pitch:10}))},"$store.state.viewState"(){this.vizDetails.mapIsIndependent||A[this.id]&&A[this.id]()}},methods:{handleClick(i,t){console.log({target:i,event:t}),i.layer?this.handleHexClick(i,t):this.handleEmptyClick()},handleEmptyClick(){this.flipViewToShowInvertedData({})},handleHexClick(i,t){if(!t.srcEvent.shiftKey){this.multiSelectedHexagons={},this.hexStats=null,this.flipViewToShowInvertedData(i);return}const e=i?.object?.index;e!==void 0&&(e in this.multiSelectedHexagons?delete this.multiSelectedHexagons[e]:this.multiSelectedHexagons[e]=i.object.points,this.hexStats=this.selectedHexagonStatistics())},flipViewToShowInvertedData(i){this.isHighlightingZone?this.isHighlightingZone=!1:i.object?this.isHighlightingZone=!0:this.isHighlightingZone=!1;const t=this.activeAggregation.split("~");let e=0,s=0;if(!this.isHighlightingZone)this.hexStats=null,this.multiSelectedHexagons={},this.handleOrigDest(t[0],parseInt(t[1]));else{e=parseInt(t[1]),s=e%2?e-1:e+1;const n=`${t[0]}${e}`,a=this.rowCache[n],o=`${t[0]}${s}`,r=this.rowCache[o],u=[];for(const l of i.object.points){const h=l.index*2,c=[r.raw[h],r.raw[h+1]];u.push([[a.raw[h],a.raw[h+1]],c]),this.highlightedTrips=u}this.hexStats&&(this.hexStats.selectedHexagonIds=[]),this.multiSelectedHexagons={},this.colorRamp=this.colorRamps[s]}this.isHighlightingZone||(this.highlightedTrips=[])},async handleOrigDest(i,t){const e=i+t;this.hexStats=null,this.multiSelectedHexagons={},this.highlightedTrips=[],this.activeAggregation=`${i}~${t}`,this.requests=this.rowCache[e],this.colorRamp=this.colorRamps[t]},async solveProjection(){if(!this.thumbnail){console.log("WHAT PROJECTION:");try{const i=await this.fileApi.getFileText(this.myState.subfolder+"/"+this.myState.yamlConfig);this.vizDetails=O.parse(i)}catch(i){console.error(i)}}},async getVizDetails(){if(this.config){this.validateYAML(),this.vizDetails=Object.assign({},this.config),this.setRadiusAndHeight();return}new RegExp(".*(yml|yaml)$").test(this.myState.yamlConfig)?await this.loadStandaloneYAMLConfig():this.loadOutputTripsConfig()},loadOutputTripsConfig(){let i="EPSG:31468";this.myState.thumbnail||(i=prompt('Enter projection: e.g. "EPSG:31468"')||"EPSG:31468",parseInt(i,10)&&(i="EPSG:"+i)),this.vizDetails={title:"Output Trips",description:this.myState.yamlConfig,file:this.myState.yamlConfig,projection:i,aggregations:{"Trip Summary":[{title:"Origins",x:"start_x",y:"start_y"},{title:"Destinations",x:"end_x",y:"end_y"}]},radius:this.vizDetails.radius,maxHeight:this.vizDetails.maxHeight,center:this.vizDetails.center,zoom:this.vizDetails.zoom},this.$emit("title",this.vizDetails.title)},setRadiusAndHeight(){this.vizDetails.radius||V.set(this.vizDetails,"radius",250),this.vizDetails.maxHeight||V.set(this.vizDetails,"maxHeight",0)},async loadStandaloneYAMLConfig(){try{const i=this.myState.yamlConfig.indexOf("/")>-1?this.myState.yamlConfig:this.myState.subfolder+"/"+this.myState.yamlConfig,t=await this.fileApi.getFileText(i);this.standaloneYAMLconfig=Object.assign({},O.parse(t)),this.validateYAML(),this.setVizDetails()}catch(i){console.error("failed",""+i),this.$emit("error",`File not found: ${this.myState.subfolder}/${this.myState.yamlConfig}`)}},validateYAML(){const i=new RegExp(".*(yml|yaml)$").test(this.myState.yamlConfig);let t={};i?(console.log("has yaml"),t=this.standaloneYAMLconfig):(console.log("no yaml"),t=this.config);for(const e in this.YAMLrequirementsXY)e in t||this.$emit("error",{type:k.ERROR,msg:`XYHexagon: ${this.yamlConfig}: missing required key: ${e}`,desc:`XYHexagon requires ${Object.keys(this.YAMLrequirementsXY)}`});t.radius==0&&this.$emit("error",{type:k.WARNING,msg:"Radius set to zero",desc:"Radius can not be zero, preset value used instead. "}),(t.zoom<5||t.zoom>20)&&this.$emit("error",{type:k.WARNING,msg:"Zoom is out of the recommended range ",desc:"Zoom levels should be between 5 and 20. "})},setVizDetails(){this.vizDetails=Object.assign({},this.vizDetails,this.standaloneYAMLconfig),this.setRadiusAndHeight();const i=this.vizDetails.title?this.vizDetails.title:"Hex Aggregation";this.$emit("title",i)},async buildThumbnail(){if(this.thumbnail&&this.vizDetails.thumbnail)try{const t=await(await this.fileApi.getFileBlob(this.myState.subfolder+"/"+this.vizDetails.thumbnail)).arrayBuffer(),e=rt.arrayBufferToBase64(t);e&&(this.thumbnailUrl=`center / cover no-repeat url(data:image/png;base64,${e})`)}catch(i){console.error(i)}},handleShowSelectionButton(){const i=Object.values(this.multiSelectedHexagons);let t=[];i.map(s=>t=t.concat(s));const e={object:{points:t}};this.flipViewToShowInvertedData(e)},selectedHexagonStatistics(){const i=Object.keys(this.multiSelectedHexagons).map(s=>parseInt(s));return i.length?{rows:Object.values(this.multiSelectedHexagons).reduce((s,n)=>s+n.length,0),numHexagons:i.length,selectedHexagonIds:i}:null},async setMapCenter(){const i=Object.values(this.rowCache)[0].raw;if(this.vizDetails.center){typeof this.vizDetails.center=="string"&&(this.vizDetails.center=this.vizDetails.center.split(",").map(Number));const r={longitude:this.vizDetails.center[0],latitude:this.vizDetails.center[1],bearing:0,pitch:0,zoom:this.vizDetails.zoom||10,jump:!1};A[this.id]&&A[this.id](r),this.$store.commit("setMapCamera",Object.assign({},r));return}if(!i.length)return;let t=0,e=0,s=0;const n=i.length/2,a=512;for(let r=0;r<n;r+=a)e+=i[r*2],s+=i[r*2+1],t++;e=e/t,s=s/t;const o=this.$store.state.viewState;e&&s&&this.$store.commit("setMapCamera",{longitude:e,latitude:s,bearing:o.bearing,pitch:o.pitch,zoom:this.vizDetails.zoom||o.zoom,jump:!1})},setupLogoMover(){this.resizer=new ResizeObserver(this.moveLogo);const i=document.getElementById(`id-${this.id}`);this.resizer.observe(i)},moveLogo(){const i=document.getElementById(`id-${this.id}`),t=i?.querySelector(".mapboxgl-ctrl-bottom-left");if(t){const e=i.clientWidth>640?"280px":"36px";t.style.right=e}},async parseCSVFile(i){this.myState.statusMessage="Loading file...",this.gzipWorker=new Dt,this.gzipWorker.onmessage=async t=>{if(t.data.status)this.myState.statusMessage=t.data.status;else if(t.data.error)this.myState.statusMessage=t.data.error,this.$emit("error",{type:k.ERROR,msg:"Loading Error",desc:"Error loading: ${this.myState.subfolder}/${this.vizDetails.file}"});else{const{rowCache:e,columnLookup:s}=t.data;this.gzipWorker&&this.gzipWorker.terminate(),this.dataIsLoaded({rowCache:e,columnLookup:s})}},this.gzipWorker.postMessage({filepath:i,fileSystem:this.fileSystem,aggregations:this.vizDetails.aggregations,projection:this.vizDetails.projection})},dataIsLoaded({rowCache:i,columnLookup:t}){this.columnLookup=t,this.rowCache=i;const e=this.activeAggregation.replaceAll("~","");this.requests=this.rowCache[e],this.setMapCenter(),this.moveLogo(),this.myState.statusMessage=""},async loadFiles(){let i=[];if(!this.fileApi)return{dataArray:i};try{let t=`${this.myState.subfolder}/${this.vizDetails.file}`;await this.parseCSVFile(t)}catch(t){console.error(t),this.myState.statusMessage=""+t,this.$emit("error",{type:k.ERROR,msg:"Loading/Parsing Error",desc:"Error loading/parsing: ${this.myState.subfolder}/${this.vizDetails.file}"})}}},async mounted(){this.$store.commit("setFullScreen",!this.thumbnail),this.myState.thumbnail=this.thumbnail,this.myState.yamlConfig=this.yamlConfig||"",this.myState.subfolder=this.subfolder,await this.getVizDetails(),!this.thumbnail&&(this.setupLogoMover(),this.myState.statusMessage=`${this.$i18n.t("loading")}`,this.aggregations=this.vizDetails.aggregations,await this.loadFiles(),this.buildThumbnail(),this.isLoaded=!0,this.handleOrigDest(Object.keys(this.aggregations)[0],0))},beforeDestroy(){this.resizer?.disconnect(),A[this.id]=void 0,delete A[this.id];try{this.gzipWorker&&this.gzipWorker.terminate()}catch(i){console.warn(i)}this.$store.commit("setFullScreen",!1)}});var he=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"xy-hexagons",class:{"hide-thumbnail":!t.thumbnail},attrs:{oncontextmenu:"return false",id:`id-${t.id}`}},[!t.thumbnail&&t.isLoaded?e("xy-hex-deck-map",t._b({staticClass:"hex-layer"},"xy-hex-deck-map",t.mapProps,!1)):t._e(),t.thumbnail?t._e():e("zoom-buttons"),t.isLoaded&&!t.thumbnail&&t.vizDetails.title?e("div",{staticClass:"left-side"},[e("collapsible-panel",{attrs:{direction:"left",locked:!0}},[t.hexStats?e("div",{staticClass:"panel-items",staticStyle:{color:"#c0f"}},[e("p",{staticClass:"big",staticStyle:{"margin-top":"2rem"}},[t._v(t._s(t.$t("selection"))+":")]),e("h3",{staticStyle:{"margin-top":"-1rem"}},[t._v(t._s(t.$t("areas"))+": "+t._s(t.hexStats.numHexagons)+", "+t._s(t.$t("count"))+": "+t._s(t.hexStats.rows))]),e("button",{staticClass:"button",staticStyle:{color:"#c0f","border-color":"#c0f"},on:{click:t.handleShowSelectionButton}},[t._v(t._s(t.$t("showDetails")))])]):t._e()])],1):t._e(),t.isLoaded&&!t.thumbnail&&!t.myState.statusMessage?e("div",{staticClass:"control-panel"},[t._l(Object.keys(t.aggregations),function(s){return e("div",{key:s,staticClass:"panel-item"},[e("p",{staticClass:"ui-label"},[t._v(t._s(s))]),t._l(t.aggregations[s],function(n,a){return e("button",{key:a,staticClass:"button is-small aggregation-button",style:{"margin-bottom":"0.25rem",color:t.activeAggregation===`${s}~${a}`?"white":t.buttonColors[a],border:`1px solid ${t.buttonColors[a]}`,"border-right":`0.4rem solid ${t.buttonColors[a]}`,"border-radius":"4px","background-color":t.activeAggregation===`${s}~${a}`?t.buttonColors[a]:t.$store.state.isDarkMode?"#333":"white"},on:{click:function(o){return t.handleOrigDest(s,a)}}},[t._v(t._s(n.title))])})],2)}),e("div",{staticClass:"panel-item"},[e("p",{staticClass:"ui-label"},[t._v(t._s(t.$t("maxHeight"))+": "+t._s(t.vizDetails.maxHeight))]),e("b-slider",{staticClass:"ui-slider",attrs:{size:"is-small",min:0,max:250,step:5,duration:0,dotSize:12,tooltip:!1},model:{value:t.vizDetails.maxHeight,callback:function(s){t.$set(t.vizDetails,"maxHeight",s)},expression:"vizDetails.maxHeight"}}),e("p",{staticClass:"ui-label"},[t._v("Hex Radius: "+t._s(t.vizDetails.radius))]),e("b-slider",{staticClass:"ui-slider",attrs:{size:"is-small",min:50,max:1e3,step:5,duration:0,dotSize:12,tooltip:!1},model:{value:t.vizDetails.radius,callback:function(s){t.$set(t.vizDetails,"radius",s)},expression:"vizDetails.radius"}})],1)],2):t._e(),!t.thumbnail&&t.myState.statusMessage?e("div",{staticClass:"message"},[e("p",{staticClass:"status-message"},[t._v(t._s(t.myState.statusMessage))])]):t._e()],1)},de=[],me=at(ge,he,de,!1,null,"079e1cbe");const Ie=me.exports;export{Ie as default};
