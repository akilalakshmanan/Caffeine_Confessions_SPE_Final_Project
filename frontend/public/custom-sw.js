self.addEventListener('install', function(event) {
    // The promise that skipWaiting() returns can be safely ignored.
    self.skipWaiting();
  
    // Perform any other actions required for your
    // service worker to install, potentially inside
    // of event.waitUntil();
  });

self.addEventListener('push', async event => {
    console.log("New notification 1.1", event);
    const data = await event.data.json()
    const options = {
        body: data.body
    }
    event.waitUntil(
        self.registration.showNotification(data.title,option)
    );
})