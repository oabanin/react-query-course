import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { filterByTreatment } from '../utils';

// for when we need a query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  // for filtering staff by treatment
  const [filter, setFilter] = useState('all');

  // TODO: get data from server via useQuery
  const { data: staff = [] } = useQuery(queryKeys.staff, getStaff, {
    placeholderData: [
      {
        id: 1,
        name: 'Divya',
        treatmentNames: ['facial', 'scrub'],
        image: {
          fileName: 'divya.jpg',
          authorName: 'Pradeep Ranjan',
          authorLink:
            'https://unsplash.com/@tinywor1d?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
          platformName: 'Unsplash',
          platformLink: 'https://unsplash.com/',
        },
      },
    ],
  });

  return {
    staff: filter === 'all' ? staff : filterByTreatment(staff, filter),
    filter,
    setFilter,
  };
}
