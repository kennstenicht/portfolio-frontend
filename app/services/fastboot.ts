import Service from '@ember/service';

export default class FastbootService extends Service {
  get isFastBoot() {
    console.log('isFastBoot accessed');
    return true;
  }
  // isFastBoot: boolean = true;
}
