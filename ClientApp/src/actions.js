
export const BUILD_STATUS_LOADED =
  'BUILD_STATUS_LOADED';

export const buildStatusLoaded = (statues) => {
  return { type: BUILD_STATUS_LOADED, statues };
};