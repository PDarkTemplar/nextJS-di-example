import React, { ReactNode, JSXElementConstructor, Component, ComponentClass } from 'react';
import { interfaces } from 'inversify';

import { getDisplayName } from 'utils/index';

import Context from './Context';

type Props = {
    container: interfaces.Container;
    children: ReactNode;
};

function DiProvider({ container, children }: Props) {
    return <Context.Provider value={container}>{children}</Context.Provider>;
}

function withProvider<P, C>(
    component: JSXElementConstructor<P> & C,
    container: interfaces.Container
) {
    type Props = JSX.LibraryManagedAttributes<C, P>;

    class ProviderWrap extends Component<Props> {
        // eslint-disable-next-line react/static-property-placement
        public static contextType = Context;

        // eslint-disable-next-line react/static-property-placement
        public static displayName = `diProvider(${getDisplayName(component)})`;

        public constructor(props: Props, context?: interfaces.Container) {
            super(props);

            this.context = context;

            if (this.context) {
                container.parent = this.context;
            }
        }

        public render() {
            const WrappedComponent = component;

            return (
                <DiProvider container={container}>
                    <WrappedComponent {...(this.props as any)} />
                </DiProvider>
            );
        }
    }

    return ProviderWrap as ComponentClass<Props>;
}

export default withProvider;
