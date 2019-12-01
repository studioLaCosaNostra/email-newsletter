type Status = 'fulfilled' | 'rejected';
type AllSettledResult<T> = Promise<({
  status: Status;
  value: T;
} | {
  status: Status;
  reason: any;
})[]>
export const allSettled = <T>(promises: Promise<T>[]): AllSettledResult<T> =>
  Promise.all(
    promises.map((promise, i) =>
      promise
        .then(value => ({
          status: 'fulfilled' as Status,
          value,
        }))
        .catch(reason => ({
          status: 'rejected',
          reason,
        }))
    )
  );