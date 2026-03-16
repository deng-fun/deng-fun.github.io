/**
 * Live2D Character Component
 *
 * Uses the official live2d-widget project CDN with improved switching logic.
 */

import { Icon } from '@iconify/react';
import { useIsMounted } from '@hooks/useIsMounted';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

// 声明全局变量
declare global {
  interface Window {
    L2Dwidget?: any;
    initWidget?: (config: any) => void;
    live2dWidgetLoaded?: boolean;
  }
}

// 模型列表
const modelList = [
  { id: 0, name: '默认模型' },
  { id: 1, name: '模型1' },
  { id: 2, name: '模型2' },
  { id: 3, name: '模型3' },
];

export default function Live2DCharacter() {
  const [showCharacter, setShowCharacter] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [autoSwitchEnabled, setAutoSwitchEnabled] = useState(true);
  const [autoSwitchInterval, setAutoSwitchInterval] = useState(120); // 增加到2分钟
  const [currentModelId, setCurrentModelId] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const isMounted = useIsMounted();
  const initializedRef = useRef(false);
  const autoSwitchTimerRef = useRef<NodeJS.Timeout>();
  const switchTimeoutRef = useRef<NodeJS.Timeout>();

  // 初始化 widget
  const initLive2DWidget = useCallback((modelId: number = 0) => {
    if (!window.initWidget) {
      console.error('[Live2D] initWidget 不可用');
      return false;
    }

    try {
      window.initWidget({
        waifuPath: 'https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0/dist/waifu-tips.json',
        cdnPath: 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/',
        modelId: modelId,
        tools: ['hitokoto', 'switch-model', 'switch-texture', 'photo', 'info', 'quit'],
        drag: false,
        logLevel: 'error'
      });
      return true;
    } catch (error) {
      console.error('[Live2D] 初始化失败:', error);
      return false;
    }
  }, []);

  // 加载 live2d-widget 脚本
  useEffect(() => {
    if (!isMounted || !showCharacter || initializedRef.current) return;

    const loadScript = () => {
      if (window.live2dWidgetLoaded && window.initWidget) {
        if (initLive2DWidget(currentModelId)) {
          initializedRef.current = true;
          setIsLoaded(true);
        }
        return;
      }

      // 检查脚本是否已存在
      const existingScript = document.querySelector('script[src*="live2d-widgets"]');
      if (existingScript) {
        const checkWidget = setInterval(() => {
          if (window.initWidget) {
            clearInterval(checkWidget);
            window.live2dWidgetLoaded = true;
            if (initLive2DWidget(currentModelId)) {
              initializedRef.current = true;
              setIsLoaded(true);
            }
          }
        }, 200);

        // 10秒后超时
        setTimeout(() => clearInterval(checkWidget), 10000);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0/dist/autoload.js';
      script.async = true;
      
      script.onload = () => {
        window.live2dWidgetLoaded = true;
        // 等待一下让脚本完全初始化
        const checkWidget = setInterval(() => {
          if (window.initWidget) {
            clearInterval(checkWidget);
            if (initLive2DWidget(currentModelId)) {
              initializedRef.current = true;
              setIsLoaded(true);
            }
          }
        }, 200);

        // 10秒后超时
        setTimeout(() => clearInterval(checkWidget), 10000);
      };

      script.onerror = () => {
        console.error('[Live2D] 脚本加载失败');
      };

      document.body.appendChild(script);
    };

    loadScript();

    return () => {
      if (autoSwitchTimerRef.current) {
        clearInterval(autoSwitchTimerRef.current);
      }
      if (switchTimeoutRef.current) {
        clearTimeout(switchTimeoutRef.current);
      }
    };
  }, [isMounted, showCharacter, currentModelId, initLive2DWidget]);

  // 自动切换模型
  useEffect(() => {
    if (!isMounted || !isLoaded || !autoSwitchEnabled || isSwitching) {
      if (autoSwitchTimerRef.current) {
        clearInterval(autoSwitchTimerRef.current);
      }
      return;
    }

    autoSwitchTimerRef.current = setInterval(() => {
      if (!isSwitching) {
        switchModelRandom();
      }
    }, autoSwitchInterval * 1000);

    return () => {
      if (autoSwitchTimerRef.current) {
        clearInterval(autoSwitchTimerRef.current);
      }
    };
  }, [isMounted, isLoaded, autoSwitchEnabled, autoSwitchInterval, isSwitching]);

  // 切换到指定模型 - 优化版本
  const switchToModel = useCallback((modelId: number) => {
    if (isSwitching || !isLoaded) {
      console.log('[Live2D] 正在切换中或未加载，忽略请求');
      return;
    }

    setIsSwitching(true);
    setCurrentModelId(modelId);
    
    console.log(`[Live2D] 切换到模型 ${modelId}`);

    // 清除之前的超时
    if (switchTimeoutRef.current) {
      clearTimeout(switchTimeoutRef.current);
    }

    // 尝试使用内置的切换功能，如果失败则重新初始化
    try {
      if (window.L2Dwidget && typeof window.L2Dwidget.changeModel === 'function') {
        window.L2Dwidget.changeModel(modelId);
        console.log('[Live2D] 使用 changeModel 切换');
        
        // 3秒后标记完成
        switchTimeoutRef.current = setTimeout(() => {
          setIsSwitching(false);
        }, 3000);
        return;
      }
    } catch (e) {
      console.log('[Live2D] changeModel 不可用，使用重新初始化');
    }

    // 回退方案：重新初始化
    try {
      if (window.L2Dwidget && typeof window.L2Dwidget.destroy === 'function') {
        window.L2Dwidget.destroy();
      }
    } catch (e) {
      // 忽略销毁错误
    }
    
    // 等待一下再重新初始化
    setTimeout(() => {
      if (initLive2DWidget(modelId)) {
        console.log('[Live2D] 重新初始化成功');
      }
      
      // 5秒后标记完成
      switchTimeoutRef.current = setTimeout(() => {
        setIsSwitching(false);
      }, 5000);
    }, 500);
  }, [isSwitching, isLoaded, initLive2DWidget]);

  // 随机切换模型
  const switchModelRandom = useCallback(() => {
    const nextModelId = Math.floor(Math.random() * modelList.length);
    if (nextModelId !== currentModelId) {
      switchToModel(nextModelId);
    } else {
      // 如果是同一个模型，选下一个
      switchToModel((nextModelId + 1) % modelList.length);
    }
  }, [currentModelId, switchToModel]);

  const toggleShow = useCallback(() => {
    setShowCharacter((prev) => !prev);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!showCharacter) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed left-4 bottom-4 z-50 rounded-full bg-background/80 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-background"
        onClick={toggleShow}
        aria-label="显示看板娘"
      >
        <Icon icon="ri:user-heart-fill" className="h-6 w-6 text-pink-400" />
      </motion.button>
    );
  }

  return (
    <>
      {/* Live2D 容器 - 固定在左下角 */}
      <div 
        id="live2d-widget-container" 
        className="fixed left-0 bottom-0 z-40 pointer-events-none"
      />

      {/* 设置面板 */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed left-4 bottom-32 z-50 w-72 rounded-2xl bg-background/95 p-4 shadow-xl backdrop-blur-md dark:bg-background/98"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">看板娘设置</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="rounded-full p-1 hover:bg-accent"
              >
                <Icon icon="ri:close-line" className="h-4 w-4" />
              </button>
            </div>

            {/* 切换状态提示 */}
            {isSwitching && (
              <div className="mb-3 flex items-center gap-2 rounded-lg bg-accent/50 px-3 py-2 text-sm">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Icon icon="ri:loader-4-line" className="h-4 w-4" />
                </motion.div>
                <span>正在切换模型...</span>
              </div>
            )}

            {/* 自动切换模型 */}
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm">自动切换模型</span>
                <button
                  onClick={() => setAutoSwitchEnabled((prev) => !prev)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${
                    autoSwitchEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                      autoSwitchEnabled ? 'translate-x-4.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              
              {autoSwitchEnabled && (
                <div className="mb-2">
                  <label className="text-xs text-muted-foreground">切换间隔: {autoSwitchInterval} 秒</label>
                  <input
                    type="range"
                    min="30"
                    max="300"
                    step="30"
                    value={autoSwitchInterval}
                    onChange={(e) => setAutoSwitchInterval(Number(e.target.value))}
                    className="mt-1 h-1.5 w-full cursor-pointer rounded-full bg-accent accent-primary"
                  />
                </div>
              )}
              
              <button
                onClick={switchModelRandom}
                disabled={isSwitching}
                className={`w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isSwitching 
                    ? 'cursor-not-allowed bg-gray-300 dark:bg-gray-700' 
                    : 'bg-accent hover:bg-accent/80'
                }`}
              >
                <Icon icon="ri:shuffle-line" className="mr-1 inline-block h-4 w-4" />
                {isSwitching ? '切换中...' : '立即随机切换'}
              </button>
            </div>

            {/* 手动选择模型 */}
            <div className="mb-4">
              <label className="mb-2 block text-sm">手动选择模型</label>
              <div className="grid grid-cols-2 gap-2">
                {modelList.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => switchToModel(model.id)}
                    disabled={isSwitching}
                    className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                      isSwitching
                        ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-400'
                        : currentModelId === model.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent hover:bg-accent/80'
                    }`}
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 提示 */}
            <div className="text-xs text-muted-foreground">
              <p>💡 切换提示：</p>
              <ul className="mt-1 list-disc pl-4">
                <li>点击看板娘上的按钮切换模型</li>
                <li>点击衣服图标更换服装</li>
                <li>如果切换失败，请稍等再试</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 加载状态显示 */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed left-8 bottom-32 z-40 rounded-2xl bg-background/90 px-4 py-3 shadow-lg backdrop-blur-md"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Icon icon="ri:loader-4-line" className="h-5 w-5 text-primary" />
            </motion.div>
            <span className="text-sm">加载看板娘中...</span>
          </div>
        </motion.div>
      )}

      {/* 控制按钮 - 固定在左下角 */}
      <div className="fixed left-4 bottom-4 z-50 flex gap-2">
        {/* 设置按钮 */}
        {isLoaded && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-full bg-background/80 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-background"
            onClick={() => setShowSettings((prev) => !prev)}
            aria-label="看板娘设置"
          >
            <Icon 
              icon={isSwitching ? "ri:loader-4-line" : "ri:settings-3-fill"} 
              className={`h-5 w-5 ${showSettings ? 'text-primary' : ''} ${isSwitching ? 'animate-spin' : ''}`} 
            />
          </motion.button>
        )}

        {/* 隐藏按钮 */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-full bg-background/80 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-background"
          onClick={toggleShow}
          aria-label="隐藏看板娘"
        >
          <Icon icon="ri:subtract-line" className="h-5 w-5" />
        </motion.button>
      </div>

      {/* 样式调整 */}
      <style>{`
        /* 确保看板娘固定在左下角，不会被拖拽 */
        #live2d-widget {
          margin-left: 10px !important;
          margin-bottom: 10px !important;
          pointer-events: auto !important;
          position: fixed !important;
          left: 0 !important;
          bottom: 0 !important;
        }
        
        /* 调整看板娘大小 */
        #live2d-widget canvas {
          max-width: 280px !important;
          max-height: 360px !important;
        }
        
        /* 对话框样式 */
        #live2d-widget .live2d-tips {
          background: var(--background) !important;
          border: 1px solid var(--border) !important;
          backdrop-filter: blur(10px);
          border-radius: 16px !important;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15) !important;
          color: var(--foreground) !important;
        }
        
        /* 工具按钮样式 */
        #live2d-widget .live2d-tool {
          background: var(--background) !important;
          border: 1px solid var(--border) !important;
          backdrop-filter: blur(10px);
        }
        
        #live2d-widget .live2d-tool:hover {
          background: var(--accent) !important;
          color: var(--primary) !important;
        }
      `}</style>
    </>
  );
}
