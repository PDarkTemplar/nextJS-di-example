/* eslint-disable max-classes-per-file */
import React, { Component, JSXElementConstructor, ComponentClass } from 'react';
import { observer } from 'mobx-react';

import { getDisplayName } from 'utils/index';

import Context from './Context';

type DiKey = string | symbol;

type Class<T> = { new (...args: any[]): T; diKey: DiKey };

type Options<T> = {
    name?: symbol;
    tagKey?: symbol;
    tagValue?: symbol;
    all?: boolean;
    transformation?: (clazz: T) => any;
};

type InjectParams = {
    diKey: DiKey;
    options?: {
        name?: symbol;
        tagKey?: symbol;
        tagValue?: symbol;
        all?: boolean;
    };
};

export class Dependence<K> {
    private clazzOrKey: Class<K> | DiKey;

    private options?: Options<K>;

    public constructor(clazzOrKey: Class<K> | DiKey, options?: Options<K>) {
        this.clazzOrKey = clazzOrKey;
        this.options = options;
    }

    public build() {
        return {
            clazzOrKey: this.clazzOrKey,
            options: this.options,
        };
    }
}

export function diInject<P extends I, I, C, K = any>(
    component: JSXElementConstructor<P> & C,
    dependencies: Record<keyof I, Dependence<K>>
) {
    type Props = JSX.LibraryManagedAttributes<C, Omit<P, keyof I>>;

    const displayName = getDisplayName(component);
    const WrappedComponent = observer(component);

    class DiInjectClass extends Component<Props> {
        // eslint-disable-next-line react/static-property-placement
        public static contextType = Context;

        public static wrappedComponent = component;

        // eslint-disable-next-line react/static-property-placement
        public static displayName = `diInject(${displayName})`;

        private resolve = (inject: InjectParams) => {
            const opt = inject;
            const { context } = this;

            if (!opt.diKey) {
                throw new Error('There is no static diKey in model class');
            }

            if (!opt.options) {
                return context.get(opt.diKey);
            }

            if (
                (opt.options.tagKey && !opt.options.tagValue) ||
                (!opt.options.tagKey && opt.options.tagValue)
            ) {
                throw new Error(`tagKey or tagValue empty for ${displayName} `);
            }

            if (!opt.options.tagKey && !opt.options.name) {
                if (!opt.options.all) {
                    return context.get(opt.diKey);
                }
                return context.getAll(opt.diKey);
            }
            if (opt.options.name) {
                if (!opt.options.all) {
                    return context.getNamed(opt.diKey, opt.options.name);
                }
                return context.getAllNamed(opt.diKey, opt.options.name);
            }
            if (opt.options.tagKey && opt.options.tagValue) {
                if (!opt.options.all) {
                    return context.getTagged(opt.diKey, opt.options.tagKey, opt.options.tagValue);
                }
                return context.getAllTagged(opt.diKey, opt.options.tagKey, opt.options.tagValue);
            }

            return context.get(opt.diKey);
        };

        private inject = () => {
            if (!this.context) {
                throw new Error(`di container not found for ${displayName}`);
            }

            const result: Record<keyof I, any> = {} as Record<keyof I, any>;

            (Object.keys(dependencies) as (keyof I)[]).forEach((key) => {
                const obj = dependencies[key];

                const deps = obj.build();

                const injectedParams: InjectParams = {
                    diKey:
                        typeof deps.clazzOrKey === 'symbol' || typeof deps.clazzOrKey === 'string'
                            ? deps.clazzOrKey
                            : deps.clazzOrKey.diKey,
                    options: {
                        name: deps.options?.name,
                        tagKey: deps.options?.tagKey,
                        tagValue: deps.options?.tagValue,
                        all: deps.options?.all,
                    },
                };

                const instance = this.resolve(injectedParams);

                result[key] =
                    deps.options && deps.options.transformation
                        ? deps.options.transformation(instance)
                        : instance;
            });

            return result;
        };

        public render() {
            const injections = this.inject();

            return <WrappedComponent {...(this.props as any)} {...injections} />;
        }
    }

    return observer(DiInjectClass) as ComponentClass<Props> & {
        wrappedComponent: JSXElementConstructor<P> & C;
    };
}
