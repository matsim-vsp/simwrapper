import{d as i,n as e}from"./index-Bcyum9lL.js";import m from"./Flowmap-zHlkCn-B.js";import"./NewXmlFetcher.worker-CaM3eTg4.js";import"./VizConfigurator-CNxW2Ua1.js";import"./index-C2yv4UXI.js";import"./lodash-BaqGx6ex.js";import"./util-LXagx_XK.js";import"./HTTPFileSystem-s4sqyA8J.js";import"./fxp-4YEvQr-_.js";import"./extends-CCbyfPlC.js";import"./DashboardDataManager-B848Afka.js";import"./avro-Dd9UqmeZ.js";import"./RoadNetworkLoader.worker-gcQnxu3l.js";import"./Coords-D-UV8-Xi.js";import"./group-DobYzF2-.js";import"./index-_doEQLKC.js";import"./ColorsAndWidths-CJP71lsU.js";import"./color-DZRtpOAM.js";import"./cubehelix-Bg3rkAQA.js";import"./rainbow-Dz4seJAz.js";import"./threshold-DxQAdYxA.js";import"./index-DtsbxC9x.js";import"./LegendBox-CIyO_jak.js";import"./ZoomButtons-yJ7KurlV.js";import"./set-rtl-text-plugin-i7BvRADR.js";import"./index-DgdUD6UN.js";import"./range-OtVwhkKS.js";import"./sequential-XEfpT0Cr.js";import"./pow-CIR03aoW.js";import"./round-D-ROWHlE.js";import"./min-D1slsF82.js";import"./extent-Ccx1MofX.js";import"./defaultLocale-VLpijIbO.js";import"./year-DwdiMAWv.js";import"./fsum-CWwcR1RF.js";import"./text-layer-BvG04bBg.js";const p=i({name:"FlowmapPanel",components:{FlowMap:m},props:{fileSystemConfig:{type:Object,required:!0},subfolder:{type:String,required:!0},files:{type:Array,required:!0},config:{type:Object,required:!0},datamanager:Object},mounted(){this.$emit("isLoaded")},methods:{isLoaded(){this.$emit("isLoaded")}}});var a=function(){var r=this,o=r._self._c;return r._self._setupProxy,o("flow-map",{staticClass:"deck-map",attrs:{root:r.fileSystemConfig.slug,subfolder:r.subfolder,configFromDashboard:r.config,thumbnail:!1,fsConfig:r.fileSystemConfig,datamanager:r.datamanager,yamlConfig:"noconfig"},on:{isLoaded:r.isLoaded,error:function(t){return r.$emit("error",t)}}})},n=[],s=e(p,a,n,!1,null,"6268de19");const T=s.exports;export{T as default};
