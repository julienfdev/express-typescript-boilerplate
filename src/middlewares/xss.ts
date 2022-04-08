import xss from 'xss';

export function xssProtect(html: string) {

  return xss(html);
};
