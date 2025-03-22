import { useActionState, useState } from "react";
import { Link } from "react-router-dom";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface submitMessageResult {
  error: string | null;
}

/**
 * 서버에 데이터를 전송하는 함수, 일부러 오류를 발생시키기 위해 예외를 던집니다.
 */
const submitMessage = async (message: string) => {
  console.log(`submitMessage: ${message}`);
  await wait(2000); // 서버와의 통신을 흉내내기 위해 2초 대기
  throw new Error("서버에 문제가 발생했습니다.");
};

const Index = () => {
  const [message, setMessage] = useState("");
  const [log, setLog] = useState<string[]>([]);
  /**
   * 각각 Action의 결과, 폼의 값을 전송할 Action, Action의 진행 상태를 나타냅니다.
   *
   * 이 예제에서는 결과 값으로 오류 메세지만 리턴합니다.
   */
  const [result, submitAction, isPending] = useActionState(
    async (
      prevState: submitMessageResult,
      formData: FormData
    ): Promise<submitMessageResult> => {
      const message = formData.get("message") as string;

      if (prevState) {
        console.log(`이전 상태 값: ${JSON.stringify(prevState)}`);
      }

      try {
        await submitMessage(message);

        setLog((prev: string[]) => [...prev, message]);

        return { error: null }; // Action의 결과를 리턴합니다. 오류가 없었으므로 null을 리턴합니다.
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        return { error: errorMessage }; // 오류가 있었으므로 오류 메세지를 리턴합니다.
      }
    },
    { error: null } // 초기 상태는 null입니다.
  );

  return (
    <div className="h-screen w-full flex flex-col gp">
      <div className="w-full flex items-center gap-2 text-blue-500 underline">
        <Link to="/">Index</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="flex flex-col gap-2">
        <form action={submitAction} className="flex items-center gap-2">
          <input
            name="message"
            className="border-2 border-gray-300 rounded-md p-2"
            type="text"
            placeholder="메세지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="border-2 border-gray-300 rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isPending}
          >
            저장
          </button>
          {!isPending && result.error && (
            <p className="text-red-500">{result.error}</p>
          )}
        </form>
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
