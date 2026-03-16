import { HomeSiderSegmentType, HomeSiderType } from '@constants/enum';
import { atom } from 'nanostores';

export const homeSiderSegmentType = atom<HomeSiderSegmentType>(HomeSiderSegmentType.INFO);
export const homeSiderType = atom<HomeSiderType>(HomeSiderType.HOME);

// 暴露到全局 window 对象，供原生 JavaScript 访问
if (typeof window !== 'undefined') {
  // 为了兼容原生 JavaScript，我们需要包装一下，添加 get() 方法
  const wrappedStore = {
    set: (value: HomeSiderSegmentType) => homeSiderSegmentType.set(value),
    get: () => homeSiderSegmentType.get(),
    listen: (callback: (value: HomeSiderSegmentType) => void) => {
      return homeSiderSegmentType.listen(callback);
    }
  };
  
  (window as any).__homeSiderSegmentType = wrappedStore;
}
