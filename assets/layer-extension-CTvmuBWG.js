import{_ as n,t as p}from"./set-rtl-text-plugin-DVED14k1.js";class a{constructor(t){n(this,"opts",void 0),t&&(this.opts=t)}equals(t){return this===t?!0:this.constructor===t.constructor&&p(this.opts,t.opts)}getShaders(t){return null}getSubLayerProps(t){const{defaultProps:s}=t.constructor,r={updateTriggers:{}};for(const e in s)if(e in this.props){const i=s[e],o=this.props[e];r[e]=o,i&&i.type==="accessor"&&(r.updateTriggers[e]=this.props.updateTriggers[e],typeof o=="function"&&(r[e]=this.getSubLayerAccessor(o)))}return r}initializeState(t,s){}updateState(t,s){}draw(t,s){}finalizeState(t,s){}}n(a,"defaultProps",{});export{a as L};