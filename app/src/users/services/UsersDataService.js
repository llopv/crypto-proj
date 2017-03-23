/**
 * Users DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
"use strict";

function UsersDataService($q) {
  var users = {
    "Elliot Alderson": {
      name: 'Elliot Alderson',
      type: 'identity',
      avatar: 'svg-1',
      xpubkey: 'xpub661MyMwAqRbcFLmD88YZgUBJCQfcrTwacsheGwVnAN1L2bx5JT6rimJ2dWFKkPmncqUk5FWjX9ttGpxzYZeN1XjdXVmMRvabvGUtXxwtfmn',
      seed: "main shuffle fetch miss crash invest end machine area rely master alarm"
    },
    "Mr. Robot": {
      name: 'Mr. Robot',
      type: 'identity',
      avatar: 'svg-2',
      xpubkey: "xpub661MyMwAqRbcFT6vqauYz6XgJ8iGwCqMmHskiMwYWjgenyjHWdk9C25SSg9QgRmCY3f9ajHssMMonrvboYRLeqi7bu766pS2HuBfkJbY8HC",
      seed: "fatigue omit friend unusual venue round zero wrestle transfer share chase under"
    },
    "Darlene Alderson": {
      name: 'Darlene Alderson',
      type: 'contact',
      avatar: 'svg-3',
      xpubkey: 'xpub661MyMwAqRbcGWVGv93TgekWqqDMSNDuKkTwzzFaDCgLHnV1HmKWtqodFkA9EWxd2gYj7B8RPJrABFgmbqz1dnxHbNWvQB26vieR3Dn237v'
    },
    "Angela Moss": {
      name: 'Angela Moss',
      type: 'contact',
      avatar: 'svg-4',
      xpubkey: 'xpub661MyMwAqRbcF7QxLjUVDTQMmet5TPW5X6hyFjwt8CGUqdmgbedhBhKgybFetrNWkVEdyC7fV7gMjEJjDaw94CwWYp1qgYJEGrYyjPqyQQg'
    },
    "Tyrell Wellick": {
      name: 'Tyrell Wellick',
      type: 'contact',
      avatar: 'svg-2',
      xpubkey: 'xpub661MyMwAqRbcF2WLNQwZv9347vYBHkTa2s6zBDtjXwJqP4ccyuYmNRN9Q2oMLYVBjqoFcpoZdJXpRZpzvvT4rjcGjUZktMAuS6CktFJZaFa'
    },
    "Shayla Nico": {
      name: 'Shayla Nico',
      type: 'contact',
      avatar: 'svg-4',
      xpubkey: "xpub661MyMwAqRbcGw3YDDps5KdFZqoXrexnSqUBoDMFwX6Hqi4KfdCqpG3iGeWshu8BpcPEdfNLG6TTkCKFFdz6mJn4nenZfA9mATdFcLCy8Ma"
    }
  };

  if (!localStorage.users) {
    localStorage.users = JSON.stringify(users);
  }

  // Promise-based API
  return {
    loadAllUsers: function() {
      // Simulate async nature of real remote calls
      let u = {}
      try {
        u = JSON.parse(localStorage.users);
      } catch(e) {
        console.error("Data is corrupted");
        localStorage.users = users;
        u = JSON.parse(localStorage.users);
      }
      let arr = Object.keys(u).map(function (name) { return u[name]; });
      return $q.when(arr);
    },
    saveUser: function(user) {
      localStorage.users[user.name] = user;
      return $q.when(true);
    }
  };
}

export default ['$q', UsersDataService];
