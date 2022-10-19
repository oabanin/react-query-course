
const dummyData = [
 {
   status: 'Successfully sent',
   description: 'Order delivered (TEST DATA)',
   date: '2022-09-26T10:10:48.894Z',
   type: 'location',
 },
 {
   status: 'Order delivered',
   sender: 'Aleksei',
   description: 'Courier could not reach you! (TEST DATA)',
   date: '2022-09-24T10:10:48.894Z',
   type: 'check',
 },
 {
   status: 'Order delivered',
   sender: 'Aleksei',
   description: 'Recipient not at home for 2nd time (TEST DATA)',
   date: '2022-09-22T10:10:48.894Z',
   type: 'email',
 },
 {
   status: 'Successfully sent',
   description: 'Order delivered (TEST DATA)',
   date: '2022-09-11T10:10:48.894Z',
   type: 'courier',
 },
 {
   status: 'Successfully sent',
   description: 'Order delivered (TEST DATA)',
   date: '2022-09-10T10:10:48.894Z',
   type: 'email-opened',
 },
 {
   status: 'Successfully sent',
   description: 'Order delivered (TEST DATA)',
   date: '2022-09-01T10:10:48.894Z',
   type: 'email-failed',
 },
 {
   status: 'Successfully sent',
   description: 'Order delivered (TEST DATA)',
   date: '2022-09-13T10:10:48.894Z',
   type: 'link',
 },
];

const mock = (data: any, timeout: number) => {
 return new Promise((resolve, reject) => {
   setTimeout(() => {
     if (data) {
       resolve(data);
     } else {
       reject({ message: 'Error' });
     }
   }, timeout);
 });
};

import useOrderInfo from 'desk/hooks/useOrderInfo';
import { useQuery } from 'react-query';
import { fiveMinutesCache } from 'src/constants';

export default function useCommunication(orderId: string) {
 const { data } = useOrderInfo(orderId);
 return useQuery(['useCommunication', data?._id], () => mock(dummyData, 1000), {
   cacheTime: fiveMinutesCache,
   staleTime: fiveMinutesCache,
   enabled: !!data?._id,
   retry: false, //Remove
 });
}
