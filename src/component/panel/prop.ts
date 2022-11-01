import { PropsWithChildren, ReactNode } from 'react';

export interface PanelProp extends PropsWithChildren {

    title?: string | ReactNode
}