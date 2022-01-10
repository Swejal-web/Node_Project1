import { ReactElement } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

export type ILayoutProps = {
  children: ReactElement;
};

export type ILayout = (props: ILayoutProps) => ReactElement;

export type AppPage = NextPage & {
  layout?: ILayout;
};

export type AppPropsWithLayout = AppProps & {
  Component: AppPage;
};
