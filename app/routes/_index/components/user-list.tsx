import type * as React from 'react';
import type { TUser } from '@/db/schema/user/schemas';

type TUserListProps = {
	users: TUser[];
	children: (user: TUser) => React.ReactNode;
};

export const UserList = ({ users, children }: TUserListProps) => {
	return <ul>{users.map((user) => children(user))}</ul>;
};
