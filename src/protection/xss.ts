import * as xss from "xss";

/*
 const x = new xss.FilterXSS();
 
 x.process("html");
 
 const a = xss.StripTagBody([], () => {});
 console.log(a.onIgnoreTag, a.remove);
 
 console.log(xss.filterXSS("hello 1 "));
 console.log(
   xss.filterXSS("hello 2 ", {
     onTag(tag: string, html: string, options: {}): string {
       return html;
     },
     css: false,
   })
 );
 
 xss.filterXSS("hello");
 xss.filterXSS("hello", {
   escapeHtml(str) {
     return str.trim();
   },
   stripBlankChar: true,
   onTag(tag, html, options) {
     return html;
   },
   onIgnoreTag(tag, html) {},
 });
 */
 interface ICustomWhiteList extends XSS.IWhiteList {
   view?: string[];
 }
 
 
 const whiteList: ICustomWhiteList = xss.getDefaultWhiteList();
 console.log(whiteList.abbr);
 whiteList.view = ["class", "style", "id"];
 console.log(whiteList);

 export default whiteList;

 
 //xss.filterXSS("hello");
 
// const options: XSS.IFilterXSSOptions = {};