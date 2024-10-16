import{L as Le,_ as A,p as Pe,a as _e,X as U,Y as me,F as Ce,M as Q,G as Se,l as w}from"./layer-e38691d4.js";import{S as we,I as be,T as Ie,C as Te}from"./text-layer-e1471bcc.js";import{T as Ae,c as Ee,a as Me,P as Oe}from"./path-layer-bb69327f.js";import{b as Fe}from"./index-3495e215.js";const q=`#if (defined(SHADER_TYPE_FRAGMENT) && defined(LIGHTING_FRAGMENT)) || (defined(SHADER_TYPE_VERTEX) && defined(LIGHTING_VERTEX))

struct AmbientLight {
 vec3 color;
};

struct PointLight {
 vec3 color;
 vec3 position;
 vec3 attenuation;
};

struct DirectionalLight {
  vec3 color;
  vec3 direction;
};

uniform AmbientLight lighting_uAmbientLight;
uniform PointLight lighting_uPointLight[MAX_LIGHTS];
uniform DirectionalLight lighting_uDirectionalLight[MAX_LIGHTS];
uniform int lighting_uPointLightCount;
uniform int lighting_uDirectionalLightCount;

uniform bool lighting_uEnabled;

float getPointLightAttenuation(PointLight pointLight, float distance) {
  return pointLight.attenuation.x
       + pointLight.attenuation.y * distance
       + pointLight.attenuation.z * distance * distance;
}

#endif
`,ze={lightSources:{}};function B(){let{color:t=[0,0,0],intensity:n=1}=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return t.map(e=>e*n/255)}function Re(t){let{ambientLight:n,pointLights:e=[],directionalLights:i=[]}=t;const o={};return n?o["lighting_uAmbientLight.color"]=B(n):o["lighting_uAmbientLight.color"]=[0,0,0],e.forEach((r,s)=>{o["lighting_uPointLight[".concat(s,"].color")]=B(r),o["lighting_uPointLight[".concat(s,"].position")]=r.position,o["lighting_uPointLight[".concat(s,"].attenuation")]=r.attenuation||[1,0,0]}),o.lighting_uPointLightCount=e.length,i.forEach((r,s)=>{o["lighting_uDirectionalLight[".concat(s,"].color")]=B(r),o["lighting_uDirectionalLight[".concat(s,"].direction")]=r.direction}),o.lighting_uDirectionalLightCount=i.length,o}function le(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ze;if("lightSources"in t){const{ambientLight:n,pointLights:e,directionalLights:i}=t.lightSources||{};return n||e&&e.length>0||i&&i.length>0?Object.assign({},Re({ambientLight:n,pointLights:e,directionalLights:i}),{lighting_uEnabled:!0}):{lighting_uEnabled:!1}}if("lights"in t){const n={pointLights:[],directionalLights:[]};for(const e of t.lights||[])switch(e.type){case"ambient":n.ambientLight=e;break;case"directional":n.directionalLights.push(e);break;case"point":n.pointLights.push(e);break}return le({lightSources:n})}return{}}const ae={name:"lights",vs:q,fs:q,getUniforms:le,defines:{MAX_LIGHTS:3}},ce=`
uniform float lighting_uAmbient;
uniform float lighting_uDiffuse;
uniform float lighting_uShininess;
uniform vec3  lighting_uSpecularColor;

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 light_direction, vec3 view_direction, vec3 normal_worldspace, vec3 color) {
    vec3 halfway_direction = normalize(light_direction + view_direction);
    float lambertian = dot(light_direction, normal_worldspace);
    float specular = 0.0;
    if (lambertian > 0.0) {
      float specular_angle = max(dot(normal_worldspace, halfway_direction), 0.0);
      specular = pow(specular_angle, lighting_uShininess);
    }
    lambertian = max(lambertian, 0.0);
    return (lambertian * lighting_uDiffuse * surfaceColor + specular * lighting_uSpecularColor) * color;
}

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 cameraPosition, vec3 position_worldspace, vec3 normal_worldspace) {
  vec3 lightColor = surfaceColor;

  if (lighting_uEnabled) {
    vec3 view_direction = normalize(cameraPosition - position_worldspace);
    lightColor = lighting_uAmbient * surfaceColor * lighting_uAmbientLight.color;

    for (int i = 0; i < MAX_LIGHTS; i++) {
      if (i >= lighting_uPointLightCount) {
        break;
      }
      PointLight pointLight = lighting_uPointLight[i];
      vec3 light_position_worldspace = pointLight.position;
      vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
      lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color);
    }

    for (int i = 0; i < MAX_LIGHTS; i++) {
      if (i >= lighting_uDirectionalLightCount) {
        break;
      }
      DirectionalLight directionalLight = lighting_uDirectionalLight[i];
      lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
    }
  }
  return lightColor;
}

vec3 lighting_getSpecularLightColor(vec3 cameraPosition, vec3 position_worldspace, vec3 normal_worldspace) {
  vec3 lightColor = vec3(0, 0, 0);
  vec3 surfaceColor = vec3(0, 0, 0);

  if (lighting_uEnabled) {
    vec3 view_direction = normalize(cameraPosition - position_worldspace);

    for (int i = 0; i < MAX_LIGHTS; i++) {
      if (i >= lighting_uPointLightCount) {
        break;
      }
      PointLight pointLight = lighting_uPointLight[i];
      vec3 light_position_worldspace = pointLight.position;
      vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
      lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color);
    }

    for (int i = 0; i < MAX_LIGHTS; i++) {
      if (i >= lighting_uDirectionalLightCount) {
        break;
      }
      DirectionalLight directionalLight = lighting_uDirectionalLight[i];
      lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
    }
  }
  return lightColor;
}
`,ke={};function Ge(t){const{ambient:n=.35,diffuse:e=.6,shininess:i=32,specularColor:o=[30,30,30]}=t;return{lighting_uAmbient:n,lighting_uDiffuse:e,lighting_uShininess:i,lighting_uSpecularColor:o.map(r=>r/255)}}function ue(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ke;if(!("material"in t))return{};const{material:n}=t;return n?Ge(n):{lighting_uEnabled:!1}}const Ne={name:"gouraud-lighting",dependencies:[ae],vs:ce,defines:{LIGHTING_VERTEX:1},getUniforms:ue},Ot={name:"phong-lighting",dependencies:[ae],fs:ce,defines:{LIGHTING_FRAGMENT:1},getUniforms:ue},ge={CLOCKWISE:1,COUNTER_CLOCKWISE:-1};function pe(t,n,e={}){return De(t,e)!==n?(Ue(t,e),!0):!1}function De(t,n={}){return Math.sign(We(t,n))}function We(t,n={}){const{start:e=0,end:i=t.length}=n,o=n.size||2;let r=0;for(let s=e,l=i-o;s<i;s+=o)r+=(t[s]-t[l])*(t[s+1]+t[l+1]),l=s;return r/2}function Ue(t,n){const{start:e=0,end:i=t.length,size:o=2}=n,r=(i-e)/o,s=Math.floor(r/2);for(let l=0;l<s;++l){const a=e+l*o,c=e+(r-1-l)*o;for(let p=0;p<o;++p){const u=t[a+p];t[a+p]=t[c+p],t[c+p]=u}}}var J={exports:{}};J.exports=D;J.exports.default=D;function D(t,n,e){e=e||2;var i=n&&n.length,o=i?n[0]*e:t.length,r=de(t,0,o,e,!0),s=[];if(!r||r.next===r.prev)return s;var l,a,c,p,u,g,x;if(i&&(r=je(t,n,r,e)),t.length>80*e){l=c=t[0],a=p=t[1];for(var h=e;h<o;h+=e)u=t[h],g=t[h+1],u<l&&(l=u),g<a&&(a=g),u>c&&(c=u),g>p&&(p=g);x=Math.max(c-l,p-a),x=x!==0?32767/x:0}return b(r,s,e,l,a,x,0),s}function de(t,n,e,i,o){var r,s;if(o===j(t,n,e,i)>0)for(r=n;r<e;r+=i)s=ee(r,t[r],t[r+1],s);else for(r=e-i;r>=n;r-=i)s=ee(r,t[r],t[r+1],s);return s&&W(s,s.next)&&(T(s),s=s.next),s}function L(t,n){if(!t)return t;n||(n=t);var e=t,i;do if(i=!1,!e.steiner&&(W(e,e.next)||y(e.prev,e,e.next)===0)){if(T(e),e=n=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==n);return n}function b(t,n,e,i,o,r,s){if(t){!s&&r&&$e(t,i,o,r);for(var l=t,a,c;t.prev!==t.next;){if(a=t.prev,c=t.next,r?He(t,i,o,r):Be(t)){n.push(a.i/e|0),n.push(t.i/e|0),n.push(c.i/e|0),T(t),t=c.next,l=c.next;continue}if(t=c,t===l){s?s===1?(t=Ve(L(t),n,e),b(t,n,e,i,o,r,2)):s===2&&Ze(t,n,e,i,o,r):b(L(t),n,e,i,o,r,1);break}}}}function Be(t){var n=t.prev,e=t,i=t.next;if(y(n,e,i)>=0)return!1;for(var o=n.x,r=e.x,s=i.x,l=n.y,a=e.y,c=i.y,p=o<r?o<s?o:s:r<s?r:s,u=l<a?l<c?l:c:a<c?a:c,g=o>r?o>s?o:s:r>s?r:s,x=l>a?l>c?l:c:a>c?a:c,h=i.next;h!==n;){if(h.x>=p&&h.x<=g&&h.y>=u&&h.y<=x&&P(o,l,r,a,s,c,h.x,h.y)&&y(h.prev,h,h.next)>=0)return!1;h=h.next}return!0}function He(t,n,e,i){var o=t.prev,r=t,s=t.next;if(y(o,r,s)>=0)return!1;for(var l=o.x,a=r.x,c=s.x,p=o.y,u=r.y,g=s.y,x=l<a?l<c?l:c:a<c?a:c,h=p<u?p<g?p:g:u<g?u:g,_=l>a?l>c?l:c:a>c?a:c,m=p>u?p>g?p:g:u>g?u:g,Y=V(x,h,n,e,i),$=V(_,m,n,e,i),d=t.prevZ,f=t.nextZ;d&&d.z>=Y&&f&&f.z<=$;){if(d.x>=x&&d.x<=_&&d.y>=h&&d.y<=m&&d!==o&&d!==s&&P(l,p,a,u,c,g,d.x,d.y)&&y(d.prev,d,d.next)>=0||(d=d.prevZ,f.x>=x&&f.x<=_&&f.y>=h&&f.y<=m&&f!==o&&f!==s&&P(l,p,a,u,c,g,f.x,f.y)&&y(f.prev,f,f.next)>=0))return!1;f=f.nextZ}for(;d&&d.z>=Y;){if(d.x>=x&&d.x<=_&&d.y>=h&&d.y<=m&&d!==o&&d!==s&&P(l,p,a,u,c,g,d.x,d.y)&&y(d.prev,d,d.next)>=0)return!1;d=d.prevZ}for(;f&&f.z<=$;){if(f.x>=x&&f.x<=_&&f.y>=h&&f.y<=m&&f!==o&&f!==s&&P(l,p,a,u,c,g,f.x,f.y)&&y(f.prev,f,f.next)>=0)return!1;f=f.nextZ}return!0}function Ve(t,n,e){var i=t;do{var o=i.prev,r=i.next.next;!W(o,r)&&fe(o,i,i.next,r)&&I(o,r)&&I(r,o)&&(n.push(o.i/e|0),n.push(i.i/e|0),n.push(r.i/e|0),T(i),T(i.next),i=t=r),i=i.next}while(i!==t);return L(i)}function Ze(t,n,e,i,o,r){var s=t;do{for(var l=s.next.next;l!==s.prev;){if(s.i!==l.i&&et(s,l)){var a=he(s,l);s=L(s,s.next),a=L(a,a.next),b(s,n,e,i,o,r,0),b(a,n,e,i,o,r,0);return}l=l.next}s=s.next}while(s!==t)}function je(t,n,e,i){var o=[],r,s,l,a,c;for(r=0,s=n.length;r<s;r++)l=n[r]*i,a=r<s-1?n[r+1]*i:t.length,c=de(t,l,a,i,!1),c===c.next&&(c.steiner=!0),o.push(qe(c));for(o.sort(Xe),r=0;r<o.length;r++)e=Je(o[r],e);return e}function Xe(t,n){return t.x-n.x}function Je(t,n){var e=Ke(t,n);if(!e)return n;var i=he(e,t);return L(i,i.next),L(e,e.next)}function Ke(t,n){var e=n,i=t.x,o=t.y,r=-1/0,s;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){var l=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(l<=i&&l>r&&(r=l,s=e.x<e.next.x?e:e.next,l===i))return s}e=e.next}while(e!==n);if(!s)return null;var a=s,c=s.x,p=s.y,u=1/0,g;e=s;do i>=e.x&&e.x>=c&&i!==e.x&&P(o<p?i:r,o,c,p,o<p?r:i,o,e.x,e.y)&&(g=Math.abs(o-e.y)/(i-e.x),I(e,t)&&(g<u||g===u&&(e.x>s.x||e.x===s.x&&Ye(s,e)))&&(s=e,u=g)),e=e.next;while(e!==a);return s}function Ye(t,n){return y(t.prev,t,n.prev)<0&&y(n.next,t,t.next)<0}function $e(t,n,e,i){var o=t;do o.z===0&&(o.z=V(o.x,o.y,n,e,i)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==t);o.prevZ.nextZ=null,o.prevZ=null,Qe(o)}function Qe(t){var n,e,i,o,r,s,l,a,c=1;do{for(e=t,t=null,r=null,s=0;e;){for(s++,i=e,l=0,n=0;n<c&&(l++,i=i.nextZ,!!i);n++);for(a=c;l>0||a>0&&i;)l!==0&&(a===0||!i||e.z<=i.z)?(o=e,e=e.nextZ,l--):(o=i,i=i.nextZ,a--),r?r.nextZ=o:t=o,o.prevZ=r,r=o;e=i}r.nextZ=null,c*=2}while(s>1);return t}function V(t,n,e,i,o){return t=(t-e)*o|0,n=(n-i)*o|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t|n<<1}function qe(t){var n=t,e=t;do(n.x<e.x||n.x===e.x&&n.y<e.y)&&(e=n),n=n.next;while(n!==t);return e}function P(t,n,e,i,o,r,s,l){return(o-s)*(n-l)>=(t-s)*(r-l)&&(t-s)*(i-l)>=(e-s)*(n-l)&&(e-s)*(r-l)>=(o-s)*(i-l)}function et(t,n){return t.next.i!==n.i&&t.prev.i!==n.i&&!tt(t,n)&&(I(t,n)&&I(n,t)&&nt(t,n)&&(y(t.prev,t,n.prev)||y(t,n.prev,n))||W(t,n)&&y(t.prev,t,t.next)>0&&y(n.prev,n,n.next)>0)}function y(t,n,e){return(n.y-t.y)*(e.x-n.x)-(n.x-t.x)*(e.y-n.y)}function W(t,n){return t.x===n.x&&t.y===n.y}function fe(t,n,e,i){var o=M(y(t,n,e)),r=M(y(t,n,i)),s=M(y(e,i,t)),l=M(y(e,i,n));return!!(o!==r&&s!==l||o===0&&E(t,e,n)||r===0&&E(t,i,n)||s===0&&E(e,t,i)||l===0&&E(e,n,i))}function E(t,n,e){return n.x<=Math.max(t.x,e.x)&&n.x>=Math.min(t.x,e.x)&&n.y<=Math.max(t.y,e.y)&&n.y>=Math.min(t.y,e.y)}function M(t){return t>0?1:t<0?-1:0}function tt(t,n){var e=t;do{if(e.i!==t.i&&e.next.i!==t.i&&e.i!==n.i&&e.next.i!==n.i&&fe(e,e.next,t,n))return!0;e=e.next}while(e!==t);return!1}function I(t,n){return y(t.prev,t,t.next)<0?y(t,n,t.next)>=0&&y(t,t.prev,n)>=0:y(t,n,t.prev)<0||y(t,t.next,n)<0}function nt(t,n){var e=t,i=!1,o=(t.x+n.x)/2,r=(t.y+n.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&o<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==t);return i}function he(t,n){var e=new Z(t.i,t.x,t.y),i=new Z(n.i,n.x,n.y),o=t.next,r=n.prev;return t.next=n,n.prev=t,e.next=o,o.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function ee(t,n,e,i){var o=new Z(t,n,e);return i?(o.next=i.next,o.prev=i,i.next.prev=o,i.next=o):(o.prev=o,o.next=o),o}function T(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function Z(t,n,e){this.i=t,this.x=n,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}D.deviation=function(t,n,e,i){var o=n&&n.length,r=o?n[0]*e:t.length,s=Math.abs(j(t,0,r,e));if(o)for(var l=0,a=n.length;l<a;l++){var c=n[l]*e,p=l<a-1?n[l+1]*e:t.length;s-=Math.abs(j(t,c,p,e))}var u=0;for(l=0;l<i.length;l+=3){var g=i[l]*e,x=i[l+1]*e,h=i[l+2]*e;u+=Math.abs((t[g]-t[h])*(t[x+1]-t[g+1])-(t[g]-t[x])*(t[h+1]-t[g+1]))}return s===0&&u===0?0:Math.abs((u-s)/s)};function j(t,n,e,i){for(var o=0,r=n,s=e-i;r<e;r+=i)o+=(t[s]-t[r])*(t[r+1]+t[s+1]),s=r;return o}D.flatten=function(t){for(var n=t[0][0].length,e={vertices:[],holes:[],dimensions:n},i=0,o=0;o<t.length;o++){for(var r=0;r<t[o].length;r++)for(var s=0;s<n;s++)e.vertices.push(t[o][r][s]);o>0&&(i+=t[o-1].length,e.holes.push(i))}return e};var it=J.exports;const ot=Fe(it),O=ge.CLOCKWISE,te=ge.COUNTER_CLOCKWISE,v={isClosed:!0};function rt(t){if(t=t&&t.positions||t,!Array.isArray(t)&&!ArrayBuffer.isView(t))throw new Error("invalid polygon")}function S(t){return"positions"in t?t.positions:t}function R(t){return"holeIndices"in t?t.holeIndices:null}function st(t){return Array.isArray(t[0])}function lt(t){return t.length>=1&&t[0].length>=2&&Number.isFinite(t[0][0])}function at(t){const n=t[0],e=t[t.length-1];return n[0]===e[0]&&n[1]===e[1]&&n[2]===e[2]}function ct(t,n,e,i){for(let o=0;o<n;o++)if(t[e+o]!==t[i-n+o])return!1;return!0}function ne(t,n,e,i,o){let r=n;const s=e.length;for(let l=0;l<s;l++)for(let a=0;a<i;a++)t[r++]=e[l][a]||0;if(!at(e))for(let l=0;l<i;l++)t[r++]=e[0][l]||0;return v.start=n,v.end=r,v.size=i,pe(t,o,v),r}function ie(t,n,e,i,o=0,r,s){r=r||e.length;const l=r-o;if(l<=0)return n;let a=n;for(let c=0;c<l;c++)t[a++]=e[o+c];if(!ct(e,i,o,r))for(let c=0;c<i;c++)t[a++]=e[o+c];return v.start=n,v.end=a,v.size=i,pe(t,s,v),a}function ut(t,n){rt(t);const e=[],i=[];if("positions"in t){const{positions:o,holeIndices:r}=t;if(r){let s=0;for(let l=0;l<=r.length;l++)s=ie(e,s,o,n,r[l-1],r[l],l===0?O:te),i.push(s);return i.pop(),{positions:e,holeIndices:i}}t=o}if(!st(t))return ie(e,0,t,n,0,e.length,O),e;if(!lt(t)){let o=0;for(const[r,s]of t.entries())o=ne(e,o,s,n,r===0?O:te),i.push(o);return i.pop(),{positions:e,holeIndices:i}}return ne(e,0,t,n,O),e}function gt(t,n,e){let i=R(t);i&&(i=i.map(r=>r/n));let o=S(t);if(e){const r=o.length;o=o.slice();const s=[];for(let l=0;l<r;l+=n){s[0]=o[l],s[1]=o[l+1];const a=e(s);o[l]=a[0],o[l+1]=a[1]}}return ot(o,i,n)}class pt extends Ae{constructor(n){const{fp64:e,IndexType:i=Uint32Array}=n;super({...n,attributes:{positions:{size:3,type:e?Float64Array:Float32Array},vertexValid:{type:Uint8ClampedArray,size:1},indices:{type:i,size:1}}})}get(n){const{attributes:e}=this;return n==="indices"?e.indices&&e.indices.subarray(0,this.vertexCount):e[n]}updateGeometry(n){super.updateGeometry(n);const e=this.buffers.indices;if(e)this.vertexCount=(e.value||e).length;else if(this.data&&!this.getGeometry)throw new Error("missing indices buffer")}normalizeGeometry(n){if(this.normalize){const e=ut(n,this.positionSize);return this.opts.resolution?Ee(S(e),R(e),{size:this.positionSize,gridResolution:this.opts.resolution,edgeTypes:!0}):this.opts.wrapLongitude?Me(S(e),R(e),{size:this.positionSize,maxLatitude:86,edgeTypes:!0}):e}return n}getGeometrySize(n){if(oe(n)){let e=0;for(const i of n)e+=this.getGeometrySize(i);return e}return S(n).length/this.positionSize}getGeometryFromBuffer(n){return this.normalize||!this.buffers.indices?super.getGeometryFromBuffer(n):null}updateGeometryAttributes(n,e){if(n&&oe(n))for(const i of n){const o=this.getGeometrySize(i);e.geometrySize=o,this.updateGeometryAttributes(i,e),e.vertexStart+=o,e.indexStart=this.indexStarts[e.geometryIndex+1]}else this._updateIndices(n,e),this._updatePositions(n,e),this._updateVertexValid(n,e)}_updateIndices(n,{geometryIndex:e,vertexStart:i,indexStart:o}){const{attributes:r,indexStarts:s,typedArrayManager:l}=this;let a=r.indices;if(!a||!n)return;let c=o;const p=gt(n,this.positionSize,this.opts.preproject);a=l.allocate(a,o+p.length,{copy:!0});for(let u=0;u<p.length;u++)a[c++]=p[u]+i;s[e+1]=o+p.length,r.indices=a}_updatePositions(n,{vertexStart:e,geometrySize:i}){const{attributes:{positions:o},positionSize:r}=this;if(!o||!n)return;const s=S(n);for(let l=e,a=0;a<i;l++,a++){const c=s[a*r],p=s[a*r+1],u=r>2?s[a*r+2]:0;o[l*3]=c,o[l*3+1]=p,o[l*3+2]=u}}_updateVertexValid(n,{vertexStart:e,geometrySize:i}){const{positionSize:o}=this,r=this.attributes.vertexValid,s=n&&R(n);if(n&&n.edgeTypes?r.set(n.edgeTypes,e):r.fill(1,e,e+i),s)for(let l=0;l<s.length;l++)r[e+s[l]/o-1]=0;r[e+i-1]=0}}function oe(t){return Array.isArray(t)&&t.length>0&&!Number.isFinite(t[0])}const ye=`
attribute vec2 vertexPositions;
attribute float vertexValid;

uniform bool extruded;
uniform bool isWireframe;
uniform float elevationScale;
uniform float opacity;

varying vec4 vColor;

struct PolygonProps {
  vec4 fillColors;
  vec4 lineColors;
  vec3 positions;
  vec3 nextPositions;
  vec3 pickingColors;
  vec3 positions64Low;
  vec3 nextPositions64Low;
  float elevations;
};

vec3 project_offset_normal(vec3 vector) {
  if (project_uCoordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
    project_uCoordinateSystem == COORDINATE_SYSTEM_LNGLAT_OFFSETS) {
    // normals generated by the polygon tesselator are in lnglat offsets instead of meters
    return normalize(vector * project_uCommonUnitsPerWorldUnit);
  }
  return project_normal(vector);
}

void calculatePosition(PolygonProps props) {
#ifdef IS_SIDE_VERTEX
  if(vertexValid < 0.5){
    gl_Position = vec4(0.);
    return;
  }
#endif

  vec3 pos;
  vec3 pos64Low;
  vec3 normal;
  vec4 colors = isWireframe ? props.lineColors : props.fillColors;

  geometry.worldPosition = props.positions;
  geometry.worldPositionAlt = props.nextPositions;
  geometry.pickingColor = props.pickingColors;

#ifdef IS_SIDE_VERTEX
  pos = mix(props.positions, props.nextPositions, vertexPositions.x);
  pos64Low = mix(props.positions64Low, props.nextPositions64Low, vertexPositions.x);
#else
  pos = props.positions;
  pos64Low = props.positions64Low;
#endif

  if (extruded) {
    pos.z += props.elevations * vertexPositions.y * elevationScale;
  }
  gl_Position = project_position_to_clipspace(pos, pos64Low, vec3(0.), geometry.position);

  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);

  if (extruded) {
  #ifdef IS_SIDE_VERTEX
    normal = vec3(
      props.positions.y - props.nextPositions.y + (props.positions64Low.y - props.nextPositions64Low.y),
      props.nextPositions.x - props.positions.x + (props.nextPositions64Low.x - props.positions64Low.x),
      0.0);
    normal = project_offset_normal(normal);
  #else
    normal = project_normal(vec3(0.0, 0.0, 1.0));
  #endif
    geometry.normal = normal;
    vec3 lightColor = lighting_getLightColor(colors.rgb, project_uCameraPosition, geometry.position.xyz, normal);
    vColor = vec4(lightColor, colors.a * opacity);
  } else {
    vColor = vec4(colors.rgb, colors.a * opacity);
  }
  DECKGL_FILTER_COLOR(vColor, geometry);
}
`,dt=`#define SHADER_NAME solid-polygon-layer-vertex-shader

attribute vec3 positions;
attribute vec3 positions64Low;
attribute float elevations;
attribute vec4 fillColors;
attribute vec4 lineColors;
attribute vec3 pickingColors;

`.concat(ye,`

void main(void) {
  PolygonProps props;

  props.positions = positions;
  props.positions64Low = positions64Low;
  props.elevations = elevations;
  props.fillColors = fillColors;
  props.lineColors = lineColors;
  props.pickingColors = pickingColors;

  calculatePosition(props);
}
`),ft=`#define SHADER_NAME solid-polygon-layer-vertex-shader-side
#define IS_SIDE_VERTEX


attribute vec3 instancePositions;
attribute vec3 nextPositions;
attribute vec3 instancePositions64Low;
attribute vec3 nextPositions64Low;
attribute float instanceElevations;
attribute vec4 instanceFillColors;
attribute vec4 instanceLineColors;
attribute vec3 instancePickingColors;

`.concat(ye,`

void main(void) {
  PolygonProps props;

  #if RING_WINDING_ORDER_CW == 1
    props.positions = instancePositions;
    props.positions64Low = instancePositions64Low;
    props.nextPositions = nextPositions;
    props.nextPositions64Low = nextPositions64Low;
  #else
    props.positions = nextPositions;
    props.positions64Low = nextPositions64Low;
    props.nextPositions = instancePositions;
    props.nextPositions64Low = instancePositions64Low;
  #endif
  props.elevations = instanceElevations;
  props.fillColors = instanceFillColors;
  props.lineColors = instanceLineColors;
  props.pickingColors = instancePickingColors;

  calculatePosition(props);
}
`),ht=`#define SHADER_NAME solid-polygon-layer-fragment-shader

precision highp float;

varying vec4 vColor;

void main(void) {
  gl_FragColor = vColor;

  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
}
`,N=[0,0,0,255],yt={filled:!0,extruded:!1,wireframe:!1,_normalize:!0,_windingOrder:"CW",elevationScale:{type:"number",min:0,value:1},getPolygon:{type:"accessor",value:t=>t.polygon},getElevation:{type:"accessor",value:1e3},getFillColor:{type:"accessor",value:N},getLineColor:{type:"accessor",value:N},material:!0},F={enter:(t,n)=>n.length?n.subarray(n.length-t.length):t};class K extends Le{constructor(...n){super(...n),A(this,"state",void 0)}getShaders(n){return super.getShaders({vs:n==="top"?dt:ft,fs:ht,defines:{RING_WINDING_ORDER_CW:!this.props._normalize&&this.props._windingOrder==="CCW"?0:1},modules:[Pe,Ne,_e]})}get wrapLongitude(){return!1}initializeState(){const{gl:n,viewport:e}=this.context;let{coordinateSystem:i}=this.props;e.isGeospatial&&i===U.DEFAULT&&(i=U.LNGLAT),this.setState({numInstances:0,polygonTesselator:new pt({preproject:i===U.LNGLAT&&e.projectFlat.bind(e),fp64:this.use64bitPositions(),IndexType:!n||me(n,Ce.ELEMENT_INDEX_UINT32)?Uint32Array:Uint16Array})});const o=this.getAttributeManager(),r=!0;o.remove(["instancePickingColors"]),o.add({indices:{size:1,isIndexed:!0,update:this.calculateIndices,noAlloc:r},positions:{size:3,type:5130,fp64:this.use64bitPositions(),transition:F,accessor:"getPolygon",update:this.calculatePositions,noAlloc:r,shaderAttributes:{positions:{vertexOffset:0,divisor:0},instancePositions:{vertexOffset:0,divisor:1},nextPositions:{vertexOffset:1,divisor:1}}},vertexValid:{size:1,divisor:1,type:5121,update:this.calculateVertexValid,noAlloc:r},elevations:{size:1,transition:F,accessor:"getElevation",shaderAttributes:{elevations:{divisor:0},instanceElevations:{divisor:1}}},fillColors:{size:this.props.colorFormat.length,type:5121,normalized:!0,transition:F,accessor:"getFillColor",defaultValue:N,shaderAttributes:{fillColors:{divisor:0},instanceFillColors:{divisor:1}}},lineColors:{size:this.props.colorFormat.length,type:5121,normalized:!0,transition:F,accessor:"getLineColor",defaultValue:N,shaderAttributes:{lineColors:{divisor:0},instanceLineColors:{divisor:1}}},pickingColors:{size:3,type:5121,accessor:(s,{index:l,target:a})=>this.encodePickingColor(s&&s.__source?s.__source.index:l,a),shaderAttributes:{pickingColors:{divisor:0},instancePickingColors:{divisor:1}}}})}getPickingInfo(n){const e=super.getPickingInfo(n),{index:i}=e,{data:o}=this.props;return o[0]&&o[0].__source&&(e.object=o.find(r=>r.__source.index===i)),e}disablePickingIndex(n){const{data:e}=this.props;if(e[0]&&e[0].__source)for(let i=0;i<e.length;i++)e[i].__source.index===n&&this._disablePickingIndex(i);else this._disablePickingIndex(n)}draw({uniforms:n}){const{extruded:e,filled:i,wireframe:o,elevationScale:r}=this.props,{topModel:s,sideModel:l,polygonTesselator:a}=this.state,c={...n,extruded:!!e,elevationScale:r};l&&(l.setInstanceCount(a.instanceCount-1),l.setUniforms(c),o&&(l.setDrawMode(3),l.setUniforms({isWireframe:!0}).draw()),i&&(l.setDrawMode(6),l.setUniforms({isWireframe:!1}).draw())),s&&(s.setVertexCount(a.vertexCount),s.setUniforms(c).draw())}updateState(n){super.updateState(n),this.updateGeometry(n);const{props:e,oldProps:i,changeFlags:o}=n,r=this.getAttributeManager();if(o.extensionsChanged||e.filled!==i.filled||e.extruded!==i.extruded){var l;(l=this.state.models)===null||l===void 0||l.forEach(a=>a.delete()),this.setState(this._getModels(this.context.gl)),r.invalidateAll()}}updateGeometry({props:n,oldProps:e,changeFlags:i}){if(i.dataChanged||i.updateTriggersChanged&&(i.updateTriggersChanged.all||i.updateTriggersChanged.getPolygon)){const{polygonTesselator:r}=this.state;if(r.instanceCount)return;const s=n.data.attributes||{};r.updateGeometry({data:n.data,normalize:n._normalize,geometryBuffer:s.getPolygon,buffers:s,getGeometry:n.getPolygon,positionFormat:n.positionFormat,wrapLongitude:n.wrapLongitude,resolution:this.context.viewport.resolution,fp64:this.use64bitPositions(),dataChanged:i.dataChanged}),this.setState({numInstances:r.instanceCount,startIndices:r.vertexStarts}),i.dataChanged||this.getAttributeManager().invalidateAll()}}_getModels(n){const{id:e,filled:i,extruded:o}=this.props;let r,s;if(i){const l=this.getShaders("top");l.defines.NON_INSTANCED_MODEL=1,r=new Q(n,{...l,id:"".concat(e,"-top"),drawMode:4,attributes:{vertexPositions:new Float32Array([0,1])},uniforms:{isWireframe:!1,isSideVertex:!1},vertexCount:0,isIndexed:!0})}return o&&(s=new Q(n,{...this.getShaders("side"),id:"".concat(e,"-side"),geometry:new Se({drawMode:1,vertexCount:4,attributes:{vertexPositions:{size:2,value:new Float32Array([1,0,0,0,0,1,1,1])}}}),instanceCount:0,isInstanced:1}),s.userData.excludeAttributes={indices:!0}),{models:[s,r].filter(Boolean),topModel:r,sideModel:s}}calculateIndices(n){const{polygonTesselator:e}=this.state;n.startIndices=e.indexStarts,n.value=e.get("indices")}calculatePositions(n){const{polygonTesselator:e}=this.state;n.startIndices=e.vertexStarts,n.value=e.get("positions")}calculateVertexValid(n){n.value=this.state.polygonTesselator.get("vertexValid")}}A(K,"defaultProps",yt);A(K,"layerName","SolidPolygonLayer");function xt({data:t,getIndex:n,dataRange:e,replace:i}){const{startRow:o=0,endRow:r=1/0}=e,s=t.length;let l=s,a=s;for(let g=0;g<s;g++){const x=n(t[g]);if(l>g&&x>=o&&(l=g),x>=r){a=g;break}}let c=l;const u=a-l!==i.length?t.slice(a):void 0;for(let g=0;g<i.length;g++)t[c++]=i[g];if(u){for(let g=0;g<u.length;g++)t[c++]=u[g];t.length=c}return{startRow:l,endRow:l+i.length}}function vt(t,n){if(!t)return null;const e="startIndices"in t?t.startIndices[n]:n,i=t.featureIds.value[e];return e!==-1?Lt(t,i,e):null}function Lt(t,n,e){const i={properties:{...t.properties[n]}};for(const o in t.numericProps)i.properties[o]=t.numericProps[o].value[e];return i}function Pt(t,n){const e={points:null,lines:null,polygons:null};for(const i in e){const o=t[i].globalFeatureIds.value;e[i]=new Uint8ClampedArray(o.length*3);const r=[];for(let s=0;s<o.length;s++)n(o[s],r),e[i][s*3+0]=r[0],e[i][s*3+1]=r[1],e[i][s*3+2]=r[2]}return e}const k={circle:{type:we,props:{filled:"filled",stroked:"stroked",lineWidthMaxPixels:"lineWidthMaxPixels",lineWidthMinPixels:"lineWidthMinPixels",lineWidthScale:"lineWidthScale",lineWidthUnits:"lineWidthUnits",pointRadiusMaxPixels:"radiusMaxPixels",pointRadiusMinPixels:"radiusMinPixels",pointRadiusScale:"radiusScale",pointRadiusUnits:"radiusUnits",pointAntialiasing:"antialiasing",pointBillboard:"billboard",getFillColor:"getFillColor",getLineColor:"getLineColor",getLineWidth:"getLineWidth",getPointRadius:"getRadius"}},icon:{type:be,props:{iconAtlas:"iconAtlas",iconMapping:"iconMapping",iconSizeMaxPixels:"sizeMaxPixels",iconSizeMinPixels:"sizeMinPixels",iconSizeScale:"sizeScale",iconSizeUnits:"sizeUnits",iconAlphaCutoff:"alphaCutoff",iconBillboard:"billboard",getIcon:"getIcon",getIconAngle:"getAngle",getIconColor:"getColor",getIconPixelOffset:"getPixelOffset",getIconSize:"getSize"}},text:{type:Ie,props:{textSizeMaxPixels:"sizeMaxPixels",textSizeMinPixels:"sizeMinPixels",textSizeScale:"sizeScale",textSizeUnits:"sizeUnits",textBackground:"background",textBackgroundPadding:"backgroundPadding",textFontFamily:"fontFamily",textFontWeight:"fontWeight",textLineHeight:"lineHeight",textMaxWidth:"maxWidth",textOutlineColor:"outlineColor",textOutlineWidth:"outlineWidth",textWordBreak:"wordBreak",textCharacterSet:"characterSet",textBillboard:"billboard",textFontSettings:"fontSettings",getText:"getText",getTextAngle:"getAngle",getTextColor:"getColor",getTextPixelOffset:"getPixelOffset",getTextSize:"getSize",getTextAnchor:"getTextAnchor",getTextAlignmentBaseline:"getAlignmentBaseline",getTextBackgroundColor:"getBackgroundColor",getTextBorderColor:"getBorderColor",getTextBorderWidth:"getBorderWidth"}}},G={type:Oe,props:{lineWidthUnits:"widthUnits",lineWidthScale:"widthScale",lineWidthMinPixels:"widthMinPixels",lineWidthMaxPixels:"widthMaxPixels",lineJointRounded:"jointRounded",lineCapRounded:"capRounded",lineMiterLimit:"miterLimit",lineBillboard:"billboard",getLineColor:"getColor",getLineWidth:"getWidth"}},X={type:K,props:{extruded:"extruded",filled:"filled",wireframe:"wireframe",elevationScale:"elevationScale",material:"material",getElevation:"getElevation",getFillColor:"getFillColor",getLineColor:"getLineColor"}};function C({type:t,props:n}){const e={};for(const i in n)e[i]=t.defaultProps[n[i]];return e}function H(t,n){const{transitions:e,updateTriggers:i}=t.props,o={updateTriggers:{},transitions:e&&{getPosition:e.geometry}};for(const r in n){const s=n[r];let l=t.props[r];r.startsWith("get")&&(l=t.getSubLayerAccessor(l),o.updateTriggers[s]=i[r],e&&(o.transitions[s]=e[r])),o[s]=l}return o}function _t(t){if(Array.isArray(t))return t;switch(w.assert(t.type,"GeoJSON does not have type"),t.type){case"Feature":return[t];case"FeatureCollection":return w.assert(Array.isArray(t.features),"GeoJSON does not have features array"),t.features;default:return[{geometry:t}]}}function re(t,n,e={}){const i={pointFeatures:[],lineFeatures:[],polygonFeatures:[],polygonOutlineFeatures:[]},{startRow:o=0,endRow:r=t.length}=e;for(let s=o;s<r;s++){const l=t[s],{geometry:a}=l;if(a)if(a.type==="GeometryCollection"){w.assert(Array.isArray(a.geometries),"GeoJSON does not have geometries array");const{geometries:c}=a;for(let p=0;p<c.length;p++){const u=c[p];se(u,i,n,l,s)}}else se(a,i,n,l,s)}return i}function se(t,n,e,i,o){const{type:r,coordinates:s}=t,{pointFeatures:l,lineFeatures:a,polygonFeatures:c,polygonOutlineFeatures:p}=n;if(!Ct(r,s)){w.warn("".concat(r," coordinates are malformed"))();return}switch(r){case"Point":l.push(e({geometry:t},i,o));break;case"MultiPoint":s.forEach(u=>{l.push(e({geometry:{type:"Point",coordinates:u}},i,o))});break;case"LineString":a.push(e({geometry:t},i,o));break;case"MultiLineString":s.forEach(u=>{a.push(e({geometry:{type:"LineString",coordinates:u}},i,o))});break;case"Polygon":c.push(e({geometry:t},i,o)),s.forEach(u=>{p.push(e({geometry:{type:"LineString",coordinates:u}},i,o))});break;case"MultiPolygon":s.forEach(u=>{c.push(e({geometry:{type:"Polygon",coordinates:u}},i,o)),u.forEach(g=>{p.push(e({geometry:{type:"LineString",coordinates:g}},i,o))})});break}}const mt={Point:1,MultiPoint:2,LineString:2,MultiLineString:3,Polygon:3,MultiPolygon:4};function Ct(t,n){let e=mt[t];for(w.assert(e,"Unknown GeoJSON type ".concat(t));n&&--e>0;)n=n[0];return n&&Number.isFinite(n[0])}function xe(){return{points:{},lines:{},polygons:{},polygonsOutline:{}}}function z(t){return t.geometry.coordinates}function St(t,n){const e=xe(),{pointFeatures:i,lineFeatures:o,polygonFeatures:r,polygonOutlineFeatures:s}=t;return e.points.data=i,e.points._dataDiff=n.pointFeatures&&(()=>n.pointFeatures),e.points.getPosition=z,e.lines.data=o,e.lines._dataDiff=n.lineFeatures&&(()=>n.lineFeatures),e.lines.getPath=z,e.polygons.data=r,e.polygons._dataDiff=n.polygonFeatures&&(()=>n.polygonFeatures),e.polygons.getPolygon=z,e.polygonsOutline.data=s,e.polygonsOutline._dataDiff=n.polygonOutlineFeatures&&(()=>n.polygonOutlineFeatures),e.polygonsOutline.getPath=z,e}function wt(t,n){const e=xe(),{points:i,lines:o,polygons:r}=t,s=Pt(t,n);return e.points.data={length:i.positions.value.length/i.positions.size,attributes:{...i.attributes,getPosition:i.positions,instancePickingColors:{size:3,value:s.points}},properties:i.properties,numericProps:i.numericProps,featureIds:i.featureIds},e.lines.data={length:o.pathIndices.value.length-1,startIndices:o.pathIndices.value,attributes:{...o.attributes,getPath:o.positions,instancePickingColors:{size:3,value:s.lines}},properties:o.properties,numericProps:o.numericProps,featureIds:o.featureIds},e.lines._pathType="open",e.polygons.data={length:r.polygonIndices.value.length-1,startIndices:r.polygonIndices.value,attributes:{...r.attributes,getPolygon:r.positions,pickingColors:{size:3,value:s.polygons}},properties:r.properties,numericProps:r.numericProps,featureIds:r.featureIds},e.polygons._normalize=!1,r.triangles&&(e.polygons.data.attributes.indices=r.triangles.value),e.polygonsOutline.data={length:r.primitivePolygonIndices.value.length-1,startIndices:r.primitivePolygonIndices.value,attributes:{...r.attributes,getPath:r.positions,instancePickingColors:{size:3,value:s.polygons}},properties:r.properties,numericProps:r.numericProps,featureIds:r.featureIds},e.polygonsOutline._pathType="open",e}const bt=["points","linestrings","polygons"],It={...C(k.circle),...C(k.icon),...C(k.text),...C(G),...C(X),stroked:!0,filled:!0,extruded:!1,wireframe:!1,iconAtlas:{type:"object",value:null},iconMapping:{type:"object",value:{}},getIcon:{type:"accessor",value:t=>t.properties.icon},getText:{type:"accessor",value:t=>t.properties.text},pointType:"circle",getRadius:{deprecatedFor:"getPointRadius"}};class ve extends Te{initializeState(){this.state={layerProps:{},features:{}}}updateState({props:n,changeFlags:e}){if(!e.dataChanged)return;const{data:i}=this.props,o=i&&"points"in i&&"polygons"in i&&"lines"in i;this.setState({binary:o}),o?this._updateStateBinary({props:n,changeFlags:e}):this._updateStateJSON({props:n,changeFlags:e})}_updateStateBinary({props:n,changeFlags:e}){const i=wt(n.data,this.encodePickingColor);this.setState({layerProps:i})}_updateStateJSON({props:n,changeFlags:e}){const i=_t(n.data),o=this.getSubLayerRow.bind(this);let r={};const s={};if(Array.isArray(e.dataChanged)){const a=this.state.features;for(const c in a)r[c]=a[c].slice(),s[c]=[];for(const c of e.dataChanged){const p=re(i,o,c);for(const u in a)s[u].push(xt({data:r[u],getIndex:g=>g.__source.index,dataRange:c,replace:p[u]}))}}else r=re(i,o);const l=St(r,s);this.setState({features:r,featuresDiff:s,layerProps:l})}getPickingInfo(n){const e=super.getPickingInfo(n),{index:i,sourceLayer:o}=e;return e.featureType=bt.find(r=>o.id.startsWith("".concat(this.id,"-").concat(r,"-"))),i>=0&&o.id.startsWith("".concat(this.id,"-points-text"))&&this.state.binary&&(e.index=this.props.data.points.globalFeatureIds.value[i]),e}_updateAutoHighlight(n){const e="".concat(this.id,"-points-"),i=n.featureType==="points";for(const o of this.getSubLayers())o.id.startsWith(e)===i&&o.updateAutoHighlight(n)}_renderPolygonLayer(){const{extruded:n,wireframe:e}=this.props,{layerProps:i}=this.state,o="polygons-fill",r=this.shouldRenderSubLayer(o,i.polygons.data)&&this.getSubLayerClass(o,X.type);if(r){const s=H(this,X.props),l=n&&e;return l||delete s.getLineColor,s.updateTriggers.lineColors=l,new r(s,this.getSubLayerProps({id:o,updateTriggers:s.updateTriggers}),i.polygons)}return null}_renderLineLayers(){const{extruded:n,stroked:e}=this.props,{layerProps:i}=this.state,o="polygons-stroke",r="linestrings",s=!n&&e&&this.shouldRenderSubLayer(o,i.polygonsOutline.data)&&this.getSubLayerClass(o,G.type),l=this.shouldRenderSubLayer(r,i.lines.data)&&this.getSubLayerClass(r,G.type);if(s||l){const a=H(this,G.props);return[s&&new s(a,this.getSubLayerProps({id:o,updateTriggers:a.updateTriggers}),i.polygonsOutline),l&&new l(a,this.getSubLayerProps({id:r,updateTriggers:a.updateTriggers}),i.lines)]}return null}_renderPointLayers(){const{pointType:n}=this.props,{layerProps:e,binary:i}=this.state;let{highlightedObjectIndex:o}=this.props;!i&&Number.isFinite(o)&&(o=e.points.data.findIndex(l=>l.__source.index===o));const r=new Set(n.split("+")),s=[];for(const l of r){const a="points-".concat(l),c=k[l],p=c&&this.shouldRenderSubLayer(a,e.points.data)&&this.getSubLayerClass(a,c.type);if(p){const u=H(this,c.props);let g=e.points;if(l==="text"&&i){const{instancePickingColors:x,...h}=g.data.attributes;g={...g,data:{...g.data,attributes:h}}}s.push(new p(u,this.getSubLayerProps({id:a,updateTriggers:u.updateTriggers,highlightedObjectIndex:o}),g))}}return s}renderLayers(){const{extruded:n}=this.props,e=this._renderPolygonLayer(),i=this._renderLineLayers(),o=this._renderPointLayers();return[!n&&e,i,o,n&&e]}getSubLayerAccessor(n){const{binary:e}=this.state;return!e||typeof n!="function"?super.getSubLayerAccessor(n):(i,o)=>{const{data:r,index:s}=o,l=vt(r,s);return n(l,o)}}}A(ve,"layerName","GeoJsonLayer");A(ve,"defaultProps",It);export{ve as G,ge as W,Ne as g,pe as m,Ot as p};
//# sourceMappingURL=geojson-layer-fc1115a7.js.map
