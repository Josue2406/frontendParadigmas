/*import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <div>
            {token ? <Dashboard /> : <Login onLoginSuccess={setToken} />}
        </div>
    );
};

export default App;
*/

import React from 'react';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
    return (
        <div>
            <Dashboard />
        </div>
    );
};

export default App;