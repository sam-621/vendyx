import NProgress from 'nprogress';

export const startProgressBar = () => {
  NProgress.start();
};

export const stopProgressBar = () => {
  NProgress.done();
};
