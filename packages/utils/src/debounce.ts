/**
 * 함수 실행을 지연시키는 debounce 유틸리티입니다.
 * @param func - 실행할 함수
 * @param wait - 지연 시간 (밀리초)
 * @returns debounce된 함수
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

