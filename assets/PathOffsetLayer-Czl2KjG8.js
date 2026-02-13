import{P as s}from"./geojson-layer-DvtTfj7b.js";const a={RIGHT:2};class t extends s{initializeState(e){super.initializeState(e),this.getAttributeManager().addInstanced({instanceOffset:{size:1,accessor:"getOffset"}})}getShaders(){return{...super.getShaders(),inject:{"vs:#decl":`
            in float instanceOffset;
            out float offset;
            `,"vs:#main-start":`
            offset = instanceOffset;
            `,"fs:#decl":`
            in float offset;
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
        `}}}}t.layerName="PathOffsetLayer";t.defaultProps={getOffset:{type:"accessor",value:a.RIGHT}};export{t as P};
