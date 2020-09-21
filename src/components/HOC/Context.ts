import React from 'react';

import { interfaces } from 'inversify';

const context = React.createContext<interfaces.Container | null>(null);

export default context;
