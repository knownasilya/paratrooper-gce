'use strict';

module.exports = function initPrompts(data) {
  return [
    {
      name: 'projectId',
      message: 'What is the GCR Project ID?',
      validate: function (id) {
        if (!id) {
          return 'Project ID cannot be blank';
        }

        return true;
      }
    }, {
      name: 'clusterName',
      message: 'What is name of the Container Engine cluster?',
      validate: function (value) {
        if (!value) {
          return 'Cluster NAME cannot be blank';
        }

        return true;
      }
    }, {
      name: 'clusterZone',
      message: 'In which zone is your cluster located?',
      validate: function (value) {
        if (!value) {
          return 'Cluster ZONE cannot be blank';
        }

        return true;
      }
    }, {
      name: 'replicas',
      message: 'How many replicas does your cluster have?',
      default: 2,
      validate: function (value) {
        if (!value) {
          return 'Number of replicas must be >= 1';
        }

        return true;
      }
    }, {
      name: 'containerTag',
      message: 'What is your Docker Container\'s tag?'
    }, {
      name: 'ssl',
      type: 'confirm',
      message: 'Does your app use SSL?',
      default: false
    }, {
      name: 'containerSSLPort',
      message: 'What is the SSL Port exposed by your app?',
      default: 3443,
      when: function (answers) {
        return answers.ssl;
      }
    }, {
      name: 'addEnvVars',
      message: 'Would you like to add some Environment Variables?',
      type: 'confirm',
      default: true
    }
  ];
};
