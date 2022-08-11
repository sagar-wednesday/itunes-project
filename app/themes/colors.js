/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#5CDB95';
const primaryLight = '#379683';
const primaryDark = '#8EE4AF';
const secondary = '#05386B';
const text = '#EDF5E1';
const success = '#28a745';
const error = '#dc3545';
const gotoStories = '#1890ff';
// const primary = '#fcedda';
// const text = '#212529';
// const secondary = '#f8c49c';
// const success = '#28a745';
// const error = '#dc3545';
// const gotoStories = '#1890ff';

const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  primary,
  secondary,
  primaryLight,
  primaryDark,
  success,
  error,
  gotoStories,
  theme: {
    lightMode: {
      primary,
      secondary
    },
    darkMode: {
      primary: secondary,
      secondary: primary
    }
  }
};
module.exports = colors;
