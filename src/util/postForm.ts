import { FormEvent } from 'react';

type DataShape = {
  area_shape?: string;
  area_size?: string;
};

const combineArea = ({ area_shape, area_size, ...rest }: DataShape) => {
  if (area_shape && area_size) {
    return { ...rest, area: `${area_size}-foot ${area_shape}` };
  }
  return rest;
};

const re = /^([\w-]+)\[(\d+)\]$/;

const postForm = (route: string) => (values: any) => {
  fetch(route, {
    method: 'POST',
    body: JSON.stringify(values),
  });
};

export default postForm;
