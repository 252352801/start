/**
 * 工具函数
 */

/**
 * 为元素添加一个类
 * @param elem
 * @param className
 */
export const addClass=(elem: HTMLElement, className: string)=>{
  let classList = elem.className.split(/\s+/);
  if (classList.indexOf(className) < 0) {
    classList.push(className);
    elem.className = classList.join(' ');
  }
};

/**
 * 删除某个类
 * @param elem
 * @param className
 */
export const  removeClass=(elem: any, className: string)=>{
  let classList = elem.className.split(/\s+/);
  let clsIndex = classList.indexOf(className);
  if (clsIndex >= 0) {
    classList.splice(clsIndex, 1);
    elem.className = classList.join(' ');
  }
};
