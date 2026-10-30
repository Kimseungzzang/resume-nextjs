import { ISkill } from '../component/skill/ISkill';

const backend: ISkill.Skill = {
  category: 'Backend',
  items: [{ title: 'Spring Boot' }, { title: 'NestJS' }, { title: 'Kotlin' }, { title: 'Java' }],
};

const frontend: ISkill.Skill = {
  category: 'Frontend',
  items: [{ title: 'Next.js' }, { title: 'React' }, { title: 'TypeScript' }],
};

const database: ISkill.Skill = {
  category: 'Database',
  items: [{ title: 'PostgreSQL' }, { title: 'MariaDB' }, { title: 'MongoDB' }, { title: 'Redis' }],
};

const infraDevOps: ISkill.Skill = {
  category: 'Infra / DevOps',
  items: [
    { title: 'AWS ECS' },
    { title: 'EC2' },
    { title: 'SQS' },
    { title: 'SNS' },
    { title: 'Docker Compose' },
  ],
};

const etc: ISkill.Skill = {
  category: '기타',
  items: [{ title: 'MCP' }],
};

const skill: ISkill.Payload = {
  disable: false,
  skills: [backend, frontend, database, infraDevOps, etc],
};

export default skill;
