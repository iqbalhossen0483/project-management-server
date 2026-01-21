import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: USER_ROLE.STAFF })
  role: USER_ROLE;

  @Column({ default: USER_STATUS.ACTIVE })
  status: USER_STATUS;

  @OneToMany(() => Project, (project) => project.createdBy)
  projects: Project[];

  @CreateDateColumn()
  invitedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
