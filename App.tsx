import React from 'react';
import './src/i18n';

import { NavigationContainer } from '@react-navigation/native';

import { ProviderTotal } from './data/store';
import { AuthProvider } from './src/contexts/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

// ____________________END OF IMPORT_______________________

function App(): React.JSX.Element {
  return (
    <ProviderTotal>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ProviderTotal>
  );
}

export default App;