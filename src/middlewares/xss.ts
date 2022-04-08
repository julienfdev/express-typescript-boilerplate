import * as xss from "xss";

 interface ICustomWhiteList extends XSS.IWhiteList {
   view?: string[];
 }
 
 
 const whiteList: ICustomWhiteList = xss.getDefaultWhiteList();
 console.log(whiteList.abbr);
 whiteList.view = ["class", "style", "id"];
 console.log(whiteList);

 export default whiteList;

