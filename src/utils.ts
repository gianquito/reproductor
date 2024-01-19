export function secondsToHms(d: number) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
  
    var hDisplay = h < 10 ? `0${h}:` : `${h}:`
    var mDisplay = m < 10 ? `0${m}:` : `${m}:`
    var sDisplay = s < 10 ? `0${s}` : s;
  
    return h > 0 ? hDisplay + mDisplay + sDisplay : mDisplay + sDisplay;
}