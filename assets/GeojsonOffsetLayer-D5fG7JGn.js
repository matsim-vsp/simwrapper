import{P as g}from"./PathOffsetLayer-BV5GlGxz.js";import{G as u}from"./geojson-layer-CGVPqtUw.js";function p(a,r){const{transitions:o,updateTriggers:n}=a.props,t={updateTriggers:{},transitions:o&&{getPosition:o.geometry}};for(const e in r){const s=r[e];let i=a.props[e];e.startsWith("get")&&(i=a.getSubLayerAccessor(i),t.updateTriggers[s]=n[e],o&&(t.transitions[s]=o[e])),t[s]=i}return t}const c={RIGHT:2},l={type:g,props:{lineWidthUnits:"widthUnits",lineWidthScale:"widthScale",lineWidthMinPixels:"widthMinPixels",lineWidthMaxPixels:"widthMaxPixels",lineJointRounded:"jointRounded",lineCapRounded:"capRounded",lineMiterLimit:"miterLimit",lineBillboard:"billboard",getLineColor:"getColor",getLineWidth:"getWidth"}};class f extends u{constructor(r){super(r)}_renderLineLayers(){const{extruded:r,stroked:o}=this.props,{layerProps:n}=this.state,t="polygons-stroke",e="linestrings",s=!r&&o&&this.shouldRenderSubLayer(t,n.polygonsOutline.data)&&this.getSubLayerClass(t,l.type),i=this.shouldRenderSubLayer(e,n.lines.data)&&this.getSubLayerClass(e,l.type);if(s||i){const d=p(this,l.props);return[s&&new s(d,this.getSubLayerProps({id:t,updateTriggers:d.updateTriggers}),n.polygonsOutline),i&&new i(d,this.getSubLayerProps({id:e,updateTriggers:d.updateTriggers}),n.lines)]}return null}getShaders(){return{...super.getShaders(),inject:{"vs:#decl":`
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
        `}}}}f.layerName="GeojsonOffsetLayer";f.defaultProps={getOffset:{type:"accessor",value:c.RIGHT}};export{f as G};
