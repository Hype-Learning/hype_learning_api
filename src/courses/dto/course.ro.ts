import { UserRO } from 'src/users/user.ro';

export class CourseRO {
  id: number;
  title: string;
  description: string;
  announcement: string;
  author: UserRO;
}
