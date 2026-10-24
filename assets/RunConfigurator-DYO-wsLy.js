import{A as e,At as t,B as n,Et as r,I as i,J as a,L as o,M as s,N as c,O as l,X as u,et as d,n as f,o as p,pt as m,q as h,z as g}from"./index-CXcVv0t8.js";import{n as _,r as v,t as y}from"./XMLParser-DJLHTM9W.js";import{t as b}from"./browser-b9A4JHjE.js";function x(e){return String(e).replace(/--/g,`- -`).replace(/--/g,`- -`).replace(/-$/,`- `)}function S(e){return String(e).replace(/\]\]>/g,`]]]]><![CDATA[>`)}function C(e){return String(e).replace(/"/g,`&quot;`).replace(/'/g,`&apos;`)}var ee=`:A-Za-z_À-ÖØ-öø-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�`,w=`:A-Za-z_À-ÖØ-öø-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�\\-\\.\\d·̀-ͯ‿-⁀`,T=`:A-Za-z_À-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�𐀀-󯿿`,E=`:A-Za-z_À-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�𐀀-󯿿\\-\\.\\d·̀-ͯ҇‿-⁀`,D=(e,t,n=``)=>{let r=`[${e.replace(`:`,``)}][${t.replace(`:`,``)}]*`;return{name:RegExp(`^[${e}][${t}]*$`,n),ncName:RegExp(`^${r}$`,n),qName:RegExp(`^${r}(?::${r})?$`,n),nmToken:RegExp(`^[${t}]+$`,n),nmTokens:RegExp(`^[${t}]+(?:\\s+[${t}]+)*$`,n)}},O=D(ee,w),k=D(T,E,`u`),A=(e=`1.0`)=>e===`1.1`?k:O,j=(e,{xmlVersion:t=`1.0`}={})=>A(t).qName.test(e),M=`
`;function N(e,t){if(!Array.isArray(e)||e.length===0)return`1.0`;let n=e[0];if(B(n)===`?xml`){let e=n[`:@`];if(e){let n=t.attributeNamePrefix+`version`;if(e[n])return e[n]}}return`1.0`}function P(e,t,n,r,i){return!n.sanitizeName||j(e,{xmlVersion:i})?e:n.sanitizeName(e,{isAttribute:t,matcher:r.readOnly()})}function F(e,t){let n=``;t.format&&(n=M);let r=[];if(t.stopNodes&&Array.isArray(t.stopNodes))for(let e=0;e<t.stopNodes.length;e++){let n=t.stopNodes[e];typeof n==`string`?r.push(new v(n)):n instanceof v&&r.push(n)}let i=N(e,t),a=new _;return I(e,t,n,a,r,i)}function I(e,t,n,r,i,a){let o=``,s=!1;if(t.maxNestedTags&&r.getDepth()>t.maxNestedTags)throw Error(`Maximum nested tags exceeded`);if(!Array.isArray(e)){if(e!=null){let n=e.toString();return n=U(n,t),n}return``}for(let c=0;c<e.length;c++){let l=e[c],u=B(l);if(u===void 0)continue;let d=u===t.textNodeName||u===t.cdataPropName||u===t.commentPropName||u[0]===`?`?u:P(u,!1,t,r,a),f=L(l[`:@`],t);r.push(d,f);let p=H(r,i);if(d===t.textNodeName){let e=l[u];p||(e=t.tagValueProcessor(d,e),e=U(e,t)),s&&(o+=n),o+=e,s=!1,r.pop();continue}else if(d===t.cdataPropName){s&&(o+=n);let e=l[u][0][t.textNodeName],i=S(e);o+=`<![CDATA[${i}]]>`,s=!1,r.pop();continue}else if(d===t.commentPropName){let e=l[u][0][t.textNodeName],i=x(e);o+=n+`<!--${i}-->`,s=!0,r.pop();continue}else if(d[0]===`?`){let e=V(l[`:@`],t,p,r,a);o+=(d===`?xml`?``:n)+`<${d}${e}?>`,s=!0,r.pop();continue}let m=n;m!==``&&(m+=t.indentBy);let h=n+`<${d}${V(l[`:@`],t,p,r,a)}`,g;g=p?R(l[u],t):I(l[u],t,m,r,i,a),t.unpairedTags.indexOf(d)===-1?(!g||g.length===0)&&t.suppressEmptyNode?o+=h+`/>`:g&&g.endsWith(`>`)?o+=h+`>${g}${n}</${d}>`:(o+=h+`>`,g&&n!==``&&(g.includes(`/>`)||g.includes(`</`))?o+=n+t.indentBy+g+n:o+=g,o+=`</${d}>`):t.suppressUnpairedNode?o+=h+`>`:o+=h+`/>`,s=!0,r.pop()}return o}function L(e,t){if(!e||t.ignoreAttributes)return null;let n={},r=!1;for(let i in e){if(!Object.prototype.hasOwnProperty.call(e,i))continue;let a=i.startsWith(t.attributeNamePrefix)?i.substr(t.attributeNamePrefix.length):i;n[a]=C(e[i]),r=!0}return r?n:null}function R(e,t){if(!Array.isArray(e))return e==null?``:e.toString();let n=``;for(let r=0;r<e.length;r++){let i=e[r],a=B(i);if(a===t.textNodeName)n+=i[a];else if(a===t.cdataPropName)n+=i[a][0][t.textNodeName];else if(a===t.commentPropName)n+=i[a][0][t.textNodeName];else if(a&&a[0]===`?`)continue;else if(a){let e=z(i[`:@`],t),r=R(i[a],t);!r||r.length===0?n+=`<${a}${e}/>`:n+=`<${a}${e}>${r}</${a}>`}}return n}function z(e,t){let n=``;if(e&&!t.ignoreAttributes)for(let r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;let i=e[r];i===!0&&t.suppressBooleanAttributes?n+=` ${r.substr(t.attributeNamePrefix.length)}`:n+=` ${r.substr(t.attributeNamePrefix.length)}="${C(i)}"`}return n}function B(e){let t=Object.keys(e);for(let n=0;n<t.length;n++){let r=t[n];if(Object.prototype.hasOwnProperty.call(e,r)&&r!==`:@`)return r}}function V(e,t,n,r,i){let a=``;if(e&&!t.ignoreAttributes)for(let o in e){if(!Object.prototype.hasOwnProperty.call(e,o))continue;let s=o.substr(t.attributeNamePrefix.length),c=n?s:P(s,!0,t,r,i),l;n?l=e[o]:(l=t.attributeValueProcessor(o,e[o]),l=U(l,t)),l===!0&&t.suppressBooleanAttributes?a+=` ${c}`:a+=` ${c}="${C(l)}"`}return a}function H(e,t){if(!t||t.length===0)return!1;for(let n=0;n<t.length;n++)if(e.matches(t[n]))return!0;return!1}function U(e,t){if(e&&e.length>0&&t.processEntities)for(let n=0;n<t.entities.length;n++){let r=t.entities[n];e=e.replace(r.regex,r.val)}return e}function W(e){return typeof e==`function`?e:Array.isArray(e)?t=>{for(let n of e)if(typeof n==`string`&&t===n||n instanceof RegExp&&n.test(t))return!0}:()=>!1}var G={attributeNamePrefix:`@_`,attributesGroupName:!1,textNodeName:`#text`,ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:`  `,suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(e,t){return t},attributeValueProcessor:function(e,t){return t},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:RegExp(`&`,`g`),val:`&amp;`},{regex:RegExp(`>`,`g`),val:`&gt;`},{regex:RegExp(`<`,`g`),val:`&lt;`},{regex:RegExp(`'`,`g`),val:`&apos;`},{regex:RegExp(`"`,`g`),val:`&quot;`}],processEntities:!0,stopNodes:[],oneListGroup:!1,maxNestedTags:100,jPath:!0,sanitizeName:!1};function K(e){if(this.options=Object.assign({},G,e),this.options.stopNodes&&Array.isArray(this.options.stopNodes)&&(this.options.stopNodes=this.options.stopNodes.map(e=>typeof e==`string`&&e.startsWith(`*.`)?`..`+e.substring(2):e)),this.stopNodeExpressions=[],this.options.stopNodes&&Array.isArray(this.options.stopNodes))for(let e=0;e<this.options.stopNodes.length;e++){let t=this.options.stopNodes[e];typeof t==`string`?this.stopNodeExpressions.push(new v(t)):t instanceof v&&this.stopNodeExpressions.push(t)}this.options.ignoreAttributes===!0||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.ignoreAttributesFn=W(this.options.ignoreAttributes),this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=Z),this.processTextOrObjNode=Y,this.options.format?(this.indentate=X,this.tagEndChar=`>
`,this.newLine=`
`):(this.indentate=function(){return``},this.tagEndChar=`>`,this.newLine=``)}function q(e,t){let n=e[`?xml`];if(n&&typeof n==`object`){if(t.attributesGroupName&&n[t.attributesGroupName]){let e=n[t.attributesGroupName][t.attributeNamePrefix+`version`];if(e)return e}let e=n[t.attributeNamePrefix+`version`];if(e)return e}return`1.0`}function J(e,t,n,r,i){return!n.sanitizeName||j(e,{xmlVersion:i})?e:n.sanitizeName(e,{isAttribute:t,matcher:r.readOnly()})}K.prototype.build=function(e){if(this.options.preserveOrder)return F(e,this.options);{Array.isArray(e)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(e={[this.options.arrayNodeName]:e});let t=new _,n=q(e,this.options);return this.j2x(e,0,t,n).val}},K.prototype.j2x=function(e,t,n,r){let i=``,a=``;if(this.options.maxNestedTags&&n.getDepth()>=this.options.maxNestedTags)throw Error(`Maximum nested tags exceeded`);let o=this.options.jPath?n.toString():n,s=this.checkStopNode(n);for(let c in e){if(!Object.prototype.hasOwnProperty.call(e,c))continue;let l=c===this.options.textNodeName||c===this.options.cdataPropName||c===this.options.commentPropName||this.options.attributesGroupName&&c===this.options.attributesGroupName||this.isAttribute(c)||c[0]===`?`?c:J(c,!1,this.options,n,r);if(e[c]===void 0)this.isAttribute(c)&&(a+=``);else if(e[c]===null)this.isAttribute(c)||l===this.options.cdataPropName||l===this.options.commentPropName?a+=``:l[0]===`?`?a+=this.indentate(t)+`<`+l+`?`+this.tagEndChar:a+=this.indentate(t)+`<`+l+`/`+this.tagEndChar;else if(e[c]instanceof Date)a+=this.buildTextValNode(e[c],l,``,t,n);else if(typeof e[c]!=`object`){let u=this.isAttribute(c);if(u&&!this.ignoreAttributesFn(u,o)){let t=J(u,!0,this.options,n,r);i+=this.buildAttrPairStr(t,``+e[c],s)}else if(!u)if(c===this.options.textNodeName){let t=this.options.tagValueProcessor(c,``+e[c]);a+=this.replaceEntitiesValue(t)}else{n.push(l);let r=this.checkStopNode(n);if(n.pop(),r){let n=``+e[c];n===``?a+=this.indentate(t)+`<`+l+this.closeTag(l)+this.tagEndChar:a+=this.indentate(t)+`<`+l+`>`+n+`</`+l+this.tagEndChar}else a+=this.buildTextValNode(e[c],l,``,t,n)}}else if(Array.isArray(e[c])){let i=e[c].length,o=``,s=``;for(let u=0;u<i;u++){let i=e[c][u];if(i!==void 0)if(i===null)l[0]===`?`?a+=this.indentate(t)+`<`+l+`?`+this.tagEndChar:a+=this.indentate(t)+`<`+l+`/`+this.tagEndChar;else if(typeof i==`object`)if(this.options.oneListGroup){n.push(l);let e=this.j2x(i,t+1,n,r);n.pop(),o+=e.val,this.options.attributesGroupName&&i.hasOwnProperty(this.options.attributesGroupName)&&(s+=e.attrStr)}else o+=this.processTextOrObjNode(i,l,t,n,r);else if(this.options.oneListGroup){let e=this.options.tagValueProcessor(l,i);e=this.replaceEntitiesValue(e),o+=e}else{n.push(l);let e=this.checkStopNode(n);if(n.pop(),e){let e=``+i;e===``?o+=this.indentate(t)+`<`+l+this.closeTag(l)+this.tagEndChar:o+=this.indentate(t)+`<`+l+`>`+e+`</`+l+this.tagEndChar}else o+=this.buildTextValNode(i,l,``,t,n)}}this.options.oneListGroup&&(o=this.buildObjectNode(o,l,s,t)),a+=o}else if(this.options.attributesGroupName&&c===this.options.attributesGroupName){let t=Object.keys(e[c]),a=t.length;for(let o=0;o<a;o++){let a=J(t[o],!0,this.options,n,r);i+=this.buildAttrPairStr(a,``+e[c][t[o]],s)}}else a+=this.processTextOrObjNode(e[c],l,t,n,r)}return{attrStr:i,val:a}},K.prototype.buildAttrPairStr=function(e,t,n){return n||(t=this.options.attributeValueProcessor(e,``+t),t=this.replaceEntitiesValue(t)),this.options.suppressBooleanAttributes&&t===`true`?` `+e:` `+e+`="`+C(t)+`"`};function Y(e,t,n,r,i){let a=this.extractAttributes(e);if(r.push(t,a),this.checkStopNode(r)){let i=this.buildRawContent(e),a=this.buildAttributesForStopNode(e);return r.pop(),this.buildObjectNode(i,t,a,n)}let o=this.j2x(e,n+1,r,i);return r.pop(),t[0]===`?`?this.buildTextValNode(``,t,o.attrStr,n,r):e[this.options.textNodeName]!==void 0&&Object.keys(e).length===1?this.buildTextValNode(e[this.options.textNodeName],t,o.attrStr,n,r):this.buildObjectNode(o.val,t,o.attrStr,n)}K.prototype.extractAttributes=function(e){if(!e||typeof e!=`object`)return null;let t={},n=!1;if(this.options.attributesGroupName&&e[this.options.attributesGroupName]){let r=e[this.options.attributesGroupName];for(let e in r){if(!Object.prototype.hasOwnProperty.call(r,e))continue;let i=e.startsWith(this.options.attributeNamePrefix)?e.substring(this.options.attributeNamePrefix.length):e;t[i]=C(r[e]),n=!0}}else for(let r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;let i=this.isAttribute(r);i&&(t[i]=C(e[r]),n=!0)}return n?t:null},K.prototype.buildRawContent=function(e){if(typeof e==`string`)return e;if(typeof e!=`object`||!e)return String(e);if(e[this.options.textNodeName]!==void 0)return e[this.options.textNodeName];let t=``;for(let n in e){if(!Object.prototype.hasOwnProperty.call(e,n)||this.isAttribute(n)||this.options.attributesGroupName&&n===this.options.attributesGroupName)continue;let r=e[n];if(n===this.options.textNodeName)t+=r;else if(Array.isArray(r)){for(let e of r)if(typeof e==`string`||typeof e==`number`)t+=`<${n}>${e}</${n}>`;else if(typeof e==`object`&&e){let r=this.buildRawContent(e),i=this.buildAttributesForStopNode(e);r===``?t+=`<${n}${i}/>`:t+=`<${n}${i}>${r}</${n}>`}}else if(typeof r==`object`&&r){let e=this.buildRawContent(r),i=this.buildAttributesForStopNode(r);e===``?t+=`<${n}${i}/>`:t+=`<${n}${i}>${e}</${n}>`}else t+=`<${n}>${r}</${n}>`}return t},K.prototype.buildAttributesForStopNode=function(e){if(!e||typeof e!=`object`)return``;let t=``;if(this.options.attributesGroupName&&e[this.options.attributesGroupName]){let n=e[this.options.attributesGroupName];for(let e in n){if(!Object.prototype.hasOwnProperty.call(n,e))continue;let r=e.startsWith(this.options.attributeNamePrefix)?e.substring(this.options.attributeNamePrefix.length):e,i=n[e];i===!0&&this.options.suppressBooleanAttributes?t+=` `+r:t+=` `+r+`="`+i+`"`}}else for(let n in e){if(!Object.prototype.hasOwnProperty.call(e,n))continue;let r=this.isAttribute(n);if(r){let i=e[n];i===!0&&this.options.suppressBooleanAttributes?t+=` `+r:t+=` `+r+`="`+i+`"`}}return t},K.prototype.buildObjectNode=function(e,t,n,r){if(e===``)return t[0]===`?`?this.indentate(r)+`<`+t+n+`?`+this.tagEndChar:this.indentate(r)+`<`+t+n+this.closeTag(t)+this.tagEndChar;if(t[0]===`?`)return this.indentate(r)+`<`+t+n+`?`+this.tagEndChar;{let i=`</`+t+this.tagEndChar,a=``;return t[0]===`?`&&(a=`?`,i=``),(n||n===``)&&e.indexOf(`<`)===-1?this.indentate(r)+`<`+t+n+a+`>`+e+i:this.options.commentPropName!==!1&&t===this.options.commentPropName&&a.length===0?this.indentate(r)+`<!--${e}-->`+this.newLine:this.indentate(r)+`<`+t+n+a+this.tagEndChar+e+this.indentate(r)+i}},K.prototype.closeTag=function(e){let t=``;return this.options.unpairedTags.indexOf(e)===-1?t=this.options.suppressEmptyNode?`/`:`></${e}`:this.options.suppressUnpairedNode||(t=`/`),t},K.prototype.checkStopNode=function(e){if(!this.stopNodeExpressions||this.stopNodeExpressions.length===0)return!1;for(let t=0;t<this.stopNodeExpressions.length;t++)if(e.matches(this.stopNodeExpressions[t]))return!0;return!1},K.prototype.buildTextValNode=function(e,t,n,r,i){if(this.options.cdataPropName!==!1&&t===this.options.cdataPropName){let t=S(e);return this.indentate(r)+`<![CDATA[${t}]]>`+this.newLine}else if(this.options.commentPropName!==!1&&t===this.options.commentPropName){let t=x(e);return this.indentate(r)+`<!--${t}-->`+this.newLine}else if(t[0]===`?`)return this.indentate(r)+`<`+t+n+`?`+this.tagEndChar;else{let i=this.options.tagValueProcessor(t,e);return i=this.replaceEntitiesValue(i),i===``?this.indentate(r)+`<`+t+n+this.closeTag(t)+this.tagEndChar:this.indentate(r)+`<`+t+n+`>`+i+`</`+t+this.tagEndChar}},K.prototype.replaceEntitiesValue=function(e){if(e&&e.length>0&&this.options.processEntities)for(let t=0;t<this.options.entities.length;t++){let n=this.options.entities[t];e=e.replace(n.regex,n.val)}return e};function X(e){return this.options.indentBy.repeat(e)}function Z(e){return e.startsWith(this.options.attributeNamePrefix)&&e!==this.options.textNodeName?e.substr(this.attrPrefixLen):!1}var Q=K,te=`# MATSim run configurator - config.xml edit fields

sections:
  - title: General settings
    entries:
      - xml: controler.param
        name: runId
        title: 'Name of the run'
        type: text
        value: ''

      - xml: controler.param
        name: lastIteration
        title: 'Number of iterations'
        type: number
        value: '1'

      - xml: controler.param
        name: writeEventsInterval
        title: 'Write events every n iterations'
        type: number
        value: '50'

      - xml: controler.param
        name: writePlansInterval
        title: 'Write plans every n iterations'
        type: number
        value: '50'
        hint: 'Set to 0 to disable writing plans'

  - title: Mobility simulation
    entries:
      - xml: qsim.param
        name: endTime
        title: 'End time'
        type: text
        value: '24:00:00'

      - xml: qsim.param
        name: flowCapacityFactor
        title: 'Flow capacity factor'
        type: number
        value: '0.10'

      - xml: qsim.param
        name: storageCapacityFactor
        title: 'Storage capacity factor'
        type: number
        value: '0.10'

      - xml: qsim.param
        name: mainMode
        title: 'Main modes'
        type: text
        value: 'car,freight'

      - xml: qsim.param
        name: stuckTime
        title: 'Stuck time (minutes)'
        type: number
        value: '30.0'

      - xml: qsim.param
        name: trafficDynamics
        title: 'Traffic Dynamics'
        type: selection
        options:
          - kinematicWaves
          - other
        value: 'kinematicWaves'
`,ne=`<?xml version="1.0" encoding="UTF-8"?>\r
<!DOCTYPE config SYSTEM "http://www.matsim.org/files/dtd/config_v2.dtd">\r
<config>\r
	<module name="TimeAllocationMutator" >\r
		<param name="mutationRange" value="7200.0" />\r
	</module>\r
	<module name="controler" >\r
		<param name="lastIteration" value="250" />\r
		<param name="overwriteFiles" value="failIfDirectoryExists" />\r
		<param name="runId" value="berlin-v5.5-1pct" />\r
		<param name="outputDirectory" value="./scenarios/berlin-v5.5-1pct/output-berlin-v5.5-1pct" />\r
		<param name="writeEventsInterval" value="50" />\r
		<param name="writePlansInterval" value="50" />\r
	</module>\r
	<module name="global" >\r
		<param name="coordinateSystem" value="EPSG:31468" />\r
		<param name="insistingOnDeprecatedConfigVersion" value="false" />\r
		<param name="numberOfThreads" value="8" />\r
	</module>\r
	<module name="network" >\r
		<param name="inputNetworkFile" value="https://svn.vsp.tu-berlin.de/repos/public-svn/matsim/scenarios/countries/de/berlin/berlin-v5.5-10pct/input/berlin-v5.5-network.xml.gz" />\r
	</module>\r
	<module name="plans" >\r
		<param name="inputPlansFile" value="https://svn.vsp.tu-berlin.de/repos/public-svn/matsim/scenarios/countries/de/berlin/berlin-v5.5-1pct/input/berlin-v5.5-1pct.plans.xml.gz" />\r
		<param name="removingUnnecessaryPlanAttributes" value="true" />\r
	</module>\r
	<module name="vehicles" >\r
		<param name="vehiclesFile" value="https://svn.vsp.tu-berlin.de/repos/public-svn/matsim/scenarios/countries/de/berlin/berlin-v5.5-10pct/input/berlin-v5-mode-vehicle-types.xml" />\r
	</module>\r
	<module name="transit" >\r
		<param name="transitScheduleFile" value="https://svn.vsp.tu-berlin.de/repos/public-svn/matsim/scenarios/countries/de/berlin/berlin-v5.5-10pct/input/berlin-v5.5-transit-schedule.xml.gz" />\r
		<param name="useTransit" value="true" />\r
		<param name="vehiclesFile" value="https://svn.vsp.tu-berlin.de/repos/public-svn/matsim/scenarios/countries/de/berlin/berlin-v5.5-10pct/input/berlin-v5.5-transit-vehicles.xml.gz" />\r
	</module>\r
	<module name="planscalcroute" >\r
		<param name="networkModes" value="car,freight,ride" />\r
		<parameterset type="teleportedModeParameters" >\r
			<param name="beelineDistanceFactor" value="1.3" />\r
			<param name="mode" value="bicycle" />\r
			<param name="teleportedModeSpeed" value="3.1388889" />\r
		</parameterset>\r
		<parameterset type="teleportedModeParameters" >\r
			<param name="beelineDistanceFactor" value="1.3" />\r
			<param name="mode" value="walk" />\r
			<param name="teleportedModeSpeed" value="1.0555556" />\r
		</parameterset>\r
	</module>\r
	<module name="qsim" >\r
		<param name="endTime" value="36:00:00" />\r
		<param name="flowCapacityFactor" value="0.015" />\r
		<param name="mainMode" value="car,freight" />\r
		<param name="numberOfThreads" value="8" />\r
		<param name="startTime" value="00:00:00" />\r
		<param name="storageCapacityFactor" value="0.015" />\r
		<param name="stuckTime" value="30.0" />\r
		<param name="trafficDynamics" value="kinematicWaves" />\r
		<param name="vehiclesSource" value="modeVehicleTypesFromVehiclesData" />\r
		<param name="insertingWaitingVehiclesBeforeDrivingVehicles" value="true" />\r
	</module>\r
	<module name="strategy" >\r
		<param name="fractionOfIterationsToDisableInnovation" value="0.8" />\r
		<parameterset type="strategysettings" >\r
			<param name="strategyName" value="ChangeExpBeta" />\r
			<param name="subpopulation" value="person" />\r
			<param name="weight" value="0.85" />\r
		</parameterset>\r
		<parameterset type="strategysettings" >\r
			<param name="strategyName" value="ReRoute" />\r
			<param name="subpopulation" value="person" />\r
			<param name="weight" value="0.05" />\r
		</parameterset>\r
		<parameterset type="strategysettings" >\r
			<param name="strategyName" value="SubtourModeChoice" />\r
			<param name="subpopulation" value="person" />\r
			<param name="weight" value="0.05" />\r
		</parameterset>\r
		<parameterset type="strategysettings" >\r
			<param name="strategyName" value="TimeAllocationMutator" />\r
			<param name="subpopulation" value="person" />\r
			<param name="weight" value="0.05" />\r
		</parameterset>\r
		<parameterset type="strategysettings" >\r
			<param name="strategyName" value="ChangeExpBeta" />\r
			<param name="subpopulation" value="freight" />\r
			<param name="weight" value="0.95" />\r
		</parameterset>\r
		<parameterset type="strategysettings" >\r
			<param name="strategyName" value="ReRoute" />\r
			<param name="subpopulation" value="freight" />\r
			<param name="weight" value="0.05" />\r
		</parameterset>\r
	</module>\r
	<module name="subtourModeChoice" >\r
		<param name="chainBasedModes" value="car,bicycle" />\r
		<param name="modes" value="car,pt,bicycle,walk" />\r
	</module>\r
	<module name="transitRouter" >\r
		<param name="extensionRadius" value="500.0" />\r
	</module>\r
	<module name="travelTimeCalculator" >\r
		<param name="analyzedModes" value="car,freight" />\r
		<param name="separateModes" value="true" />\r
	</module>\r
	<module name="vspExperimental" >\r
		<param name="vspDefaultsCheckingLevel" value="abort" />\r
	</module>\r
	<module name="planCalcScore" >\r
		<param name="fractionOfIterationsToStartScoreMSA" value="1.0" />\r
		<parameterset type="scoringParameters" >\r
			<param name="marginalUtilityOfMoney" value="0.6" />\r
			<parameterset type="modeParams" >\r
				<!--set this to -0.9 during income calibration process-->\r
				<param name="constant" value="-1.0" />\r
				<param name="marginalUtilityOfTraveling_util_hr" value="0.0" />\r
				<param name="mode" value="car" />\r
				<param name="monetaryDistanceRate" value="-0.0002" />\r
				<param name="dailyMonetaryConstant" value="-5.3" />\r
			</parameterset>\r
			<parameterset type="modeParams" >\r
				<param name="constant" value="-0.0" />\r
				<param name="marginalUtilityOfTraveling_util_hr" value="0.0" />\r
				<param name="mode" value="ride" />\r
				<param name="monetaryDistanceRate" value="-0.0002" />\r
				<param name="dailyMonetaryConstant" value="-0.0" />\r
			</parameterset>\r
			<parameterset type="modeParams" >\r
				<param name="marginalUtilityOfTraveling_util_hr" value="0.0" />\r
				<param name="mode" value="freight" />\r
				<param name="monetaryDistanceRate" value="-0.0004" />\r
			</parameterset>\r
			<parameterset type="modeParams" >\r
				<param name="constant" value="-0.3" />\r
				<param name="marginalUtilityOfTraveling_util_hr" value="0.0" />\r
				<param name="mode" value="pt" />\r
				<param name="dailyMonetaryConstant" value="-2.1" />\r
			</parameterset>\r
			<parameterset type="modeParams" >\r
				<param name="constant" value="-1.8" />\r
				<param name="marginalUtilityOfTraveling_util_hr" value="0.0" />\r
				<param name="mode" value="bicycle" />\r
			</parameterset>\r
			<parameterset type="modeParams" >\r
				<param name="marginalUtilityOfTraveling_util_hr" value="0.0" />\r
				<param name="mode" value="walk" />\r
			</parameterset>\r
		</parameterset>\r
	</module>\r
\r
	<module name="transitRouter">\r
		<!-- Factor with which direct walk generalized cost is multiplied before it is compared to the pt generalized cost.  Set to a very high value to reduce direct walk results. -->\r
		<param name="directWalkFactor" value="1.0" />\r
		<!-- maximum beeline distance between stops that agents could transfer to by walking -->\r
		<param name="maxBeelineWalkConnectionDistance" value="300.0" />\r
	</module>\r
</config>\r
`;n();var re=g({name:`RunConfigurator`,components:{},i18n:{messages:{en:{},de:{}}},props:{id:{type:String,required:!0},model:{type:String,required:!1},xml:{type:Object,required:!1}},data:()=>({globalState:p.state,sections:[],activeSection:-1,xmlConfig:{}}),mounted(){this.$store.commit(`setShowLeftBar`,!0);let e=b.parse(te);console.log({yaml:e}),this.sections=e.sections,this.setupXml(),this.activeSection=0},watch:{},computed:{isDark(){return this.$store.state.isDarkMode}},methods:{setupXml(){let e=new y({ignoreAttributes:!1,preserveOrder:!1,attributeNamePrefix:`$`});try{this.xmlConfig=e.parse(ne)}catch(e){throw console.error(`WHAT`,e),Error(``+e)}for(let e of this.sections)for(let t of e.entries){let[e,n]=t.xml.split(`.`),r=this.xmlConfig.config.module.find(t=>t.$name==e);n==`param`&&(t.value=r.param.find(e=>e.$name==t.name).$value)}},update(){for(let e of this.sections)for(let t of e.entries){let[e,n]=t.xml.split(`.`),r=this.xmlConfig.config.module.find(t=>t.$name==e);if(n==`param`){let e=r.param.find(e=>e.$name==t.name);e.$value=t.value}}console.log(this.xmlConfig);let e=new Q({format:!0,ignoreAttributes:!1,attributeNamePrefix:`$`,suppressUnpairedNode:!0,suppressEmptyNode:!0}).build(this.xmlConfig);console.log(e)},switchSection(e){this.activeSection=e}}});n(),m();var ie={class:`configurator`},ae={class:`content`},$={class:`section-panel`},oe=[`onClick`],se={key:0,class:`details-panel`},ce={class:`buttons`},le={class:`entry`};function ue(n,f,p,m,g,_){let v=u(`o-button`),y=u(`o-input`);return h(),c(`div`,ie,[e(`div`,ae,[e(`div`,$,[(h(!0),c(l,null,a(n.sections,(i,a)=>(h(),c(`div`,{class:`config-section`,key:i.name,onClick:e=>n.switchSection(a)},[e(`p`,{class:r({active:n.activeSection==a})},t(i.title),3)],8,oe))),128))]),n.activeSection>-1?(h(),c(`div`,se,[e(`div`,ce,[o(v,null,{default:d(()=>[...f[0]||=[i(`Cancel`,-1)]]),_:1}),o(v,{variant:`success`,onClick:n.update},{default:d(()=>[...f[1]||=[i(`Save`,-1)]]),_:1},8,[`onClick`])]),(h(!0),c(l,null,a(n.sections[n.activeSection].entries,n=>(h(),c(`div`,le,[e(`p`,null,t(n.title),1),o(y,{type:`text`,modelValue:n.value,"onUpdate:modelValue":e=>n.value=e},null,8,[`modelValue`,`onUpdate:modelValue`])]))),256))])):s(``,!0)])])}var de=f(re,[[`render`,ue],[`__scopeId`,`data-v-05a2a0fa`]]);export{de as default};