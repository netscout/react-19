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
