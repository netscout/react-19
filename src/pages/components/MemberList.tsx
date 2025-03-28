import { use } from "react";

interface MemberListProps {
  memberListPromise: Promise<
    {
      id: number;
      name: string;
    }[]
  >;
}

/**
 * 멤버 목록을 조회하는 컴포넌트
 * @param memberListPromise 멤버 목록을 조회하는 Promise
 * @returns 멤버 목록
 */
const MemberList = ({ memberListPromise }: MemberListProps) => {
  // Promise의 결과가 resolve될 때까지 기다립니다.
  const memberList = use(memberListPromise);

  return (
    <ul>
      {memberList.map((member) => (
        <li key={member.id}>{`${member.id} - ${member.name}`}</li>
      ))}
    </ul>
  );
};

export default MemberList;
