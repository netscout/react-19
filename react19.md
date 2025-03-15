# React 19 알아보기

## 1. 프로젝트 세팅하기

### 1.1 vite 프로젝트 세팅

우선 vite를 이용해서 react 프로젝트를 설정합니다.

```bash
> npm create vite@latest react-19
Need to install the following packages:
create-vite@6.3.1
Ok to proceed? (y) y


> npx
> create-vite react-19

│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript + SWC
│
◇  Scaffolding project in /Users/onlifecoding/src/studies/react-19...
│
└  Done. Now run:

  cd react-19
  npm install
  npm run dev

> cd react-19
> npm i
```

이렇게 프로젝트를 설정하고 에디터를 통해 프로젝트를 열어보면, 다음과 같이 react 19 프로젝트가 설정된 것을 확인할 수 있습니다.

```json
{
  ...
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    ...
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    ...
  }
}
```

### 1.2 tailwindcss 설정

tailwindcss를 설치합니다.

```bash
> npm i tailwindcss @tailwindcss/vite
```

`vite.config.ts` 파일에 tailwindcss를 설정합니다.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
});
```

`src/index.css` 파일의 최상단에 다음과 같이 작성합니다.

```css
@import "tailwindcss";
```

### 1.3 react-router-dom 및 기본 라우팅 설정

페이지간의 이동을 위해 react-router-dom을 설치합니다.

```bash
> npm install react-router-dom
```

그리고 `src/Router.tsx` 파일을 생성하고 다음과 같이 코드를 작성합니다.

```tsx
import { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));

// 루트 레이아웃 컴포넌트
const RootLayout = () => {
  return (
    <GlobalErrorBoundary>
      <Outlet />
    </GlobalErrorBoundary>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
```

이제 전역 에러 발생시 에러 내용을 표시하는 대신 사용자 친화적인 메시지를 표시하도록 `/src/components/error/GlobalErrorBoundary.tsx` 파일을 생성하고, 다음과 같이 작성합니다.

```tsx
import { Component, ReactNode, ErrorInfo } from "react";
import FetcherError from "./FetcherError";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// 에러 경계 컴포넌트
class GlobalErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // 다음 렌더링에서 대체 UI가 보이도록 상태를 업데이트
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 로깅
    this.setState({
      error,
      errorInfo,
    });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 일반 에러의 경우
      return (
        <FetcherError
          title="요청을 처리하는 중 오류가 발생했습니다."
          message="잠시후 다시 시도해주세요."
          handleReload={() => {
            this.setState({ hasError: false });
            window.location.reload();
          }}
        />
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
```

그리고 에러 발생시 다시 시도할 수 있는 버튼을 표시할 컴포넌트를 `src/components/error/FetcherError.tsx` 파일을 생성하고 다음과 같이 작성합니다.

```tsx
interface Props {
  error?: Error;
  title?: string;
  message: string;
  handleReload: () => void;
}

const FetcherError = ({ title, message, handleReload }: Props) => {
  return (
    <div className="flex flex-col mt-[70px] w-full items-center justify-center">
      <div className="flex items-center justify-center">
        {title && <h1 className="mb-[10px] text-[24px] font-bold">{title}</h1>}
      </div>
      <div className="flex items-center justify-center">
        <div className="text-[18px]">{message}</div>
      </div>
      <button
        className="mt-[40px] flex h-[36px] w-[184px] items-center justify-center rounded bg-purple-600 px-4 py-2 text-base font-bold text-white hover:bg-purple-700"
        onClick={handleReload}
      >
        다시 시도하기
      </button>
    </div>
  );
};

export default FetcherError;
```

라우팅 확인을 위해 `src/pages/Index.tsx` 파일을 다음과 같이 작성합니다.

```tsx
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="w-full flex items-center gap-2 text-blue-500 underline">
        <Link to="/">Index</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="text-4xl font-bold">Index</div>
    </div>
  );
};

export default Index;
```

이어서 `src/pages/About.tsx` 파일을 다음과 같이 작성합니다.

```tsx
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="w-full flex items-center gap-2 text-blue-500 underline">
        <Link to="/">Index</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="text-4xl font-bold">About</div>
    </div>
  );
};
export default About;
```

마지막으로 라우팅이 동작하도록 `src/App.tsx` 파일을 다음과 같이 작성합니다.

```tsx
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
```

이제 프로젝트를 실행하고 라우팅이 동작하는 것을 확인할 수 있습니다.

```bash
> npm run dev
```

## 2. React 19 알아보기

### 2.1 Actions

React에서는 데이터를 작성하고 저장하거나 수정하는 일이 빈번하게 발생합니다. 사실 웹 페이지라는 게 데이터를 저장하고, 표시하고, 수정하고, 삭제하는 것이 전부이기 때문입니다. 이렇게 데이터를 다루기 위해 서버와 통신하는 작업을 Action이라고 합니다.

그리고 이런 서버와의 통신 작업을 진행할 때 중요한 점은, 사용자가 실수로 저장 버튼을 두번 클릭하는 걸 방지할 수 있어야 합니다. 만약 이런 처리가 제대로 되지 않는다면, 데이터가 중복으로 저장되어 문제가 발생할 수 있습니다. 예시를 위해서 `src/pages/Index.tsx` 파일을 다음과 같이 작성합니다.

```tsx
import { useState } from "react";
import { Link } from "react-router-dom";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Index = () => {
  const [message, setMessage] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const handleSave = async () => {
    await wait(2000); // 서버와의 통신을 흉내내기 위해 2초 대기
    setLog((prev: string[]) => [...prev, message]);
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="w-full flex items-center gap-2 text-blue-500 underline">
        <Link to="/">Index</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="메세지를 입력하세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSave}>저장</button>
      </div>
      <div className="flex items-center gap-2">
        {log.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default Index;
```

완성된 페이지는 다음과 같습니다.

[이미지]

메세지를 입력할 수 있는 입력 필드와 저장 버튼을 표시하고, 저장 버튼을 클릭하면 메세지를 서버에 저장하는 기능을 구현했습니다. 그리고 서버에 저장하는 걸 흉내내기 위해서 저장 버튼을 누르면 2초 대기 후 저장된 메세지를 표시하도록 했습니다.

이 페이지에서 메세지를 입력하고, 저장 버튼을 누르면 2초 후에 저장된 메세지가 로그에 표시되는 걸 확인할 수 있습니다. 그런데 저장 버튼을 마구 누르면 어떻게 될까요?

[이미지]

서버에 저장하는 동안 입력을 방지하는 작업을 하지 않았기 때문에 누르는 만큼 중복되어 저장되는 걸 볼 수 있습니다. 그러면 입력을 방지하기 위한 장치를 추가해보겠습니다.

```tsx
...
const Index = () => {
  ...
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await wait(2000); // 서버와의 통신을 흉내내기 위해 2초 대기
    setLog((prev: string[]) => [...prev, message]);
    setIsSaving(false);
  };

  return (
    <div className="h-screen w-full flex flex-col gp">
      ...
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          ...
          <button
            className="border-2 border-gray-300 rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={isSaving}
          >
            저장
          </button>
        </div>
        ...
      </div>
    </div>
  );
};

export default Index;

```

데이터를 저장하는 중인지 알 수 있는 상태 `isSaving`을 추가했습니다. 그리고 저장 버튼을 누르면 이 상태를 `true`로 변경하고, 서버와의 통신이 끝나면 `false`로 변경합니다. 이렇게 하면 저장 버튼이 눌리지 않은 상태에서는 비활성화되어 입력을 방지할 수 있습니다. 그리고 사용자에게 버튼을 누를 수 없다는 알림을 위해 `disabled` 속성과 스타일을 추가했습니다.

이제 저장 버튼을 누르면 중복으로 저장되는 걸 막을 수 있습니다. React 19에서는 이런 작업을 쉽게 할 수 있도록 `useTransition` 훅을 제공합니다. 이 훅은 서버에 데이터를 저장하는 등의 비동기 작업이 시작될 때 `isPending` 상태를 `true`로 변경하고, 끝나면 `false`로 변경합니다. 위 예제를 다음과 같이 수정할 수 있습니다.

```tsx
import { useState, useTransition } from "react";
import { Link } from "react-router-dom";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Index = () => {
  const [message, setMessage] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSave = async () => {
    startTransition(async () => {
      await wait(2000); // 서버와의 통신을 흉내내기 위해 2초 대기
      setLog((prev: string[]) => [...prev, message]);
    });
  };

  return (
    <div className="h-screen w-full flex flex-col gp">
      ...
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          ...
          <button
            className="border-2 border-gray-300 rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={isPending}
          >
            저장
          </button>
        </div>
        ...
      </div>
    </div>
  );
};

export default Index;
```

`isSaving`과 같은 별도의 상태를 사용하지 않아도 되고, 사용자가 직업 `setIsSaving(true)`, `setIsSaving(false)`를 호출해야 할 필요도 없어졌습니다. `startTransition` 함수를 사용하면, 호출이 시작될 때와 종료될 때 `useTransition` 훅이 자동으로 상태를 관리해줍니다.
