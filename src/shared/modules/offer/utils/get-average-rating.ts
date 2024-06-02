import type { TransformFnParams } from 'class-transformer';

const MAX_PRECISION = 2;

export const getAverageRating = ({ obj }: TransformFnParams) => {
  const { commentsCount, sumRating } = obj;

  if (!commentsCount) {
    return null;
  }

  const calculatedRating = sumRating / commentsCount;

  return Number(calculatedRating.toFixed(MAX_PRECISION));
};
