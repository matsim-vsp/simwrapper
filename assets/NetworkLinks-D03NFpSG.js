import{d as M,n as N,t as F,r as q,g as b,R as D,j,M as G,C as x,h as w}from"./index-DGQsVAfD.js";import{d as H}from"./index-SqcbaD6o.js";import{r as Z}from"./index-U4JwWPC0.js";import{Y as J}from"./index-BVnqda6I.js";import{d as B}from"./index-CMnP4IGC.js";import{L as X,O as Q}from"./LineOffsetLayer-BIcP9uoV.js";import{D as tt,S as et,C as st}from"./set-rtl-text-plugin-DVED14k1.js";import{b as it,a as at}from"./util-Ddp4cgjD.js";import{H as ot}from"./HTTPFileSystem-CxYoAruU.js";import{D as nt}from"./DrawingTool-Dm5rdZYe.js";import{V as lt}from"./VizConfigurator-9UB-QAlu.js";import{Z as rt}from"./ZoomButtons-F-Dsg5My.js";import{L as ct}from"./LegendStore-CGgeb9zL.js";import{D as ht}from"./DashboardDataManager-Q28P0lqH.js";import{r as dt}from"./color-DZRtpOAM.js";import{o as mt,t as ut}from"./threshold-DxQAdYxA.js";import"./line-layer-D5zlMx41.js";import"./extends-CCbyfPlC.js";import"./fxp-Bz04SSVe.js";import"./geojson-layer-Bibs1w_z.js";import"./text-layer-CTCcgq6F.js";import"./path-layer-3w6E4Ivj.js";import"./cut-by-mercator-bounds-0mGOU8IK.js";import"./solid-polygon-layer-a7ucCWBg.js";import"./lodash-DWaFq7-a.js";import"./ColorsAndWidths-D2LQlJC5.js";import"./cubehelix-Bg3rkAQA.js";import"./rainbow-Dz4seJAz.js";import"./LegendBox-B6HeC3gA.js";import"./avro-Dd9UqmeZ.js";import"./RoadNetworkLoader.worker-BD_HkIqE.js";import"./Coords-D0FA6ZV5.js";import"./group-DobYzF2-.js";import"./index-_doEQLKC.js";function ft(e,t){if(e===t)return!0;if(!e||!t)return!1;var s=Object.keys(e),i=Object.keys(t),a=s.length;if(i.length!==a)return!1;for(var o=0;o<a;o++){var n=s[o];if(e[n]!==t[n]||!Object.prototype.hasOwnProperty.call(t,n))return!1}return!0}const vt=M({name:"TimeSliderLinksGl",props:{useRange:Boolean,stops:{type:Array,required:!0},dropdownValue:String},data(){return{sliderValue:0}},watch:{useRange(e){e?this.sliderValue=[this.stops[0],this.stops[this.stops.length-1]]:this.sliderValue=[this.stops[0]],console.log("changed to: "+this.sliderValue)},sliderValue(e){this.$emit("change",e)}},mounted(){}});var gt=function(){var t=this,s=t._self._c;return t._self._setupProxy,s("div",{staticClass:"time-slider-main-content"},[s("b-slider",{attrs:{max:t.stops.length-1,tooltip:!1},model:{value:t.sliderValue,callback:function(i){t.sliderValue=i},expression:"sliderValue"}},t._l(t.stops,function(i,a){return s("b-slider-tick",{key:a,attrs:{value:a}})}),1)],1)},pt=[],yt=N(vt,gt,pt,!1,null,"e30c6c5e");const wt=yt.exports,Dt={messages:{en:{selectColumn:"Data:",loading:"Loading...",bandwidths:"Widths: 1 pixel =:",timeOfDay:"",colors:"Colors"},de:{selectColumn:"Datenmengen:",loading:"Laden...",bandwidths:"Linienbreiten: 1 pixel =:",timeOfDay:"",colors:"Farben"}}},bt=M({name:"SelectorPanel",i18n:Dt,components:{TimeSlider:wt},props:{csvData:{type:Object,required:!0},scaleWidth:{type:Number,required:!0},showDiffs:{type:Boolean,required:!0},vizDetails:{type:Object,required:!0}},data(){return{isButtonActive:!1,isColorButtonActive:!1,scaleWidthValue:"",debounceScale:{},handleTimeSliderChanged:{}}},computed:{activeColumn(){return this.csvData.activeColumn},buttonTitle(){return this.activeColumn?this.activeColumn:""+this.$i18n.t("loading")}},watch:{scaleWidth(){this.scaleWidthValue=""+this.scaleWidth},scaleWidthValue(){isNaN(parseFloat(this.scaleWidthValue))||this.debounceScale()}},methods:{getColumns(){return Object.values(this.csvData.dataTable).slice(1).filter(t=>t.name&&t.type!==F.LOOKUP).map(t=>t.name)},gotNewScale(){this.$emit("scale",parseFloat(this.scaleWidthValue))},changeTimeSlider(e){e.length&&e.length===1&&(e=e[0]),this.$emit("slider",{dataset:this.csvData,column:this.getColumns()[e]})},handleClickDropdown(){this.isButtonActive=!this.isButtonActive},handleColorRamp(e){console.log(e),this.isColorButtonActive=!1,this.$emit("colors",e)},clearDropdown(){console.log("boop"),this.isButtonActive=!1},async handleSelectColumn(e){console.log("panel: selected",e),this.isButtonActive=!1,this.$emit("column",{dataset:this.csvData,column:e})}},mounted(){this.debounceScale=B.debounce(this.gotNewScale,500),this.handleTimeSliderChanged=B.debounce(this.changeTimeSlider,250),this.scaleWidthValue=""+this.scaleWidth}});var Ct=function(){var t=this,s=t._self._c;return t._self._setupProxy,s("div",{staticClass:"config-panel"},[t.vizDetails.useSlider&&t.activeColumn?s("div",{staticClass:"panel-item expand"},[s("p",[s("b",[t._v(t._s(t.activeColumn))])]),s("time-slider",{staticClass:"time-slider",attrs:{useRange:!1,stops:t.getColumns(),dropdownValue:t.activeColumn},on:{change:t.handleTimeSliderChanged}})],1):t._e(),t.vizDetails.useSlider?t._e():s("div",{staticClass:"panel-item"},[s("p",[s("b",[t._v(t._s(t.$t("selectColumn")))])]),s("div",{staticClass:"dropdown is-up full-width",class:{"is-active":t.isButtonActive}},[s("div",{staticClass:"dropdown-trigger"},[s("button",{staticClass:"full-width is-warning button",class:{"is-loading":!t.activeColumn},attrs:{"aria-haspopup":"true","aria-controls":"dropdown-menu-column-selector"},on:{click:t.handleClickDropdown}},[s("b",[t._v(t._s(t.buttonTitle))]),t._m(0)])]),s("div",{staticClass:"dropdown-menu",style:{"max-height":"24rem","overflow-y":"auto",border:"1px solid #ccc"},attrs:{id:"dropdown-menu-column-selector",role:"menu"}},[s("div",{staticClass:"dropdown-content"},t._l(t.getColumns(),function(i){return s("a",{staticClass:"dropdown-item",on:{click:function(a){return t.handleSelectColumn(i)}}},[t._v(t._s(i))])}),0)])])])])},kt=[function(){var e=this,t=e._self._c;return e._self._setupProxy,t("span",{staticClass:"icon is-small"},[t("i",{staticClass:"fas fa-angle-down",attrs:{"aria-hidden":"true"}})])}],Lt=N(bt,Ct,kt,!1,null,"de2255f5");const St=Lt.exports;function zt({viewId:e=0,links:t={source:new Float32Array,dest:new Float32Array},colorRampType:s=-1,build:i={},base:a={},widths:o={},widthsBase:n={},newColors:c=new Uint8Array,newWidths:m=new Float32Array,dark:r=!1,projection:f="",scaleWidth:g=1,mapIsIndependent:_=!1}){const A=g?1/g:0,[h,d]=q.useState(b.state.viewState),v=i.dataTable[i.activeColumn],C=a.dataTable[a.activeColumn],k=o.dataTable[o.activeColumn],L=s===0||v?.type==F.STRING;D[e]=l=>{d(l||b.state.viewState)};function I(){console.log("click!")}function V(l){d(l),l.center=[l.longitude,l.latitude],_||b.commit("setMapCamera",l)}function z(l){return it(l,{lowerExp:-6,upperExp:6,precision:5})}function $(l,p,u){try{if(!l)return null;const y=i.csvRowFromLinkRow[u];let S=l.values[y];if(L)return Number.isFinite(S)?`<b>${l.name}</b><p>${z(S)}</p>`:null;let R=null;Number.isFinite(S)&&(R=`<b>${l.name}</b><p>Value: ${z(S)}</p>`);const O=a?.csvRowFromLinkRow[u];if(O){let W=a?a.dataTable[p.name].values[O]:null,U=S-W;Number.isFinite(W)&&(R+=`<p>Base: ${z(W)}</p>`,R+=`<p>+/- Base: ${z(U)}</p>`)}return R}catch{return null}}function E({object:l,index:p}){try{let u=$(v,C,p);if(k&&k.name!==v.name){const y=$(k,n.dataTable[n.activeColumn],p);y&&(u=u?u+y:y)}return u?{html:u,style:{color:r?"#ccc":"#223",backgroundColor:r?"#2a3c4f":"white"}}:null}catch(u){return console.warn(u),null}}const K=st.DEFAULT,P=new X({id:"linkLayer",data:{length:t.source.length/2,attributes:{getSourcePosition:{value:t.source,size:2},getTargetPosition:{value:t.dest,size:2},getColor:{value:c,size:4},getWidth:{value:m,size:1}}},widthUnits:"pixels",widthScale:A,widthMinPixels:.5,widthMaxPixels:50,pickable:!0,coordinateSystem:K,opacity:1,autoHighlight:!0,highlightColor:[255,0,224],offsetDirection:Q.RIGHT,updateTriggers:{getSourcePosition:[t.source],getTargetPosition:[t.dest],getColor:[c,r],getWidth:[m]},transitions:{getColor:250,getWidth:250,widthScale:250},parameters:{depthTest:!1}}),Y=f&&f!=="Atlantis";return j.createElement(tt,{layers:[P],viewState:h,controller:!0,pickingRadius:5,getTooltip:E,getCursor:({isDragging:l,isHovering:p})=>l?"grabbing":p?"pointer":"grab",onClick:I,onViewStateChange:l=>V(l.viewState)},Y&&j.createElement(et,{mapStyle:b.getters.mapStyle,mapboxApiAccessToken:G}))}const Rt={messages:{en:{all:"All",colors:"Colors",loading:"Loading",selectColumn:"Select data column",timeOfDay:"Time of day",bandwidths:"Widths: 1 pixel =",showDiffs:"Show Differences"},de:{all:"Alle",colors:"Farben",loading:"Wird geladen",selectColumn:"Datenspalte wählen",timeOfDay:"Uhrzeit",bandwidths:"Linienbreiten: 1 pixel =",showDiffs:"Differenzen"}}},T="_LINK_OFFSET_",Tt=M({name:"NetworkLinksPlugin",i18n:Rt,components:{SelectorPanel:St,DrawingTool:nt,LinkGlLayer:zt,ToggleButton:H.ToggleButton,VizConfigurator:lt,ZoomButtons:rt},props:{root:{type:String,required:!0},subfolder:{type:String,required:!0},yamlConfig:String,config:Object,thumbnail:Boolean,datamanager:{type:Object}},data(){return{standaloneYAMLconfig:{title:"",description:"",csvFile:"",csvBase:"",datasets:{},useSlider:!1,showDifferences:!1,shpFile:"",dbfFile:"",network:"",geojsonFile:"",projection:"",center:null,zoom:0,widthFactor:null,thumbnail:"",sum:!1,nodes:"",links:[],mapIsIndependent:!1,display:{color:{},width:{}}},YAMLrequirementsLinks:{},vizDetails:{title:"",description:"",csvFile:"",csvBase:"",datasets:{},useSlider:!1,showDifferences:!1,shpFile:"",dbfFile:"",network:"",geojsonFile:"",projection:"",center:null,zoom:0,widthFactor:null,thumbnail:"",sum:!1,nodes:"",links:[],mapIsIndependent:!1,display:{color:{},width:{}}},currentUIFilterDefinitions:{},datasets:{},isButtonActiveColumn:!1,linkLayerId:`linklayer-${Math.floor(1e12*Math.random())}`,scaleWidth:0,numLinks:0,showTimeRange:!1,legendStore:new ct,geojsonData:{source:new Float32Array,dest:new Float32Array,linkIds:[],projection:""},fixedColors:["#4e79a7"],myState:{statusMessage:"",subfolder:"",yamlConfig:"",thumbnail:!1},csvData:{datasetKey:"",activeColumn:"",dataTable:{},csvRowFromLinkRow:[]},csvBase:{datasetKey:"",activeColumn:"",dataTable:{},csvRowFromLinkRow:[]},csvWidth:{datasetKey:"",activeColumn:"",dataTable:{},csvRowFromLinkRow:[]},csvWidthBase:{datasetKey:"",activeColumn:"",dataTable:{},csvRowFromLinkRow:[]},isDarkMode:this.$store.state.colorScheme===x.DarkMode,isDataLoaded:!1,thumbnailUrl:"url('assets/thumbnail.jpg') no-repeat;",currentWidthDefinition:{columnName:""},myDataManager:this.datamanager||new ht(this.root,this.subfolder),resizer:void 0,dataLoaderWorkers:[],csvRowLookupFromLinkRow:{},colorArray:new Uint8Array,widthArray:new Float32Array}},computed:{fileApi(){return new ot(this.fileSystem,b)},fileSystem(){const e=this.$store.state.svnProjects.filter(t=>t.slug===this.root);if(e.length===0)throw console.log("no such project"),Error;return e[0]},urlThumbnail(){return this.thumbnailUrl},colorRampType(){const e=this.vizDetails.display.color?.colorRamp?.style;return e===void 0?-1:e},buttonTitle(){return this.csvData.activeColumn||"Loading..."}},watch:{"$store.state.viewState"(){this.vizDetails.mapIsIndependent||D[this.linkLayerId]&&D[this.linkLayerId]()},"$store.state.colorScheme"(){setTimeout(()=>this.isDarkMode=this.$store.state.colorScheme===x.DarkMode,100)},"vizDetails.showDifferences"(){this.generateWidthArray(),this.generateColorArray()}},methods:{setDataIsLoaded(){this.isDataLoaded=!0},async getVizDetails(){const e=this.myState.yamlConfig,t={showDifferences:!1,datasets:{},display:{color:{},width:{}}};if(this.config){this.validateYAML(),this.vizDetails=Object.assign({},t,this.config);return}if((e?.endsWith("yaml")||e?.endsWith("yml"))&&await this.loadStandaloneYamlConfig(),/(shp|xml|geojson|geo\.json)(|\.gz)$/.test(e)){const i="Network: "+this.myState.yamlConfig;this.vizDetails=Object.assign({},this.vizDetails,{network:this.myState.yamlConfig,title:i,description:this.myState.subfolder})}const s=this.vizDetails.title?this.vizDetails.title:e||"Network Links";this.$emit("title",s)},async loadStandaloneYamlConfig(){try{const e=this.myState.yamlConfig.indexOf("/")>-1?this.myState.yamlConfig:this.myState.subfolder+"/"+this.myState.yamlConfig,t=await this.fileApi.getFileText(e);this.standaloneYAMLconfig=Object.assign({},J.parse(t)),this.validateYAML(),this.setVizDetails()}catch(e){console.error("failed");const t=e;this.fileSystem.needPassword&&t.status===401?this.$store.commit("requestLogin",this.fileSystem.slug):this.$emit("error",""+t)}},async validateYAML(){const e=new RegExp(".*(yml|yaml)$").test(this.myState.yamlConfig);let t;e?(console.log("has yaml"),t=this.standaloneYAMLconfig):(console.log("no yaml"),t=this.config);for(const i in this.YAMLrequirementsLinks)i in t||this.$emit("error",{type:w.ERROR,msg:`YAML file missing required key: ${i}`,desc:"Check this.YAMLrequirementsLinks for required keys"});(t.zoom<5||t.zoom>20)&&this.$emit("error",{type:w.WARNING,msg:"Zoom is out of the recommended range ",desc:"Zoom levels should be between 5 and 20. "}),!t.network&&t.geojsonFile&&this.$emit("error",{type:w.WARNING,msg:"YAML field geojsonFile deprecated",desc:"Use YAML field network instad. "}),t.display||this.$emit("error",{type:w.WARNING,msg:"Display properties not set",desc:"Standard values are used"})},setVizDetails(){this.vizDetails=Object.assign({},this.vizDetails,this.standaloneYAMLconfig)},async buildThumbnail(){if(this.thumbnail&&this.vizDetails.thumbnail)try{const e=await this.fileApi.getFileBlob(this.myState.subfolder+"/"+this.vizDetails.thumbnail),t=await Z.arraybuffer(e),s=at(t);s&&(this.thumbnailUrl=`center / cover no-repeat url(data:image/png;base64,${s})`)}catch(e){console.error(e)}},toggleShowDiffs(){this.vizDetails.showDifferences=!this.vizDetails.showDifferences},changeConfiguration(e){e.color&&(this.vizDetails=Object.assign({},this.vizDetails),this.vizDetails.display.color=e.color,this.handleNewColor(e.color)),e.width&&(this.vizDetails=Object.assign({},this.vizDetails),this.vizDetails.display.width=e.width,this.handleNewWidth(e.width)),e.dataset&&this.handleNewDataset(e.dataset)},handleNewFilter(e){this.csvData=Object.assign({},this.csvData,{activeColumn:e[0]}),this.csvWidth=Object.assign({},this.csvWidth,{activeColumn:e[0]})},handleNewWidth(e){if(ft(e,this.currentWidthDefinition))return;const{columnName:t,dataset:s,scaleFactor:i}=e;if(!s){this.scaleWidth=0;return}i!==void 0&&(this.scaleWidth=i);let a=!0;if(t||(a=!1),e.columnName===this.currentWidthDefinition.columnName&&e.dataset===this.currentWidthDefinition.dataset&&(a=!1),this.currentWidthDefinition=e,!a)return;const o=s?this.datasets[s]:this.csvWidth.dataTable;if(!o)return;if(this.csvWidth.dataTable!==o&&(this.csvWidth.dataTable=o,this.csvWidth.activeColumn=t||"",this.csvWidthBase.activeColumn=t||""),!o[t||""]){const c=`Width: column "${t}" not found in dataset "${this.csvData.datasetKey}"`;console.error(c),this.$emit("error",{type:w.ERROR,msg:c});return}this.csvWidth={datasetKey:s||this.csvWidth.datasetKey,dataTable:o,activeColumn:t||"",csvRowFromLinkRow:s?this.csvRowLookupFromLinkRow[s]:[]},this.generateWidthArray()},handleNewColor(e){this.fixedColors=e.fixedColors;const t=e.columnName;if(!t){this.generateColorArray();return}const s=e.dataset,i=this.datasets[s];if(!i)return;this.csvData.dataTable!==i&&(this.csvData={datasetKey:s,dataTable:i,activeColumn:"",csvRowFromLinkRow:this.csvRowLookupFromLinkRow[s]});const a=this.csvData.dataTable[t];if(!a){const o=`Color: Column "${t}" not found in dataset "${this.csvData.datasetKey}"`;console.error(o),this.$emit("error",{type:w.ERROR,msg:o});return}this.csvData.activeColumn=a.name,this.csvBase.activeColumn=a.name,this.isButtonActiveColumn=!1,this.generateColorArray()},setMapCenterFromVizDetails(){typeof this.vizDetails.center=="string"&&(this.vizDetails.center=this.vizDetails.center.split(",").map(Number)),this.vizDetails.zoom||(this.vizDetails.zoom=9),this.$store.commit("setMapCamera",{longitude:this.vizDetails.center[0],latitude:this.vizDetails.center[1],bearing:0,pitch:0,zoom:this.vizDetails.zoom,jump:!1});const e={longitude:this.vizDetails.center[0],latitude:this.vizDetails.center[1],bearing:0,pitch:0,zoom:this.vizDetails.zoom||10,jump:!1};D[this.linkLayerId]&&D[this.linkLayerId](e)},async setMapCenter(){if(this.vizDetails.center)return this.setMapCenterFromVizDetails();const e=this.geojsonData;if(!e.source.length)return;let t=0,s=0,i=0;if(this.geojsonData.projection!=="Atlantis"){const a=e.source.length/2,o=a<4096?2:1024;for(let n=0;n<a;n+=o)s+=e.source[n*2],i+=e.source[n*2+1],t++;s=s/t,i=i/t}console.log("center",s,i),this.$store.commit("setMapCamera",{longitude:s,latitude:i,bearing:0,pitch:0,zoom:8,jump:!1})},setupLogoMover(){this.resizer=new ResizeObserver(this.moveLogo);const e=document.getElementById(`container-${this.linkLayerId}`);this.resizer.observe(e)},moveLogo(){const e=document.getElementById(`container-${this.linkLayerId}`),t=e?.querySelector(".mapboxgl-ctrl-bottom-left");if(t){const s=e.clientWidth>640?"280px":"36px";t.style.right=s}},async updateStatus(e){this.myState.statusMessage=e},async loadNetwork(){if(!this.myDataManager)throw Error("links: no datamanager");this.myState.statusMessage="Loading network...";const e=this.vizDetails.network||this.vizDetails.geojsonFile;try{const t=await this.myDataManager.getRoadNetwork(e,this.myState.subfolder,this.vizDetails,this.updateStatus);this.numLinks=t.linkIds.length,this.geojsonData=t,t.projection&&(this.vizDetails.projection=""+t.projection),this.setMapCenter(),this.myState.statusMessage="",this.moveLogo(),this.$emit("isLoaded",!0),this.loadCSVFiles()}catch(t){this.myState.statusMessage="",this.$emit("error",""+t),this.$emit("isLoaded")}},handleNewDataset(e){console.log("NEW dataset",e);const{key:t,dataTable:s,filename:i}=e,o=Object.keys(s)[0],n=s[o];let c={};for(let r=0;r<n.values.length;r++)c[n.values[r]]=r;const m=[];for(let r=0;r<this.geojsonData.linkIds.length;r++){const f=this.geojsonData.linkIds[r],g=c[f];g!==void 0&&(m[r]=g)}this.csvRowLookupFromLinkRow[t]=m,c={},i&&(this.vizDetails.datasets[t]=i),this.datasets=Object.assign({...this.datasets},{[t]:s}),this.handleDatasetisLoaded(t)},generateWidthArray(){const e=this.geojsonData.linkIds.length,t=new Float32Array(e),s=this.csvWidth?.dataTable[this.csvWidth.activeColumn]?.values,i=this.csvBase?.dataTable[this.csvBase.activeColumn]?.values,a=o=>{const n=this.csvWidth.csvRowFromLinkRow[o],c=s[n];if(this.vizDetails.showDifferences){const m=this.csvBase.csvRowFromLinkRow[o],r=i[m];return Math.abs(c-r)}else return c};for(let o=0;o<e;o++)t[o]=a(o);this.widthArray=t},generateColorArray(){const e=this.fixedColors.map(h=>{const d=dt(h);return[d.r,d.g,d.b,255]}),t=4,s=new Array(this.fixedColors.length-1).fill(0).map((h,d)=>Math.pow(1/this.fixedColors.length*(d+1),t)),i=this.csvData.dataTable,a=this.csvBase.dataTable,o=this.csvData.activeColumn,n=i[o]||{values:[]};a[o];const c=this.colorRampType===0||n.type==F.STRING,m=c?mt().range(e):ut().range(e).domain(s),r=this.geojsonData.linkIds.length,f=new Uint8Array(4*r),g=b.state.isDarkMode?[80,80,80,96]:[212,212,212,40],_=[0,0,0,0],A=h=>{const d=this.csvData.csvRowFromLinkRow[h];let v=i[this.csvData.activeColumn]?.values[d];if(this.fixedColors.length===1)return e[0];if(!v&&!this.vizDetails.showDifferences)return _;if(c)return m(v);if(this.vizDetails.showDifferences){const C=this.csvBase.csvRowFromLinkRow[h],k=a[o].values[C],L=v-k;return L===0?g:this.isDarkMode?L>0?[255,64,64,255]:[64,96,255,255]:L>0?[255,0,0,255]:[32,64,255,255]}else{let C=v/(n.max||1);return m(C)}};for(let h=0;h<r;h++)f.set(A(h),h*4);this.colorArray=f},loadCSVFiles(){this.myState.statusMessage="Loading datasets...",this.vizDetails.datasets||(this.vizDetails.datasets={}),this.vizDetails.csvFile&&(this.vizDetails.datasets.csvFile=this.vizDetails.csvFile),this.vizDetails.csvBase&&(this.vizDetails.datasets.csvBase=this.vizDetails.csvBase);const e=Object.entries(this.vizDetails.datasets);if(e.length)for(const[t,s]of e)this.loadOneCSVFile(t,s);else this.showSimpleNetworkWithNoDatasets()},showSimpleNetworkWithNoDatasets(){this.csvData={datasetKey:"",dataTable:{[T]:{name:T,type:F.LOOKUP,values:[]}},activeColumn:T,csvRowFromLinkRow:[]};const e=this.geojsonData.source.length/2,t=[...Array(e).keys()];this.csvData.dataTable[T].values=t,this.myState.statusMessage="",this.setDataIsLoaded();const s={fixedColors:this.fixedColors,dataset:"",columnName:"",normalize:""};this.changeConfiguration({color:s})},handleDatasetisLoaded(e){const t=Object.keys(this.datasets);if(e==="csvBase"||e==="base")this.csvBase={datasetKey:e,dataTable:this.datasets[e],csvRowFromLinkRow:this.csvRowLookupFromLinkRow[e],activeColumn:""},this.csvWidthBase={datasetKey:e,dataTable:this.datasets[e],csvRowFromLinkRow:this.csvRowLookupFromLinkRow[e],activeColumn:""};else if(this.csvData.activeColumn===""&&!this.vizDetails.display.color&&!this.vizDetails.display.width){const s=Object.values(this.datasets[e])[0].name;this.csvData={datasetKey:e,dataTable:this.datasets[e],csvRowFromLinkRow:this.csvRowLookupFromLinkRow[e],activeColumn:s}}t.length===Object.keys(this.vizDetails.datasets).length&&(this.setDataIsLoaded(),this.myState.statusMessage="",console.log({DATASETS:this.datasets}))},async loadOneCSVFile(e,t){try{const i=(await this.myDataManager.getDataset({dataset:t},{subfolder:this.subfolder})).allRows;console.log("loaded",e),this.myState.statusMessage="Analyzing...";const a={};for(const o of Object.keys(i))o&&(a[o]=i[o]);this.datasets=Object.assign({...this.datasets},{[e]:a}),this.handleNewDataset({key:e,dataTable:a})}catch{this.$emit("error","Could not load "+t),this.$emit("isLoaded")}},handleNewDataColumn(e){const{dataset:t,column:s}=e,i={};if(t.datasetKey===this.csvWidth.datasetKey){const a={...this.vizDetails.display.width};a.columnName=s,i.width=a}if(t.datasetKey===this.csvData.datasetKey){const a={...this.vizDetails.display.color};a.columnName=s,i.color=a}this.changeConfiguration(i)}},async mounted(){if(this.$store.commit("setFullScreen",!this.thumbnail),this.myState.thumbnail=this.thumbnail,this.myState.yamlConfig=this.yamlConfig??"",this.myState.subfolder=this.subfolder,await this.getVizDetails(),this.scaleWidth=this.vizDetails.display?.width?.widthFactor||250,this.thumbnail){this.buildThumbnail();return}this.setupLogoMover(),this.loadNetwork()},beforeDestroy(){this.resizer?.disconnect(),delete D[this.linkLayerId];try{for(const e of this.dataLoaderWorkers)e.terminate()}catch{}this.$store.commit("setFullScreen",!1)}});var Ft=function(){var t=this,s=t._self._c;return t._self._setupProxy,s("div",{staticClass:"link-volume-plot",class:{"hide-thumbnail":!t.thumbnail},style:{background:t.urlThumbnail},attrs:{oncontextmenu:"return false"}},[t.thumbnail?t._e():s("div",{staticClass:"plot-container",attrs:{id:`container-${t.linkLayerId}`}},[s("link-gl-layer",{staticClass:"map-area",attrs:{viewId:t.linkLayerId,links:t.geojsonData,colorRampType:t.colorRampType,build:t.csvData,base:t.csvBase,widths:t.csvWidth,widthsBase:t.csvWidthBase,dark:t.isDarkMode,newColors:t.colorArray,newWidths:t.widthArray,scaleWidth:t.scaleWidth,projection:t.vizDetails.projection,mapIsIndependent:t.vizDetails.mapIsIndependent}}),t.thumbnail?t._e():s("zoom-buttons"),!t.thumbnail&&t.isDataLoaded?s("viz-configurator",{attrs:{vizDetails:t.vizDetails,datasets:t.datasets,fileSystem:t.fileSystem,subfolder:t.myState.subfolder,yamlConfig:t.yamlConfig,legendStore:t.legendStore,filterDefinitions:t.currentUIFilterDefinitions},on:{update:t.changeConfiguration}}):t._e(),t.thumbnail?t._e():s("div",{staticClass:"bottom-panel"},[t.myState.statusMessage?s("div",{staticClass:"status-message"},[s("p",[t._v(t._s(t.myState.statusMessage))])]):t._e(),s("div",{directives:[{name:"show",rawName:"v-show",value:t.csvWidth.activeColumn,expression:"csvWidth.activeColumn"}],staticClass:"panel-items"},[s("div",{staticClass:"panel-item config-section"},[s("selector-panel",{attrs:{vizDetails:t.vizDetails,csvData:t.csvWidth,scaleWidth:t.scaleWidth,showDiffs:t.vizDetails.showDifferences},on:{column:t.handleNewDataColumn,slider:t.handleNewDataColumn}})],1),t.vizDetails.datasets.csvBase?s("div",{staticClass:"panel-item diff-section"},[s("toggle-button",{staticClass:"toggle",attrs:{width:40,value:t.vizDetails.showDifferences,sync:!0,labels:!1,color:{checked:"#4b7cc4",unchecked:"#222"}},on:{change:t.toggleShowDiffs}}),s("p",[s("b",[t._v(t._s(t.$t("showDiffs")))])])],1):t._e()])])],1)])},_t=[],At=N(Tt,Ft,_t,!1,null,"f34f18f6");const me=At.exports;export{me as default};