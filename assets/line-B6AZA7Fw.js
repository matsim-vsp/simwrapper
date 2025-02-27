import{d as m,g as f,U as u,B as h,h as c,n as g}from"./index-Bcyum9lL.js";import{b as p}from"./ColorsAndWidths-CJP71lsU.js";import{V as y}from"./VuePlotly-BTSlDmVC.js";import{b}from"./LayoutManager-BaZnu6IP.js";import"./color-DZRtpOAM.js";import"./cubehelix-Bg3rkAQA.js";import"./rainbow-Dz4seJAz.js";import"./threshold-DxQAdYxA.js";import"./index-_doEQLKC.js";import"./HTTPFileSystem-s4sqyA8J.js";import"./index-C2yv4UXI.js";import"./TopSheet-BBX6vRYW.js";import"./papaparse.min-cUK9if3S.js";import"./DashboardDataManager-B848Afka.js";import"./util-LXagx_XK.js";import"./fxp-4YEvQr-_.js";import"./extends-CCbyfPlC.js";import"./avro-Dd9UqmeZ.js";import"./RoadNetworkLoader.worker-gcQnxu3l.js";import"./Coords-D-UV8-Xi.js";import"./group-DobYzF2-.js";const x=m({name:"LineChartPanel",components:{VuePlotly:y},props:{fileSystemConfig:{type:Object,required:!0},subfolder:{type:String,required:!0},files:{type:Array,required:!0},config:{type:Object,required:!0},cardTitle:{type:String,required:!0},cardId:String,datamanager:{type:Object,required:!0}},data:()=>({globalState:f.state,dataSet:{},id:"line-"+Math.floor(1e12*Math.random()),colorMap:{},YAMLrequirementsLine:{dataset:"",x:""},YAMLdeprecations:["usedCol"],layout:{height:300,margin:{t:8,b:0,l:0,r:0,pad:2},font:{color:"#444444",family:u},xaxis:{automargin:!0,autorange:!0,title:{text:"",standoff:12},animate:!0},yaxis:{automargin:!0,autorange:!0,title:{text:"",standoff:16},animate:!0,rangemode:"tozero"},legend:{orientation:"v",x:1,y:1}},data:[],options:{displaylogo:!1,responsive:!0,modeBarButtonsToRemove:["pan2d","zoom2d","select2d","lasso2d","zoomIn2d","zoomOut2d","autoScale2d","hoverClosestCartesian","hoverCompareCartesian","resetScale2d","toggleSpikelines","resetViewMapbox"],toImageButtonOptions:{format:"png",filename:"line-chart",width:null,height:null}}}),async mounted(){this.updateTheme(),this.options.toImageButtonOptions.filename=b(this.cardTitle,this.subfolder),this.dataSet=await this.loadData(),this.updateChart(),this.$emit("dimension-resizer",{id:this.cardId,resizer:this.changeDimensions}),this.$emit("isLoaded")},beforeDestroy(){this.datamanager?.removeFilterListener({...this.config,subfolder:this.subfolder},this.handleFilterChanged)},watch:{"globalState.isDarkMode"(){this.updateTheme()}},methods:{changeDimensions(t){this.layout=Object.assign({},this.layout,t)},handleFilterChanged(){if(!this.datamanager)return;const{filteredRows:t}=this.datamanager.getFilteredDataset(this.config);if(!t||!t.length)this.dataSet={allRows:{}};else{const e={},i=Object.keys(t[0]);i.forEach(s=>e[s]={name:s,values:[]}),t.forEach(s=>{i.forEach(o=>e[o].values.push(s[o]))}),this.dataSet={allRows:e}}this.updateChart()},updateTheme(){const t={paper_bgcolor:h[this.globalState.colorScheme],plot_bgcolor:h[this.globalState.colorScheme],font:{color:this.globalState.isDarkMode?"#cccccc":"#444444"}};this.layout=Object.assign({},this.layout,t)},async loadData(){try{this.validateYAML();let t=await this.datamanager.getDataset(this.config,{subfolder:this.subfolder});if(!this.config.filters)return t;this.datamanager.addFilterListener({...this.config,subfolder:this.subfolder},this.handleFilterChanged);for(const[e,i]of Object.entries(this.config.filters)){const s={dataset:this.config.dataset,column:e,value:i,range:Array.isArray(i)};this.datamanager.setFilter(s)}return{allRows:{}}}catch(t){this.$emit("error",`Error loading: ${this.subfolder}/${this.config.dataset}`),console.error(""+t)}return{allRows:{}}},validateYAML(){for(const t in this.YAMLrequirementsLine)t in this.config||this.$emit("error",{type:c.ERROR,msg:`line chart: missing required key: ${t}`,desc:JSON.stringify(this.config)});for(const t of this.YAMLdeprecations)this.config[t]&&this.$emit("error",{type:c.WARNING,msg:`line chart: deprecated field: ${t}`,desc:JSON.stringify(this.config)})},updateChart(){this.layout.xaxis.title.text=this.config.xAxisTitle||this.config.xAxisName||"",this.layout.yaxis.title.text=this.config.yAxisTitle||this.config.yAxisName||"";try{this.config.groupBy?this.updateChartWithGroupBy():this.updateChartSimple()}catch(t){const e=""+t;this.$emit("error",{type:c.ERROR,msg:e,desc:"Add a desription..."})}},updateChartWithGroupBy(){},updateChartSimple(){let t=!1,e=this.config.columns||this.config.usedCol;this.config.legendName&&(this.config.legendTitles=this.config.legendName),this.config.legendTitles?.length&&(t=!0);const i=this.dataSet.allRows||{},s=Object.keys(i);if(!s.length)return;if(!i[this.config.x]){this.$emit("error",`${this.cardTitle}: "${this.config.dataset}" x column "${this.config.x}" missing`);return}let o=i[this.config.x].values||[];this.config.skipFirstRow&&(o=o.slice(1)),!e&&s.length&&(e=s.filter(a=>a!==this.config.x).sort()),this.colorMap=p(e,this.config.colorRamp);const n=[];for(let a=0;a<e.length;a++){const l=e[a],d=t?this.config.legendTitles[a]??l:l;let r=i[l].values;this.config.skipFirstRow&&(r=r.slice(1)),this.config.convertToSeconds&&(r=this.convertToSeconds(r)),n.push({x:o,y:r,name:d,type:"line",textinfo:"label+percent",textposition:"inside",automargin:!1,marker:{color:this.colorMap[l]}})}this.data=n},convertToSeconds(t){t=t.map(e=>{try{return e.split(":").reduce((o,n)=>parseInt(n,10)+o*60,0)}catch{return 0}})}}});var S=function(){var e=this,i=e._self._c;return e._self._setupProxy,i("VuePlotly",{staticClass:"myplot",attrs:{data:e.data,layout:e.layout,options:e.options,id:e.id}})},C=[],v=g(x,S,C,!1,null,"00dc8843");const P=v.exports;export{P as default};
