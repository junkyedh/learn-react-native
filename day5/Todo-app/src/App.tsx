import React from 'react';
import { RootNavigator } from './navigation/RootNavigator';
import { useInitAppStorage } from './hooks';
import { StorageKeys } from './common/storage_keys.constants';

export default function App() {
  useInitAppStorage(StorageKeys.USER_INFO, { username: 'admin', password: '123456' });

  return (
    <RootNavigator />
  );
}
