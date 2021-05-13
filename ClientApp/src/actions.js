
export const BUILD_STATUS_LOADED =
  'BUILD_STATUS_LOADED';

export const buildStatusLoaded = (projectKey, statuses) => {
  return {
    type: BUILD_STATUS_LOADED, projectKey, statuses
  }
};

export const COMMITS_LOADED =
  'COMMITS_LOADED';

export const commitsLoaded = (projectKey, commits) => {
  return { type: COMMITS_LOADED, projectKey, commits };
};