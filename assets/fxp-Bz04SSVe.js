var I={},w={};(function(e){const t=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",s=t+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040",i="["+t+"]["+s+"]*",n=new RegExp("^"+i+"$"),r=function(u,o){const a=[];let f=o.exec(u);for(;f;){const d=[];d.startIndex=o.lastIndex-f[0].length;const c=f.length;for(let p=0;p<c;p++)d.push(f[p]);a.push(d),f=o.exec(u)}return a},l=function(u){const o=n.exec(u);return!(o===null||typeof o>"u")};e.isExist=function(u){return typeof u<"u"},e.isEmptyObject=function(u){return Object.keys(u).length===0},e.merge=function(u,o,a){if(o){const f=Object.keys(o),d=f.length;for(let c=0;c<d;c++)a==="strict"?u[f[c]]=[o[f[c]]]:u[f[c]]=o[f[c]]}},e.getValue=function(u){return e.isExist(u)?u:""},e.isName=l,e.getAllMatches=r,e.nameRegexp=i})(w);const C=w,M={allowBooleanAttributes:!1,unpairedTags:[]};I.validate=function(e,t){t=Object.assign({},M,t);const s=[];let i=!1,n=!1;e[0]==="\uFEFF"&&(e=e.substr(1));for(let r=0;r<e.length;r++)if(e[r]==="<"&&e[r+1]==="?"){if(r+=2,r=x(e,r),r.err)return r}else if(e[r]==="<"){let l=r;if(r++,e[r]==="!"){r=V(e,r);continue}else{let u=!1;e[r]==="/"&&(u=!0,r++);let o="";for(;r<e.length&&e[r]!==">"&&e[r]!==" "&&e[r]!=="	"&&e[r]!==`
`&&e[r]!=="\r";r++)o+=e[r];if(o=o.trim(),o[o.length-1]==="/"&&(o=o.substring(0,o.length-1),r--),!K(o)){let d;return o.trim().length===0?d="Invalid space after '<'.":d="Tag '"+o+"' is an invalid name.",h("InvalidTag",d,N(e,r))}const a=U(e,r);if(a===!1)return h("InvalidAttr","Attributes for '"+o+"' have open quote.",N(e,r));let f=a.value;if(r=a.index,f[f.length-1]==="/"){const d=r-f.length;f=f.substring(0,f.length-1);const c=S(f,t);if(c===!0)i=!0;else return h(c.err.code,c.err.msg,N(e,d+c.err.line))}else if(u)if(a.tagClosed){if(f.trim().length>0)return h("InvalidTag","Closing tag '"+o+"' can't have attributes or invalid starting.",N(e,l));if(s.length===0)return h("InvalidTag","Closing tag '"+o+"' has not been opened.",N(e,l));{const d=s.pop();if(o!==d.tagName){let c=N(e,d.tagStartPos);return h("InvalidTag","Expected closing tag '"+d.tagName+"' (opened in line "+c.line+", col "+c.col+") instead of closing tag '"+o+"'.",N(e,l))}s.length==0&&(n=!0)}}else return h("InvalidTag","Closing tag '"+o+"' doesn't have proper closing.",N(e,r));else{const d=S(f,t);if(d!==!0)return h(d.err.code,d.err.msg,N(e,r-f.length+d.err.line));if(n===!0)return h("InvalidXml","Multiple possible root nodes found.",N(e,r));t.unpairedTags.indexOf(o)!==-1||s.push({tagName:o,tagStartPos:l}),i=!0}for(r++;r<e.length;r++)if(e[r]==="<")if(e[r+1]==="!"){r++,r=V(e,r);continue}else if(e[r+1]==="?"){if(r=x(e,++r),r.err)return r}else break;else if(e[r]==="&"){const d=q(e,r);if(d==-1)return h("InvalidChar","char '&' is not expected.",N(e,r));r=d}else if(n===!0&&!$(e[r]))return h("InvalidXml","Extra text at the end",N(e,r));e[r]==="<"&&r--}}else{if($(e[r]))continue;return h("InvalidChar","char '"+e[r]+"' is not expected.",N(e,r))}if(i){if(s.length==1)return h("InvalidTag","Unclosed tag '"+s[0].tagName+"'.",N(e,s[0].tagStartPos));if(s.length>0)return h("InvalidXml","Invalid '"+JSON.stringify(s.map(r=>r.tagName),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1})}else return h("InvalidXml","Start tag expected.",1);return!0};function $(e){return e===" "||e==="	"||e===`
`||e==="\r"}function x(e,t){const s=t;for(;t<e.length;t++)if(e[t]=="?"||e[t]==" "){const i=e.substr(s,t-s);if(t>5&&i==="xml")return h("InvalidXml","XML declaration allowed only at the start of the document.",N(e,t));if(e[t]=="?"&&e[t+1]==">"){t++;break}else continue}return t}function V(e,t){if(e.length>t+5&&e[t+1]==="-"&&e[t+2]==="-"){for(t+=3;t<e.length;t++)if(e[t]==="-"&&e[t+1]==="-"&&e[t+2]===">"){t+=2;break}}else if(e.length>t+8&&e[t+1]==="D"&&e[t+2]==="O"&&e[t+3]==="C"&&e[t+4]==="T"&&e[t+5]==="Y"&&e[t+6]==="P"&&e[t+7]==="E"){let s=1;for(t+=8;t<e.length;t++)if(e[t]==="<")s++;else if(e[t]===">"&&(s--,s===0))break}else if(e.length>t+9&&e[t+1]==="["&&e[t+2]==="C"&&e[t+3]==="D"&&e[t+4]==="A"&&e[t+5]==="T"&&e[t+6]==="A"&&e[t+7]==="["){for(t+=8;t<e.length;t++)if(e[t]==="]"&&e[t+1]==="]"&&e[t+2]===">"){t+=2;break}}return t}const G='"',Z="'";function U(e,t){let s="",i="",n=!1;for(;t<e.length;t++){if(e[t]===G||e[t]===Z)i===""?i=e[t]:i!==e[t]||(i="");else if(e[t]===">"&&i===""){n=!0;break}s+=e[t]}return i!==""?!1:{value:s,index:t,tagClosed:n}}const Y=new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`,"g");function S(e,t){const s=C.getAllMatches(e,Y),i={};for(let n=0;n<s.length;n++){if(s[n][1].length===0)return h("InvalidAttr","Attribute '"+s[n][2]+"' has no space in starting.",m(s[n]));if(s[n][3]!==void 0&&s[n][4]===void 0)return h("InvalidAttr","Attribute '"+s[n][2]+"' is without value.",m(s[n]));if(s[n][3]===void 0&&!t.allowBooleanAttributes)return h("InvalidAttr","boolean attribute '"+s[n][2]+"' is not allowed.",m(s[n]));const r=s[n][2];if(!W(r))return h("InvalidAttr","Attribute '"+r+"' is an invalid name.",m(s[n]));if(!i.hasOwnProperty(r))i[r]=1;else return h("InvalidAttr","Attribute '"+r+"' is repeated.",m(s[n]))}return!0}function J(e,t){let s=/\d/;for(e[t]==="x"&&(t++,s=/[\da-fA-F]/);t<e.length;t++){if(e[t]===";")return t;if(!e[t].match(s))break}return-1}function q(e,t){if(t++,e[t]===";")return-1;if(e[t]==="#")return t++,J(e,t);let s=0;for(;t<e.length;t++,s++)if(!(e[t].match(/\w/)&&s<20)){if(e[t]===";")break;return-1}return t}function h(e,t,s){return{err:{code:e,msg:t,line:s.line||s,col:s.col}}}function W(e){return C.isName(e)}function K(e){return C.isName(e)}function N(e,t){const s=e.substring(0,t).split(/\r?\n/);return{line:s.length,col:s[s.length-1].length+1}}function m(e){return e.startIndex+e[1].length}var v={};const _={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(e,t){return t},attributeValueProcessor:function(e,t){return t},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(e,t,s){return e}},Q=function(e){return Object.assign({},_,e)};v.buildOptions=Q;v.defaultOptions=_;class z{constructor(t){this.tagname=t,this.child=[],this[":@"]={}}add(t,s){t==="__proto__"&&(t="#__proto__"),this.child.push({[t]:s})}addChild(t){t.tagname==="__proto__"&&(t.tagname="#__proto__"),t[":@"]&&Object.keys(t[":@"]).length>0?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child})}}var H=z;const j=w;function D(e,t){const s={};if(e[t+3]==="O"&&e[t+4]==="C"&&e[t+5]==="T"&&e[t+6]==="Y"&&e[t+7]==="P"&&e[t+8]==="E"){t=t+9;let i=1,n=!1,r=!1,l="";for(;t<e.length;t++)if(e[t]==="<"&&!r){if(n&&se(e,t))t+=7,[entityName,val,t]=ee(e,t+1),val.indexOf("&")===-1&&(s[oe(entityName)]={regx:RegExp(`&${entityName};`,"g"),val});else if(n&&ne(e,t))t+=8;else if(n&&re(e,t))t+=8;else if(n&&ie(e,t))t+=9;else if(te)r=!0;else throw new Error("Invalid DOCTYPE");i++,l=""}else if(e[t]===">"){if(r?e[t-1]==="-"&&e[t-2]==="-"&&(r=!1,i--):i--,i===0)break}else e[t]==="["?n=!0:l+=e[t];if(i!==0)throw new Error("Unclosed DOCTYPE")}else throw new Error("Invalid Tag instead of DOCTYPE");return{entities:s,i:t}}function ee(e,t){let s="";for(;t<e.length&&e[t]!=="'"&&e[t]!=='"';t++)s+=e[t];if(s=s.trim(),s.indexOf(" ")!==-1)throw new Error("External entites are not supported");const i=e[t++];let n="";for(;t<e.length&&e[t]!==i;t++)n+=e[t];return[s,n,t]}function te(e,t){return e[t+1]==="!"&&e[t+2]==="-"&&e[t+3]==="-"}function se(e,t){return e[t+1]==="!"&&e[t+2]==="E"&&e[t+3]==="N"&&e[t+4]==="T"&&e[t+5]==="I"&&e[t+6]==="T"&&e[t+7]==="Y"}function ne(e,t){return e[t+1]==="!"&&e[t+2]==="E"&&e[t+3]==="L"&&e[t+4]==="E"&&e[t+5]==="M"&&e[t+6]==="E"&&e[t+7]==="N"&&e[t+8]==="T"}function re(e,t){return e[t+1]==="!"&&e[t+2]==="A"&&e[t+3]==="T"&&e[t+4]==="T"&&e[t+5]==="L"&&e[t+6]==="I"&&e[t+7]==="S"&&e[t+8]==="T"}function ie(e,t){return e[t+1]==="!"&&e[t+2]==="N"&&e[t+3]==="O"&&e[t+4]==="T"&&e[t+5]==="A"&&e[t+6]==="T"&&e[t+7]==="I"&&e[t+8]==="O"&&e[t+9]==="N"}function oe(e){if(j.isName(e))return e;throw new Error(`Invalid entity name ${e}`)}var ue=D;const fe=/^[-+]?0x[a-fA-F0-9]+$/,le=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt);!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);const ae={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};function de(e,t={}){if(t=Object.assign({},ae,t),!e||typeof e!="string")return e;let s=e.trim();if(t.skipLike!==void 0&&t.skipLike.test(s))return e;if(t.hex&&fe.test(s))return Number.parseInt(s,16);{const i=le.exec(s);if(i){const n=i[1],r=i[2];let l=ce(i[3]);const u=i[4]||i[6];if(!t.leadingZeros&&r.length>0&&n&&s[2]!==".")return e;if(!t.leadingZeros&&r.length>0&&!n&&s[1]!==".")return e;{const o=Number(s),a=""+o;return a.search(/[eE]/)!==-1||u?t.eNotation?o:e:s.indexOf(".")!==-1?a==="0"&&l===""||a===l||n&&a==="-"+l?o:e:r?l===a||n+l===a?o:e:s===a||s===n+a?o:e}}else return e}}function ce(e){return e&&e.indexOf(".")!==-1&&(e=e.replace(/0+$/,""),e==="."?e="0":e[0]==="."?e="0"+e:e[e.length-1]==="."&&(e=e.substr(0,e.length-1))),e}var he=de;const L=w,P=H,ge=ue,pe=he;let Ne=class{constructor(t){this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"},num_dec:{regex:/&#([0-9]{1,7});/g,val:(s,i)=>String.fromCharCode(Number.parseInt(i,10))},num_hex:{regex:/&#x([0-9a-fA-F]{1,6});/g,val:(s,i)=>String.fromCharCode(Number.parseInt(i,16))}},this.addExternalEntities=be,this.parseXml=Pe,this.parseTextData=Ee,this.resolveNameSpace=Te,this.buildAttributesMap=me,this.isItStopNode=Ie,this.replaceEntitiesValue=Ae,this.readStopNodeData=ve,this.saveTextToParentTag=Oe,this.addChild=we}};function be(e){const t=Object.keys(e);for(let s=0;s<t.length;s++){const i=t[s];this.lastEntities[i]={regex:new RegExp("&"+i+";","g"),val:e[i]}}}function Ee(e,t,s,i,n,r,l){if(e!==void 0&&(this.options.trimValues&&!i&&(e=e.trim()),e.length>0)){l||(e=this.replaceEntitiesValue(e));const u=this.options.tagValueProcessor(t,e,s,n,r);return u==null?e:typeof u!=typeof e||u!==e?u:this.options.trimValues?O(e,this.options.parseTagValue,this.options.numberParseOptions):e.trim()===e?O(e,this.options.parseTagValue,this.options.numberParseOptions):e}}function Te(e){if(this.options.removeNSPrefix){const t=e.split(":"),s=e.charAt(0)==="/"?"/":"";if(t[0]==="xmlns")return"";t.length===2&&(e=s+t[1])}return e}const ye=new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`,"gm");function me(e,t,s){if(!this.options.ignoreAttributes&&typeof e=="string"){const i=L.getAllMatches(e,ye),n=i.length,r={};for(let l=0;l<n;l++){const u=this.resolveNameSpace(i[l][1]);let o=i[l][4],a=this.options.attributeNamePrefix+u;if(u.length)if(this.options.transformAttributeName&&(a=this.options.transformAttributeName(a)),a==="__proto__"&&(a="#__proto__"),o!==void 0){this.options.trimValues&&(o=o.trim()),o=this.replaceEntitiesValue(o);const f=this.options.attributeValueProcessor(u,o,t);f==null?r[a]=o:typeof f!=typeof o||f!==o?r[a]=f:r[a]=O(o,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(r[a]=!0)}if(!Object.keys(r).length)return;if(this.options.attributesGroupName){const l={};return l[this.options.attributesGroupName]=r,l}return r}}const Pe=function(e){e=e.replace(/\r\n?/g,`
`);const t=new P("!xml");let s=t,i="",n="";for(let r=0;r<e.length;r++)if(e[r]==="<")if(e[r+1]==="/"){const u=T(e,">",r,"Closing Tag is not closed.");let o=e.substring(r+2,u).trim();if(this.options.removeNSPrefix){const d=o.indexOf(":");d!==-1&&(o=o.substr(d+1))}this.options.transformTagName&&(o=this.options.transformTagName(o)),s&&(i=this.saveTextToParentTag(i,s,n));const a=n.substring(n.lastIndexOf(".")+1);if(o&&this.options.unpairedTags.indexOf(o)!==-1)throw new Error(`Unpaired tag can not be used as closing tag: </${o}>`);let f=0;a&&this.options.unpairedTags.indexOf(a)!==-1?(f=n.lastIndexOf(".",n.lastIndexOf(".")-1),this.tagsNodeStack.pop()):f=n.lastIndexOf("."),n=n.substring(0,f),s=this.tagsNodeStack.pop(),i="",r=u}else if(e[r+1]==="?"){let u=A(e,r,!1,"?>");if(!u)throw new Error("Pi Tag is not closed.");if(i=this.saveTextToParentTag(i,s,n),!(this.options.ignoreDeclaration&&u.tagName==="?xml"||this.options.ignorePiTags)){const o=new P(u.tagName);o.add(this.options.textNodeName,""),u.tagName!==u.tagExp&&u.attrExpPresent&&(o[":@"]=this.buildAttributesMap(u.tagExp,n,u.tagName)),this.addChild(s,o,n)}r=u.closeIndex+1}else if(e.substr(r+1,3)==="!--"){const u=T(e,"-->",r+4,"Comment is not closed.");if(this.options.commentPropName){const o=e.substring(r+4,u-2);i=this.saveTextToParentTag(i,s,n),s.add(this.options.commentPropName,[{[this.options.textNodeName]:o}])}r=u}else if(e.substr(r+1,2)==="!D"){const u=ge(e,r);this.docTypeEntities=u.entities,r=u.i}else if(e.substr(r+1,2)==="!["){const u=T(e,"]]>",r,"CDATA is not closed.")-2,o=e.substring(r+9,u);i=this.saveTextToParentTag(i,s,n);let a=this.parseTextData(o,s.tagname,n,!0,!1,!0,!0);a==null&&(a=""),this.options.cdataPropName?s.add(this.options.cdataPropName,[{[this.options.textNodeName]:o}]):s.add(this.options.textNodeName,a),r=u+2}else{let u=A(e,r,this.options.removeNSPrefix),o=u.tagName;const a=u.rawTagName;let f=u.tagExp,d=u.attrExpPresent,c=u.closeIndex;this.options.isFirefox&&(o==="link"||o=="node")&&console.log(o),this.options.transformTagName&&(o=this.options.transformTagName(o)),s&&i&&s.tagname!=="!xml"&&(i=this.saveTextToParentTag(i,s,n,!1));const p=s;if(p&&this.options.unpairedTags.indexOf(p.tagname)!==-1&&(s=this.tagsNodeStack.pop(),n=n.substring(0,n.lastIndexOf("."))),o!==t.tagname&&(n+=n?"."+o:o),this.isItStopNode(this.options.stopNodes,n,o)){let g="";if(f.length>0&&f.lastIndexOf("/")===f.length-1)o[o.length-1]==="/"?(o=o.substr(0,o.length-1),n=n.substr(0,n.length-1),f=o):f=f.substr(0,f.length-1),r=u.closeIndex;else if(this.options.unpairedTags.indexOf(o)!==-1)r=u.closeIndex;else{const b=this.readStopNodeData(e,a,c+1);if(!b)throw new Error(`Unexpected end of ${a}`);r=b.i,g=b.tagContent}const y=new P(o);o!==f&&d&&(y[":@"]=this.buildAttributesMap(f,n,o)),g&&(g=this.parseTextData(g,o,n,!0,d,!0,!0)),n=n.substr(0,n.lastIndexOf(".")),y.add(this.options.textNodeName,g),this.addChild(s,y,n)}else{if(f.length>0&&f.lastIndexOf("/")===f.length-1){o[o.length-1]==="/"?(o=o.substr(0,o.length-1),n=n.substr(0,n.length-1),f=o):f=f.substr(0,f.length-1),this.options.transformTagName&&(o=this.options.transformTagName(o));const g=new P(o);o!==f&&d&&(g[":@"]=this.buildAttributesMap(f,n,o)),this.addChild(s,g,n),n=n.substr(0,n.lastIndexOf("."))}else{const g=new P(o);this.tagsNodeStack.push(s),o!==f&&d&&(g[":@"]=this.buildAttributesMap(f,n,o)),this.addChild(s,g,n),s=g}i="",r=c}}else i+=e[r];return t.child};function we(e,t,s){const i=this.options.updateTag(t.tagname,s,t[":@"]);i===!1||(typeof i=="string"&&(t.tagname=i),e.addChild(t))}const Ae=function(e){if(this.options.processEntities){for(let t in this.docTypeEntities){const s=this.docTypeEntities[t];e=e.replace(s.regx,s.val)}for(let t in this.lastEntities){const s=this.lastEntities[t];e=e.replace(s.regex,s.val)}if(this.options.htmlEntities)for(let t in this.htmlEntities){const s=this.htmlEntities[t];e=e.replace(s.regex,s.val)}e=e.replace(this.ampEntity.regex,this.ampEntity.val)}return e};function Oe(e,t,s,i){return e&&(i===void 0&&(i=Object.keys(t.child).length===0),e=this.parseTextData(e,t.tagname,s,!1,t[":@"]?Object.keys(t[":@"]).length!==0:!1,i),e!==void 0&&e!==""&&t.add(this.options.textNodeName,e),e=""),e}function Ie(e,t,s){const i="*."+s;for(const n in e){const r=e[n];if(i===r||t===r)return!0}return!1}function Ce(e,t,s=">"){let i,n="";for(let r=t;r<e.length;r++){let l=e[r];if(i)l===i&&(i="");else if(l==='"'||l==="'")i=l;else if(l===s[0])if(s[1]){if(e[r+1]===s[1])return{data:n,index:r}}else return{data:n,index:r};else l==="	"&&(l=" ");n+=l}}function T(e,t,s,i){const n=e.indexOf(t,s);if(n===-1)throw new Error(i);return n+t.length-1}function A(e,t,s,i=">"){const n=Ce(e,t+1,i);if(!n)return;let r=n.data;const l=n.index,u=r.search(/\s/);let o=r,a=!0;u!==-1&&(o=r.substring(0,u),r=r.substring(u+1).trimStart());const f=o;if(s){const d=o.indexOf(":");d!==-1&&(o=o.substr(d+1),a=o!==n.data.substr(d+1))}return{tagName:o,tagExp:r,closeIndex:l,attrExpPresent:a,rawTagName:f}}function ve(e,t,s){const i=s;let n=1;for(;s<e.length;s++)if(e[s]==="<")if(e[s+1]==="/"){const r=T(e,">",s,`${t} is not closed`);if(e.substring(s+2,r).trim()===t&&(n--,n===0))return{tagContent:e.substring(i,s),i:r};s=r}else if(e[s+1]==="?")s=T(e,"?>",s+1,"StopNode is not closed.");else if(e.substr(s+1,3)==="!--")s=T(e,"-->",s+3,"StopNode is not closed.");else if(e.substr(s+1,2)==="![")s=T(e,"]]>",s,"StopNode is not closed.")-2;else{const r=A(e,s,">");r&&((r&&r.tagName)===t&&r.tagExp[r.tagExp.length-1]!=="/"&&n++,s=r.closeIndex)}}function O(e,t,s){if(t&&typeof e=="string"){const i=e.trim();return i==="true"?!0:i==="false"?!1:pe(e,s)}else return L.isExist(e)?e:""}var $e=Ne,B={};function xe(e,t){return k(e,t)}function k(e,t,s){let i;const n={};for(let r=0;r<e.length;r++){const l=e[r],u=Ve(l);let o="";if(s===void 0?o=u:o=s+"."+u,u===t.textNodeName)i===void 0?i=l[u]:i+=""+l[u];else{if(u===void 0)continue;if(l[u]){let a=k(l[u],t,o);const f=Fe(a,t);l[":@"]?Se(a,l[":@"],o,t):Object.keys(a).length===1&&a[t.textNodeName]!==void 0&&!t.alwaysCreateTextNode?a=a[t.textNodeName]:Object.keys(a).length===0&&(t.alwaysCreateTextNode?a[t.textNodeName]="":a=""),n[u]!==void 0&&n.hasOwnProperty(u)?(Array.isArray(n[u])||(n[u]=[n[u]]),n[u].push(a)):t.isArray(u,o,f)?n[u]=[a]:n[u]=a}}}return typeof i=="string"?i.length>0&&(n[t.textNodeName]=i):i!==void 0&&(n[t.textNodeName]=i),n}function Ve(e){const t=Object.keys(e);for(let s=0;s<t.length;s++){const i=t[s];if(i!==":@")return i}}function Se(e,t,s,i){if(t){const n=Object.keys(t),r=n.length;for(let l=0;l<r;l++){const u=n[l];i.isArray(u,s+"."+u,!0,!0)?e[u]=[t[u]]:e[u]=t[u]}}}function Fe(e,t){const{textNodeName:s}=t,i=Object.keys(e).length;return!!(i===0||i===1&&(e[s]||typeof e[s]=="boolean"||e[s]===0))}B.prettify=xe;const{buildOptions:_e}=v,Le=$e,{prettify:Be}=B,ke=I;let Xe=class{constructor(t){this.externalEntities={},this.options=_e(t)}parse(t,s){if(typeof t!="string")if(t.toString)t=t.toString();else throw new Error("XML data is accepted in String or Bytes[] form.");if(s){s===!0&&(s={});const r=ke.validate(t,s);if(r!==!0)throw Error(`${r.err.msg}:${r.err.line}:${r.err.col}`)}const i=new Le(this.options);i.addExternalEntities(this.externalEntities);const n=i.parseXml(t);return this.options.preserveOrder||n===void 0?n:Be(n,this.options)}addEntity(t,s){if(s.indexOf("&")!==-1)throw new Error("Entity value can't have '&'");if(t.indexOf("&")!==-1||t.indexOf(";")!==-1)throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if(s==="&")throw new Error("An entity with value '&' is not permitted");this.externalEntities[t]=s}};var Re=Xe;const Me=`
`;function Ge(e,t){let s="";return t.format&&t.indentBy.length>0&&(s=Me),X(e,t,"",s)}function X(e,t,s,i){let n="",r=!1;for(let l=0;l<e.length;l++){const u=e[l],o=Ze(u);if(o===void 0)continue;let a="";if(s.length===0?a=o:a=`${s}.${o}`,o===t.textNodeName){let g=u[o];Ue(a,t)||(g=t.tagValueProcessor(o,g),g=R(g,t)),r&&(n+=i),n+=g,r=!1;continue}else if(o===t.cdataPropName){r&&(n+=i),n+=`<![CDATA[${u[o][0][t.textNodeName]}]]>`,r=!1;continue}else if(o===t.commentPropName){n+=i+`<!--${u[o][0][t.textNodeName]}-->`,r=!0;continue}else if(o[0]==="?"){const g=F(u[":@"],t),y=o==="?xml"?"":i;let b=u[o][0][t.textNodeName];b=b.length!==0?" "+b:"",n+=y+`<${o}${b}${g}?>`,r=!0;continue}let f=i;f!==""&&(f+=t.indentBy);const d=F(u[":@"],t),c=i+`<${o}${d}`,p=X(u[o],t,a,f);t.unpairedTags.indexOf(o)!==-1?t.suppressUnpairedNode?n+=c+">":n+=c+"/>":(!p||p.length===0)&&t.suppressEmptyNode?n+=c+"/>":p&&p.endsWith(">")?n+=c+`>${p}${i}</${o}>`:(n+=c+">",p&&i!==""&&(p.includes("/>")||p.includes("</"))?n+=i+t.indentBy+p+i:n+=p,n+=`</${o}>`),r=!0}return n}function Ze(e){const t=Object.keys(e);for(let s=0;s<t.length;s++){const i=t[s];if(e.hasOwnProperty(i)&&i!==":@")return i}}function F(e,t){let s="";if(e&&!t.ignoreAttributes)for(let i in e){if(!e.hasOwnProperty(i))continue;let n=t.attributeValueProcessor(i,e[i]);n=R(n,t),n===!0&&t.suppressBooleanAttributes?s+=` ${i.substr(t.attributeNamePrefix.length)}`:s+=` ${i.substr(t.attributeNamePrefix.length)}="${n}"`}return s}function Ue(e,t){e=e.substr(0,e.length-t.textNodeName.length-1);let s=e.substr(e.lastIndexOf(".")+1);for(let i in t.stopNodes)if(t.stopNodes[i]===e||t.stopNodes[i]==="*."+s)return!0;return!1}function R(e,t){if(e&&e.length>0&&t.processEntities)for(let s=0;s<t.entities.length;s++){const i=t.entities[s];e=e.replace(i.regex,i.val)}return e}var Ye=Ge;const Je=Ye,qe={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(e,t){return t},attributeValueProcessor:function(e,t){return t},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1};function E(e){this.options=Object.assign({},qe,e),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=Qe),this.processTextOrObjNode=We,this.options.format?(this.indentate=Ke,this.tagEndChar=`>
`,this.newLine=`
`):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}E.prototype.build=function(e){return this.options.preserveOrder?Je(e,this.options):(Array.isArray(e)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(e={[this.options.arrayNodeName]:e}),this.j2x(e,0).val)};E.prototype.j2x=function(e,t){let s="",i="";for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n))if(typeof e[n]>"u")this.isAttribute(n)&&(i+="");else if(e[n]===null)this.isAttribute(n)?i+="":n[0]==="?"?i+=this.indentate(t)+"<"+n+"?"+this.tagEndChar:i+=this.indentate(t)+"<"+n+"/"+this.tagEndChar;else if(e[n]instanceof Date)i+=this.buildTextValNode(e[n],n,"",t);else if(typeof e[n]!="object"){const r=this.isAttribute(n);if(r)s+=this.buildAttrPairStr(r,""+e[n]);else if(n===this.options.textNodeName){let l=this.options.tagValueProcessor(n,""+e[n]);i+=this.replaceEntitiesValue(l)}else i+=this.buildTextValNode(e[n],n,"",t)}else if(Array.isArray(e[n])){const r=e[n].length;let l="",u="";for(let o=0;o<r;o++){const a=e[n][o];if(!(typeof a>"u"))if(a===null)n[0]==="?"?i+=this.indentate(t)+"<"+n+"?"+this.tagEndChar:i+=this.indentate(t)+"<"+n+"/"+this.tagEndChar;else if(typeof a=="object")if(this.options.oneListGroup){const f=this.j2x(a,t+1);l+=f.val,this.options.attributesGroupName&&a.hasOwnProperty(this.options.attributesGroupName)&&(u+=f.attrStr)}else l+=this.processTextOrObjNode(a,n,t);else if(this.options.oneListGroup){let f=this.options.tagValueProcessor(n,a);f=this.replaceEntitiesValue(f),l+=f}else l+=this.buildTextValNode(a,n,"",t)}this.options.oneListGroup&&(l=this.buildObjectNode(l,n,u,t)),i+=l}else if(this.options.attributesGroupName&&n===this.options.attributesGroupName){const r=Object.keys(e[n]),l=r.length;for(let u=0;u<l;u++)s+=this.buildAttrPairStr(r[u],""+e[n][r[u]])}else i+=this.processTextOrObjNode(e[n],n,t);return{attrStr:s,val:i}};E.prototype.buildAttrPairStr=function(e,t){return t=this.options.attributeValueProcessor(e,""+t),t=this.replaceEntitiesValue(t),this.options.suppressBooleanAttributes&&t==="true"?" "+e:" "+e+'="'+t+'"'};function We(e,t,s){const i=this.j2x(e,s+1);return e[this.options.textNodeName]!==void 0&&Object.keys(e).length===1?this.buildTextValNode(e[this.options.textNodeName],t,i.attrStr,s):this.buildObjectNode(i.val,t,i.attrStr,s)}E.prototype.buildObjectNode=function(e,t,s,i){if(e==="")return t[0]==="?"?this.indentate(i)+"<"+t+s+"?"+this.tagEndChar:this.indentate(i)+"<"+t+s+this.closeTag(t)+this.tagEndChar;{let n="</"+t+this.tagEndChar,r="";return t[0]==="?"&&(r="?",n=""),(s||s==="")&&e.indexOf("<")===-1?this.indentate(i)+"<"+t+s+r+">"+e+n:this.options.commentPropName!==!1&&t===this.options.commentPropName&&r.length===0?this.indentate(i)+`<!--${e}-->`+this.newLine:this.indentate(i)+"<"+t+s+r+this.tagEndChar+e+this.indentate(i)+n}};E.prototype.closeTag=function(e){let t="";return this.options.unpairedTags.indexOf(e)!==-1?this.options.suppressUnpairedNode||(t="/"):this.options.suppressEmptyNode?t="/":t=`></${e}`,t};E.prototype.buildTextValNode=function(e,t,s,i){if(this.options.cdataPropName!==!1&&t===this.options.cdataPropName)return this.indentate(i)+`<![CDATA[${e}]]>`+this.newLine;if(this.options.commentPropName!==!1&&t===this.options.commentPropName)return this.indentate(i)+`<!--${e}-->`+this.newLine;if(t[0]==="?")return this.indentate(i)+"<"+t+s+"?"+this.tagEndChar;{let n=this.options.tagValueProcessor(t,e);return n=this.replaceEntitiesValue(n),n===""?this.indentate(i)+"<"+t+s+this.closeTag(t)+this.tagEndChar:this.indentate(i)+"<"+t+s+">"+n+"</"+t+this.tagEndChar}};E.prototype.replaceEntitiesValue=function(e){if(e&&e.length>0&&this.options.processEntities)for(let t=0;t<this.options.entities.length;t++){const s=this.options.entities[t];e=e.replace(s.regex,s.val)}return e};function Ke(e){return this.options.indentBy.repeat(e)}function Qe(e){return e.startsWith(this.options.attributeNamePrefix)&&e!==this.options.textNodeName?e.substr(this.attrPrefixLen):!1}var ze=E;const He=I,je=Re,De=ze;var st={XMLParser:je,XMLValidator:He,XMLBuilder:De};export{st as f};