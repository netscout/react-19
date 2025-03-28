import { Suspense } from "react";
import { Link } from "react-router-dom";
import MemberList from "./components/MemberList";
import { ErrorBoundary } from "react-error-boundary";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 멤버 목록을 조회하는 함수
 * @returns 멤버 목록
 */
const fetchMemberList = async () => {
  await wait(2000); // 서버와의 통신을 흉내내기 위해 2초 대기

  return [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Jim" },
  ];
};

const List = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="w-full flex items-center gap-2 text-blue-500 underline">
        <Link to="/">Index</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="text-4xl font-bold">List</div>
      <div className="flex flex-col gap-2">
        <ErrorBoundary
          fallback={<div>목록을 불러오는 중에 문제가 발생했습니다.</div>}
        >
          {/* 비동기 처리를 위해 Suspense를 사용 */}
          <Suspense fallback={<div>목록을 불러오는 중입니다...</div>}>
            {/* 멤버 목록을 조회하는 함수의 Promise를 넘겨줍니다. */}
            <MemberList memberListPromise={fetchMemberList()} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default List;
