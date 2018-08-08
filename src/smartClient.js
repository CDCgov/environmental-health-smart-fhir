const getSmartClient = () =>
  new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'development') {
      /* eslint-disable-next-line */
    const smart = FHIR.client({
        serviceUrl: 'https://r2.smarthealthit.org',
        // patientId: 'smart-1213208'
        // patientId: 'smart-1137192'
        // patientId: 'smart-2042917'
        // patientId: 'cfd4a167-5511-4de0-95af-4986260bc627'
        patientId: '8179ac31-0e00-4864-828c-c84f769d3758'
      });
      resolve(smart);
    } else {
      /* eslint-disable-next-line */
    FHIR.oauth2.ready(function(smart, err) {
        if (err) {
          reject(err);
        }
        resolve(smart);
      });
    }
  });

export default getSmartClient;
