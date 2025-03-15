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
      <div className="w-full flex items-center gap-2 text-blue-500 underline">
        <Link to="/">Index</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            className="border-2 border-gray-300 rounded-md p-2"
            type="text"
            placeholder="메세지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="border-2 border-gray-300 rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={isPending}
          >
            저장
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold text-gray-500">로그</p>
          <div className="flex items-center gap-2">
            {log.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
