// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  'internalEvents': {
    '': { type: '' };
    'done.invoke.auth.authorized:invocation[0]': {
      type: 'done.invoke.auth.authorized:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  'invokeSrcNameMap': {
    downloadFaceSdkModel: 'done.invoke.auth.authorized:invocation[0]';
  };
  'missingImplementations': {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  'eventsCausingActions': {
    requestStoredContext: 'xstate.init';
    setBiometrics: 'SETUP_BIOMETRICS';
    setContext: 'STORE_RESPONSE';
    setLanguage: 'SETUP_BIOMETRICS' | 'SETUP_PASSCODE';
    setPasscode: 'SETUP_PASSCODE';
    storeContext:
      | 'SETUP_BIOMETRICS'
      | 'SETUP_PASSCODE'
      | 'STORE_RESPONSE'
      | 'done.invoke.auth.authorized:invocation[0]';
  };
  'eventsCausingDelays': {};
  'eventsCausingGuards': {
    hasBiometricSet: '';
    hasData: 'STORE_RESPONSE';
    hasLanguageset: '';
    hasPasscodeSet: '';
    isSplashShowed: '';
  };
  'eventsCausingServices': {
    downloadFaceSdkModel: 'LOGIN' | 'SETUP_PASSCODE';
  };
  'matchesStates':
    | 'authorized'
    | 'checkingAuth'
    | 'init'
    | 'introSlider'
    | 'languagesetup'
    | 'savingDefaults'
    | 'settingUp'
    | 'splashScreen'
    | 'unauthorized';
  'tags': never;
}
