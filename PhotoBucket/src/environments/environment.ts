// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAWeiLUX4toHsq9NO02ylGoTdlvQb6pTE4',
    authDomain: 'laritz-photo-bucket.firebaseapp.com',
    databaseURL: 'https://laritz-photo-bucket.firebaseio.com',
    projectId: 'laritz-photo-bucket',
    storageBucket: '',
    messagingSenderId: '325467221761'
  },
};
