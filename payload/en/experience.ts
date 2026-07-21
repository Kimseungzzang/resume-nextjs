import { IExperience } from '../../component/experience/IExperience';

const experience: IExperience.Payload = {
  disable: false,
  disableTotalPeriod: false,
  list: [
    {
      title: 'HBRC',
      positions: [
        {
          title: 'Developer',
          startedAt: '2026-01',
          descriptions: [
            'A company developing and operating the SNSB, a standardized neuropsychological test for dementia diagnosis',
          ],
        },
      ],
    },
    {
      title: 'DM System Engineering',
      positions: [
        {
          title: 'Developer',
          startedAt: '2025-04',
          endedAt: '2025-12',
          descriptions: [
            'A manufacturer of fire/safety equipment such as laser evacuation guide lights, and their control systems',
          ],
        },
      ],
    },
  ],
};

export default experience;
