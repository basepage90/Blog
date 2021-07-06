// 로드 속도 문제로 액션이 로드보다 먼저 실행 되는 경우가있다.
// 때문에 index.html 에 직접 임포트한다. helmet 으로는 아직 테스트 해보지 않았음.

// import { useEffect } from 'react'

// const useScript = url => {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.type  = "text/javascript";
//     script.src = url;
//     script.async = true;
//     document.body.appendChild(script)
//     return () => {
//       document.body.removeChild(script)
//     }
//   }, [url])
// }
// export default useScript