// import lrz from 'lrz';
import oss from 'utils/oss';

const utils = {
  parseDom: (arg) => {
    const objE = document.createElement('div');

    objE.innerHTML = arg;
    return objE.childNodes;
  },
};

export default utils;


// export async function uploadFile(file, filePath) {
//   const res = await lrz(file);
//   const path = `${filePath}__${res.fileLen}__${oss.getFileSuffix(res.origin.name)}`;
//   const uploadRes = await oss.multipartUpload(path, res.formData.get('file'));

//   const url = oss.getImgDomain(oss.getFileDomain() + oss.getFilePath(uploadRes.name));

//   return url;
// }

export function parseDistance(distance, city) {
  let result = '';

  if (distance >= 0) {
    if (distance < 1000) {
      result = `${Math.round(distance)} m`;
    } else if (distance < 99 * 1000) {
      result = `${Number(distance / 1000).toFixed(1)} km`;
    } else {
      result = city ? city : '>99km';
    }
  } else {
    result = '未知';
  }
  return result;
}

/**
 * 缓动函数，由快到慢
 * @param {Num} t 当前时间
 * @param {Num} b 初始值
 * @param {Num} c 变化值
 * @param {Num} d 持续时间
 */
export function easeOut(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
};

/**
 * 缓动函数，由慢到快
 * @param {Num} t 当前时间
 * @param {Num} b 初始值
 * @param {Num} c 变化值
 * @param {Num} d 持续时间
 */
export function easeIn(t,b,c,d){
    return c*(t/=d)*t + b;
}
