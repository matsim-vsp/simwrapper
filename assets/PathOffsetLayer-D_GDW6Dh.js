import{i as e}from"./geojson-layer-D3rMABvN.js";var t={NONE:0,LEFT:1,RIGHT:2},n=class extends e{initializeState(e){super.initializeState(e),this.getAttributeManager().addInstanced({instanceOffset:{size:1,accessor:`getOffset`}})}getShaders(){return{...super.getShaders(),inject:{"vs:#decl":`
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
        `}}}};n.layerName=`PathOffsetLayer`,n.defaultProps={getOffset:{type:`accessor`,value:t.RIGHT}};export{n as t};