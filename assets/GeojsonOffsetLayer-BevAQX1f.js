import{t as e}from"./geojson-layer-D3rMABvN.js";import{t}from"./PathOffsetLayer-D_GDW6Dh.js";function n(e,t){let{transitions:n,updateTriggers:r}=e.props,i={updateTriggers:{},transitions:n&&{getPosition:n.geometry}};for(let a in t){let o=t[a],s=e.props[a];a.startsWith(`get`)&&(s=e.getSubLayerAccessor(s),i.updateTriggers[o]=r[a],n&&(i.transitions[o]=n[a])),i[o]=s}return i}var r={NONE:0,LEFT:1,RIGHT:2},i={type:t,props:{lineWidthUnits:`widthUnits`,lineWidthScale:`widthScale`,lineWidthMinPixels:`widthMinPixels`,lineWidthMaxPixels:`widthMaxPixels`,lineJointRounded:`jointRounded`,lineCapRounded:`capRounded`,lineMiterLimit:`miterLimit`,lineBillboard:`billboard`,getLineColor:`getColor`,getLineWidth:`getWidth`}},a=class extends e{constructor(e){super(e)}_renderLineLayers(){let{extruded:e,stroked:t}=this.props,{layerProps:r}=this.state,a=`polygons-stroke`,o=`linestrings`,s=!e&&t&&this.shouldRenderSubLayer(a,r.polygonsOutline.data)&&this.getSubLayerClass(a,i.type),c=this.shouldRenderSubLayer(o,r.lines.data)&&this.getSubLayerClass(o,i.type);if(s||c){let e=n(this,i.props);return[s&&new s(e,this.getSubLayerProps({id:a,updateTriggers:e.updateTriggers}),r.polygonsOutline),c&&new c(e,this.getSubLayerProps({id:o,updateTriggers:e.updateTriggers}),r.lines)]}return null}getShaders(){return{...super.getShaders(),inject:{"vs:#decl":`
            attribute float instanceOffset;
            varying float offset;
            `,"vs:#main-start":`
            offset = instanceOffset;
            `,"fs:#decl":`
            varying float offset;
            `,"fs:#main-start":`
            if (offset == 1.0 && vPathPosition.x < 0.0) {
                discard;
            }
            if (offset == 2.0 && vPathPosition.x > 0.0) {
                discard;
            }
            if (offset == 0.0 && abs(vPathPosition.x) > 0.5) {
                discard;
            }
        `}}}};a.layerName=`GeojsonOffsetLayer`,a.defaultProps={getOffset:{type:`accessor`,value:r.RIGHT}};export{a as t};