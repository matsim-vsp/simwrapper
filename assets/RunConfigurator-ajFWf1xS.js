import{d as k,g as B,n as L}from"./index-1hbRw3NG.js";import{E as C,M as $,X as I}from"./XMLParser-Csz3XWGK.js";import{Y as q}from"./index-Dq6huqCM.js";function E(e){return String(e).replace(/--/g,"- -").replace(/--/g,"- -").replace(/-$/,"- ")}function T(e){return String(e).replace(/\]\]>/g,"]]]]><![CDATA[>")}function x(e){return String(e).replace(/"/g,"&quot;").replace(/'/g,"&apos;")}const O=":A-Za-z_À-ÖØ-öø-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�",z=O+"\\-\\.\\d·̀-ͯ‿-⁀",_=":A-Za-z_À-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�𐀀-󯿿",W=_+"\\-\\.\\d·̀-ͯ҇‿-⁀",D=(e,t,n="")=>{const r=e.replace(":",""),a=t.replace(":",""),s=`[${r}][${a}]*`;return{name:new RegExp(`^[${e}][${t}]*$`,n),ncName:new RegExp(`^${s}$`,n),qName:new RegExp(`^${s}(?::${s})?$`,n),nmToken:new RegExp(`^[${t}]+$`,n),nmTokens:new RegExp(`^[${t}]+(?:\\s+[${t}]+)*$`,n)}},U=D(O,z),K=D(_,W,"u"),X=(e="1.0")=>e==="1.1"?K:U,R=(e,{xmlVersion:t="1.0"}={})=>X(t).qName.test(e),Y=`
`;function Z(e,t){if(!Array.isArray(e)||e.length===0)return"1.0";const n=e[0];if(F(n)==="?xml"){const a=n[":@"];if(a){const s=t.attributeNamePrefix+"version";if(a[s])return a[s]}}return"1.0"}function V(e,t,n,r,a){return!n.sanitizeName||R(e,{xmlVersion:a})?e:n.sanitizeName(e,{isAttribute:t,matcher:r.readOnly()})}function H(e,t){let n="";t.format&&(n=Y);const r=[];if(t.stopNodes&&Array.isArray(t.stopNodes))for(let o=0;o<t.stopNodes.length;o++){const l=t.stopNodes[o];typeof l=="string"?r.push(new C(l)):l instanceof C&&r.push(l)}const a=Z(e,t),s=new $;return G(e,t,n,s,r,a)}function G(e,t,n,r,a,s){let o="",l=!1;if(t.maxNestedTags&&r.getDepth()>t.maxNestedTags)throw new Error("Maximum nested tags exceeded");if(!Array.isArray(e)){if(e!=null){let i=e.toString();return i=A(i,t),i}return""}for(let i=0;i<e.length;i++){const m=e[i],u=F(m);if(u===void 0)continue;const p=u===t.textNodeName||u===t.cdataPropName||u===t.commentPropName||u[0]==="?"?u:V(u,!1,t,r,s),f=J(m[":@"],t);r.push(p,f);const N=j(r,a);if(p===t.textNodeName){let v=m[u];N||(v=t.tagValueProcessor(p,v),v=A(v,t)),l&&(o+=n),o+=v,l=!1,r.pop();continue}else if(p===t.cdataPropName){l&&(o+=n);const v=m[u][0][t.textNodeName],w=T(v);o+=`<![CDATA[${w}]]>`,l=!1,r.pop();continue}else if(p===t.commentPropName){const v=m[u][0][t.textNodeName],w=E(v);o+=n+`<!--${w}-->`,l=!0,r.pop();continue}else if(p[0]==="?"){const v=S(m[":@"],t,N,r,s);o+=(p==="?xml"?"":n)+`<${p}${v}?>`,l=!0,r.pop();continue}let c=n;c!==""&&(c+=t.indentBy);const y=S(m[":@"],t,N,r,s),b=n+`<${p}${y}`;let d;N?d=M(m[u],t):d=G(m[u],t,c,r,a,s),t.unpairedTags.indexOf(p)!==-1?t.suppressUnpairedNode?o+=b+">":o+=b+"/>":(!d||d.length===0)&&t.suppressEmptyNode?o+=b+"/>":d&&d.endsWith(">")?o+=b+`>${d}${n}</${p}>`:(o+=b+">",d&&n!==""&&(d.includes("/>")||d.includes("</"))?o+=n+t.indentBy+d+n:o+=d,o+=`</${p}>`),l=!0,r.pop()}return o}function J(e,t){if(!e||t.ignoreAttributes)return null;const n={};let r=!1;for(let a in e){if(!Object.prototype.hasOwnProperty.call(e,a))continue;const s=a.startsWith(t.attributeNamePrefix)?a.substr(t.attributeNamePrefix.length):a;n[s]=x(e[a]),r=!0}return r?n:null}function M(e,t){if(!Array.isArray(e))return e!=null?e.toString():"";let n="";for(let r=0;r<e.length;r++){const a=e[r],s=F(a);if(s===t.textNodeName)n+=a[s];else if(s===t.cdataPropName)n+=a[s][0][t.textNodeName];else if(s===t.commentPropName)n+=a[s][0][t.textNodeName];else{if(s&&s[0]==="?")continue;if(s){const o=Q(a[":@"],t),l=M(a[s],t);!l||l.length===0?n+=`<${s}${o}/>`:n+=`<${s}${o}>${l}</${s}>`}}}return n}function Q(e,t){let n="";if(e&&!t.ignoreAttributes)for(let r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;let a=e[r];a===!0&&t.suppressBooleanAttributes?n+=` ${r.substr(t.attributeNamePrefix.length)}`:n+=` ${r.substr(t.attributeNamePrefix.length)}="${x(a)}"`}return n}function F(e){const t=Object.keys(e);for(let n=0;n<t.length;n++){const r=t[n];if(Object.prototype.hasOwnProperty.call(e,r)&&r!==":@")return r}}function S(e,t,n,r,a){let s="";if(e&&!t.ignoreAttributes)for(let o in e){if(!Object.prototype.hasOwnProperty.call(e,o))continue;const l=o.substr(t.attributeNamePrefix.length),i=n?l:V(l,!0,t,r,a);let m;n?m=e[o]:(m=t.attributeValueProcessor(o,e[o]),m=A(m,t)),m===!0&&t.suppressBooleanAttributes?s+=` ${i}`:s+=` ${i}="${x(m)}"`}return s}function j(e,t){if(!t||t.length===0)return!1;for(let n=0;n<t.length;n++)if(e.matches(t[n]))return!0;return!1}function A(e,t){if(e&&e.length>0&&t.processEntities)for(let n=0;n<t.entities.length;n++){const r=t.entities[n];e=e.replace(r.regex,r.val)}return e}function tt(e){return typeof e=="function"?e:Array.isArray(e)?t=>{for(const n of e)if(typeof n=="string"&&t===n||n instanceof RegExp&&n.test(t))return!0}:()=>!1}const et={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(e,t){return t},attributeValueProcessor:function(e,t){return t},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1,maxNestedTags:100,jPath:!0,sanitizeName:!1};function h(e){if(this.options=Object.assign({},et,e),this.options.stopNodes&&Array.isArray(this.options.stopNodes)&&(this.options.stopNodes=this.options.stopNodes.map(t=>typeof t=="string"&&t.startsWith("*.")?".."+t.substring(2):t)),this.stopNodeExpressions=[],this.options.stopNodes&&Array.isArray(this.options.stopNodes))for(let t=0;t<this.options.stopNodes.length;t++){const n=this.options.stopNodes[t];typeof n=="string"?this.stopNodeExpressions.push(new C(n)):n instanceof C&&this.stopNodeExpressions.push(n)}this.options.ignoreAttributes===!0||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.ignoreAttributesFn=tt(this.options.ignoreAttributes),this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=st),this.processTextOrObjNode=rt,this.options.format?(this.indentate=at,this.tagEndChar=`>
`,this.newLine=`
`):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}function nt(e,t){const n=e["?xml"];if(n&&typeof n=="object"){if(t.attributesGroupName&&n[t.attributesGroupName]){const a=n[t.attributesGroupName][t.attributeNamePrefix+"version"];if(a)return a}const r=n[t.attributeNamePrefix+"version"];if(r)return r}return"1.0"}function P(e,t,n,r,a){return!n.sanitizeName||R(e,{xmlVersion:a})?e:n.sanitizeName(e,{isAttribute:t,matcher:r.readOnly()})}h.prototype.build=function(e){if(this.options.preserveOrder)return H(e,this.options);{Array.isArray(e)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(e={[this.options.arrayNodeName]:e});const t=new $,n=nt(e,this.options);return this.j2x(e,0,t,n).val}};h.prototype.j2x=function(e,t,n,r){let a="",s="";if(this.options.maxNestedTags&&n.getDepth()>=this.options.maxNestedTags)throw new Error("Maximum nested tags exceeded");const o=this.options.jPath?n.toString():n,l=this.checkStopNode(n);for(let i in e){if(!Object.prototype.hasOwnProperty.call(e,i))continue;const u=i===this.options.textNodeName||i===this.options.cdataPropName||i===this.options.commentPropName||this.options.attributesGroupName&&i===this.options.attributesGroupName||this.isAttribute(i)||i[0]==="?"?i:P(i,!1,this.options,n,r);if(typeof e[i]>"u")this.isAttribute(i)&&(s+="");else if(e[i]===null)this.isAttribute(i)||u===this.options.cdataPropName||u===this.options.commentPropName?s+="":u[0]==="?"?s+=this.indentate(t)+"<"+u+"?"+this.tagEndChar:s+=this.indentate(t)+"<"+u+"/"+this.tagEndChar;else if(e[i]instanceof Date)s+=this.buildTextValNode(e[i],u,"",t,n);else if(typeof e[i]!="object"){const g=this.isAttribute(i);if(g&&!this.ignoreAttributesFn(g,o)){const p=P(g,!0,this.options,n,r);a+=this.buildAttrPairStr(p,""+e[i],l)}else if(!g)if(i===this.options.textNodeName){let p=this.options.tagValueProcessor(i,""+e[i]);s+=this.replaceEntitiesValue(p)}else{n.push(u);const p=this.checkStopNode(n);if(n.pop(),p){const f=""+e[i];f===""?s+=this.indentate(t)+"<"+u+this.closeTag(u)+this.tagEndChar:s+=this.indentate(t)+"<"+u+">"+f+"</"+u+this.tagEndChar}else s+=this.buildTextValNode(e[i],u,"",t,n)}}else if(Array.isArray(e[i])){const g=e[i].length;let p="",f="";for(let N=0;N<g;N++){const c=e[i][N];if(!(typeof c>"u"))if(c===null)u[0]==="?"?s+=this.indentate(t)+"<"+u+"?"+this.tagEndChar:s+=this.indentate(t)+"<"+u+"/"+this.tagEndChar;else if(typeof c=="object")if(this.options.oneListGroup){n.push(u);const y=this.j2x(c,t+1,n,r);n.pop(),p+=y.val,this.options.attributesGroupName&&c.hasOwnProperty(this.options.attributesGroupName)&&(f+=y.attrStr)}else p+=this.processTextOrObjNode(c,u,t,n,r);else if(this.options.oneListGroup){let y=this.options.tagValueProcessor(u,c);y=this.replaceEntitiesValue(y),p+=y}else{n.push(u);const y=this.checkStopNode(n);if(n.pop(),y){const b=""+c;b===""?p+=this.indentate(t)+"<"+u+this.closeTag(u)+this.tagEndChar:p+=this.indentate(t)+"<"+u+">"+b+"</"+u+this.tagEndChar}else p+=this.buildTextValNode(c,u,"",t,n)}}this.options.oneListGroup&&(p=this.buildObjectNode(p,u,f,t)),s+=p}else if(this.options.attributesGroupName&&i===this.options.attributesGroupName){const g=Object.keys(e[i]),p=g.length;for(let f=0;f<p;f++){const N=P(g[f],!0,this.options,n,r);a+=this.buildAttrPairStr(N,""+e[i][g[f]],l)}}else s+=this.processTextOrObjNode(e[i],u,t,n,r)}return{attrStr:a,val:s}};h.prototype.buildAttrPairStr=function(e,t,n){return n||(t=this.options.attributeValueProcessor(e,""+t),t=this.replaceEntitiesValue(t)),this.options.suppressBooleanAttributes&&t==="true"?" "+e:" "+e+'="'+x(t)+'"'};function rt(e,t,n,r,a){const s=this.extractAttributes(e);if(r.push(t,s),this.checkStopNode(r)){const i=this.buildRawContent(e),m=this.buildAttributesForStopNode(e);return r.pop(),this.buildObjectNode(i,t,m,n)}const l=this.j2x(e,n+1,r,a);return r.pop(),t[0]==="?"?this.buildTextValNode("",t,l.attrStr,n,r):e[this.options.textNodeName]!==void 0&&Object.keys(e).length===1?this.buildTextValNode(e[this.options.textNodeName],t,l.attrStr,n,r):this.buildObjectNode(l.val,t,l.attrStr,n)}h.prototype.extractAttributes=function(e){if(!e||typeof e!="object")return null;const t={};let n=!1;if(this.options.attributesGroupName&&e[this.options.attributesGroupName]){const r=e[this.options.attributesGroupName];for(let a in r){if(!Object.prototype.hasOwnProperty.call(r,a))continue;const s=a.startsWith(this.options.attributeNamePrefix)?a.substring(this.options.attributeNamePrefix.length):a;t[s]=x(r[a]),n=!0}}else for(let r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;const a=this.isAttribute(r);a&&(t[a]=x(e[r]),n=!0)}return n?t:null};h.prototype.buildRawContent=function(e){if(typeof e=="string")return e;if(typeof e!="object"||e===null)return String(e);if(e[this.options.textNodeName]!==void 0)return e[this.options.textNodeName];let t="";for(let n in e){if(!Object.prototype.hasOwnProperty.call(e,n)||this.isAttribute(n)||this.options.attributesGroupName&&n===this.options.attributesGroupName)continue;const r=e[n];if(n===this.options.textNodeName)t+=r;else if(Array.isArray(r)){for(let a of r)if(typeof a=="string"||typeof a=="number")t+=`<${n}>${a}</${n}>`;else if(typeof a=="object"&&a!==null){const s=this.buildRawContent(a),o=this.buildAttributesForStopNode(a);s===""?t+=`<${n}${o}/>`:t+=`<${n}${o}>${s}</${n}>`}}else if(typeof r=="object"&&r!==null){const a=this.buildRawContent(r),s=this.buildAttributesForStopNode(r);a===""?t+=`<${n}${s}/>`:t+=`<${n}${s}>${a}</${n}>`}else t+=`<${n}>${r}</${n}>`}return t};h.prototype.buildAttributesForStopNode=function(e){if(!e||typeof e!="object")return"";let t="";if(this.options.attributesGroupName&&e[this.options.attributesGroupName]){const n=e[this.options.attributesGroupName];for(let r in n){if(!Object.prototype.hasOwnProperty.call(n,r))continue;const a=r.startsWith(this.options.attributeNamePrefix)?r.substring(this.options.attributeNamePrefix.length):r,s=n[r];s===!0&&this.options.suppressBooleanAttributes?t+=" "+a:t+=" "+a+'="'+s+'"'}}else for(let n in e){if(!Object.prototype.hasOwnProperty.call(e,n))continue;const r=this.isAttribute(n);if(r){const a=e[n];a===!0&&this.options.suppressBooleanAttributes?t+=" "+r:t+=" "+r+'="'+a+'"'}}return t};h.prototype.buildObjectNode=function(e,t,n,r){if(e==="")return t[0]==="?"?this.indentate(r)+"<"+t+n+"?"+this.tagEndChar:this.indentate(r)+"<"+t+n+this.closeTag(t)+this.tagEndChar;if(t[0]==="?")return this.indentate(r)+"<"+t+n+"?"+this.tagEndChar;{let a="</"+t+this.tagEndChar,s="";return t[0]==="?"&&(s="?",a=""),(n||n==="")&&e.indexOf("<")===-1?this.indentate(r)+"<"+t+n+s+">"+e+a:this.options.commentPropName!==!1&&t===this.options.commentPropName&&s.length===0?this.indentate(r)+`<!--${e}-->`+this.newLine:this.indentate(r)+"<"+t+n+s+this.tagEndChar+e+this.indentate(r)+a}};h.prototype.closeTag=function(e){let t="";return this.options.unpairedTags.indexOf(e)!==-1?this.options.suppressUnpairedNode||(t="/"):this.options.suppressEmptyNode?t="/":t=`></${e}`,t};h.prototype.checkStopNode=function(e){if(!this.stopNodeExpressions||this.stopNodeExpressions.length===0)return!1;for(let t=0;t<this.stopNodeExpressions.length;t++)if(e.matches(this.stopNodeExpressions[t]))return!0;return!1};h.prototype.buildTextValNode=function(e,t,n,r,a){if(this.options.cdataPropName!==!1&&t===this.options.cdataPropName){const s=T(e);return this.indentate(r)+`<![CDATA[${s}]]>`+this.newLine}else if(this.options.commentPropName!==!1&&t===this.options.commentPropName){const s=E(e);return this.indentate(r)+`<!--${s}-->`+this.newLine}else{if(t[0]==="?")return this.indentate(r)+"<"+t+n+"?"+this.tagEndChar;{let s=this.options.tagValueProcessor(t,e);return s=this.replaceEntitiesValue(s),s===""?this.indentate(r)+"<"+t+n+this.closeTag(t)+this.tagEndChar:this.indentate(r)+"<"+t+n+">"+s+"</"+t+this.tagEndChar}}};h.prototype.replaceEntitiesValue=function(e){if(e&&e.length>0&&this.options.processEntities)for(let t=0;t<this.options.entities.length;t++){const n=this.options.entities[t];e=e.replace(n.regex,n.val)}return e};function at(e){return this.options.indentBy.repeat(e)}function st(e){return e.startsWith(this.options.attributeNamePrefix)&&e!==this.options.textNodeName?e.substr(this.attrPrefixLen):!1}const it=`# MATSim run configurator - config.xml edit fields

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
`,ot=`<?xml version="1.0" encoding="UTF-8"?>\r
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
`,ut={messages:{en:{},de:{}}},lt=k({name:"RunConfigurator",components:{},i18n:ut,props:{id:{type:String,required:!0},model:{type:String,required:!1},xml:{type:Object,required:!1}},data:()=>({globalState:B.state,sections:[],activeSection:-1,xmlConfig:{}}),mounted(){this.$store.commit("setShowLeftBar",!0);const e=q.parse(it);console.log({yaml:e}),this.sections=e.sections,this.setupXml(),this.activeSection=0},watch:{},computed:{isDark(){return this.$store.state.isDarkMode}},methods:{setupXml(){const e=new I({ignoreAttributes:!1,preserveOrder:!1,attributeNamePrefix:"$"});try{this.xmlConfig=e.parse(ot)}catch(t){throw console.error("WHAT",t),Error(""+t)}for(const t of this.sections)for(const n of t.entries){const[r,a]=n.xml.split("."),s=this.xmlConfig.config.module.find(o=>o.$name==r);if(a=="param"){const o=s.param.find(l=>l.$name==n.name);n.value=o.$value}}},update(){for(const n of this.sections)for(const r of n.entries){const[a,s]=r.xml.split("."),o=this.xmlConfig.config.module.find(l=>l.$name==a);if(s=="param"){const l=o.param.find(i=>i.$name==r.name);l.$value=r.value}}console.log(this.xmlConfig);const t=new h({format:!0,ignoreAttributes:!1,attributeNamePrefix:"$",suppressUnpairedNode:!0,suppressEmptyNode:!0}).build(this.xmlConfig);console.log(t)},switchSection(e){this.activeSection=e}}});var pt=function(){var t=this,n=t._self._c;return t._self._setupProxy,n("div",{staticClass:"configurator"},[n("div",{staticClass:"content"},[n("div",{staticClass:"section-panel"},t._l(t.sections,function(r,a){return n("div",{key:r.name,staticClass:"config-section",on:{click:function(s){return t.switchSection(a)}}},[n("p",{class:{active:t.activeSection==a}},[t._v(t._s(r.title))])])}),0),t.activeSection>-1?n("div",{staticClass:"details-panel"},[n("div",{staticClass:"buttons"},[n("b-button",[t._v("Cancel")]),n("b-button",{attrs:{type:"is-success"},on:{click:t.update}},[t._v("Save")])],1),t._l(t.sections[t.activeSection].entries,function(r){return n("div",{staticClass:"entry"},[n("p",[t._v(t._s(r.title))]),n("b-input",{attrs:{type:"text"},model:{value:r.value,callback:function(a){t.$set(r,"value",a)},expression:"item.value"}})],1)})],2):t._e()])])},mt=[],ct=L(lt,pt,mt,!1,null,"770a35e2");const gt=ct.exports;export{gt as default};
